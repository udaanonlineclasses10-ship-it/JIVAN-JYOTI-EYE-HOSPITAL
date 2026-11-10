import React from 'react';
import { Eye, MapPin, Phone, MessageSquare, Clock, ArrowUp, ExternalLink, Calendar, Search } from 'lucide-react';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTracking: () => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenTracking,
  onOpenAdminLogin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs relative overflow-hidden border-t border-slate-800">
      
      {/* Floating Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${HOSPITAL_DETAILS.whatsapp}?text=${encodeURIComponent('Hello Jivan Jyoti Eye Hospital, I would like to inquire about appointment timings.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group border-2 border-white/20"
        title="Chat on WhatsApp (097097 53293)"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold text-xs whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-500 flex items-center justify-center text-white shadow-md">
                <Eye className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Jivan Jyoti <span className="text-teal-400">Eye Hospital</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Super-specialty eye institute in Sheikhpura, Bihar. Providing Stitchless Phaco Cataract Surgery, Cornea Care, Glaucoma screening, and specialized Contact Lenses.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-xs transition-colors"
              >
                Book OPD Visit
              </button>
              <button
                onClick={onOpenTracking}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-xs transition-colors border border-slate-700"
              >
                Track Booking
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Quick Links</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="#home" className="hover:text-teal-400 transition-colors">Home Page</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About Hospital</a></li>
              <li><a href="#doctors" className="hover:text-teal-400 transition-colors">Surgeons & Doctors</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Eye Treatments</a></li>
              <li><a href="#reviews" className="hover:text-teal-400 transition-colors">Patient Reviews</a></li>
              <li><a href="#location" className="hover:text-teal-400 transition-colors">Location & Directions</a></li>
            </ul>
          </div>

          {/* Hospital Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">OPD Hours & Emergency</h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Monday – Saturday: 09:00 AM – 08:00 PM</span>
              </p>
              <p className="text-slate-400 pl-6">
                Morning OPD: 09:30 AM - 01:30 PM <br />
                Evening OPD: 04:30 PM - 07:30 PM
              </p>
              <p className="text-rose-400 font-bold pt-1">
                Emergency Eye Care: 24/7 Service Available
              </p>
            </div>
          </div>

          {/* Address & Admin Link */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Contact & Location</h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>4RRP+2M8, Sheikhpura, Bihar 811105, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Helpline: <strong>097097 53293</strong></span>
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onOpenAdminLogin}
                className="text-xs text-slate-400 hover:text-teal-300 flex items-center gap-1.5 transition-colors font-medium"
              >
                <span>Doctor & Staff Admin Login</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Jivan Jyoti Eye Hospital, Sheikhpura, Bihar. All Rights Reserved.</p>
          <button
            onClick={scrollToTop}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-800"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
