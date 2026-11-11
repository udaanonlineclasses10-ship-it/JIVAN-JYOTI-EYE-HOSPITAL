import React from 'react';
import { Eye, Zap, ShieldAlert, Sparkles, Glasses, Activity, MonitorCheck, Stethoscope, ArrowRight } from 'lucide-react';

interface SpecialitiesSectionProps {
  onOpenBooking: () => void;
}

export const SPECIALITIES = [
  {
    icon: Zap,
    title: 'Cataract & Phaco Surgery',
    desc: 'Micro-incision sutureless cataract removal with imported premium multifocal & toric IOL implants for crystal clear sight.',
    badge: 'Flagship Center'
  },
  {
    icon: Eye,
    title: 'Cornea & External Eye Disease',
    desc: 'Comprehensive diagnostic evaluation of keratoconus, corneal ulcers, pterygium, and advanced tissue transplantation.',
    badge: 'Specialist Care'
  },
  {
    icon: ShieldAlert,
    title: 'Glaucoma Management',
    desc: 'Early detection of ocular hypertension through computerized visual field testing, pachymetry, and laser trabeculoplasty.',
    badge: 'Sight Saver'
  },
  {
    icon: Glasses,
    title: 'Custom Contact Lenses',
    desc: 'Specialized optical fits including scleral, rigid gas permeable (RGP), toric, and cosmetic prosthetic contact lenses.',
    badge: 'Opt. R. Kumar'
  },
  {
    icon: Activity,
    title: 'Retina & Diabetic Eye Care',
    desc: 'High-definition dilated fundus examination, diabetic retinopathy screening, and retinal vascular health management.',
    badge: 'Diabetic Clinic'
  },
  {
    icon: MonitorCheck,
    title: 'Computer Vision & Dry Eye',
    desc: 'Targeted ocular surface therapy for digital eye strain, tear film insufficiency, and blue-light protection guidance.',
    badge: 'Digital Health'
  },
  {
    icon: Sparkles,
    title: 'Pediatric Ophthalmology',
    desc: 'Gentle, child-friendly eye examinations for lazy eye (amblyopia), childhood squints, and developmental refractive errors.',
    badge: 'Pediatric'
  },
  {
    icon: Stethoscope,
    title: 'Comprehensive Eye OPD',
    desc: 'Computerized auto-refraction, slit-lamp biomicroscopy, intraocular pressure measurement, and spectacle prescriptions.',
    badge: 'Daily Walk-in'
  }
];

export const SpecialitiesSection: React.FC<SpecialitiesSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="specialities" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Eye className="w-4 h-4 text-teal-600" />
            <span>Center of Ophthalmic Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091322] font-heading tracking-tight">
            Our Eye Care <span className="text-teal-600">Specialities</span>
          </h2>
          <p className="text-base text-slate-600">
            Equipped with modern surgical and diagnostic technologies, Jivan Jyoti Eye Hospital delivers complete clinical eye care under one roof in Sheikhpura.
          </p>
        </div>

        {/* 8 Specialities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALITIES.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-teal-600 group-hover:to-teal-500 group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">
                      {spec.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#091322] font-heading group-hover:text-teal-700 transition-colors">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {spec.desc}
                    </p>
                  </div>

                </div>

                <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between">
                  <button
                    onClick={onOpenBooking}
                    className="text-xs font-bold text-teal-600 hover:text-teal-800 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
