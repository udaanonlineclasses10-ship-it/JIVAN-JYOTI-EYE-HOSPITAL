import React from 'react';
import { Zap, Eye, ShieldAlert, Sparkles, Activity, CheckCircle2, Award, HeartPulse, ArrowRight } from 'lucide-react';

interface TreatmentsSectionProps {
  onOpenBooking: () => void;
}

export const ADVANCED_TREATMENTS = [
  {
    title: 'Micro-Incision Phacoemulsification (MICS)',
    badge: 'Stitchless Cataract',
    desc: 'Ultra-small 1.8mm incision ultrasonic cataract surgery with zero injections, zero stitches, and zero bandages. Patients resume routine day activities within 24 hours with foldable intraocular lens implantation.',
    highlights: ['15-minute quick procedure', 'No eye patch required', 'Monofocal & Toric IOL options']
  },
  {
    title: 'Cornea Collagen Cross-Linking (C3R / CXL)',
    badge: 'Keratoconus Care',
    desc: 'Advanced biomechanical strengthening of corneal tissue using specialized riboflavin ultraviolet treatment to halt progressive keratoconus and stabilize corneal curvature.',
    highlights: ['Halts keratoconus progression', 'Preserves natural cornea', 'Custom contact lens fitting']
  },
  {
    title: 'Laser Refractive Surgery Counseling (LASIK / PRK)',
    badge: 'Specs Removal',
    desc: 'Precision wave-front corneal mapping and customized refractive evaluation to determine candidate eligibility for glasses removal laser treatments.',
    highlights: ['Detailed corneal topography', 'Pachymetry corneal thickness', 'Personalized surgeon counseling']
  },
  {
    title: 'Glaucoma Laser Trabeculoplasty & Shunt Surgery',
    badge: 'Pressure Reduction',
    desc: 'Medical, laser, and microsurgical filtering therapies engineered to reduce elevated intraocular pressure, preventing irreversible optic nerve neuropathy.',
    highlights: ['Automated perimeter visual field', 'Target IOP stabilization', 'Lifelong optic nerve monitoring']
  },
  {
    title: 'Pterygium Excision with Conjunctival Autograft',
    badge: 'Recurrence-Free',
    desc: 'Aesthetic and functional removal of conjunctival growths using sutureless fibrin biological glue for zero post-op stitch foreign-body sensation and negligible recurrence rates.',
    highlights: ['No stitch irritation', 'Biological glue technology', 'Fast cosmetic recovery']
  },
  {
    title: 'Specialized Scleral & Prosthetic Lenses',
    badge: 'Irregular Cornea',
    desc: 'Vaulted scleral lenses creating a tear-filled optical reservoir over severely damaged, irregular, or dry corneas for dramatic visual improvement in non-surgical cases.',
    highlights: ['Severe dry eye relief', 'Post-graft irregular cornea', 'Computerized trial fitting']
  }
];

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="treatments" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Zap className="w-4 h-4 text-teal-600" />
            <span>State-of-the-Art Surgical Ophthalmic Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091322] font-heading tracking-tight">
            Advanced Eye <span className="text-teal-600">Treatments &amp; Surgeries</span>
          </h2>
          <p className="text-base text-slate-600">
            Jivan Jyoti Eye Hospital combines proven clinical surgical techniques with international laser equipment to deliver superior visual outcomes.
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {ADVANCED_TREATMENTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-teal-600 font-mono font-bold text-xs">
                    0{idx + 1}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#091322] font-heading group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Highlights */}
                <div className="pt-2 space-y-1.5 border-t border-slate-100">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white transition-all flex items-center justify-center gap-1.5 group-hover:shadow-xs cursor-pointer"
                >
                  <span>Book Appointment for {item.badge}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Surgical Banner Callout */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-[#091322] via-[#0d2a4a] to-teal-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-teal-300 font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Certified Modular Operating Theater</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading">Need Cataract or Laser Consultation?</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              OPD consultations and eye power screening available Monday to Saturday. Walk-ins welcomed or book guaranteed slots online.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-[#091322] font-extrabold text-xs rounded-xl shadow-lg transition-all whitespace-nowrap shrink-0 uppercase tracking-wider cursor-pointer"
          >
            Book Priority OPD Slot
          </button>
        </div>

      </div>
    </section>
  );
};
