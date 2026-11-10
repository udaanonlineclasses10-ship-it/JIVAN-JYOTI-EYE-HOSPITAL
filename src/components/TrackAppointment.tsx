import React, { useState } from 'react';
import { Search, Calendar, Clock, MapPin, Phone, ShieldCheck, AlertCircle, X, Eye, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { Appointment } from '../types';
import { trackAppointment, HOSPITAL_DETAILS, generateWhatsAppLink } from '../services/hospitalService';

interface TrackAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackAppointment: React.FC<TrackAppointmentProps> = ({ isOpen, onClose }) => {
  const [appointmentId, setAppointmentId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Appointment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setSearched(false);

    if (!appointmentId.trim()) {
      setError('Please enter your Appointment ID.');
      return;
    }
    if (!mobileNumber.trim()) {
      setError('Please enter your registered mobile number.');
      return;
    }

    try {
      setLoading(true);
      const matched = await trackAppointment(appointmentId, mobileNumber);
      setLoading(false);
      setSearched(true);

      if (matched) {
        setResult(matched);
      } else {
        setError('No matching appointment found. Please verify your Appointment ID and mobile number.');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error tracking appointment:', err);
      setError('Failed to fetch appointment status. Please try again.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            CONFIRMED
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            PENDING ADMIN APPROVAL
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            REJECTED
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            COMPLETED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 border border-teal-500/30">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading">Track Patient Appointment</h2>
              <p className="text-xs text-slate-300">Enter details to check live status</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          
          <form onSubmit={handleSearch} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Appointment ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JJ-2026-X892"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white font-mono font-bold uppercase text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Registered Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white font-medium text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching Database...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Check Appointment Status</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Search Result Card */}
          {searched && result && (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 animate-fadeIn">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Appointment ID</span>
                  <span className="text-lg font-extrabold text-teal-700 font-mono">{result.appointmentId}</span>
                </div>
                <div>{getStatusBadge(result.status)}</div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Patient Name:</span>
                  <span className="font-bold text-slate-900">{result.patientName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Selected Doctor:</span>
                  <span className="font-bold text-teal-800">{result.doctorName}</span>
                </div>

                {result.status === 'CONFIRMED' ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-emerald-900 block">Confirmed Appointment Time Slot:</span>
                    <p className="text-sm font-extrabold text-emerald-800 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>{result.confirmedDate || result.preferredDate}</span>
                      <Clock className="w-4 h-4 text-emerald-600 ml-2" />
                      <span>{result.confirmedTime || result.preferredTime}</span>
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Requested Preferred Slot:</span>
                    <span className="font-semibold text-slate-900">{result.preferredDate} ({result.preferredTime})</span>
                  </div>
                )}

                {result.adminNotes && (
                  <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 text-xs">
                    <span className="font-bold block">Hospital Admin Note:</span>
                    <p>{result.adminNotes}</p>
                  </div>
                )}

                {result.rejectionReason && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs">
                    <span className="font-bold block">Rejection Reason:</span>
                    <p>{result.rejectionReason}</p>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-2 flex justify-end">
                <a
                  href={generateWhatsAppLink(result)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Contact Hospital on WhatsApp</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
