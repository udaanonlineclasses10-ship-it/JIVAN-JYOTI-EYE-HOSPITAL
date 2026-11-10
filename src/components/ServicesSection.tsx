import React from 'react';
import { Eye, Zap, ShieldAlert, Sparkles, Glasses, Activity, MonitorCheck, Stethoscope, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

export const SERVICES = [
  {
    icon: Zap,
    title: 'Phaco Cataract Surgery',
    subtitle: 'Micro-Incision Stitchless Surgery',
    description: 'Advanced ultrasonic Phacoemulsification with imported foldable intraocular lenses (IOL). Quick 15-minute stitchless procedure with rapid visual rehabilitation.',
    tag: 'Most Popular'
  },
  {
    icon: Eye,
    title: 'Cornea & Laser Refractive',
    subtitle: 'Corneal Care & LASIK Consultation',
    description: 'Diagnosis and surgical management of corneal ulcers, keratoconus corneal cross-linking (CXL), and laser vision correction evaluation to remove glasses.',
    tag: 'Specialist Care'
  },
  {
    icon: ShieldAlert,
    title: 'Glaucoma Clinic',
    subtitle: 'Intraocular Pressure & Field Testing',
    description: 'Early detection of the silent thief of sight through non-contact tonometer pressure checks, OCT optic nerve scanning, and medical/laser pressure reduction.',
    tag: 'Early Detection'
  },
  {
    icon: Glasses,
    title: 'Contact Lens & Low Vision',
    subtitle: 'Custom Fitting & Vision Aids',
    description: 'Specialized fitting for toric, prosthetic, and rigid gas-permeable (RGP) contact lenses, alongside telescopic and digital magnification aids for low vision.',
    tag: 'Opt. R. Kumar'
  },
  {
    icon: Activity,
    title: 'Retina & Diabetic Eye Care',
    subtitle: 'Fundus Evaluation & Macular Screening',
    description: 'Dilated fundus examination for diabetic retinopathy, hypertensive eye changes, and age-related macular degeneration (AMD) prevention.',
    tag: 'Diabetic Care'
  },
  {
    icon: MonitorCheck,
    title: 'Computer Vision Syndrome',
    subtitle: 'Digital Eye Strain & Dry Eye',
    description: 'Specialized diagnostic tear film evaluation, blue-block lens prescription, and ergonomic eye care therapy for IT professionals and students.',
    tag: 'Modern Lifestyle'
  },
  {
    icon: Sparkles,
    title: 'Pediatric Ophthalmology',
    subtitle: 'Children Eye Care & Squint',
    description: 'Child-friendly visual acuity evaluation, lazy eye (amblyopia) patch therapy, squints alignment counseling, and myopia control lenses.',
    tag: 'Kids Clinic'
  },
  {
    icon: Stethoscope,
    title: 'General Eye OPD & Refraction',
    subtitle: 'Computerized Power Check',
    description: 'Routine comprehensive eye checks using auto-refractor lensometers, slit-lamp examination, and precise glass power prescription.',
    tag: 'Daily OPD'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Eye className="w-4 h-4 text-teal-600" />
            <span>Advanced Ophthalmic Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Our Eye Care <span className="text-teal-600">Services & Treatments</span>
          </h2>
          <p className="text-base text-slate-600">
            From routine computerized refraction to advanced laser cataract surgery, Jivan Jyoti Eye Hospital provides complete eye care solutions under one roof.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-teal-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-teal-600/10 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-teal-700 transition-colors">
                      {service.title}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500 block mb-2">{service.subtitle}</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/60 mt-6 flex items-center justify-between">
                  <button
                    onClick={onOpenBooking}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Book Procedure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-sky-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-heading">Need Urgent Eye Consultation or Laser Surgery?</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Walk-in OPD available every morning from 09:30 AM. Or book your guaranteed priority slot online to avoid long waiting times.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all whitespace-nowrap shrink-0 uppercase tracking-wider"
          >
            Book Priority OPD Slot
          </button>
        </div>

      </div>
    </section>
  );
};
