import React from 'react';
import { Camera, Sparkles, ShieldCheck, ZoomIn, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const images = [
    {
      url: '/src/assets/images/hospital_hero_banner_1794228006273.jpg',
      title: 'Hospital Reception & OPD Waiting',
      desc: 'Spacious, air-conditioned patient waiting area and computerized registration desk in central Sheikhpura.',
      tag: 'Reception'
    },
    {
      url: '/src/assets/images/eye_laser_surgery_1794228006586.jpg',
      title: 'Modular Operation Theater (OT)',
      desc: 'Laminar airflow sterile surgical environment with advanced Phaco laser machines & microscope.',
      tag: 'Modular OT'
    },
    {
      url: '/src/assets/images/doctor_consultation_1794228006220.jpg',
      title: 'Slit-Lamp Diagnostic Clinic',
      desc: 'High-magnification corneal & anterior segment slit lamp microscope for precise eye diagnostics.',
      tag: 'Diagnostics'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Camera className="w-4 h-4 text-teal-600" />
            <span>Infrastructure &amp; Clinical Facility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091322] font-heading tracking-tight">
            Hospital <span className="text-teal-600">Gallery</span>
          </h2>
          <p className="text-base text-slate-600">
            Take a visual tour of Jivan Jyoti Eye Hospital Sheikhpura – equipped with advanced ophthalmic diagnostic suites and sterile surgical theaters.
          </p>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 bg-white flex flex-col hover:-translate-y-1.5"
            >
              <div className="relative h-72 overflow-hidden bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091322] via-[#091322]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                
                {/* Tag */}
                <div className="absolute top-4 left-4 bg-[#091322]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-slate-700/80">
                  {item.tag}
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <h3 className="text-lg font-bold font-heading">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
