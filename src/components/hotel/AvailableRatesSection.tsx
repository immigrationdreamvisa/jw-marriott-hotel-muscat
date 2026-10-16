import React, { useState, useEffect } from 'react';
import { 
  Bed, Users, Maximize, ArrowRight, ShieldCheck, 
  Sparkles, Eye, Calendar, Tag, Award, Info, X,
  Check, ChevronDown, CheckCircle2, SlidersHorizontal, AlertCircle
} from 'lucide-react';
import { ROOMS_DATA } from '../../data/jwMarriottMuscatData';
import { Room, BookingState } from '../../types/hotel';
import { HotelImage } from '../common/HotelImage';

interface AvailableRatesSectionProps {
  bookingState: BookingState;
  currency: string;
  onProceedToBooking: (room: Room) => void;
  onViewRoomDetails: (room: Room) => void;
  onModifyDates?: () => void;
  onCloseRates?: () => void;
  onUpdateBooking?: (state: BookingState) => void;
}

export const AvailableRatesSection: React.FC<AvailableRatesSectionProps> = ({
  bookingState,
  currency,
  onProceedToBooking,
  onViewRoomDetails,
  onCloseRates,
  onUpdateBooking,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'rooms' | 'suites'>('all');
  const [isEditingStay, setIsEditingStay] = useState(false);
  const [editCheckIn, setEditCheckIn] = useState(bookingState.checkIn);
  const [editCheckOut, setEditCheckOut] = useState(bookingState.checkOut);
  const [editRooms, setEditRooms] = useState(bookingState.rooms || 1);
  const [editAdults, setEditAdults] = useState(bookingState.adults || 1);
  const [editChildren, setEditChildren] = useState(bookingState.children || 0);
  const [editRateType, setEditRateType] = useState<string>(bookingState.rateType || 'standard');
  const [isRefreshingRates, setIsRefreshingRates] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState<string | null>(null);

  useEffect(() => {
    setEditCheckIn(bookingState.checkIn);
    setEditCheckOut(bookingState.checkOut);
    setEditRooms(bookingState.rooms || 1);
    setEditAdults(bookingState.adults || 1);
    setEditChildren(bookingState.children || 0);
    setEditRateType(bookingState.rateType || 'standard');
  }, [bookingState]);

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

  const calculateNights = (inDate?: string, outDate?: string) => {
    try {
      if (!inDate || !outDate) return 1;
      const d1 = new Date(inDate);
      const d2 = new Date(outDate);
      const diff = d2.getTime() - d1.getTime();
      const n = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return isNaN(n) || n <= 0 ? 1 : n;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights(bookingState.checkIn, bookingState.checkOut);
  const roomsCount = bookingState.rooms || 1;

  const formatDateDisplay = (dateStr?: string) => {
    if (!dateStr) return 'Oct 14';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filterCategory === 'rooms') {
      return room.category === 'deluxe' || room.category === 'premium' || room.category === 'executive';
    }
    if (filterCategory === 'suites') {
      return room.category === 'suite';
    }
    return true;
  });

  const isMemberRate = bookingState.rateType === 'member';

  return (
    <section id="availability-section" className="py-16 bg-[#f7f6f4] border-b border-stone-200 scroll-section-offset relative animate-fadeIn scroll-mt-24 md:scroll-mt-20">
      {/* Anchor for backward compatibility */}
      <div id="available-rates-section" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* =========================================================================
            SECTION HEADER & LIVE STAY SUMMARY BAR
           ========================================================================= */}
        <div className="bg-white p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 bg-[#caa296]/20 text-stone-900 text-[10px] font-bold uppercase tracking-widest border border-[#caa296]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#caa296] mr-1.5 animate-pulse" />
                  Live Room Availability & Details
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
                  JW Marriott Hotel Muscat
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-medium">
                Hotel Rooms Availability & Details
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Explore real-time room availability, authentic bed & sofa bed configurations, dimensions, views, and live rates. Click <strong className="text-stone-900">View Details</strong> on any room to inspect full-screen specifications, photography, floor plans, and amenities.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              {/* Best Rate Guarantee Badge */}
              <div className="flex items-center space-x-3 bg-stone-50 px-4 py-3 border border-stone-200 text-xs text-stone-700">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-semibold block text-stone-900">Best Rate Guarantee</span>
                  <span className="text-stone-500 text-[11px]">Free Wi-Fi • Marriott Bonvoy Points</span>
                </div>
              </div>

              {onCloseRates && (
                <button
                  type="button"
                  onClick={onCloseRates}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-black text-white hover:text-[#caa296] border border-stone-700 transition cursor-pointer flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider shadow-sm"
                  title="Close available rooms"
                >
                  <X className="w-4 h-4 text-[#caa296]" />
                  <span>Close</span>
                </button>
              )}
            </div>
          </div>

          {/* Stay Parameter Chips & Edit Toggle */}
          <div className="pt-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-stone-100 text-stone-800 font-medium border border-stone-200">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>
                  {formatDateDisplay(bookingState.checkIn)} → {formatDateDisplay(bookingState.checkOut)} ({nights} {nights === 1 ? 'Night' : 'Nights'})
                </span>
              </div>

              <div className="flex items-center space-x-2 px-3 py-1.5 bg-stone-100 text-stone-800 font-medium border border-stone-200">
                <Users className="w-3.5 h-3.5 text-stone-500" />
                <span>
                  {roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}, {bookingState.adults || 1} {(bookingState.adults || 1) === 1 ? 'Adult' : 'Adults'}
                  {(bookingState.children || 0) > 0 ? `, ${bookingState.children} Children` : ''}
                </span>
              </div>

              <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#caa296]/15 text-stone-900 font-medium border border-[#caa296]/40">
                <Tag className="w-3.5 h-3.5 text-[#a87a6d]" />
                <span className="capitalize">
                  {bookingState.rateType === 'member' 
                    ? 'Marriott Bonvoy Member Rate' 
                    : bookingState.rateType === 'senior'
                    ? 'Senior Discount (62+)'
                    : bookingState.rateType === 'gov'
                    ? 'Government & Military'
                    : 'Lowest Regular Rate'}
                </span>
              </div>

              {/* Edit Dates Toggle Button */}
              <button
                type="button"
                onClick={() => setIsEditingStay(!isEditingStay)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white font-medium text-xs transition cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#caa296]" />
                <span>{isEditingStay ? 'Hide Date Editor' : 'Change Dates / Guests'}</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-1.5 bg-stone-100 p-1 border border-stone-200">
              <button
                type="button"
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1 text-xs font-medium transition cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Accommodations ({ROOMS_DATA.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('rooms')}
                className={`px-3 py-1 text-xs font-medium transition cursor-pointer ${
                  filterCategory === 'rooms'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Guest Rooms ({ROOMS_DATA.filter((r) => r.category !== 'suite').length})
              </button>
              <button
                type="button"
                onClick={() => setFilterCategory('suites')}
                className={`px-3 py-1 text-xs font-medium transition cursor-pointer ${
                  filterCategory === 'suites'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Suites & Club ({ROOMS_DATA.filter((r) => r.category === 'suite').length})
              </button>
            </div>
          </div>

          {/* Interactive Date & Guest Modifier Bar */}
          {isEditingStay && (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const n = calculateNights(editCheckIn, editCheckOut);
                if (n <= 0) {
                  setUpdateFeedback('Check-out must be at least one day after check-in.');
                  return;
                }
                setIsRefreshingRates(true);
                setUpdateFeedback(null);
                setTimeout(() => {
                  onUpdateBooking?.({
                    checkIn: editCheckIn,
                    checkOut: editCheckOut,
                    rooms: editRooms,
                    adults: editAdults,
                    children: editChildren,
                    rateType: editRateType as any,
                  });
                  setIsRefreshingRates(false);
                  setIsEditingStay(false);
                  setUpdateFeedback('Live rates and inventory refreshed for selected stay!');
                  setTimeout(() => setUpdateFeedback(null), 3500);
                }, 400);
              }}
              className="mt-4 p-5 bg-stone-50 border border-stone-200 animate-fadeIn"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Check In */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    value={editCheckIn}
                    onChange={(e) => setEditCheckIn(e.target.value)}
                    className="w-full bg-white border border-stone-300 px-3 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:border-stone-800"
                    required
                  />
                </div>

                {/* Check Out */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={editCheckOut}
                    min={editCheckIn}
                    onChange={(e) => setEditCheckOut(e.target.value)}
                    className="w-full bg-white border border-stone-300 px-3 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:border-stone-800"
                    required
                  />
                </div>

                {/* Rooms & Adults */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Rooms & Guests
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={editRooms}
                      onChange={(e) => setEditRooms(Number(e.target.value))}
                      className="bg-white border border-stone-300 px-2 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:border-stone-800"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Room' : 'Rooms'}
                        </option>
                      ))}
                    </select>
                    <select
                      value={editAdults}
                      onChange={(e) => setEditAdults(Number(e.target.value))}
                      className="bg-white border border-stone-300 px-2 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:border-stone-800"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Rates */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Special Rates
                  </label>
                  <select
                    value={editRateType}
                    onChange={(e) => setEditRateType(e.target.value)}
                    className="w-full bg-white border border-stone-300 px-3 py-2 text-xs font-medium text-stone-900 focus:outline-hidden focus:border-stone-800"
                  >
                    <option value="standard">Lowest Regular Rate</option>
                    <option value="member">Marriott Bonvoy Member Rate</option>
                    <option value="senior">Senior Discount (62+)</option>
                    <option value="gov">Government & Military</option>
                  </select>
                </div>

                {/* Submit Action */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isRefreshingRates}
                    className="w-full bg-[#4a564c] hover:bg-[#3d473e] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isRefreshingRates ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Rates...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#caa296]" />
                        <span>Update Availability</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Feedback banner */}
          {updateFeedback && (
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{updateFeedback}</span>
            </div>
          )}
        </div>

        {/* =========================================================================
            ALL AVAILABLE ROOMS & SUITES LIST CARDS
           ========================================================================= */}
        <div className="space-y-6">
          {filteredRooms.map((room) => {
            const basePriceOMR = isMemberRate ? room.memberPriceOMR : room.pricePerNightOMR;
            const priceConverted = Math.round(basePriceOMR * mult);
            const subtotalOMR = basePriceOMR * nights * roomsCount;
            const taxesOMR = Math.round(subtotalOMR * 0.17);
            const totalOMR = subtotalOMR + taxesOMR;
            const totalConverted = Math.round(totalOMR * mult);
            const isWadi = room.view?.toLowerCase().includes('wadi');

            return (
              <div 
                key={room.id}
                className="bg-white border border-stone-200 hover:border-stone-400 transition-all duration-300 shadow-xs overflow-hidden flex flex-col lg:flex-row group"
              >
                {/* Room Photo & Badge */}
                <div className="lg:w-80 xl:w-96 relative bg-stone-900 shrink-0 h-64 lg:h-auto overflow-hidden">
                  <HotelImage
                    src={room.images?.[0] || ''}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Bed Configuration Tag Badge */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 border-l-2 border-[#caa296] shadow-sm flex items-center space-x-1.5 max-w-[85%]">
                    <Bed className="w-3 h-3 text-[#caa296] shrink-0" />
                    <span className="truncate">{room.bedConfig}</span>
                  </div>

                  {/* Real Bed / Sofa Bed Caption from official property */}
                  {room.imageCaptions?.[0] && (
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] px-2 py-1 truncate">
                      {room.imageCaptions[0]}
                    </div>
                  )}

                  {/* Room Category Tag */}
                  <div className="absolute top-3 right-3 bg-white/90 text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    {room.categoryLabel || (room.category === 'suite' ? 'Suite' : room.category === 'executive' ? 'Executive Club' : 'Guest Room')}
                  </div>
                </div>

                {/* Room Info & Specifications */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a87a6d]">
                        JW Marriott Hotel Muscat • {room.category.toUpperCase()}
                      </span>
                      {(room.hasLoungeAccess || room.category === 'suite') && (
                        <span className="inline-flex items-center text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
                          <Award className="w-3 h-3 mr-1" />
                          Includes Executive Club Lounge
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl text-stone-900 font-medium group-hover:text-stone-700 transition-colors">
                      {room.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Specs Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
                      <div className="flex items-center space-x-1.5">
                        <Maximize className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{room.sqm} m² / {room.sqft} sq ft</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Max {room.maxGuests} Guests</span>
                      </div>
                      <div className="flex items-center space-x-1.5 col-span-2 sm:col-span-1">
                        <Bed className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{room.bedConfig}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#d29a82] shrink-0" />
                        <span className="truncate">{room.view}</span>
                      </div>
                    </div>

                    {/* Verified Live Availability & Bathroom specs */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                        <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
                        Available for Selected Dates • Instant Confirmation
                      </span>
                      {room.bathDetails && (
                        <span className="text-stone-500 bg-stone-100 px-2 py-0.5 border border-stone-200 truncate max-w-md">
                          {room.bathDetails}
                        </span>
                      )}
                      {room.floors && (
                        <span className="text-stone-500 bg-stone-100 px-2 py-0.5 border border-stone-200">
                          {room.floors}
                        </span>
                      )}
                    </div>

                    {/* Features Preview */}
                    {room.features && room.features.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {room.features.slice(0, 4).map((feat, i) => (
                          <span key={i} className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-0.5 border border-stone-200/60">
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing Breakdown & Action Buttons */}
                  <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    {/* Price details */}
                    <div>
                      <div className="text-[11px] text-stone-500 uppercase tracking-wider">
                        {isMemberRate ? 'Bonvoy Member Exclusive Rate' : 'Standard Flexible Rate'}
                      </div>
                      <div className="flex items-baseline space-x-1.5 mt-0.5">
                        <span className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                          {currency} {priceConverted.toLocaleString()}
                        </span>
                        <span className="text-xs text-stone-500 font-normal">/ night</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {currency} {totalConverted.toLocaleString()} total for {nights} {nights === 1 ? 'night' : 'nights'} (incl. taxes & fees)
                      </div>
                    </div>

                    {/* Two Prominent Action Buttons */}
                    <div className="flex items-center space-x-2.5 shrink-0">
                      {/* View Details button opens Full-Screen RoomDetailsModal */}
                      <button
                        type="button"
                        onClick={() => onViewRoomDetails(room)}
                        className="flex items-center space-x-1.5 px-4 py-2.5 border-2 border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      {/* Select / Book button opens BookingConfirmationModal */}
                      <button
                        type="button"
                        onClick={() => onProceedToBooking(room)}
                        className="flex items-center space-x-1.5 px-5 py-2.5 bg-[#4a564c] hover:bg-[#3d473f] text-white transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-xs"
                      >
                        <span>Select Room</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Guarantee Footer */}
        <div className="bg-stone-100 p-4 border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-stone-500 shrink-0" />
            <span>
              All reservations include complimentary high-speed Wi-Fi, 24/7 fitness center access, 3 swimming pools, and Marriott Bonvoy Elite night credits.
            </span>
          </div>
          <span className="text-stone-500 text-[11px] whitespace-nowrap">
            Rates reflect {nights} {nights === 1 ? 'night' : 'nights'} stay
          </span>
        </div>

      </div>
    </section>
  );
};
