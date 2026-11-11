import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ShieldCheck, MessageSquare, Send } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenBooking }) => {
  // Sheikhpura, Bihar 811105 Coordinates
  const hospitalPos = { lat: 25.1388, lng: 85.8344 };
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HOSPITAL_DETAILS.name + ', ' + HOSPITAL_DETAILS.address)}`;

  return (
    <section id="location" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Sheikhpura, Bihar Facility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091322] font-heading tracking-tight">
            Hospital Location &amp; <span className="text-teal-600">Contact Details</span>
          </h2>
          <p className="text-base text-slate-600">
            Conveniently situated in central Sheikhpura with dedicated parking and rapid ambulance/stretcher access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact & WhatsApp Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-md space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200/80 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#091322] font-heading">Hospital Address</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    <strong>Jivan Jyoti Eye Hospital</strong><br />
                    Plus Code: 4RRP+2M8, Sheikhpura<br />
                    Bihar 811105, India
                  </p>
                </div>
              </div>

              {/* Phone Helpline */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-200/80 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#091322] font-heading">Phone Helpline</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    General Inquiries: <a href={`tel:${HOSPITAL_DETAILS.phone.replace(/\s+/g, '')}`} className="font-bold text-teal-700 hover:underline">{HOSPITAL_DETAILS.phone}</a><br />
                    Emergency Helpline: <span className="font-bold text-rose-600 font-mono">097097 53293</span>
                  </p>
                </div>
              </div>

              {/* WhatsApp Assistant Box */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Patient Helpdesk</span>
                  </span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                    Online Now
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Send doctor queries, report inquiries or request appointment assistance via official WhatsApp:
                </p>
                <a
                  href={`https://wa.me/${HOSPITAL_DETAILS.whatsapp}?text=${encodeURIComponent('Hello Jivan Jyoti Eye Hospital, I would like to inquire about doctor appointments.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp (+91 97097 53293)</span>
                </a>
              </div>

              {/* Driving Directions */}
              <div className="pt-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#091322] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-teal-400" />
                  <span>Get Driving Directions on Google Maps</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Google Maps Interactive Component */}
          <div className="lg:col-span-7 h-[460px] rounded-2xl overflow-hidden border border-slate-300 shadow-lg relative bg-slate-200">
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

            {/* Floating Info Overlay */}
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1">
              <span className="font-bold text-[#091322] block font-heading text-sm">Jivan Jyoti Eye Hospital</span>
              <span className="text-[11px] text-teal-700 font-semibold block">4RRP+2M8, Sheikhpura, Bihar 811105</span>
              <span className="text-[10px] text-slate-500 block">Near Central Chowk · Parking Available</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
