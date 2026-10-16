import React, { useState, useEffect } from 'react';
import { 
  X, Check, Bed, Users, Maximize, ShieldCheck, Sparkles, 
  ChevronLeft, ChevronRight, Bath, Coffee, Tv, Wifi, Award,
  CheckCircle2, ArrowRight, Phone, Mail, Compass, Layers,
  Calendar, Info, Eye
} from 'lucide-react';
import { Room } from '../../types/hotel';
import { HotelImage } from '../common/HotelImage';
import { JWGriffinStackedLogo } from '../common/BrandLogos';

interface RoomDetailsModalProps {
  room: Room | null;
  onClose: () => void;
  onProceedToBooking: (room: Room) => void;
  currency: string;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  room,
  onClose,
  onProceedToBooking,
  currency,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'bedding' | 'bath' | 'tech' | 'club' | 'policies'>('overview');
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);

  // Lock body scroll while full-screen modal is open & add ESC key listener
  useEffect(() => {
    if (!room) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullGalleryOpen) {
          setIsFullGalleryOpen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [room, onClose, isFullGalleryOpen]);

  // Reset state when room changes
  useEffect(() => {
    setActiveImageIdx(0);
    setActiveTab('overview');
    setIsFullGalleryOpen(false);
  }, [room?.id]);

  if (!room) return null;

  const getMultiplier = (cur: string) => {
    switch (cur) {
      case 'USD': return 2.60;
      case 'EUR': return 2.45;
      case 'GBP': return 2.10;
      case 'SAR': return 9.75;
      case 'AED': return 9.55;
      default: return 1.0;
    }
  };

  const mult = getMultiplier(currency);
  const priceConverted = Math.round(room.pricePerNightOMR * mult);
  const memberPriceConverted = Math.round(room.memberPriceOMR * mult);
  const taxesConverted = Math.round(priceConverted * 0.17);
  const bonvoyPointsEarned = Math.round(room.pricePerNightOMR * 25);

  const scrollToSubSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#fbfaf8] overflow-y-auto flex flex-col text-[#1c1c1c] animate-fadeIn select-none">
      
      {/* =========================================================================
          1. STICKY TOP LUXURY HEADER (Always accessible)
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#242424] text-white shadow-md border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-18 flex items-center justify-between">
          
          {/* Brand Identity & Breadcrumb */}
          <div className="flex items-center space-x-5">
            <JWGriffinStackedLogo />
            <div className="border-l border-stone-700 pl-5 hidden sm:block">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#caa296] font-semibold">
                <span>JW Marriott Hotel Muscat</span>
                <span>•</span>
                <span>Accommodations & Suites</span>
              </div>
              <h1 className="font-serif text-lg lg:text-xl font-medium text-white truncate max-w-lg">
                {room.name}
              </h1>
            </div>
          </div>

          {/* Quick Rate & Close Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col items-end border-r border-stone-700 pr-5">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest">Bonvoy Member Rate</span>
              <div className="font-serif text-xl font-semibold text-white">
                {currency} {memberPriceConverted.toLocaleString()} 
                <span className="text-xs font-normal text-stone-400 ml-1">/ night</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToBooking(room);
              }}
              className="hidden lg:inline-flex px-5 py-2.5 bg-[#4a564c] hover:bg-[#3d473f] text-white text-xs font-bold uppercase tracking-widest transition shadow-sm items-center space-x-1.5 cursor-pointer"
            >
              <span>Reserve Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
              title="Close details (Esc)"
            >
              <X className="w-4 h-4 text-[#caa296]" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* In-Page Sub Navigation Tabs */}
        <div className="bg-[#1c1c1c] border-t border-stone-800/80 px-4 sm:px-6 lg:px-10">
          <div className="max-w-[1440px] mx-auto flex items-center space-x-6 overflow-x-auto no-scrollbar text-xs">
            {[
              { id: 'sec-overview', label: 'Overview' },
              { id: 'sec-gallery', label: 'Photo Gallery' },
              { id: 'sec-specs', label: 'Floor Plan & Dimensions' },
              { id: 'sec-bedding', label: 'Bedding & Sleep' },
              { id: 'sec-bath', label: 'Italian Marble Bath' },
              { id: 'sec-amenities', label: 'In-Room Technology' },
              ...(room.hasLoungeAccess || room.category === 'suite' ? [{ id: 'sec-club', label: 'Executive Lounge Access' }] : []),
              { id: 'sec-policies', label: 'Policies & Guarantees' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSubSection(tab.id)}
                className="py-2.5 text-stone-300 hover:text-white uppercase tracking-wider font-medium text-[11px] whitespace-nowrap transition-colors hover:border-b-2 hover:border-[#caa296]"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. EDITORIAL MULTI-PHOTO SHOWCASE (Luxury Mosaic Header)
         ========================================================================= */}
      <section id="sec-gallery" className="relative w-full bg-[#181818] overflow-hidden border-b border-stone-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          
          {/* Mosaic Grid: 1 Master Photo + 2 Stacked Secondary Photos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[380px] sm:h-[480px] lg:h-[560px]">
            
            {/* Master Photo (Left: 8 cols) */}
            <div 
              onClick={() => setIsFullGalleryOpen(true)}
              className="lg:col-span-8 relative h-full overflow-hidden bg-stone-900 group cursor-pointer shadow-lg"
            >
              <HotelImage
                src={room.images[activeImageIdx] || room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Verified Bed Badge */}
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-white text-xs px-3.5 py-1.5 font-medium border-l-2 border-[#caa296] shadow-md flex items-center space-x-2">
                <Bed className="w-3.5 h-3.5 text-[#caa296]" />
                <span>{room.bedConfig}</span>
              </div>

              {/* Photo Caption */}
              {room.imageCaptions?.[activeImageIdx] && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md text-white text-xs px-3.5 py-2 max-w-lg border border-white/10">
                  {room.imageCaptions[activeImageIdx]}
                </div>
              )}

              {/* Prev / Next Buttons */}
              {room.images.length > 1 && (
                <div className="absolute right-4 bottom-4 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx((prev) => (prev - 1 + room.images.length) % room.images.length);
                    }}
                    className="p-2.5 bg-black/75 hover:bg-black text-white transition rounded-full shadow-md"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIdx((prev) => (prev + 1) % room.images.length);
                    }}
                    className="p-2.5 bg-black/75 hover:bg-black text-white transition rounded-full shadow-md"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Side Photos (Right: 4 cols) */}
            <div className="hidden lg:grid grid-rows-2 gap-3 lg:col-span-4 h-full">
              {room.images.slice(1, 3).map((img, idx) => {
                const targetIdx = idx + 1;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIdx(targetIdx)}
                    className={`relative overflow-hidden bg-stone-900 group cursor-pointer transition-all border-2 ${
                      activeImageIdx === targetIdx ? 'border-[#caa296]' : 'border-transparent opacity-85 hover:opacity-100'
                    }`}
                  >
                    <HotelImage
                      src={img}
                      alt={`${room.name} angle ${targetIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {room.imageCaptions?.[targetIdx] && (
                      <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] truncate bg-black/70 px-2 py-1">
                        {room.imageCaptions[targetIdx]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Photo Toolbar & Full Gallery Button */}
          <div className="mt-3 flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-[#caa296]" />
              <span>Click on any photograph to expand full screen</span>
            </div>

            <button
              type="button"
              onClick={() => setIsFullGalleryOpen(true)}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs tracking-wider uppercase transition cursor-pointer border border-stone-700 flex items-center space-x-2"
            >
              <span>View All {room.images.length} High-Res Photos</span>
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTENT: 2-COLUMN LUXURY EDITORIAL (Content + Sticky Booking Sidebar)
         ========================================================================= */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* =====================================================================
              LEFT COLUMN: Deep Dive Specifications & Editorial Story (8 Cols)
             ===================================================================== */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview & Eyebrow */}
            <section id="sec-overview" className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a87a6d] bg-[#caa296]/15 px-3 py-1 border border-[#caa296]/30">
                  {room.categoryLabel || room.category.toUpperCase()}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-600 font-medium">{room.sqm} m² / {room.sqft} sq ft Sanctuary</span>
                <span className="text-stone-300">•</span>
                <span className="text-emerald-700 font-medium">LEED Gold Certified Building</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium tracking-tight">
                {room.name}
              </h2>

              <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-light">
                {room.description}
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Reflecting Oman’s timeless desert tones and contemporary maritime tranquility, every element has been curated to inspire mindfulness and profound rest. Floor-to-ceiling windows flood the living chamber with natural daylight, framed by motorized blackout drapery for undisturbed sleep.
              </p>
            </section>

            {/* Quick Dimensions & Specifications Card */}
            <section id="sec-specs" className="bg-white border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a87a6d] block">
                    Verified Specifications
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-medium">
                    Floor Plan & Spatial Blueprint
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-serif text-2xl font-bold text-stone-900">{room.sqm} m²</div>
                  <div className="text-xs text-stone-500">{room.sqft} square feet</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-stone-700">
                <div className="space-y-1">
                  <span className="text-stone-400 uppercase text-[10px] block font-semibold">Maximum Guests</span>
                  <strong className="text-stone-900 text-sm block font-serif">{room.maxGuests} Guests</strong>
                  <span className="text-stone-500">{room.maxAdults} Adults, {room.maxChildren} Children</span>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 uppercase text-[10px] block font-semibold">Primary Bed</span>
                  <strong className="text-stone-900 text-sm block font-serif truncate">{room.bedConfig.split('with')[0]}</strong>
                  <span className="text-stone-500">Pillowtop feather bed</span>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 uppercase text-[10px] block font-semibold">Outlook & Orientation</span>
                  <strong className="text-stone-900 text-sm block font-serif truncate">{room.view}</strong>
                  <span className="text-stone-500">Natural light exposure</span>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 uppercase text-[10px] block font-semibold">Balcony / Outdoor</span>
                  <strong className="text-stone-900 text-sm block font-serif">
                    {room.balcony ? 'Private Balcony / Terrace' : 'Soundproof Windows'}
                  </strong>
                  <span className="text-stone-500">Double glazed acoustic glass</span>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 uppercase text-[10px] block font-semibold">Floor Location</span>
                  <strong className="text-stone-900 text-sm block font-serif">{room.floors || 'Floors 1-5'}</strong>
                  <span className="text-stone-500">Elevator access</span>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 uppercase text-[10px] block font-semibold">Smoke-Free Sanctuary</span>
                  <strong className="text-emerald-700 text-sm block font-serif">100% Non-Smoking</strong>
                  <span className="text-stone-500">Pure indoor air filtration</span>
                </div>
              </div>
            </section>

            {/* Pillar 1: Signature Bedding & Rest */}
            <section id="sec-bedding" className="bg-white border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center space-x-3 text-stone-900">
                <div className="w-10 h-10 rounded-full bg-[#caa296]/20 flex items-center justify-center text-[#8c6d46]">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium">Signature Bedding & Restorative Rest</h3>
                  <p className="text-xs text-stone-500">Engineered for profound spinal alignment, airflow, and restful renewal</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>{room.bedConfig}</strong> with tailored pillowtop contouring</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>300-thread-count authentic Egyptian cotton linens</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Hypoallergenic down and feather pillows</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Nightly mindful turndown ritual with calming herbal aroma</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Bedside master lighting controls & quiet nightlights</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>High-performance soundproofing (STC 55 certified acoustic glass)</span>
                </div>
              </div>
            </section>

            {/* Pillar 2: Italian Marble Bathroom */}
            <section id="sec-bath" className="bg-white border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center space-x-3 text-stone-900">
                <div className="w-10 h-10 rounded-full bg-[#caa296]/20 flex items-center justify-center text-[#8c6d46]">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium">Italian Marble Bathroom & Spa Amenities</h3>
                  <p className="text-xs text-stone-500">Expansive private bathroom with standalone soaking tub and rain shower</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
                {room.bathDetails}
              </p>

              <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Deep standalone soaking bathtub with handheld wand</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Glass-enclosed walk-in rainfall shower with thermostatic mixer</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Signature Aromatherapy Associates London bath collection</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Plush velour bathrobes and matching absorbent slippers</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Spacious double vanity with natural Italian marble countertops</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Backlit magnification cosmetic mirror and 2200W ionic hair dryer</span>
                </div>
              </div>
            </section>

            {/* Pillar 3: Technology, Connectivity & Refreshments */}
            <section id="sec-amenities" className="bg-white border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center space-x-3 text-stone-900">
                <div className="w-10 h-10 rounded-full bg-[#caa296]/20 flex items-center justify-center text-[#8c6d46]">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium">In-Room Technology & Conveniences</h3>
                  <p className="text-xs text-stone-500">Seamless connected workspace, entertainment, and culinary station</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>55-inch 4K Smart TV with interactive casting (Chromecast & Apple AirPlay)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>High-speed complimentary Wi-Fi (multi-device business tier)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Nespresso machine with complimentary artisan coffee pods</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Electric kettle with selection of premium herbal and black teas</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Ergonomic work desk with task lighting and international power outlets</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Laptop-sized electronic digital safe with private PIN keypad</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Bedside USB and USB-C fast charging stations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Complimentary bottled mineral water replenished daily</span>
                </div>
              </div>
            </section>

            {/* Pillar 4: Executive Club Lounge (Only if Suite or Executive Room) */}
            {(room.hasLoungeAccess || room.category === 'suite') && (
              <section id="sec-club" className="p-6 sm:p-8 bg-[#fbf9f6] border border-[#e8ded1] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8ded1]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#caa296]/20 flex items-center justify-center text-[#8c6d46]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
                        Complimentary Executive Club Lounge Access
                      </h3>
                      <p className="text-xs text-stone-600">Muscat's largest executive hotel lounge located on the 5th floor</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#caa296] text-white text-[11px] font-bold uppercase tracking-wider self-start sm:self-auto">
                    VIP Inclusion
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
                  <div className="p-4 bg-white border border-[#e8ded1]">
                    <strong className="block text-stone-900 font-semibold mb-1">Private Express Check-In & Check-Out</strong>
                    <span>Skip front desk queues with dedicated 5th floor concierge reception and welcome refreshments.</span>
                  </div>
                  <div className="p-4 bg-white border border-[#e8ded1]">
                    <strong className="block text-stone-900 font-semibold mb-1">Complimentary Deluxe Breakfast Buffet</strong>
                    <span>Served daily in the Club Lounge or Kitchen 7 with live cooking stations and organic dishes.</span>
                  </div>
                  <div className="p-4 bg-white border border-[#e8ded1]">
                    <strong className="block text-stone-900 font-semibold mb-1">Afternoon Tea & Barista Beverages</strong>
                    <span>All-day barista coffee, artisan tea blends, fruit infusions, and afternoon sweet & savory bites.</span>
                  </div>
                  <div className="p-4 bg-white border border-[#e8ded1]">
                    <strong className="block text-stone-900 font-semibold mb-1">Evening Cocktails & Chef Hors d'oeuvres</strong>
                    <span>Two hours of complimentary wines, spirits, cocktails, and warm chef creations from 6:00 PM to 8:00 PM.</span>
                  </div>
                </div>
              </section>
            )}

            {/* Pillar 5: Property Policies & Reservation Guarantees */}
            <section id="sec-policies" className="bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl font-medium text-stone-900 flex items-center space-x-2">
                <Info className="w-5 h-5 text-[#caa296]" />
                <span>Hotel Policies & Guest Guarantees</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div>
                  <strong className="block text-stone-900 font-semibold mb-1.5">Check-In & Check-Out</strong>
                  <p>Check-in: <strong>3:00 PM</strong></p>
                  <p>Check-out: <strong>12:00 PM</strong></p>
                  <p className="text-[11px] text-stone-500 mt-1">Priority early check-in and 4:00 PM late check-out available for Bonvoy Platinum, Titanium & Ambassador members.</p>
                </div>

                <div>
                  <strong className="block text-stone-900 font-semibold mb-1.5">Flexible Cancellation</strong>
                  <p className="text-emerald-700 font-semibold">Free Cancellation up to 24 hours</p>
                  <p>Cancel before 3:00 PM (hotel local time) 1 day prior to arrival with zero penalty charges.</p>
                </div>

                <div>
                  <strong className="block text-stone-900 font-semibold mb-1.5">Resort Inclusions</strong>
                  <p>• Complimentary access to 3 outdoor temperature-controlled pools</p>
                  <p>• 24/7 fitness center and sauna access</p>
                  <p>• Direct skybridge access to OCEC</p>
                </div>
              </div>
            </section>

          </div>

          {/* =====================================================================
              RIGHT COLUMN: STICKY RESERVATION CARD (4 Cols)
             ===================================================================== */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              
              {/* Main Booking Card */}
              <div className="bg-white border border-stone-200 shadow-xl p-6 sm:p-7 space-y-6">
                
                {/* Rate Header */}
                <div className="space-y-1 pb-4 border-b border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#a87a6d]">
                      Marriott Bonvoy Member Rate
                    </span>
                    <span className="text-[10px] bg-[#caa296]/20 text-stone-800 font-semibold px-2 py-0.5 border border-[#caa296]/40">
                      Best Price
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                      {currency} {memberPriceConverted.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-500 font-normal">/ night</span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Standard Flexible Rate: {currency} {priceConverted.toLocaleString()}
                  </div>
                </div>

                {/* Stay Benefits List */}
                <div className="space-y-2.5 text-xs text-stone-700">
                  <div className="flex items-center space-x-2 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Free cancellation until 24h before arrival</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>No deposit required today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>Complimentary high-speed Wi-Fi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>Access to 3 swimming pools & 24/7 fitness center</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#8c6d46]">
                    <Sparkles className="w-4 h-4 text-[#caa296] shrink-0" />
                    <span>Earn <strong>+{bonvoyPointsEarned.toLocaleString()}</strong> Marriott Bonvoy Points</span>
                  </div>
                </div>

                {/* Primary Action Button: Opens Checkout Modal */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onProceedToBooking(room);
                  }}
                  className="w-full py-4 bg-[#4a564c] hover:bg-[#3d473f] text-white text-xs font-bold uppercase tracking-widest transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Select & Reserve This Room</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Secondary Action: Close */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                >
                  Return to Accommodations List
                </button>

                {/* Best Rate Guarantee Shield */}
                <div className="pt-4 border-t border-stone-200 flex items-center space-x-3 text-xs text-stone-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold block text-stone-900">Marriott Best Rate Guarantee</span>
                    <span className="text-[11px] text-stone-500">Book direct with confidence</span>
                  </div>
                </div>

              </div>

              {/* Concierge Assistance Card */}
              <div className="bg-[#f7f6f4] border border-stone-200 p-5 text-xs text-stone-700 space-y-3">
                <div className="font-semibold text-stone-900 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#caa296]" />
                  <span>Need assistance or personal requests?</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Our 24-hour reservations concierge is ready to assist with airport limousine transfers, connecting rooms, or dietary requirements.
                </p>
                <div className="text-[11px] text-stone-800 space-y-1">
                  <div>Direct: <strong>+968 2492 0000</strong></div>
                  <div>Email: <strong>reservations.muscat@marriott.com</strong></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          4. IMMERSIVE FULL-SCREEN LIGHTBOX GALLERY MODAL (When photo is clicked)
         ========================================================================= */}
      {isFullGalleryOpen && (
        <div className="fixed inset-0 z-60 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#caa296]">Photo Gallery</span>
              <h3 className="font-serif text-lg font-medium">{room.name}</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsFullGalleryOpen(false)}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Center */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <HotelImage
              src={room.images[activeImageIdx]}
              alt=""
              className="max-h-[75vh] max-w-full object-contain shadow-2xl"
            />
            {room.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImageIdx((prev) => (prev - 1 + room.images.length) % room.images.length)}
                  className="absolute left-2 sm:left-6 p-3 bg-black/60 hover:bg-black text-white rounded-full transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIdx((prev) => (prev + 1) % room.images.length)}
                  className="absolute right-2 sm:right-6 p-3 bg-black/60 hover:bg-black text-white rounded-full transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption & Thumbnails */}
          <div className="text-white space-y-3">
            {room.imageCaptions?.[activeImageIdx] && (
              <p className="text-center text-xs text-stone-300 max-w-xl mx-auto">
                {room.imageCaptions[activeImageIdx]}
              </p>
            )}
            <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-1">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIdx(i)}
                  className={`w-16 h-12 overflow-hidden border-2 transition ${
                    activeImageIdx === i ? 'border-[#caa296] scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <HotelImage src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. STICKY BOTTOM RESERVATION BAR (On Mobile / Small screens)
         ========================================================================= */}
      <footer className="sticky bottom-0 z-30 lg:hidden bg-white border-t border-stone-200 shadow-2xl py-3 px-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-stone-500 uppercase">Bonvoy Member</div>
          <div className="font-serif text-lg font-bold text-stone-900">
            {currency} {memberPriceConverted.toLocaleString()} <span className="text-xs font-normal">/ night</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
            onProceedToBooking(room);
          }}
          className="px-6 py-2.5 bg-[#4a564c] hover:bg-[#3d473f] text-white text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center space-x-1.5"
        >
          <span>Reserve</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </footer>

    </div>
  );
};
