import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Get configuration from Vite environment variables or localStorage (for user convenience in preview)
const getStoredConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (envUrl && envKey && !envUrl.includes('your-project')) {
    return { url: envUrl, anonKey: envKey, isFromEnv: true };
  }
  
  try {
    const saved = localStorage.getItem('jj_supabase_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return { url: parsed.url, anonKey: parsed.anonKey, isFromEnv: false };
      }
    }
  } catch (e) {
    // ignore
  }

  return {
    url: envUrl || '',
    anonKey: envKey || '',
    isFromEnv: false
  };
};

let currentConfig = getStoredConfig();

export let supabase: SupabaseClient | null = (currentConfig.url && currentConfig.anonKey && !currentConfig.url.includes('your-project'))
  ? createClient(currentConfig.url, currentConfig.anonKey)
  : null;

export function isSupabaseConfigured(): boolean {
  return !!supabase && !!currentConfig.url && !currentConfig.url.includes('your-project');
}

export function getSupabaseConfig() {
  return currentConfig;
}

export function saveSupabaseConfig(url: string, anonKey: string): { success: boolean; error?: string } {
  try {
    const trimmedUrl = url.trim();
    const trimmedKey = anonKey.trim();

    if (!trimmedUrl.startsWith('https://')) {
      return { success: false, error: 'Supabase URL must start with https://' };
    }
    if (!trimmedKey) {
      return { success: false, error: 'Anon key is required.' };
    }

    const newClient = createClient(trimmedUrl, trimmedKey);
    supabase = newClient;
    currentConfig = { url: trimmedUrl, anonKey: trimmedKey, isFromEnv: false };
    localStorage.setItem('jj_supabase_config', JSON.stringify({ url: trimmedUrl, anonKey: trimmedKey }));

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Invalid Supabase configuration' };
  }
}

export function clearSupabaseConfig() {
  localStorage.removeItem('jj_supabase_config');
  currentConfig = { url: '', anonKey: '', isFromEnv: false };
  supabase = null;
}

export async function getCurrentSupabaseUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

export async function getCurrentSupabaseSession(): Promise<Session | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
}
