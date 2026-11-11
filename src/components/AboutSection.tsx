import React from 'react';
import { Eye, ShieldCheck, Award, Stethoscope, HeartPulse, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src="/src/assets/images/hospital_hero_banner_1794228006273.jpg"
                alt="Jivan Jyoti Eye Hospital Diagnostic Reception &amp; Clinic"
                className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091322]/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-teal-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#091322] font-heading">Super-Specialty Standard of Care</h4>
                    <p className="text-xs text-slate-600">Sheikhpura's Trusted Ophthalmic Center</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Floating Badge */}
            <div className="hidden sm:flex absolute -top-5 -right-5 bg-[#091322] text-white p-4 rounded-xl shadow-xl border-2 border-teal-500/40 items-center gap-3">
              <Eye className="w-8 h-8 stroke-[2.2] text-teal-400" />
              <div>
                <span className="block text-base font-bold font-heading text-white">100% Precision Laser</span>
                <span className="text-[11px] text-teal-300">Stitchless Cataract Surgery</span>
              </div>
            </div>
          </div>

          {/* Right Column Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>About Jivan Jyoti Eye Hospital</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091322] font-heading tracking-tight leading-tight">
              Pioneering Comprehensive Eye Care in <span className="text-teal-600">Sheikhpura, Bihar</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              <strong>Jivan Jyoti Eye Hospital</strong> was founded with a mission to bring world-class ophthalmic diagnosis and surgical eye care to the people of Sheikhpura and surrounding districts in Bihar. Our state-of-the-art facility is equipped with German &amp; US-manufactured ophthalmic lasers, stitchless Phacoemulsification cataract equipment, and computerized diagnostic devices.
            </p>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Led by distinguished eye surgeons <strong>Dr. S. Kumar</strong> and <strong>Dr. V. Kumar</strong> alongside contact lens specialist <strong>Opt. R. Kumar</strong>, our team has performed thousands of successful surgeries ranging from micro-incision cataract extractions to complex corneal treatments and pediatric eye evaluations.
            </p>

            {/* Key Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:border-teal-300 transition-colors">
                <div className="flex items-center gap-2 text-[#091322] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Ultra-Sterile Modular OT</span>
                </div>
                <p className="text-xs text-slate-600">
                  Laminar airflow operating theater designed to eliminate surgical site infection risk.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:border-teal-300 transition-colors">
                <div className="flex items-center gap-2 text-[#091322] font-bold text-sm">
                  <Stethoscope className="w-4 h-4 text-teal-600" />
                  <span>Advanced Laser Phaco</span>
                </div>
                <p className="text-xs text-slate-600">
                  Pain-free, stitch-free cataract procedures with rapid 24-hour visual rehabilitation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:border-teal-300 transition-colors">
                <div className="flex items-center gap-2 text-[#091322] font-bold text-sm">
                  <HeartPulse className="w-4 h-4 text-teal-600" />
                  <span>Cornea &amp; Vision Clinic</span>
                </div>
                <p className="text-xs text-slate-600">
                  Custom prosthetic contact lenses, low vision aids, and comprehensive ocular surface therapy.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:border-teal-300 transition-colors">
                <div className="flex items-center gap-2 text-[#091322] font-bold text-sm">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>Transparent &amp; Ethical Care</span>
                </div>
                <p className="text-xs text-slate-600">
                  Ethical treatment pricing, honest surgical advice, and lifelong patient follow-ups.
                </p>
              </div>
            </div>

            {/* Address bar quote */}
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-medium flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-bold block text-[#091322]">Hospital Location:</span>
                <span>{HOSPITAL_DETAILS.address}</span>
              </div>
              <a
                href={`tel:${HOSPITAL_DETAILS.phone.replace(/\s+/g, '')}`}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs shrink-0 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Helpline: {HOSPITAL_DETAILS.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
