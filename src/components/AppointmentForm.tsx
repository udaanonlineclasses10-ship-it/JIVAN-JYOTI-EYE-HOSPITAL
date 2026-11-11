import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, FileText, CheckCircle2, Eye, AlertCircle, X, ShieldCheck, HeartPulse } from 'lucide-react';
import { Doctor, Appointment } from '../types';
import { createAppointment, HOSPITAL_DETAILS } from '../services/hospitalService';

interface AppointmentFormProps {
  doctors: Doctor[];
  selectedDoctorId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccessBooking: (appointment: Appointment) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctors,
  selectedDoctorId,
  isOpen,
  onClose,
  onSuccessBooking,
}) => {
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [doctorId, setDoctorId] = useState(selectedDoctorId || doctors[0]?.id || '');
  const [eyeProblem, setEyeProblem] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('10:00 AM');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId);
    } else if (doctors.length > 0 && !doctorId) {
      setDoctorId(doctors[0].id);
    }
  }, [selectedDoctorId, doctors]);

  if (!isOpen) return null;

  const currentDoctor = doctors.find((d) => d.id === doctorId) || doctors[0];
  const timeSlots = currentDoctor?.timeSlots || [
    '09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '04:30 PM', '05:30 PM', '06:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!patientName.trim()) {
      setError('Please enter patient full name.');
      return;
    }
    const cleanPhone = mobileNumber.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!age.trim() || isNaN(Number(age)) || Number(age) < 1 || Number(age) > 120) {
      setError('Please enter a valid age between 1 and 120.');
      return;
    }
    if (!eyeProblem.trim()) {
      setError('Please briefly describe your eye problem or concern.');
      return;
    }

    try {
      setLoading(true);

      // Generate unique human-readable Appointment ID (JJ-2026-XXXX)
      const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
      const year = new Date().getFullYear();
      const appointmentId = `JJ-${year}-${randomCode}`;

      const appointmentData = {
        appointmentId,
        patientName: patientName.trim(),
        mobileNumber: mobileNumber.trim(),
        age: age.trim(),
        gender,
        doctorId: currentDoctor.id,
        doctorName: currentDoctor.name,
        eyeProblem: eyeProblem.trim(),
        preferredDate,
        preferredTime,
        additionalMessage: additionalMessage.trim()
      };

      const created = await createAppointment(appointmentData);
      setLoading(false);
      onSuccessBooking(created);
    } catch (err) {
      setLoading(false);
      console.error('Error creating appointment:', err);
      setError('Failed to record appointment in database. Please check your network connection.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header (Deep Navy Blue #091322) */}
        <div className="bg-[#091322] p-6 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shadow-xs">
              <Eye className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading">Book Eye OPD Appointment</h2>
              <p className="text-xs text-slate-300">Jivan Jyoti Eye Hospital · Sheikhpura, Bihar</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Patient Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Patient Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium transition-all"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Mobile Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium transition-all"
                />
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Age (Years) *</label>
              <input
                type="number"
                required
                min="1"
                max="120"
                placeholder="e.g. 48"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium transition-all"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Gender *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-semibold transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Select Doctor */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Select Eye Doctor / Specialist *</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-bold transition-all"
              >
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} – {doc.title} ({doc.roomNo})
                  </option>
                ))}
              </select>
            </div>

            {/* Eye Problem / Medical Concern */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Eye Problem / Medical Concern *</label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Blurry vision in right eye, cataract surgery consultation, watering, redness..."
                  value={eyeProblem}
                  onChange={(e) => setEyeProblem(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium transition-all"
                />
              </div>
            </div>

            {/* Preferred Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Preferred Date *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium transition-all"
                />
              </div>
            </div>

            {/* Preferred Time Slot */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Preferred OPD Time Slot *</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium transition-all"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Additional Message (Optional)</label>
              <input
                type="text"
                placeholder="Past surgery history, diabetes, blood pressure, or special wheelchair requirements..."
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white text-slate-900 font-medium transition-all"
              />
            </div>

          </div>

          {/* Workflow Notice */}
          <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>Booking Workflow:</strong> Your initial booking is marked <strong>PENDING</strong> in our database. The hospital admin will review schedule availability, assign your finalized slot, and confirm.</span>
          </div>

          {/* Form Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to Database...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Appointment Request</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
