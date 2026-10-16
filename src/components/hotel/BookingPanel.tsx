import React, { useState } from 'react';
import { 
  Calendar, Users, Tag, Search, AlertCircle, 
  CheckCircle2, ChevronDown, Plus, Minus, X, Bed, ShieldCheck, ArrowRight, Lock
} from 'lucide-react';
import { BookingState, Room } from '../../types/hotel';
import { ROOMS_DATA } from '../../data/jwMarriottMuscatData';
import { PaymentCardIcon } from '../common/BrandLogos';

interface BookingPanelProps {
  bookingState: BookingState;
  onUpdateBooking: (state: BookingState) => void;
  currency: string;
  onProceedToBooking?: (room: Room) => void;
}

export const BookingPanel: React.FC<BookingPanelProps> = ({
  bookingState,
  onUpdateBooking,
  currency,
  onProceedToBooking,
}) => {
  const [checkIn, setCheckIn] = useState(bookingState.checkIn);
  const [checkOut, setCheckOut] = useState(bookingState.checkOut);
  const [rooms, setRooms] = useState(bookingState.rooms);
  const [adults, setAdults] = useState(bookingState.adults);
  const [children, setChildren] = useState(bookingState.children);
  const [rateType, setRateType] = useState(bookingState.rateType);
  const [promoCode, setPromoCode] = useState(bookingState.promoCode || '');
  const [selectedRoomId, setSelectedRoomId] = useState<string>(ROOMS_DATA[0]?.id || 'deluxe-king');

  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const [ratePopoverOpen, setRatePopoverOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [verifiedStay, setVerifiedStay] = useState<{
    room: Room;
    nights: number;
    totalOMR: number;
    totalConverted: number;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Currency multiplier relative to OMR
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

  const rateOptions = [
    { id: 'standard', name: 'Lowest Regular Rate', desc: 'Standard flexible cancellation' },
    { id: 'member', name: 'Marriott Bonvoy Member Rate', desc: 'Exclusive member pricing & points' },
    { id: 'aaa', name: 'AAA / CAA Rate', desc: 'Valid membership ID required at check-in' },
    { id: 'senior', name: 'Senior Discount (62+)', desc: 'Proof of age required upon arrival' },
    { id: 'gov', name: 'Government & Military', desc: 'Official government credentials required' },
    { id: 'promo', name: 'Corporate / Promotional Code', desc: 'Enter custom code' },
  ];

  // Calculate nights
  const calculateNights = (inDate: string, outDate: string) => {
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diffTime = d2.getTime() - d1.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(checkIn, checkOut);
  const activeRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setVerifiedStay(null);

    if (!checkIn || !checkOut) {
      setErrorMsg('Please select both check-in and check-out dates.');
      return;
    }

    const nightsCount = calculateNights(checkIn, checkOut);
    if (nightsCount <= 0) {
      setErrorMsg('Check-out date must be at least one day after check-in date.');
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      onUpdateBooking({
        checkIn,
        checkOut,
        rooms,
        adults,
        children,
        rateType,
        promoCode: rateType === 'promo' ? promoCode : undefined,
      });

      const roomPriceOMR = (rateType === 'standard' ? activeRoom.pricePerNightOMR : activeRoom.memberPriceOMR);
      const subtotalOMR = roomPriceOMR * nightsCount * rooms;
      const taxesOMR = Math.round(subtotalOMR * 0.17);
      const totalOMR = subtotalOMR + taxesOMR;
      const totalConverted = Math.round(totalOMR * mult);

      setVerifiedStay({
        room: activeRoom,
        nights: nightsCount,
        totalOMR,
        totalConverted,
      });
    }, 450);
  };

  return (
    <div id="booking-panel" className="bg-[#1c1c1c] text-white py-6 shadow-md border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-800 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#c5a880] rounded-full animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Check Rates & Availability at JW Marriott Hotel Muscat
            </span>
          </div>
          <div className="text-xs text-stone-400">
            <span>Special Member Rates Applied</span>
            <span className="mx-2">•</span>
            <span>Currency: <strong className="text-[#c5a880]">{currency}</strong></span>
          </div>
        </div>

        {/* Booking Form Grid */}
        <form onSubmit={handleCheckAvailability}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Check-In Date */}
            <div className="md:col-span-3 bg-[#282828] p-3 rounded-none border border-stone-700 hover:border-stone-500 transition">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-[#c5a880]" />
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* Check-Out Date */}
            <div className="md:col-span-3 bg-[#282828] p-3 rounded-none border border-stone-700 hover:border-stone-500 transition">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-[#c5a880]" />
                Check-out Date
                {nights > 0 && (
                  <span className="ml-auto text-[10px] text-[#c5a880] font-normal lowercase">
                    ({nights} night{nights > 1 ? 's' : ''})
                  </span>
                )}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* Rooms & Guests Selector */}
            <div className="md:col-span-3 relative">
              <button
                type="button"
                onClick={() => {
                  setGuestPopoverOpen(!guestPopoverOpen);
                  setRatePopoverOpen(false);
                }}
                className="w-full h-full bg-[#282828] p-3 rounded-none border border-stone-700 hover:border-stone-500 transition text-left flex items-center justify-between"
              >
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center">
                    <Users className="w-3 h-3 mr-1 text-[#c5a880]" />
                    Rooms & Guests
                  </span>
                  <span className="text-sm font-medium text-white block truncate">
                    {rooms} Room{rooms > 1 ? 's' : ''}, {adults} Adult{adults > 1 ? 's' : ''}
                    {children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </button>

              {/* Guest Popover */}
              {guestPopoverOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#222222] border border-stone-700 shadow-2xl p-4 z-40 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-800">
                    <span className="font-semibold uppercase tracking-wider text-white">Guests & Rooms</span>
                    <button
                      type="button"
                      onClick={() => setGuestPopoverOpen(false)}
                      className="text-stone-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Rooms Counter */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-800">
                    <div>
                      <span className="font-semibold text-white block">Rooms</span>
                      <span className="text-[10px] text-stone-400">Max 3 rooms per booking</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        disabled={rooms <= 1}
                        className="w-7 h-7 rounded border border-stone-600 flex items-center justify-center disabled:opacity-30 hover:border-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold text-white w-4 text-center">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(Math.min(3, rooms + 1))}
                        disabled={rooms >= 3}
                        className="w-7 h-7 rounded border border-stone-600 flex items-center justify-center disabled:opacity-30 hover:border-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Adults Counter */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-800">
                    <div>
                      <span className="font-semibold text-white block">Adults</span>
                      <span className="text-[10px] text-stone-400">Ages 18 and older</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                        className="w-7 h-7 rounded border border-stone-600 flex items-center justify-center disabled:opacity-30 hover:border-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold text-white w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(6, adults + 1))}
                        disabled={adults >= 6}
                        className="w-7 h-7 rounded border border-stone-600 flex items-center justify-center disabled:opacity-30 hover:border-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <span className="font-semibold text-white block">Children</span>
                      <span className="text-[10px] text-stone-400">Ages 0-17 (Family by JW)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        disabled={children <= 0}
                        className="w-7 h-7 rounded border border-stone-600 flex items-center justify-center disabled:opacity-30 hover:border-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold text-white w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(Math.min(4, children + 1))}
                        disabled={children >= 4}
                        className="w-7 h-7 rounded border border-stone-600 flex items-center justify-center disabled:opacity-30 hover:border-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGuestPopoverOpen(false)}
                    className="w-full mt-3 bg-[#c5a880] text-black font-semibold uppercase tracking-wider py-1.5 text-xs hover:bg-[#d6bc96] transition"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Special Rates Dropdown */}
            <div className="md:col-span-3 relative">
              <button
                type="button"
                onClick={() => {
                  setRatePopoverOpen(!ratePopoverOpen);
                  setGuestPopoverOpen(false);
                }}
                className="w-full h-full bg-[#282828] p-3 rounded-none border border-stone-700 hover:border-stone-500 transition text-left flex items-center justify-between"
              >
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1 flex items-center">
                    <Tag className="w-3 h-3 mr-1 text-[#c5a880]" />
                    Special Rates
                  </span>
                  <span className="text-sm font-medium text-white block truncate">
                    {rateOptions.find((r) => r.id === rateType)?.name || 'Lowest Regular Rate'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </button>

              {/* Rate Popover */}
              {ratePopoverOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#222222] border border-stone-700 shadow-2xl p-3 z-40 text-xs">
                  <div className="space-y-1">
                    {rateOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setRateType(opt.id);
                          if (opt.id !== 'promo') setRatePopoverOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded transition flex flex-col ${
                          rateType === opt.id
                            ? 'bg-stone-800 text-[#c5a880]'
                            : 'hover:bg-stone-800 text-stone-300'
                        }`}
                      >
                        <span className="font-semibold text-xs">{opt.name}</span>
                        <span className="text-[10px] text-stone-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>

                  {rateType === 'promo' && (
                    <div className="mt-2 pt-2 border-t border-stone-700">
                      <label className="block text-[10px] uppercase text-stone-400 mb-1">
                        Enter Promo Code
                      </label>
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="e.g. D3Q, 24F, CORP"
                        className="w-full bg-[#1c1c1c] border border-stone-600 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                      />
                      <button
                        type="button"
                        onClick={() => setRatePopoverOpen(false)}
                        className="w-full mt-2 bg-[#c5a880] text-black font-semibold uppercase py-1 text-[11px]"
                      >
                        Apply Code
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Secondary Filter Bar: Room Category Selection */}
          <div className="mt-3 pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs text-stone-400 w-full sm:w-auto">
              <Bed className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
              <span className="text-stone-300 font-medium">Room Preference:</span>
              <select
                value={selectedRoomId}
                onChange={(e) => {
                  setSelectedRoomId(e.target.value);
                  setVerifiedStay(null);
                }}
                className="bg-[#282828] text-white text-xs border border-stone-700 px-3 py-1.5 focus:outline-none focus:border-[#c5a880] cursor-pointer rounded-none"
              >
                {ROOMS_DATA.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.categoryLabel})
                  </option>
                ))}
              </select>
            </div>

            <div className="text-[11px] text-stone-400 flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Marriott Bonvoy Best Rate Guarantee</span>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="mt-4 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-400">
              <span className="text-white font-medium">JW Marriott Muscat:</span> Real-time MCTMJ availability • Instant checkout or official reservation
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://www.marriott.com/reservation/availability.mi?propertyCode=MCTMJ&fromDate=${checkIn}&toDate=${checkOut}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 border border-stone-600 hover:border-stone-400 text-stone-300 hover:text-white text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center space-x-1.5"
              >
                <span>Book on Marriott.com</span>
                <span className="text-[10px] text-[#c5a880]">↗</span>
              </a>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full sm:w-auto bg-[#c5a880] text-black hover:bg-[#d6bc96] px-8 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Verifying MCTMJ Availability...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Check Availability</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Feedback / Validation Alerts */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Verified Stay Card with Instant Checkout & Rates */}
        {verifiedStay && (
          <div className="mt-5 p-5 bg-[#252525] border border-[#c5a880]/60 rounded-none text-xs text-stone-200 animate-fadeIn">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-700">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-emerald-950/90 text-emerald-400 rounded-xs shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a880]">
                      Available for Your Stay
                    </span>
                    <span className="text-stone-500">•</span>
                    <span className="text-[11px] text-stone-400">
                      {verifiedStay.nights} Night{verifiedStay.nights > 1 ? 's' : ''} ({checkIn} to {checkOut})
                    </span>
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                    {verifiedStay.room.name}
                  </h4>
                  <p className="text-stone-400 text-[11px]">
                    {verifiedStay.room.bedConfig} • {verifiedStay.room.view} • {verifiedStay.room.sqm} m²
                  </p>
                </div>
              </div>

              <div className="text-left lg:text-right shrink-0 bg-[#1c1c1c] p-3 rounded-xs border border-stone-800">
                <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Total Rate (incl. 17% taxes):</span>
                <span className="font-serif text-2xl font-bold text-white">
                  {currency} {verifiedStay.totalConverted.toLocaleString()}
                </span>
                <span className="text-[10px] text-stone-400 block">
                  ({verifiedStay.totalOMR} OMR total)
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-[11px] text-stone-400">
                <Lock className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Instant confirmation with International Cards or PayPal</span>
                <div className="flex items-center space-x-1.5 ml-2">
                  <PaymentCardIcon type="card" className="h-3.5" />
                  <PaymentCardIcon type="paypal" className="h-3.5" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => onProceedToBooking?.(verifiedStay.room)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#c5a880] text-black hover:bg-[#d6bc96] text-xs font-bold uppercase tracking-widest transition flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <span>Reserve (Cards / PayPal)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
