import React, { useState, useEffect } from 'react';
import { JWGriffinStackedLogo } from './BrandLogos';

interface MarriottNavbarProps {
  currency?: string;
  onChangeCurrency?: (cur: string) => void;
  language?: string;
  onChangeLanguage?: (lang: string) => void;
  onOpenReviews?: () => void;
  onOpenGallery?: () => void;
}

export const MarriottNavbar: React.FC<MarriottNavbarProps> = ({
  onOpenGallery,
}) => {
  const [activeSection, setActiveSection] = useState('accommodations');
  const isClickingRef = React.useRef(false);

  const navItems = [
    { id: 'accommodations', label: 'Accommodations', targetId: 'accommodations-section', isGallery: false },
    { id: 'dinner', label: 'Dinner', targetId: 'dining-section', isGallery: false },
    { id: 'suites', label: 'Suites', targetId: 'suites-section', isGallery: false },
    { id: 'experiences', label: 'Experiences', targetId: 'experiences-section', isGallery: false },
    { id: 'gallery', label: 'Gallery', targetId: 'gallery-section', isGallery: true },
  ];

  React.useEffect(() => {
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

  const scrollToSection = (targetId: string, isGallery?: boolean) => {
    if (isGallery) {
      if (onOpenGallery) onOpenGallery();
      const el = document.getElementById('gallery-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 76;
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
    <header className="sticky top-0 z-40 bg-[#303030] text-white shadow-sm select-none">
      {/* =========================================================================
          TOP MAIN HEADER (#303030)
          - Left: Stacked JW Griffin Logo
          - Middle: Only 5 navigation buttons centered in middle in small font
          - Active item has warm peach underline bar (#caa296)
          - Right: View Rates button / spacer
         ========================================================================= */}
      <div className="w-full max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-14">
        <div className="flex items-center justify-between h-[72px]">
          {/* Left: Stacked JW Marriott Griffin Logo */}
          <div className="w-[180px] shrink-0 flex items-center justify-start z-10">
            <JWGriffinStackedLogo
              onClick={() => scrollToSection('accommodations-section')}
            />
          </div>

          {/* Middle: ONLY 5 Nav Buttons Centered in Middle in Small Font */}
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 lg:space-x-8 h-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.id);
                    scrollToSection(item.targetId, item.isGallery);
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

          {/* Right Spacer for balanced centering */}
          <div className="w-[180px] shrink-0 hidden md:block pointer-events-none" />
        </div>
      </div>

      {/* Mobile Horizontal Nav Bar for small screens */}
      <div className="md:hidden overflow-x-auto no-scrollbar border-t border-stone-700 bg-[#303030] px-4 py-2 flex items-center justify-center space-x-5">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveSection(item.id);
                scrollToSection(item.targetId, item.isGallery);
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
      </div>
    </header>
  );
};
