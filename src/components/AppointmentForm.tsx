import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, FileText, CheckCircle2, Eye, Printer, AlertCircle, X, ShieldCheck } from 'lucide-react';
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
    if (!mobileNumber.trim() || mobileNumber.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!age.trim() || isNaN(Number(age))) {
      setError('Please enter a valid age in years.');
      return;
    }
    if (!eyeProblem.trim()) {
      setError('Please briefly describe your eye problem or concern.');
      return;
    }

    try {
      setLoading(true);

      // Generate unique human-readable Appointment ID
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
      setError('Failed to record appointment in database. Please check connection.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-700 to-sky-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-200">
              <Eye className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading">Book Online Appointment</h2>
              <p className="text-xs text-teal-100">Jivan Jyoti Eye Hospital, Sheikhpura</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
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
            
            {/* Patient Name */}
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-medium"
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Patient Age (Years) *</label>
              <input
                type="number"
                required
                min="1"
                max="120"
                placeholder="e.g. 45"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-medium"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Gender *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-medium"
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
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-semibold"
              >
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} – {doc.title} ({doc.roomNo})
                  </option>
                ))}
              </select>
            </div>

            {/* Eye Problem / Concern */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Eye Problem / Medical Concern *</label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Blurry vision in right eye, cataract assessment, redness or itchiness..."
                  value={eyeProblem}
                  onChange={(e) => setEyeProblem(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-medium"
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-medium"
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-medium"
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
                placeholder="Any past eye surgery history or special assistance required..."
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 font-medium"
              />
            </div>

          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Note: Submitted booking will be marked PENDING. Hospital admin will assign final date/time and confirm.</span>
          </div>

          {/* Form Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
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
