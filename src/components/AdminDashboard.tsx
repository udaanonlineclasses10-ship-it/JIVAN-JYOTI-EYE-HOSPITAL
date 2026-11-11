import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Printer,
  Phone,
  Plus,
  Settings,
  ShieldAlert,
  LogOut,
  ChevronRight,
  UserCheck,
  AlertCircle,
  FileText,
  Star,
  Check,
  X,
  Lock,
  Download,
  Info,
  Sparkles
} from 'lucide-react';
import { Appointment, Doctor, PatientReview, AppointmentStatus } from '../types';
import {
  updateAppointmentStatus,
  deleteAppointment,
  saveDoctor,
  updateReviewStatus,
  deleteReview,
  checkDoubleBooking,
  generateWhatsAppLink,
  HOSPITAL_DETAILS
} from '../services/hospitalService';

interface AdminDashboardProps {
  appointments: Appointment[];
  doctors: Doctor[];
  reviews: PatientReview[];
  onLogout: () => void;
  onClose: () => void;
  onOpenSupabaseConfig?: () => void;
  authProvider?: 'firebase' | 'supabase';
  currentUserEmail?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  appointments,
  doctors,
  reviews,
  onLogout,
  onClose,
  onOpenSupabaseConfig,
  authProvider = 'firebase',
  currentUserEmail
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'doctors' | 'reviews' | 'setup'>('overview');
  
  // Filters for Appointments Table
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [doctorFilter, setDoctorFilter] = useState<string>('all');

  // Modal States
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'accept' | 'reject' | 'notes' | 'delete' | null>(null);
  
  // Action Modal Form Fields
  const [assignedDoctorId, setAssignedDoctorId] = useState('');
  const [assignedDate, setAssignedDate] = useState('');
  const [assignedTime, setAssignedTime] = useState('');
  const [adminNotesText, setAdminNotesText] = useState('');
  const [rejectionReasonText, setRejectionReasonText] = useState('');
  const [doubleBookingError, setDoubleBookingError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Doctor Edit Modal
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isNewDoctor, setIsNewDoctor] = useState(false);

  // Calculate Metrics
  const totalAppts = appointments.length;
  const pendingAppts = appointments.filter((a) => a.status === 'PENDING').length;
  const confirmedAppts = appointments.filter((a) => a.status === 'CONFIRMED').length;
  const rejectedAppts = appointments.filter((a) => a.status === 'REJECTED').length;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppts = appointments.filter((a) => {
    const d = a.confirmedDate || a.preferredDate;
    return d === todayStr;
  }).length;

  // Filtered Appointments List
  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.mobileNumber.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' ? true : a.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' ? true : a.doctorId === doctorFilter;

    return matchesSearch && matchesStatus && matchesDoctor;
  });

  // Open Accept Modal
  const handleOpenAcceptModal = (appt: Appointment) => {
    setSelectedAppt(appt);
    setAssignedDoctorId(appt.doctorId);
    setAssignedDate(appt.preferredDate);
    setAssignedTime(appt.preferredTime);
    setAdminNotesText(appt.adminNotes || '');
    setDoubleBookingError(null);
    setActionModalType('accept');
  };

  // Perform Accept Action with Double Booking Check
  const handleConfirmAccept = async () => {
    if (!selectedAppt || !selectedAppt.id) return;
    setDoubleBookingError(null);

    try {
      setProcessing(true);

      // Verify Double Booking
      const isBooked = await checkDoubleBooking(
        assignedDoctorId,
        assignedDate,
        assignedTime,
        selectedAppt.appointmentId
      );

      if (isBooked) {
        setDoubleBookingError(
          `Double Booking Conflict! The selected doctor already has a confirmed appointment on ${assignedDate} at ${assignedTime}. Please choose a different time slot.`
        );
        setProcessing(false);
        return;
      }

      const assignedDoc = doctors.find((d) => d.id === assignedDoctorId);

      await updateAppointmentStatus(selectedAppt.id, 'CONFIRMED', {
        confirmedDate: assignedDate,
        confirmedTime: assignedTime,
        adminNotes: adminNotesText.trim(),
        ...(assignedDoc ? { doctorId: assignedDoc.id, doctorName: assignedDoc.name } : {})
      });

      setProcessing(false);
      setActionModalType(null);
      setSelectedAppt(null);
    } catch (err) {
      setProcessing(false);
      setDoubleBookingError('Failed to accept appointment. Please try again.');
    }
  };

  // Reject Action
  const handleConfirmReject = async () => {
    if (!selectedAppt || !selectedAppt.id) return;
    try {
      setProcessing(true);
      await updateAppointmentStatus(selectedAppt.id, 'REJECTED', {
        rejectionReason: rejectionReasonText.trim() || 'Schedule full for the requested day.',
        adminNotes: adminNotesText.trim()
      });
      setProcessing(false);
      setActionModalType(null);
      setSelectedAppt(null);
    } catch (err) {
      setProcessing(false);
    }
  };

  // Delete Action
  const handleConfirmDelete = async () => {
    if (!selectedAppt || !selectedAppt.id) return;
    try {
      setProcessing(true);
      await deleteAppointment(selectedAppt.id);
      setProcessing(false);
      setActionModalType(null);
      setSelectedAppt(null);
    } catch (err) {
      setProcessing(false);
    }
  };

  // Quick Status Toggle
  const handleStatusChange = async (docId: string, newStatus: AppointmentStatus) => {
    try {
      await updateAppointmentStatus(docId, newStatus);
    } catch (err) {
      console.error(err);
    }
  };

  // Save Doctor Edit / Create
  const handleSaveDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    try {
      setProcessing(true);
      await saveDoctor(editingDoctor);
      setProcessing(false);
      setEditingDoctor(null);
    } catch (err) {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col overflow-hidden text-slate-800">
      
      {/* Admin Top Navigation Bar */}
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-heading flex items-center gap-2">
              <span>Jivan Jyoti Eye Hospital</span>
              <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full font-sans uppercase">Admin Portal</span>
            </h1>
            <p className="text-xs text-slate-400">Manage OPD Appointments, Doctors, Schedules & Reviews</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border flex items-center gap-1.5 ${
              authProvider === 'supabase'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                : 'bg-teal-950/60 text-teal-300 border-teal-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${authProvider === 'supabase' ? 'bg-emerald-400' : 'bg-teal-400'}`} />
              <span>{authProvider === 'supabase' ? 'Supabase Auth' : 'Firebase Auth'}</span>
            </span>
            {currentUserEmail && (
              <span className="text-xs text-slate-400 hidden md:inline-block font-mono">
                {currentUserEmail}
              </span>
            )}
          </div>

          {onOpenSupabaseConfig && (
            <button
              onClick={onOpenSupabaseConfig}
              className="px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 rounded-lg border border-emerald-800 transition-colors flex items-center gap-1.5"
              title="Configure Supabase Project Settings"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Supabase Settings</span>
            </button>
          )}

          <button
            onClick={onLogout}
            className="px-3.5 py-2 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-lg border border-rose-800 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Return to Hospital Website"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Admin Dashboard Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0 p-4 space-y-2">
          
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-2">Navigation</div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'appointments'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-4 h-4" />
              <span>Appointments</span>
            </div>
            {pendingAppts > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-400 text-slate-950 rounded-full">
                {pendingAppts}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'doctors'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Doctors & Timings</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'reviews'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4" />
              <span>Reviews Moderation</span>
            </div>
            {reviews.filter(r => r.status === 'pending').length > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-400 text-slate-950 rounded-full">
                {reviews.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'setup'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Firebase & Setup Guide</span>
          </button>

          {/* OPD Info Footer inside sidebar */}
          <div className="mt-auto pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 block">Hospital Helpline:</span>
            <span>{HOSPITAL_DETAILS.phone}</span>
            <span className="block text-[10px] text-slate-500">Sheikhpura, Bihar 811105</span>
          </div>

        </aside>

        {/* Main Content Body */}
        <main className="flex-1 bg-slate-100 p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
                    <Users className="w-5 h-5 text-slate-400" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-900 font-heading block">{totalAppts}</span>
                  <span className="text-[11px] text-slate-500">Recorded in database</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-amber-600">
                    <span className="text-xs font-bold uppercase tracking-wider">Pending Action</span>
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-3xl font-extrabold text-amber-600 font-heading block">{pendingAppts}</span>
                  <span className="text-[11px] text-amber-700 font-medium">Awaiting acceptance</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-emerald-600">
                    <span className="text-xs font-bold uppercase tracking-wider">Confirmed</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-3xl font-extrabold text-emerald-600 font-heading block">{confirmedAppts}</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Slots allocated</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-rose-600">
                    <span className="text-xs font-bold uppercase tracking-wider">Rejected</span>
                    <XCircle className="w-5 h-5 text-rose-500" />
                  </div>
                  <span className="text-3xl font-extrabold text-rose-600 font-heading block">{rejectedAppts}</span>
                  <span className="text-[11px] text-rose-700 font-medium">Declined appointments</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-sky-600">
                    <span className="text-xs font-bold uppercase tracking-wider">Today's Visits</span>
                    <CalendarIcon className="w-5 h-5 text-sky-500" />
                  </div>
                  <span className="text-3xl font-extrabold text-sky-600 font-heading block">{todayAppts}</span>
                  <span className="text-[11px] text-sky-700 font-medium">Scheduled for today</span>
                </div>

              </div>

              {/* Quick Actions & Recent Pending */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">Recent Pending Requests</h3>
                    <p className="text-xs text-slate-500">Accept or reject pending patient requests to notify patients</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1"
                  >
                    <span>View All ({appointments.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {pendingAppts === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-xl">
                    No pending appointment requests right now.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {appointments
                      .filter((a) => a.status === 'PENDING')
                      .slice(0, 4)
                      .map((appt) => (
                        <div
                          key={appt.appointmentId}
                          className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-teal-700 font-mono">{appt.appointmentId}</span>
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                                PENDING
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{appt.patientName} ({appt.age} Yrs / {appt.gender})</h4>
                            <p className="text-xs text-slate-600">Phone: {appt.mobileNumber}</p>
                            <p className="text-xs text-teal-800 font-semibold">Doctor: {appt.doctorName}</p>
                            <p className="text-xs text-slate-500">Requested: {appt.preferredDate} ({appt.preferredTime})</p>
                          </div>

                          <div className="pt-2 flex items-center gap-2">
                            <button
                              onClick={() => handleOpenAcceptModal(appt)}
                              className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs"
                            >
                              Accept & Assign
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAppt(appt);
                                setActionModalType('reject');
                              }}
                              className="py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-lg border border-rose-200"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: APPOINTMENTS TABLE */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              
              {/* Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                
                <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search patient name, ID, or mobile number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="all">All Statuses</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>

                  <select
                    value={doctorFilter}
                    onChange={(e) => setDoctorFilter(e.target.value)}
                    className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="all">All Doctors</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Table / Cards List */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Appointment ID</th>
                        <th className="py-3.5 px-4">Patient Info</th>
                        <th className="py-3.5 px-4">Doctor</th>
                        <th className="py-3.5 px-4">Date & Time</th>
                        <th className="py-3.5 px-4">Eye Problem</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            No appointment records match your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((appt) => (
                          <tr key={appt.appointmentId} className="hover:bg-slate-50/80 transition-colors">
                            
                            <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                              {appt.appointmentId}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-900 block">{appt.patientName}</span>
                              <span className="text-[11px] text-slate-500 block">{appt.mobileNumber} · {appt.age}Y ({appt.gender})</span>
                            </td>

                            <td className="py-3.5 px-4 font-semibold text-slate-800">
                              {appt.doctorName}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-bold block text-slate-900">
                                {appt.confirmedDate || appt.preferredDate}
                              </span>
                              <span className="text-[11px] text-teal-700 block font-medium">
                                {appt.confirmedTime || appt.preferredTime}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 max-w-[180px] truncate" title={appt.eyeProblem}>
                              {appt.eyeProblem}
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                                  appt.status === 'CONFIRMED'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : appt.status === 'PENDING'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : appt.status === 'REJECTED'
                                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                    : appt.status === 'COMPLETED'
                                    ? 'bg-teal-100 text-teal-800 border border-teal-300'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {appt.status}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                              
                              {/* Action 1: Accept */}
                              {appt.status !== 'CONFIRMED' && (
                                <button
                                  onClick={() => handleOpenAcceptModal(appt)}
                                  className="px-2.5 py-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded shadow-xs"
                                  title="Accept & Confirm Appointment"
                                >
                                  Accept
                                </button>
                              )}

                              {/* Action 2: View Details */}
                              <button
                                onClick={() => {
                                  setSelectedAppt(appt);
                                  setActionModalType('view');
                                }}
                                className="p-1.5 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded"
                                title="View Patient Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Action 3: WhatsApp Link */}
                              <a
                                href={generateWhatsAppLink(appt)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded inline-block"
                                title="Send WhatsApp Confirmation"
                              >
                                <Phone className="w-4 h-4" />
                              </a>

                              {/* Action 4: Delete */}
                              <button
                                onClick={() => {
                                  setSelectedAppt(appt);
                                  setActionModalType('delete');
                                }}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                                title="Delete Appointment"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>

                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: DOCTORS & SCHEDULE MANAGEMENT */}
          {activeTab === 'doctors' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">Doctors & Availability Management</h3>
                  <p className="text-xs text-slate-500">Edit qualifications, room numbers, working hours, and availability status</p>
                </div>
                <button
                  onClick={() => {
                    setIsNewDoctor(true);
                    setEditingDoctor({
                      id: `doc-${Date.now()}`,
                      name: 'Dr. New Specialist',
                      title: 'Eye Surgeon',
                      qualifications: 'M.S. (Ophthalmology)',
                      experience: '8+ Years Exp',
                      roomNo: 'OPD Room 3',
                      photo: '/src/assets/images/doctor_consultation_1794228006220.jpg',
                      timings: 'Mon - Sat: 10:00 AM - 02:00 PM',
                      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                      timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM'],
                      isAvailable: true
                    });
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Doctor</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                  <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                        <p className="text-xs text-teal-700 font-medium">{doc.title}</p>
                        <p className="text-[10px] text-slate-500">{doc.roomNo}</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p className="font-semibold">{doc.qualifications}</p>
                      <p className="text-[11px] text-slate-500">{doc.timings}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={async () => {
                          await saveDoctor({ ...doc, isAvailable: !doc.isAvailable });
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          doc.isAvailable
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {doc.isAvailable ? 'Available' : 'On Leave'}
                      </button>

                      <button
                        onClick={() => {
                          setIsNewDoctor(false);
                          setEditingDoctor(doc);
                        }}
                        className="px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-heading">Patient Review Moderation</h3>
                <p className="text-xs text-slate-500">Approve patient testimonials before they appear publicly on the website</p>

                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{rev.patientName}</span>
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                            {rev.rating} ★ ({rev.treatment})
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${rev.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {rev.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 italic font-medium">"{rev.feedback}"</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {rev.status === 'pending' && (
                          <button
                            onClick={() => updateReviewStatus(rev.id!, 'approved')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(rev.id!)}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg border border-rose-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FIREBASE SETUP GUIDE */}
          {activeTab === 'setup' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 text-teal-700">
                  <Settings className="w-6 h-6" />
                  <h3 className="text-lg font-bold font-heading">Firebase Project Deployment & Setup Guide</h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  This application is currently live and provisioned with Firebase Firestore, Auth, and Storage. Below are instructions for exporting or connecting your own standalone Firebase project.
                </p>

                <div className="space-y-4 text-xs text-slate-700">
                  
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Step 1: Create Firebase Project</h4>
                    <p>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-teal-700 underline font-bold">Firebase Console</a>, click "Add Project", and name it (e.g. <code>jivan-jyoti-eye-hospital</code>).</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Step 2: Enable Firebase Products</h4>
                    <p>1. <strong>Authentication</strong>: Go to Build &gt; Authentication &gt; Sign-in method &gt; Enable Email/Password and Google.<br />
                    2. <strong>Cloud Firestore</strong>: Go to Build &gt; Firestore Database &gt; Create Database.<br />
                    3. <strong>Firebase Storage</strong>: Enable Storage bucket for doctor photo uploads.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Step 3: Deploy Firestore Security Rules</h4>
                    <p>Copy the contents of <code>firestore.rules</code> from the codebase into Firebase Console &gt; Firestore &gt; Rules and click <strong>Publish</strong>.</p>
                  </div>

                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ACTION MODAL: ACCEPT APPOINTMENT */}
      {actionModalType === 'accept' && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">Accept & Confirm Appointment</h3>
              <button onClick={() => setActionModalType(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {doubleBookingError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{doubleBookingError}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="font-bold block text-slate-900">{selectedAppt.patientName} ({selectedAppt.appointmentId})</span>
                <span className="text-slate-500">Requested: {selectedAppt.preferredDate} @ {selectedAppt.preferredTime}</span>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Assign Doctor</label>
                <select
                  value={assignedDoctorId}
                  onChange={(e) => setAssignedDoctorId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.title})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Confirmed Date</label>
                  <input
                    type="date"
                    value={assignedDate}
                    onChange={(e) => setAssignedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">Confirmed Time Slot</label>
                  <select
                    value={assignedTime}
                    onChange={(e) => setAssignedTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  >
                    {doctors.find(d => d.id === assignedDoctorId)?.timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Admin Notes (Visible to Patient)</label>
                <input
                  type="text"
                  placeholder="e.g. Please bring past medical reports & dilation drops will be administered."
                  value={adminNotesText}
                  onChange={(e) => setAdminNotesText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                />
              </div>

            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActionModalType(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAccept}
                disabled={processing}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm"
              >
                {processing ? 'Checking Conflicts...' : 'Confirm & Accept Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTION MODAL: VIEW DETAILS */}
      {actionModalType === 'view' && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">Patient Details Card</h3>
                <span className="text-xs font-mono font-bold text-teal-700">{selectedAppt.appointmentId}</span>
              </div>
              <button onClick={() => setActionModalType(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700 divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-900">{selectedAppt.patientName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Mobile Number:</span>
                <span className="font-bold text-slate-900">{selectedAppt.mobileNumber}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Age & Gender:</span>
                <span className="font-medium">{selectedAppt.age} Yrs / {selectedAppt.gender}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Selected Doctor:</span>
                <span className="font-bold text-teal-800">{selectedAppt.doctorName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Eye Concern:</span>
                <span className="font-medium text-slate-800 text-right max-w-[220px]">{selectedAppt.eyeProblem}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Requested Date & Time:</span>
                <span>{selectedAppt.preferredDate} ({selectedAppt.preferredTime})</span>
              </div>
              {selectedAppt.confirmedDate && (
                <div className="flex justify-between py-1 font-bold text-emerald-800">
                  <span>Confirmed Date & Time:</span>
                  <span>{selectedAppt.confirmedDate} @ {selectedAppt.confirmedTime}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-between items-center">
              <a
                href={generateWhatsAppLink(selectedAppt)}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Patient</span>
              </a>
              <button
                onClick={() => setActionModalType(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTION MODAL: DELETE CONFIRMATION */}
      {actionModalType === 'delete' && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-heading text-rose-600">Delete Appointment?</h3>
            <p className="text-xs text-slate-600">
              Are you sure you want to permanently delete appointment <strong>{selectedAppt.appointmentId}</strong> for {selectedAppt.patientName}? This action cannot be undone.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setActionModalType(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={processing}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg"
              >
                {processing ? 'Deleting...' : 'Delete Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCTOR EDIT MODAL */}
      {editingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {isNewDoctor ? 'Add New Doctor' : 'Edit Doctor Details'}
              </h3>
              <button onClick={() => setEditingDoctor(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoctorSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Doctor Full Name</label>
                <input
                  type="text"
                  required
                  value={editingDoctor.name}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Title / Specialty</label>
                  <input
                    type="text"
                    required
                    value={editingDoctor.title}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">OPD Room No</label>
                  <input
                    type="text"
                    required
                    value={editingDoctor.roomNo}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, roomNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Qualifications</label>
                <input
                  type="text"
                  required
                  value={editingDoctor.qualifications}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, qualifications: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">OPD Timings Text</label>
                <input
                  type="text"
                  required
                  value={editingDoctor.timings}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, timings: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDoctor(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Doctor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
