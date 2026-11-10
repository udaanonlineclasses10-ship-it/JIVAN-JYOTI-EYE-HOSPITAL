import React from 'react';
import { CheckCircle2, Printer, Search, Phone, Eye, Copy, ArrowRight, ShieldAlert } from 'lucide-react';
import { Appointment } from '../types';
import { HOSPITAL_DETAILS, generateWhatsAppLink } from '../services/hospitalService';

interface BookingSuccessModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onOpenTracking: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  appointment,
  onClose,
  onOpenTracking,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!appointment) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(appointment.appointmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 print:m-0 print:shadow-none print:border-none print:w-full">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center space-y-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto text-white">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-extrabold font-heading">Appointment Submitted!</h2>
          <p className="text-xs text-emerald-100">
            Your appointment request has been recorded in our hospital system.
          </p>
        </div>

        {/* Receipt Voucher Body */}
        <div className="p-6 space-y-6 print:p-4">
          
          {/* Appointment ID Highlight Box */}
          <div className="p-4 bg-slate-50 border-2 border-dashed border-teal-300 rounded-xl text-center space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Your Unique Appointment ID</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-extrabold text-teal-700 tracking-wider font-mono">
                {appointment.appointmentId}
              </span>
              <button
                onClick={handleCopyId}
                className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors print:hidden"
                title="Copy Appointment ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <span className="text-[10px] text-teal-600 font-semibold block">Copied to clipboard!</span>}
          </div>

          {/* Appointment Details List */}
          <div className="space-y-2.5 text-xs text-slate-700 divide-y divide-slate-100">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Patient Name:</span>
              <span className="font-bold text-slate-900">{appointment.patientName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Mobile Number:</span>
              <span className="font-semibold text-slate-900">{appointment.mobileNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Age & Gender:</span>
              <span className="font-semibold text-slate-900">{appointment.age} Yrs / {appointment.gender}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Selected Doctor:</span>
              <span className="font-bold text-teal-800">{appointment.doctorName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Requested Date & Time:</span>
              <span className="font-semibold text-slate-900">{appointment.preferredDate} ({appointment.preferredTime})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Eye Problem:</span>
              <span className="font-medium text-slate-800 text-right max-w-[200px]">{appointment.eyeProblem}</span>
            </div>
            <div className="flex justify-between py-1 items-center">
              <span className="text-slate-500">Current Status:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                PENDING (Awaiting Admin Review)
              </span>
            </div>
          </div>

          {/* Hospital Address info */}
          <div className="p-3 bg-slate-100 rounded-lg text-[11px] text-slate-600 space-y-0.5">
            <p className="font-bold text-slate-800">{HOSPITAL_DETAILS.name}</p>
            <p>{HOSPITAL_DETAILS.address}</p>
            <p>Phone: {HOSPITAL_DETAILS.phone}</p>
          </div>

          {/* Warning / Instructions */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Next Steps:</span>
            </div>
            <p>
              1. Save or print your <strong>Appointment ID ({appointment.appointmentId})</strong>. <br />
              2. Hospital Admin will verify schedule and accept your appointment. <br />
              3. You can track status anytime on our website using your mobile number.
            </p>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip</span>
            </button>

            <a
              href={generateWhatsAppLink(appointment)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 rounded-lg"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Details</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenTracking();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Track Appointment</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
