import React, { useState } from 'react';
import { Eye, Phone, Calendar, Search, ShieldCheck, LogIn, Menu, X, Clock, MapPin } from 'lucide-react';
import { HOSPITAL_DETAILS } from '../services/hospitalService';

interface NavbarProps {
  onOpenBooking: (doctorId?: string) => void;
  onOpenTracking: () => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenTracking,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onOpenAdminDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              Sheikhpura, Bihar 811105
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              Mon - Sat: 09:00 AM - 08:00 PM
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${HOSPITAL_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="font-semibold">{HOSPITAL_DETAILS.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header / Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-heading block leading-tight">
                Jivan Jyoti <span className="text-teal-600">Eye Hospital</span>
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide block">
                Super-Specialty Ophthalmic Care
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#home" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">Home</a>
            <a href="#about" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">About Us</a>
            <a href="#doctors" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">Surgeons & Doctors</a>
            <a href="#services" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">Eye Treatments</a>
            <a href="#reviews" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">Reviews</a>
            <a href="#location" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">Location & Contact</a>
          </nav>

          {/* Action CTAs: Track Appointment & Admin Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenTracking}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Appointment</span>
            </button>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* Prominent Admin Login Button */}
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Admin Dashboard</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-dashed border-slate-300"
                title="Hospital Staff & Doctor Admin Portal"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-600" />
                <span>Admin Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-5 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-3 font-medium text-slate-700 text-sm">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1">About Us</a>
              <a href="#doctors" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1">Surgeons & Doctors</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1">Eye Treatments</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1">Patient Reviews</a>
              <a href="#location" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1">Location & Directions</a>
            </nav>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 text-white font-bold rounded-lg text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Book Online Appointment
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200"
              >
                <Search className="w-4 h-4 text-slate-500" />
                Track My Appointment
              </button>

              {isAdminLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminDashboard();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-teal-50 text-teal-800 font-bold rounded-lg text-xs border border-teal-200"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Admin Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-semibold border border-slate-200"
                >
                  <LogIn className="w-4 h-4 text-teal-600" />
                  Admin Portal Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
