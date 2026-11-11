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

// 2026 Redesigned Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SpecialitiesSection } from './components/SpecialitiesSection';
import { DoctorsSection } from './components/DoctorsSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { OpdTimingsSection } from './components/OpdTimingsSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';

// Modals & Dashboard
import { AppointmentForm } from './components/AppointmentForm';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { TrackAppointment } from './components/TrackAppointment';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { supabase, isSupabaseConfigured } from './lib/supabase';

export default function App() {
  // Real-time Firestore State
  const [doctors, setDoctors] = useState<Doctor[]>(DEFAULT_DOCTORS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<PatientReview[]>(INITIAL_REVIEWS);

  // Auth & Admin State (Only authorized admin can access dashboard)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [authProvider, setAuthProvider] = useState<'firebase' | 'supabase'>('firebase');

  // Modal Visibility States
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [supabaseConfigOpen, setSupabaseConfigOpen] = useState(false);

  // Subscribe to Firebase Auth and Firestore Real-Time Subscriptions
  useEffect(() => {
    // 1. Firebase Auth Listener
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdminLoggedIn(true);
        setAdminUser(user);
        setAuthProvider('firebase');
      } else if (authProvider === 'firebase') {
        setIsAdminLoggedIn(false);
        setAdminUser(null);
      }
    });

    // 2. Supabase Auth Listener (if configured)
    let supabaseSubscription: { unsubscribe: () => void } | null = null;
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setIsAdminLoggedIn(true);
          setAdminUser(session.user);
          setAuthProvider('supabase');
        } else if (authProvider === 'supabase') {
          setIsAdminLoggedIn(false);
          setAdminUser(null);
        }
      });
      supabaseSubscription = data.subscription;
    }

    // 3. Real-time Doctors subscription
    const unsubscribeDoctors = subscribeToDoctors((docsData) => {
      setDoctors(docsData);
    });

    // 4. Real-time Appointments subscription
    const unsubscribeAppointments = subscribeToAppointments((apptsData) => {
      setAppointments(apptsData);
    });

    // 5. Real-time Reviews subscription
    const unsubscribeReviews = subscribeToReviews((revsData) => {
      setReviews(revsData);
    });

    return () => {
      unsubscribeAuth();
      if (supabaseSubscription) supabaseSubscription.unsubscribe();
      unsubscribeDoctors();
      unsubscribeAppointments();
      unsubscribeReviews();
    };
  }, [authProvider]);

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
      if (authProvider === 'supabase' && supabase) {
        await supabase.auth.signOut();
      } else {
        await signOut(auth);
      }
      setIsAdminLoggedIn(false);
      setAdminUser(null);
      setAdminDashboardOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white antialiased">
      
      {/* 1. Header with hospital logo and navigation + Admin Login */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenTracking={() => setTrackingOpen(true)}
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* Main Website Flow */}
      <main className="flex-1">
        
        {/* 2. Hero Section with Book and Track buttons */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenTracking={() => setTrackingOpen(true)}
        />

        {/* 3. About Our Hospital */}
        <AboutSection />

        {/* 4. Our Specialities Section */}
        <SpecialitiesSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 5. Our Expert Doctors */}
        <DoctorsSection
          doctors={doctors}
          onBookDoctor={(docId) => handleOpenBooking(docId)}
        />

        {/* 6. Advanced Eye Treatment & Surgeries */}
        <TreatmentsSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 7. Why Choose Us */}
        <WhyChooseUsSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 8. Hospital Gallery */}
        <GallerySection />

        {/* 9. Patient Reviews & Testimonials */}
        <ReviewsSection reviews={reviews} />

        {/* 10. Hospital OPD Timings */}
        <OpdTimingsSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 11. Google Maps Location & WhatsApp Section */}
        <LocationSection
          onOpenBooking={() => handleOpenBooking()}
        />

      </main>

      {/* 12. Professional Footer */}
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

      {/* MODAL 4: Secure Admin Login */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onOpenSupabaseConfig={() => setSupabaseConfigOpen(true)}
        onLoginSuccess={(provider, userDetails) => {
          setAuthProvider(provider);
          setAdminUser(userDetails);
          setIsAdminLoggedIn(true);
          setAdminLoginOpen(false);
          setAdminDashboardOpen(true);
        }}
      />

      {/* MODAL 5: Supabase Configuration */}
      <SupabaseConfigModal
        isOpen={supabaseConfigOpen}
        onClose={() => setSupabaseConfigOpen(false)}
        onConfigSaved={() => {
          // Trigger recheck
        }}
      />

      {/* FULLSCREEN DASHBOARD 6: Complete Advanced Admin Dashboard */}
      {adminDashboardOpen && (
        <AdminDashboard
          appointments={appointments}
          doctors={doctors}
          reviews={reviews}
          authProvider={authProvider}
          currentUserEmail={adminUser?.email}
          onOpenSupabaseConfig={() => setSupabaseConfigOpen(true)}
          onLogout={handleLogoutAdmin}
          onClose={() => setAdminDashboardOpen(false)}
        />
      )}

    </div>
  );
}
