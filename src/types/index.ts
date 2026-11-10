export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  experience: string;
  roomNo: string;
  photo: string;
  timings: string;
  availableDays: string[];
  timeSlots: string[];
  blockedDates?: string[];
  isAvailable: boolean;
  specialization?: string;
}

export interface Appointment {
  id?: string;
  appointmentId: string;
  patientName: string;
  mobileNumber: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  doctorId: string;
  doctorName: string;
  eyeProblem: string;
  preferredDate: string;
  preferredTime: string;
  additionalMessage?: string;
  status: AppointmentStatus;
  confirmedDate?: string;
  confirmedTime?: string;
  adminNotes?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PatientReview {
  id?: string;
  patientName: string;
  rating: number;
  feedback: string;
  treatment: string;
  status: 'approved' | 'pending';
  createdAt: string;
}

export interface HospitalInfo {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  emergencyPhone: string;
  openingHours: string;
  announcement?: string;
}
