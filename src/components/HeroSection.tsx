import React from 'react';
import { Calendar, Search, Award, ShieldCheck, Clock, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenTracking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenTracking }) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden pt-8 pb-16 lg:py-24">
      {/* Background Image Scrim */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="/src/assets/images/hospital_hero_banner_1794228006273.jpg"
          alt="Jivan Jyoti Eye Hospital Facility"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Leading Super-Specialty Eye Hospital in Sheikhpura, Bihar</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Restore & Protect Your Vision With <span className="bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">Expert Eye Care</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Jivan Jyoti Eye Hospital provides advanced Micro-Incision Phaco Cataract surgery, Cornea transplantation, Glaucoma care, and specialized Contact Lenses under the supervision of senior eye surgeons Dr. S. Kumar and Dr. V. Kumar.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Micro-Incision Stitchless Cataract Surgery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Modern Diagnostic & Laser Equipment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Same-Day OPD & Online Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Experienced Eye Surgeons & Optometrists</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl shadow-lg shadow-teal-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenTracking}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 backdrop-blur-md transition-all hover:text-white"
              >
                <Search className="w-4 h-4 text-teal-400" />
                <span>Track Existing Booking</span>
              </button>
            </div>

            {/* Emergency Line */}
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>For Emergency Eye Care & Helpline: <strong>{HOSPITAL_DETAILS.emergencyPhone}</strong></span>
            </div>
          </div>

          {/* Right Card / Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-tr from-teal-500/30 via-sky-500/20 to-teal-500/10 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
              <div className="bg-slate-900/90 rounded-xl overflow-hidden p-6 space-y-6">
                
                {/* Doctor Preview Card inside Hero */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <img
                    src="/src/assets/images/doctor_consultation_1794228006220.jpg"
                    alt="Dr. S. Kumar"
                    className="w-16 h-16 rounded-lg object-cover border border-teal-500/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">Dr. S. Kumar & Dr. V. Kumar</h3>
                    <p className="text-xs text-teal-400 font-medium">Senior Eye Surgeons & Laser Specialists</p>
                    <p className="text-[11px] text-slate-400 mt-1">M.S. Ophthalmology | 18+ Yrs Exp.</p>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                    <span className="block text-2xl font-extrabold text-teal-400 font-heading">15,000+</span>
                    <span className="text-[11px] text-slate-400 font-medium">Successful Surgeries</span>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                    <span className="block text-2xl font-extrabold text-sky-400 font-heading">4.9 ★</span>
                    <span className="text-[11px] text-slate-400 font-medium">Patient Satisfaction</span>
                  </div>
                </div>

                {/* OPD Schedule Card */}
                <div className="p-4 bg-teal-950/40 border border-teal-800/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-teal-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-400" />
                      Regular OPD Timings
                    </span>
                    <span className="text-emerald-400 text-[10px] uppercase font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Open Today</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Morning: 09:30 AM - 01:30 PM <br />
                    Evening: 04:30 PM - 07:30 PM (Mon - Sat)
                  </p>
                </div>

                {/* Instant CTA inside showcase */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-bold text-xs rounded-lg shadow-md transition-all uppercase tracking-wider"
                >
                  Schedule Your OPD Visit
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Metric Proof Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-white font-heading">25+</span>
            <span className="block text-xs text-slate-400 font-medium">Years Medical Leadership</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-teal-400 font-heading">100%</span>
            <span className="block text-xs text-slate-400 font-medium">Micro-Laser Precision</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-sky-400 font-heading">097097 53293</span>
            <span className="block text-xs text-slate-400 font-medium">Direct Hospital Helpline</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-extrabold text-emerald-400 font-heading">Sheikhpura</span>
            <span className="block text-xs text-slate-400 font-medium">Bihar 811105 Center</span>
          </div>
        </div>
      </div>
    </section>
  );
};
