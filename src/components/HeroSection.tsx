import React from 'react';
import { Calendar, Search, ArrowRight, Sparkles, CheckCircle2, Shield, Award, Clock, Star, Users, Stethoscope } from 'lucide-react';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenTracking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenTracking }) => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-[#091322] via-[#0d2238] to-[#0a1829] text-white overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      
      {/* Decorative Radial Lighting Blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Background Photography with High Contrast Dark Scrim */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/src/assets/images/hospital_hero_banner_1794228006273.jpg"
          alt="Jivan Jyoti Eye Hospital Modern Facility"
          className="w-full h-full object-cover object-center filter saturate-150"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#091322] via-[#091322]/95 to-[#091322]/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Value Props & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Top Tag Kicker */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>Premier Super-Specialty Eye Hospital · Sheikhpura, Bihar</span>
            </div>

            {/* Main Required Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-[1.12] text-white">
              Restore &amp; Protect Your Vision With <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-sky-300 bg-clip-text text-transparent">Expert Eye Care</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              State-of-the-art ophthalmic facility providing precision Stitchless Phaco Cataract Surgery, Laser Cornea Restoration, Glaucoma care, and custom Contact Lenses by senior surgeons <strong>Dr. S. Kumar</strong> and <strong>Dr. V. Kumar</strong>.
            </p>

            {/* Core Differentiator Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Micro-Incision Stitchless Phaco Surgery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>German &amp; US Laser Diagnostics Suite</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Same-Day OPD &amp; Live Tracking System</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Certified Surgeons &amp; Optometrists</span>
              </div>
            </div>

            {/* Action Buttons: Book & Track */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-7 py-4 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment Now</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenTracking}
                className="inline-flex items-center gap-2.5 px-6 py-4 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 backdrop-blur-md transition-all hover:text-white hover:border-teal-500/50 cursor-pointer"
              >
                <Search className="w-4 h-4 text-teal-400" />
                <span>Track Appointment</span>
              </button>
            </div>

            {/* Urgent Care Helpline */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Emergency Eye Care Helpline: <strong className="text-white font-mono">{HOSPITAL_DETAILS.phone}</strong> (24/7 Support)</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative rounded-2xl p-1 bg-gradient-to-tr from-teal-500/30 via-sky-500/20 to-teal-400/20 border border-slate-700/70 shadow-2xl backdrop-blur-xl">
              <div className="bg-[#0b1b2d] rounded-xl overflow-hidden p-6 sm:p-7 space-y-6">
                
                {/* Doctor Showcase Badge */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80">
                  <img
                    src="/src/assets/images/doctor_consultation_1794228006220.jpg"
                    alt="Dr. S. Kumar examining eye patient"
                    className="w-16 h-16 rounded-xl object-cover border border-teal-500/40 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
                      <Award className="w-3.5 h-3.5 text-teal-400" />
                      <span>Senior Surgical Faculty</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">Dr. S. Kumar &amp; Dr. V. Kumar</h3>
                    <p className="text-[11px] text-slate-400">Eye Surgeons · 18+ &amp; 14+ Years Experience</p>
                  </div>
                </div>

                {/* Live Stats Row */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-teal-400 font-heading">15,000+</span>
                    <span className="text-[11px] text-slate-400 font-medium">Eye Surgeries Done</span>
                  </div>
                  <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-sky-400 font-heading">4.9 ★</span>
                    <span className="text-[11px] text-slate-400 font-medium">Patient Satisfaction</span>
                  </div>
                </div>

                {/* OPD Schedule Card */}
                <div className="p-4 bg-teal-950/50 border border-teal-800/50 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-teal-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-teal-400" />
                      Hospital OPD Hours
                    </span>
                    <span className="text-emerald-400 text-[10px] uppercase font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      Open Mon - Sat
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Morning OPD: 09:30 AM – 01:30 PM <br />
                    Evening OPD: 04:30 PM – 07:30 PM
                  </p>
                </div>

                {/* Booking Callout */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
                >
                  Schedule Your Consultation
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2026 Metric Proof Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-10 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl lg:text-4xl font-extrabold text-white font-heading">25+</span>
            <span className="block text-xs text-slate-400 font-medium">Years Medical Heritage</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl lg:text-4xl font-extrabold text-teal-400 font-heading">100%</span>
            <span className="block text-xs text-slate-400 font-medium">Stitchless Laser Precision</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl lg:text-4xl font-extrabold text-sky-400 font-heading">097097 53293</span>
            <span className="block text-xs text-slate-400 font-medium">Direct Hospital Line</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl lg:text-4xl font-extrabold text-emerald-400 font-heading">Sheikhpura</span>
            <span className="block text-xs text-slate-400 font-medium">Bihar 811105 Center</span>
          </div>
        </div>
      </div>

    </section>
  );
};
