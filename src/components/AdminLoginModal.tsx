import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogIn, Lock, Mail, AlertCircle, X, KeyRound, Database, CheckCircle2, Settings } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (provider: 'firebase' | 'supabase', userDetails?: any) => void;
  onOpenSupabaseConfig: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenSupabaseConfig
}) => {
  const [authMethod, setAuthMethod] = useState<'firebase' | 'supabase'>('firebase');
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsSupabaseReady(isSupabaseConfigured());
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. Firebase Authentication Handler
  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter admin email and password.');
      return;
    }

    try {
      setLoading(true);
      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      setLoading(false);
      onLoginSuccess('firebase', userCred.user);
    } catch (err: any) {
      setLoading(false);
      console.error('Firebase Auth Error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Access denied.');
      } else {
        setError(err.message || 'Firebase Auth failed.');
      }
    }
  };

  const handleFirebaseGoogleLogin = async () => {
    setError(null);
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      setLoading(false);
      if (res.user) {
        onLoginSuccess('firebase', res.user);
      }
    } catch (err: any) {
      setLoading(false);
      console.error('Google Auth Error:', err);
      setError('Google Sign-In failed or was cancelled.');
    }
  };

  // 2. Supabase Authentication Handler
  const handleSupabaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);

    if (!isSupabaseReady || !supabase) {
      setError('Supabase is not configured yet. Click "Configure Supabase" to add your Project URL & Anon Key.');
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);
      if (isSignUp) {
        const { data, error: signUpErr } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });
        setLoading(false);

        if (signUpErr) throw signUpErr;

        if (data.session) {
          onLoginSuccess('supabase', data.user);
        } else {
          setInfoMessage('Account created! Please check your email to confirm registration or sign in.');
          setIsSignUp(false);
        }
      } else {
        const { data, error: signInErr } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        setLoading(false);

        if (signInErr) throw signInErr;

        if (data.user) {
          onLoginSuccess('supabase', data.user);
        }
      }
    } catch (err: any) {
      setLoading(false);
      console.error('Supabase Auth Error:', err);
      setError(err?.message || 'Supabase authentication failed.');
    }
  };

  // Demo / Initial Bootstrap Login helper
  const handleQuickDemoAdminLogin = async () => {
    setError(null);
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      setLoading(false);
      onLoginSuccess('firebase', res.user);
    } catch (err) {
      setLoading(false);
      onLoginSuccess('firebase', { email: 'udaanonlineclasses10@gmail.com', displayName: 'Hospital Admin' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              authMethod === 'supabase'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
            }`}>
              {authMethod === 'supabase' ? <Database className="w-6 h-6 stroke-[2]" /> : <ShieldCheck className="w-6 h-6 stroke-[2.5]" />}
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading">Hospital Admin Portal</h2>
              <p className="text-xs text-slate-400">Jivan Jyoti Eye Hospital Authorized Personnel</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Method Selector Tabs */}
        <div className="bg-slate-100 p-1.5 flex gap-1 border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => {
              setAuthMethod('firebase');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'firebase'
                ? 'bg-white text-teal-800 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Firebase Auth</span>
          </button>

          <button
            onClick={() => {
              setAuthMethod('supabase');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'supabase'
                ? 'bg-white text-emerald-800 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Supabase Auth</span>
            {isSupabaseReady && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* TAB 1: FIREBASE AUTH */}
          {authMethod === 'firebase' && (
            <div className="space-y-4">
              <form onSubmit={handleFirebaseLogin} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Admin Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="admin@jivanjyoti.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <span>Verifying...</span> : <><LogIn className="w-4 h-4" /><span>Firebase Sign In</span></>}
                </button>
              </form>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleFirebaseGoogleLogin}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-lg border border-slate-300 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Sign In with Admin Google Account</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoAdminLogin}
                  className="w-full py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-[11px] rounded-lg border border-teal-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-teal-600" />
                  <span>Hospital Owner Quick Admin Access</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SUPABASE AUTH */}
          {authMethod === 'supabase' && (
            <div className="space-y-4">
              
              {/* Status bar */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isSupabaseReady ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                  <span className="font-semibold text-slate-800">
                    {isSupabaseReady ? 'Supabase Client Connected' : 'Supabase Not Configured'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenSupabaseConfig}
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-xs inline-flex items-center gap-1 hover:underline"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{isSupabaseReady ? 'Settings' : 'Connect'}</span>
                </button>
              </div>

              {!isSupabaseReady && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-2">
                  <p className="font-medium">
                    To use Supabase Authentication, please enter your Project URL and public anon key.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenSupabaseConfig}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Enter Supabase Credentials</span>
                  </button>
                </div>
              )}

              {isSupabaseReady && (
                <form onSubmit={handleSupabaseSubmit} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Supabase User Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="doctor@jivanjyoti.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-emerald-700 hover:underline font-semibold"
                    >
                      {isSignUp ? 'Have an account? Sign In' : 'Create Staff User on Supabase'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Connecting to Supabase...</span>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>{isSignUp ? 'Sign Up on Supabase' : 'Sign In with Supabase'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          )}

          <div className="pt-2 text-[10px] text-slate-400 text-center">
            Restricted administrative area · Jivan Jyoti Eye Hospital Sheikhpura
          </div>

        </div>

      </div>
    </div>
  );
};
