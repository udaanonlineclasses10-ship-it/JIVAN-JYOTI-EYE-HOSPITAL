import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Doctor, Appointment, PatientReview, HospitalInfo, AppointmentStatus } from '../types';

export const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: 'doc-s-kumar',
    name: 'Dr. S. Kumar',
    title: 'Senior Eye Surgeon',
    qualifications: 'M.S. (Ophthalmology), FICO (UK)',
    experience: '18+ Years Experience',
    roomNo: 'OPD Room 1',
    photo: '/src/assets/images/doctor_consultation_1794228006220.jpg',
    timings: 'Mon - Sat: 09:30 AM - 01:30 PM & 04:30 PM - 07:30 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '04:30 PM', '05:30 PM', '06:30 PM'],
    blockedDates: [],
    isAvailable: true,
    specialization: 'Micro-Incision Cataract Surgery, Phacoemulsification, Refractive Surgery'
  },
  {
    id: 'doc-v-kumar',
    name: 'Dr. V. Kumar',
    title: 'Cornea & Refractive Eye Surgeon',
    qualifications: 'M.S. (Ophthal), Fellowship in Cornea & Refractive',
    experience: '14+ Years Experience',
    roomNo: 'OPD Room 2',
    photo: '/src/assets/images/eye_laser_surgery_1794228006586.jpg',
    timings: 'Mon - Sat: 10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
    blockedDates: [],
    isAvailable: true,
    specialization: 'Corneal Transplantation, LASIK, Glaucoma Management'
  },
  {
    id: 'opt-r-kumar',
    name: 'Opt. R. Kumar',
    title: 'Contact Lens & Vision Specialist',
    qualifications: 'B.Optom, Diploma in Ophthalmic Technology',
    experience: '10+ Years Experience',
    roomNo: 'Vision Clinic 3',
    photo: '/src/assets/images/hospital_hero_banner_1794228006273.jpg',
    timings: 'Mon - Sun: 09:00 AM - 02:00 PM & 03:30 PM - 07:00 PM',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'],
    blockedDates: [],
    isAvailable: true,
    specialization: 'Custom Fitting Contact Lenses, Low Vision Aids, Computer Vision Therapy'
  }
];

export const HOSPITAL_DETAILS: HospitalInfo = {
  name: 'Jivan Jyoti Eye Hospital',
  address: '4RRP+2M8, Sheikhpura, Bihar 811105, India',
  phone: '097097 53293',
  whatsapp: '919709753293',
  emergencyPhone: '097097 53293',
  openingHours: 'Mon - Sat: 09:00 AM - 08:00 PM | Sunday: Emergency Only',
  announcement: 'Advanced Micro-Incision Phaco Cataract Surgery & Laser Vision Correction Available'
};

export const INITIAL_REVIEWS: PatientReview[] = [
  {
    id: 'rev-1',
    patientName: 'Rajesh Kumar Singh',
    rating: 5,
    feedback: 'Extremely satisfied with my mother\'s cataract operation by Dr. S. Kumar. She recovered 6/6 vision within 2 days. Very caring staff and modern equipment in Sheikhpura!',
    treatment: 'Phaco Cataract Surgery',
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'rev-2',
    patientName: 'Anjali Sharma',
    rating: 5,
    feedback: 'Dr. V. Kumar diagnosed my corneal allergy correctly when other clinics failed. Best eye hospital in Sheikhpura district.',
    treatment: 'Corneal Treatment',
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString()
  },
  {
    id: 'rev-3',
    patientName: 'Sunil Prasad',
    rating: 5,
    feedback: 'Opt. R. Kumar fitted my specialized progressive contact lenses perfectly. Great consultation and very neat hospital hygiene.',
    treatment: 'Specialized Contact Lenses',
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString()
  }
];

// Helper to seed initial data in Firestore if empty
export async function seedInitialDataIfEmpty() {
  try {
    const docsSnap = await getDocs(collection(db, 'doctors'));
    if (docsSnap.empty) {
      for (const doctor of DEFAULT_DOCTORS) {
        await setDoc(doc(db, 'doctors', doctor.id), doctor);
      }
    }
    const revSnap = await getDocs(collection(db, 'reviews'));
    if (revSnap.empty) {
      for (const rev of INITIAL_REVIEWS) {
        await setDoc(doc(db, 'reviews', rev.id!), rev);
      }
    }
  } catch (err) {
    console.warn('Initial seed check:', err);
  }
}

// Subscribe to Doctors
export function subscribeToDoctors(callback: (doctors: Doctor[]) => void) {
  const colRef = collection(db, 'doctors');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        // Seed default doctors
        seedInitialDataIfEmpty();
        callback(DEFAULT_DOCTORS);
      } else {
        const doctors: Doctor[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        } as Doctor));
        callback(doctors);
      }
    },
    (error) => {
      console.error('Error fetching doctors:', error);
      callback(DEFAULT_DOCTORS);
    }
  );
}

// Add or Edit Doctor
export async function saveDoctor(doctor: Doctor) {
  try {
    const docRef = doc(db, 'doctors', doctor.id);
    await setDoc(docRef, doctor, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `doctors/${doctor.id}`);
  }
}

// Subscribe to Appointments (Admin)
export function subscribeToAppointments(callback: (appointments: Appointment[]) => void) {
  const colRef = collection(db, 'appointments');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const appointments: Appointment[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      } as Appointment));
      // Sort newest first
      appointments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      callback(appointments);
    },
    (error) => {
      console.error('Error subscribing to appointments:', error);
      callback([]);
    }
  );
}

// Create New Appointment
export async function createAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> {
  try {
    const newAppointment: Appointment = {
      ...appointmentData,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    
    // Check if ID already exists or add to firestore
    const colRef = collection(db, 'appointments');
    await addDoc(colRef, newAppointment);
    return newAppointment;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'appointments');
  }
}

// Check Double Booking
export async function checkDoubleBooking(doctorId: string, date: string, time: string, excludeAppointmentId?: string): Promise<boolean> {
  try {
    const colRef = collection(db, 'appointments');
    const q = query(
      colRef,
      where('doctorId', '==', doctorId),
      where('status', '==', 'CONFIRMED')
    );
    const snap = await getDocs(q);
    
    for (const docSnap of snap.docs) {
      const data = docSnap.data() as Appointment;
      if (data.appointmentId === excludeAppointmentId) continue;
      const apptDate = data.confirmedDate || data.preferredDate;
      const apptTime = data.confirmedTime || data.preferredTime;
      if (apptDate === date && apptTime === time) {
        return true; // Already booked!
      }
    }
    return false;
  } catch (err) {
    console.warn('Double booking check error:', err);
    return false;
  }
}

// Track Appointment by ID and Mobile
export async function trackAppointment(appointmentId: string, mobileNumber: string): Promise<Appointment | null> {
  try {
    const colRef = collection(db, 'appointments');
    const snap = await getDocs(colRef);
    
    const matched = snap.docs.find(docSnap => {
      const data = docSnap.data() as Appointment;
      const cleanInputId = appointmentId.trim().toUpperCase();
      const cleanDocId = (data.appointmentId || '').trim().toUpperCase();
      const cleanInputMobile = mobileNumber.trim().replace(/\D/g, '');
      const cleanDocMobile = (data.mobileNumber || '').trim().replace(/\D/g, '');
      
      return cleanDocId === cleanInputId && (cleanDocMobile.endsWith(cleanInputMobile) || cleanInputMobile.endsWith(cleanDocMobile));
    });

    if (matched) {
      return { id: matched.id, ...matched.data() } as Appointment;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `appointments/${appointmentId}`);
  }
}

// Update Appointment Status (Admin Action)
export async function updateAppointmentStatus(
  docId: string,
  status: AppointmentStatus,
  updates?: {
    confirmedDate?: string;
    confirmedTime?: string;
    adminNotes?: string;
    rejectionReason?: string;
  }
) {
  try {
    const docRef = doc(db, 'appointments', docId);
    await updateDoc(docRef, {
      status,
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `appointments/${docId}`);
  }
}

// Delete Appointment (Admin)
export async function deleteAppointment(docId: string) {
  try {
    await deleteDoc(doc(db, 'appointments', docId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `appointments/${docId}`);
  }
}

// Subscribe to Reviews
export function subscribeToReviews(callback: (reviews: PatientReview[]) => void) {
  const colRef = collection(db, 'reviews');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        seedInitialDataIfEmpty();
        callback(INITIAL_REVIEWS);
      } else {
        const reviews: PatientReview[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        } as PatientReview));
        callback(reviews);
      }
    },
    (error) => {
      console.error('Error fetching reviews:', error);
      callback(INITIAL_REVIEWS);
    }
  );
}

// Submit Patient Review
export async function submitReview(review: Omit<PatientReview, 'id' | 'createdAt' | 'status'>) {
  try {
    const colRef = collection(db, 'reviews');
    await addDoc(colRef, {
      ...review,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'reviews');
  }
}

// Moderate Review (Admin)
export async function updateReviewStatus(reviewId: string, status: 'approved' | 'pending') {
  try {
    const docRef = doc(db, 'reviews', reviewId);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `reviews/${reviewId}`);
  }
}

// Delete Review (Admin)
export async function deleteReview(reviewId: string) {
  try {
    await deleteDoc(doc(db, 'reviews', reviewId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `reviews/${reviewId}`);
  }
}

// Generate WhatsApp Confirmation Link
export function generateWhatsAppLink(appointment: Appointment): string {
  const phone = HOSPITAL_DETAILS.whatsapp;
  const statusMsg = appointment.status === 'CONFIRMED' ? '✅ CONFIRMED' : appointment.status;
  const dateStr = appointment.confirmedDate || appointment.preferredDate;
  const timeStr = appointment.confirmedTime || appointment.preferredTime;
  
  const text = `🏥 *JIVAN JYOTI EYE HOSPITAL - APPOINTMENT DETAILS*
----------------------------------------
*Patient Name:* ${appointment.patientName}
*Appointment ID:* ${appointment.appointmentId}
*Status:* ${statusMsg}
*Doctor:* ${appointment.doctorName}
*Date:* ${dateStr}
*Time:* ${timeStr}
*Hospital Address:* ${HOSPITAL_DETAILS.address}
*Contact:* ${HOSPITAL_DETAILS.phone}

Please arrive 15 minutes prior to your appointment time slot. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
