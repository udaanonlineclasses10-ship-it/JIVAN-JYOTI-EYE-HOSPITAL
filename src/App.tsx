import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import {
  subscribeToDoctors,
  subscribeToAppointments,
  subscribeToReviews,
  DEFAULT_DOCTORS,
  INITIAL_REVIEWS
} from './services/hospitalService';
import { Doctor, Appointment, PatientReview } from './types';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';

// Modals
import { AppointmentForm } from './components/AppointmentForm';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { TrackAppointment } from './components/TrackAppointment';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  // Real-time Firestore State
  const [doctors, setDoctors] = useState<Doctor[]>(DEFAULT_DOCTORS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<PatientReview[]>(INITIAL_REVIEWS);

  // Auth & Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);

  // Modal Visibility States
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Subscribe to Firebase Auth and Firestore Real-Time Subscriptions
  useEffect(() => {
    // 1. Auth Listener
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdminLoggedIn(true);
        setAdminUser(user);
      } else {
        setIsAdminLoggedIn(false);
        setAdminUser(null);
      }
    });

    // 2. Real-time Doctors
    const unsubscribeDoctors = subscribeToDoctors((docsData) => {
      setDoctors(docsData);
    });

    // 3. Real-time Appointments
    const unsubscribeAppointments = subscribeToAppointments((apptsData) => {
      setAppointments(apptsData);
    });

    // 4. Real-time Reviews
    const unsubscribeReviews = subscribeToReviews((revsData) => {
      setReviews(revsData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDoctors();
      unsubscribeAppointments();
      unsubscribeReviews();
    };
  }, []);

  const handleOpenBooking = (doctorId?: string) => {
    setSelectedDoctorForBooking(doctorId);
    setBookingFormOpen(true);
  };

  const handleBookingSuccess = (appointment: Appointment) => {
    setBookingFormOpen(false);
    setCreatedAppointment(appointment);
  };

  const handleLogoutAdmin = async () => {
    try {
      await signOut(auth);
      setIsAdminLoggedIn(false);
      setAdminDashboardOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Sticky Header / Navbar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenTracking={() => setTrackingOpen(true)}
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* Main Website Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenTracking={() => setTrackingOpen(true)}
        />

        <AboutSection />

        <DoctorsSection
          doctors={doctors}
          onBookDoctor={(docId) => handleOpenBooking(docId)}
        />

        <ServicesSection
          onOpenBooking={() => handleOpenBooking()}
        />

        <ReviewsSection reviews={reviews} />

        <GallerySection />

        <LocationSection />
      </main>

      {/* Hospital Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracking={() => setTrackingOpen(true)}
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
      />

      {/* MODAL 1: Appointment Booking Form */}
      <AppointmentForm
        doctors={doctors}
        selectedDoctorId={selectedDoctorForBooking}
        isOpen={bookingFormOpen}
        onClose={() => setBookingFormOpen(false)}
        onSuccessBooking={handleBookingSuccess}
      />

      {/* MODAL 2: Booking Success Receipt Slip */}
      <BookingSuccessModal
        appointment={createdAppointment}
        onClose={() => setCreatedAppointment(null)}
        onOpenTracking={() => {
          setCreatedAppointment(null);
          setTrackingOpen(true);
        }}
      />

      {/* MODAL 3: Patient Appointment Tracking */}
      <TrackAppointment
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
      />

      {/* MODAL 4: Admin Login */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setAdminLoginOpen(false);
          setAdminDashboardOpen(true);
        }}
      />

      {/* FULLSCREEN DASHBOARD 5: Complete Admin Dashboard */}
      {adminDashboardOpen && (
        <AdminDashboard
          appointments={appointments}
          doctors={doctors}
          reviews={reviews}
          onLogout={handleLogoutAdmin}
          onClose={() => setAdminDashboardOpen(false)}
        />
      )}

    </div>
  );
}
