import React, { useState, useEffect } from 'react';
import { Receipt } from 'lucide-react';
import { JWGriffinStackedLogo } from '../common/BrandLogos';
import { BookingState, Room } from '../../types/hotel';

interface HotelHeaderHeroBookingProps {
  bookingState: BookingState;
  onUpdateBooking: (state: BookingState) => void;
  currency: string;
  onChangeCurrency: (cur: string) => void;
  language: string;
  onChangeLanguage: (lang: string) => void;
  onOpenGallery: () => void;
  onOpenReviews: () => void;
  onProceedToBooking?: (room: Room) => void;
  onViewRates?: () => void;
}

export const HotelHeaderHeroBooking: React.FC<HotelHeaderHeroBookingProps> = ({
  onOpenGallery,
  onViewRates,
}) => {
  const [activeSection, setActiveSection] = useState('accommodations');

  const navItems = [
    { id: 'accommodations', label: 'Accommodations', targetId: 'accommodations-section' },
    { id: 'dinner', label: 'Dinner', targetId: 'dining-section' },
    { id: 'suites', label: 'Suites', targetId: 'suites-section' },
    { id: 'experiences', label: 'Experiences', targetId: 'experiences-section' },
    { id: 'gallery', label: 'Gallery', targetId: 'gallery-section', isGalleryAction: true },
  ];

  const isClickingRef = React.useRef(false);

  // Scroll spy to update active section in header based on actual page order
  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;

      const scrollPosition = window.scrollY + 140;

      // Map nav items to their actual DOM positions and sort by vertical position on page
      const sectionPositions = navItems
        .map((item) => {
          const el = document.getElementById(item.targetId);
          if (!el) return null;
          const top = el.getBoundingClientRect().top + window.scrollY;
          return { id: item.id, top };
        })
        .filter((sec): sec is { id: string; top: number } => sec !== null)
        .sort((a, b) => a.top - b.top);

      if (sectionPositions.length === 0) return;

      // Find the active section based on current scroll position
      let currentActive = 'accommodations';
      for (let i = sectionPositions.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionPositions[i].top - 60) {
          currentActive = sectionPositions[i].id;
          break;
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetId: string, isGalleryAction?: boolean) => {
    if (isGalleryAction) {
      onOpenGallery();
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 76; // 72px fixed header + 4px margin
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navOffset);
      
      isClickingRef.current = true;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setTimeout(() => {
        isClickingRef.current = false;
      }, 700);
    }
  };

  return (
    <div className="w-full relative z-30 select-none">
      {/* =========================================================================
          TOP MAIN HEADER (#303030) - ALWAYS VISIBLE SCROLLING DOWN & UP
          - Left: Stacked JW Griffin Logo + "JW MARRIOTT" in white
          - Middle: Only 5 navigation buttons centered in middle in small font
          - Active item has warm peach underline bar (#caa296)
          - Right: "View Rates" luxury CTA button
         ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#303030] text-white shadow-md transition-all duration-300">
        <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
          <div className="flex items-center justify-between h-[72px]">
            {/* Left: Stacked JW Marriott Griffin Logo */}
            <div className="w-[180px] shrink-0 flex items-center justify-start z-10">
              <JWGriffinStackedLogo
                onClick={() => scrollToSection('accommodations-section')}
              />
            </div>

            {/* Middle: ONLY 5 Nav Buttons Centered in Middle in Small Font Size */}
            <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 lg:space-x-8 h-full">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id);
                      scrollToSection(item.targetId, item.isGalleryAction);
                    }}
                    className="relative h-full flex flex-col justify-center items-center px-1 text-[11.5px] lg:text-[12px] cursor-pointer select-none group tracking-wide uppercase font-sans"
                  >
                    <span
                      className={`transition-colors ${
                        isActive
                          ? 'text-white font-medium'
                          : 'text-[#d6d6d6] hover:text-white font-normal'
                      }`}
                    >
                      {item.label}
                    </span>
                    {/* Active Peach Line Underline */}
                    {isActive && (
                      <span className="absolute bottom-[14px] left-0 right-0 h-[2.5px] bg-[#caa296] transition-all duration-300" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Direct shortcut to My Bookings & Reports */}
            <div className="w-[180px] shrink-0 hidden md:flex items-center justify-end">
              <button
                type="button"
                onClick={() => scrollToSection('bookings-section')}
                className="flex items-center space-x-1.5 text-[11px] font-sans font-medium uppercase tracking-wider text-[#caa296] hover:text-white transition-colors cursor-pointer border border-[#caa296]/50 hover:border-white px-3 py-1.5"
                title="View Bookings & Payment Reports"
              >
                <Receipt className="w-3.5 h-3.5 text-[#caa296]" />
                <span>My Bookings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Nav Bar for small screens */}
        <div className="md:hidden overflow-x-auto no-scrollbar border-t border-stone-700 bg-[#303030] px-4 py-2 flex items-center justify-start space-x-5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveSection(item.id);
                  scrollToSection(item.targetId, item.isGalleryAction);
                }}
                className={`relative pb-1 text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors ${
                  isActive ? 'text-white font-medium' : 'text-stone-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#caa296]" />
                )}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => scrollToSection('bookings-section')}
            className="pb-1 text-[11px] uppercase tracking-wider whitespace-nowrap text-[#caa296] font-semibold flex items-center space-x-1"
          >
            <Receipt className="w-3 h-3 text-[#caa296]" />
            <span>Bookings</span>
          </button>
        </div>
      </header>

      {/* Spacer to push down normal page flow below the fixed 72px header */}
      <div className="h-[96px] md:h-[72px] shrink-0" />
    </div>
  );
};
