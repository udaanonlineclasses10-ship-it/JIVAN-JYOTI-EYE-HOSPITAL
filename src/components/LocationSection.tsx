import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ShieldCheck, MessageSquare } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

export const LocationSection: React.FC = () => {
  // Sheikhpura, Bihar 811105 Coordinates
  const hospitalPos = { lat: 25.1388, lng: 85.8344 };
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HOSPITAL_DETAILS.name + ', ' + HOSPITAL_DETAILS.address)}`;

  return (
    <section id="location" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Find Us in Sheikhpura, Bihar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Hospital Location & <span className="text-teal-600">Contact Info</span>
          </h2>
          <p className="text-base text-slate-600">
            Conveniently located in central Sheikhpura with dedicated parking and emergency entrance accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Hospital Address</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    <strong>Jivan Jyoti Eye Hospital</strong><br />
                    Plus Code: 4RRP+2M8, Sheikhpura<br />
                    Bihar 811105, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Contact Helpline</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Phone: <a href={`tel:${HOSPITAL_DETAILS.phone.replace(/\s+/g, '')}`} className="font-bold text-teal-700 hover:underline">{HOSPITAL_DETAILS.phone}</a><br />
                    Emergency: <span className="font-bold text-rose-600">{HOSPITAL_DETAILS.emergencyPhone}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">WhatsApp Assistant</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Message us for appointment queries or doctor availability: <br />
                    <a
                      href={`https://wa.me/${HOSPITAL_DETAILS.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                    >
                      <span>+91 97097 53293</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">OPD Hours</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Monday – Saturday: 09:00 AM – 08:00 PM<br />
                    Sunday: Emergency Surgery Only
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions on Google Maps</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Google Maps Interactive Component */}
          <div className="lg:col-span-7 h-[420px] rounded-2xl overflow-hidden border border-slate-300 shadow-md relative bg-slate-200">
            {googleMapsApiKey ? (
              <APIProvider apiKey={googleMapsApiKey}>
                <Map
                  defaultCenter={hospitalPos}
                  defaultZoom={15}
                  mapId="DEMO_MAP_ID"
                  className="w-full h-full"
                  internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                >
                  <AdvancedMarker position={hospitalPos} title="Jivan Jyoti Eye Hospital">
                    <Pin background={'#0d9488'} glyphColor={'#ffffff'} borderColor={'#0f766e'} />
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            ) : (
              /* Fallback map iframe if API key is initializing */
              <iframe
                title="Jivan Jyoti Eye Hospital Sheikhpura Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=4RRP%2B2M8,+Sheikhpura,+Bihar+811105`}
              />
            )}

            {/* Floating Overlay Badge */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-lg text-xs">
              <span className="font-bold text-slate-900 block font-heading">Jivan Jyoti Eye Hospital</span>
              <span className="text-[11px] text-teal-700 font-semibold">4RRP+2M8, Sheikhpura, Bihar 811105</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
