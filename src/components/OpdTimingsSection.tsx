import React from 'react';
import { Clock, Calendar, AlertCircle, Phone, CheckCircle2, ShieldAlert } from 'lucide-react';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

interface OpdTimingsSectionProps {
  onOpenBooking: () => void;
}

export const OpdTimingsSection: React.FC<OpdTimingsSectionProps> = ({ onOpenBooking }) => {
  const scheduleRows = [
    { day: 'Monday', morning: '09:30 AM – 01:30 PM', evening: '04:30 PM – 07:30 PM', status: 'Regular OPD' },
    { day: 'Tuesday', morning: '09:30 AM – 01:30 PM', evening: '04:30 PM – 07:30 PM', status: 'Regular OPD' },
    { day: 'Wednesday', morning: '09:30 AM – 01:30 PM', evening: '04:30 PM – 07:30 PM', status: 'Regular OPD' },
    { day: 'Thursday', morning: '09:30 AM – 01:30 PM', evening: '04:30 PM – 07:30 PM', status: 'Regular OPD' },
    { day: 'Friday', morning: '09:30 AM – 01:30 PM', evening: '04:30 PM – 07:30 PM', status: 'Regular OPD' },
    { day: 'Saturday', morning: '09:30 AM – 01:30 PM', evening: '04:30 PM – 07:30 PM', status: 'Regular OPD' },
    { day: 'Sunday', morning: 'Emergency Eye Care Only', evening: 'Emergency Surgery On-Call', status: 'Emergency' }
  ];

  return (
    <section id="timings" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Consultation &amp; Surgery Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091322] font-heading tracking-tight">
            Hospital OPD <span className="text-teal-600">Timings</span>
          </h2>
          <p className="text-base text-slate-600">
            Plan your visit to Jivan Jyoti Eye Hospital. Walk-in consultations are available throughout our regular OPD hours or book ahead to reserve your doctor's slot.
          </p>
        </div>

        {/* Schedule Table Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          
          <div className="bg-[#091322] text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading">Weekly Doctor Consultation Hours</h3>
                <p className="text-xs text-slate-400">Dr. S. Kumar &amp; Dr. V. Kumar OPD Availability</p>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-[#091322] font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Reserve Slot
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Day</th>
                  <th className="py-3.5 px-6">Morning OPD Session</th>
                  <th className="py-3.5 px-6">Evening OPD Session</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {scheduleRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-[#091322]">
                      {row.day}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-semibold text-slate-800">{row.morning}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="font-semibold text-slate-800">{row.evening}</span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {row.status === 'Emergency' ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Emergency Only
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Active OPD
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-rose-700 font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>For Ocular Emergencies (Chemical burns, traumatic injuries, sudden loss of vision): Call 097097 53293 immediately.</span>
            </div>
            <a
              href={`tel:${HOSPITAL_DETAILS.emergencyPhone.replace(/\s+/g, '')}`}
              className="text-xs font-bold text-teal-700 hover:underline shrink-0"
            >
              Call 24/7 Helpline
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
