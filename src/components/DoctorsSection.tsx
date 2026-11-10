import React from 'react';
import { Calendar, Clock, MapPin, Award, CheckCircle2, UserCheck, Stethoscope } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  doctors: Doctor[];
  onBookDoctor: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ doctors, onBookDoctor }) => {
  return (
    <section id="doctors" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-800 text-xs font-semibold">
            <UserCheck className="w-4 h-4 text-teal-600" />
            <span>Senior Eye Specialists & Surgeons</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Meet Our Specialist <span className="text-teal-600">Doctors</span>
          </h2>
          <p className="text-base text-slate-600">
            Our team of highly qualified eye surgeons and clinical optometrists provide comprehensive diagnostic counseling, micro-surgery, and postoperative vision care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Photo Header */}
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Room Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-slate-700">
                  {doc.roomNo}
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {doc.isAvailable ? (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Available OPD
                    </span>
                  ) : (
                    <span className="bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded-full">
                      On Leave
                    </span>
                  )}
                </div>

                {/* Doctor Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold font-heading text-white">{doc.name}</h3>
                  <p className="text-xs text-teal-300 font-semibold">{doc.title}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Qualifications */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Qualifications</span>
                    <p className="text-xs font-semibold text-slate-800">{doc.qualifications}</p>
                    <p className="text-xs text-teal-700 font-medium">{doc.experience}</p>
                  </div>

                  {/* Specialization */}
                  {doc.specialization && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Areas of Expertise</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{doc.specialization}</p>
                    </div>
                  )}

                  {/* Timings */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>OPD Timings</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">{doc.timings}</p>
                  </div>

                  {/* Available Days */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {doc.availableDays.map((day) => (
                      <span key={day} className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {day.substring(0, 3)}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onBookDoctor(doc.id)}
                  disabled={!doc.isAvailable}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
                    doc.isAvailable
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20 hover:shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Visit With {doc.name.split(' ')[0]} {doc.name.split(' ')[1]}</span>
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
