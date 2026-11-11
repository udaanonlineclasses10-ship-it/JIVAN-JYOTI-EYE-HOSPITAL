import React from 'react';
import { Award, ShieldCheck, Stethoscope, HeartPulse, Sparkles, CheckCircle2, Clock, ThumbsUp } from 'lucide-react';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

interface WhyChooseUsSectionProps {
  onOpenBooking: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onOpenBooking }) => {
  const reasons = [
    {
      icon: Award,
      title: '25+ Years of Ophthalmic Excellence',
      desc: 'Founded with a core commitment to clinical honesty, diagnostic accuracy, and transparent medical counsel in Sheikhpura and Bihar.'
    },
    {
      icon: Stethoscope,
      title: 'Distinguished Surgical Faculty',
      desc: 'All complex phaco cataract and corneal surgeries are personally executed by experienced surgeons Dr. S. Kumar and Dr. V. Kumar.'
    },
    {
      icon: ShieldCheck,
      title: 'Ultra-Sterile Laminar Airflow OT',
      desc: 'Modular operation theater with strict HEPA filtration standards to ensure zero surgical site infection and rapid post-op visual recovery.'
    },
    {
      icon: HeartPulse,
      title: 'Transparent & Ethical Care',
      desc: 'Clear surgical pricing with zero hidden charges. Complete patient counseling on intraocular lens options (Monofocal, Toric & Multifocal).'
    },
    {
      icon: Clock,
      title: 'Zero Waiting Online Scheduling',
      desc: 'Direct online booking and real-time status tracking so patients from remote villages and towns never have to wait in exhausting queues.'
    },
    {
      icon: ThumbsUp,
      title: '15,000+ Satisfied Patients',
      desc: 'Consistently rated 4.9 out of 5 stars by families and elderly patients across Sheikhpura, Nawada, Lakhisarai, and surrounding districts.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Why Patients Trust Jivan Jyoti Eye Hospital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091322] font-heading tracking-tight">
            Why Choose Us For Your <span className="text-teal-600">Vision Care</span>
          </h2>
          <p className="text-base text-slate-600">
            We hold ourselves to the highest standards in patient safety, surgical technology, and compassionate post-operative vision care.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-teal-300 shadow-xs hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-600/10 text-teal-700 flex items-center justify-center group-hover:bg-[#091322] group-hover:text-teal-400 transition-colors shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#091322] font-heading group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Quote Strip */}
        <div className="mt-14 p-6 rounded-2xl bg-teal-50/70 border border-teal-200/90 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
              JJ
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#091322] font-heading">
                Dedicated to Saving Sight in Sheikhpura Since 2010
              </h4>
              <p className="text-xs text-teal-800">
                Government Registered Eye Care Center · 4RRP+2M8, Sheikhpura, Bihar 811105
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            Schedule Consultation Today
          </button>
        </div>

      </div>
    </section>
  );
};
