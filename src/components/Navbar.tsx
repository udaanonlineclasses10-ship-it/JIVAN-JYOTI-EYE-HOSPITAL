import React, { useState, useEffect } from 'react';
import { Eye, Phone, Calendar, Search, ShieldCheck, LogIn, Menu, X, Clock, MapPin, ChevronRight, Sparkles } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Premium Top Micro-Bar (Deep Navy Blue #091322) */}
      <div className="bg-[#091322] text-slate-300 text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Location & Hours */}
          <div className="flex items-center gap-4 flex-wrap text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-teal-300 font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>4RRP+2M8, Sheikhpura, Bihar 811105</span>
            </span>
            <span className="hidden md:inline-block text-slate-700">·</span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>OPD: Mon – Sat 9:00 AM – 8:00 PM</span>
            </span>
          </div>

          {/* Right: Emergency Line & Quick Track */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0 text-xs">
            <a
              href={`tel:${HOSPITAL_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-teal-300 transition-colors font-semibold group"
            >
              <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                <Phone className="w-3 h-3" />
              </div>
              <span className="font-mono tracking-tight">{HOSPITAL_DETAILS.phone}</span>
            </a>

            <div className="hidden lg:flex items-center gap-1 text-[11px] text-teal-300/80 bg-teal-950/60 border border-teal-800/50 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>Govt. Reg. Super-Specialty Eye Hospital</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Sticky Navigation Bar with Clean 2026 Glass Effect */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-md border-b border-slate-200/80 py-3' 
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3.5 shrink-0 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#091322] via-[#0d2a4a] to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-900/10 group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2] text-teal-300" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#091322] font-heading block leading-none">
                JIVAN JYOTI <span className="text-teal-600 font-bold">EYE HOSPITAL</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wider uppercase block mt-1">
                Advanced Ophthalmology & Laser Center
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700">
            <a href="#home" className="hover:text-teal-600 transition-colors whitespace-nowrap">Home</a>
            <a href="#about" className="hover:text-teal-600 transition-colors whitespace-nowrap">About Us</a>
            <a href="#specialities" className="hover:text-teal-600 transition-colors whitespace-nowrap">Specialities</a>
            <a href="#doctors" className="hover:text-teal-600 transition-colors whitespace-nowrap">Our Doctors</a>
            <a href="#treatments" className="hover:text-teal-600 transition-colors whitespace-nowrap">Treatments</a>
            <a href="#why-choose-us" className="hover:text-teal-600 transition-colors whitespace-nowrap">Why Choose Us</a>
            <a href="#reviews" className="hover:text-teal-600 transition-colors whitespace-nowrap">Reviews</a>
            <a href="#location" className="hover:text-teal-600 transition-colors whitespace-nowrap">Location</a>
          </nav>

          {/* Action CTAs: Track Appointment, Book Appointment, & Admin Button */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Track Appointment */}
            <button
              onClick={onOpenTracking}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 rounded-lg transition-colors border border-slate-200/80"
              title="Track existing appointment status"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline">Track</span>
              <span>Status</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 rounded-lg shadow-sm shadow-teal-600/20 hover:shadow-md transition-all active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* Header Admin Login / Dashboard Button */}
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#091322] bg-teal-50 border border-teal-200 hover:bg-teal-100 rounded-lg transition-colors shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span className="hidden md:inline">Admin</span> Dashboard
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#091322] hover:bg-slate-100 rounded-lg transition-colors border border-dashed border-slate-300"
                title="Hospital Staff & Doctor Admin Portal"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-600" />
                <span>Admin Login</span>
              </button>
            )}

          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-teal-600 rounded-lg"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-6 space-y-4 shadow-xl animate-fadeIn">
            <nav className="flex flex-col space-y-3 font-semibold text-slate-800 text-sm">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1.5 flex items-center justify-between">
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1.5 flex items-center justify-between">
                <span>About Our Hospital</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#specialities" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1.5 flex items-center justify-between">
                <span>Eye Specialities</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#doctors" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1.5 flex items-center justify-between">
                <span>Our Specialist Doctors</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#treatments" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1.5 flex items-center justify-between">
                <span>Advanced Treatments</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#why-choose-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1.5 flex items-center justify-between">
                <span>Why Choose Us</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1.5 flex items-center justify-between">
                <span>Patient Reviews</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#location" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-600 py-1.5 flex items-center justify-between">
                <span>Hospital Location & Map</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </nav>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-xl text-sm shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Online Appointment</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracking();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs border border-slate-200"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Track My Appointment</span>
              </button>

              {isAdminLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminDashboard();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#091322] text-teal-400 font-bold rounded-xl text-xs shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Admin Dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-semibold border border-slate-200"
                >
                  <LogIn className="w-4 h-4 text-teal-600" />
                  <span>Admin Portal Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
