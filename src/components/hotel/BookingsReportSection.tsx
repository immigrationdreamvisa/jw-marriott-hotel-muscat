import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  FileText,
  CreditCard,
  CheckCircle2,
  Calendar,
  User,
  ShieldCheck,
  Printer,
  Copy,
  Check,
  Search,
  Bed,
  Maximize,
  ArrowRight,
  Phone,
  Mail,
  AlertCircle,
  X,
  ExternalLink,
  Receipt,
  Download,
  Award,
} from 'lucide-react';
import { BookingRecord } from '../../types/hotel';
import { getStoredBookings } from '../../data/bookingsData';
import { HotelImage } from '../common/HotelImage';
import { JWGriffinStackedLogo } from '../common/BrandLogos';

interface BookingsReportSectionProps {
  currency: string;
  onNewBookingClick?: () => void;
}

export const BookingsReportSection: React.FC<BookingsReportSectionProps> = ({
  currency,
  onNewBookingClick,
}) => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Completed' | 'Cancelled'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectingInvoiceBooking, setInspectingInvoiceBooking] = useState<BookingRecord | null>(null);

  // Currency multiplier
  const getMultiplier = (cur: string) => {
    switch (cur) {
      case 'USD': return 2.6;
      case 'EUR': return 2.4;
      case 'GBP': return 2.05;
      case 'AED': return 9.55;
      case 'SAR': return 9.75;
      case 'OMR':
      default: return 1;
    }
  };
  const mult = getMultiplier(currency);

  const loadBookings = () => {
    const data = getStoredBookings();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'jw_marriott_bookings_reports') {
        loadBookings();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('jw_booking_created', loadBookings as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('jw_booking_created', loadBookings as EventListener);
    };
  }, []);

  const handleCopyCode = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedId(code);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (!window.confirm('Are you sure you wish to cancel this reservation at JW Marriott Hotel Muscat? An email confirmation of cancellation will be dispatched.')) {
      return;
    }

    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'Cancelled' as const,
          payment: {
            ...b.payment,
            status: 'Refunded' as const,
          },
        };
      }
      return b;
    });

    setBookings(updated);
    try {
      localStorage.setItem('jw_marriott_bookings_reports', JSON.stringify(updated));
    } catch {
      // storage handling
    }
  };

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      statusFilter === 'All' ? true : b.status.toLowerCase() === statusFilter.toLowerCase();

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      b.confirmationNumber.toLowerCase().includes(q) ||
      b.guest.fullName.toLowerCase().includes(q) ||
      b.guest.email.toLowerCase().includes(q) ||
      b.room.name.toLowerCase().includes(q) ||
      b.payment.transactionRef.toLowerCase().includes(q) ||
      b.payment.folioNumber.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // Analytics Metrics
  const totalBookingsCount = bookings.length;
  const activeConfirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'Completed').length;
  const totalOMRInvoiced = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (curr.pricing.totalOMR || 0), 0);
  const totalConvertedInvoiced = Math.round(totalOMRInvoiced * mult);
  const totalBonvoyPoints = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (curr.payment.bonvoyPointsEarned || 0), 0);

  return (
    <section
      id="bookings-section"
      className="py-16 md:py-24 bg-[#fbf9f6] border-y border-stone-200 text-[#1c1c1c] scroll-section-offset relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* =========================================================================
            1. SECTION HEADER: Editorial Luxury Styling
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-stone-200 pb-8">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#caa296] mb-2.5">
              <Receipt className="w-4 h-4 text-[#caa296]" />
              <span>Guest Folio & Reservation Directory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-medium tracking-tight">
              Booking Reports & Payment Details
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
              Access your real-time reservations, itemized billing folios compliant with the Sultanate of Oman Tax Authority, 
              guarantee records, and Marriott Bonvoy reward statements for JW Marriott Hotel Muscat.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 text-xs text-stone-700 bg-white px-4 py-2.5 border border-stone-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Oman VAT & Municipality Tax Compliant</span>
            </div>

            {onNewBookingClick && (
              <button
                type="button"
                onClick={onNewBookingClick}
                className="px-5 py-2.5 bg-[#4a564c] hover:bg-[#3d473f] text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Book Another Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            2. EXECUTIVE SUMMARY / KPI CARDS
           ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          
          {/* KPI 1 */}
          <div className="bg-white border border-stone-200 p-5 sm:p-6 shadow-xs space-y-2">
            <span className="text-[10.5px] uppercase tracking-wider text-stone-500 font-medium block">
              Total Reservations
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-medium text-stone-900">
              {totalBookingsCount}
            </div>
            <div className="text-[11px] text-stone-500 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{activeConfirmedCount} Confirmed Stays</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-white border border-stone-200 p-5 sm:p-6 shadow-xs space-y-2">
            <span className="text-[10.5px] uppercase tracking-wider text-stone-500 font-medium block">
              Completed Stays
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-medium text-stone-900">
              {completedCount}
            </div>
            <div className="text-[11px] text-stone-500">
              Historical ledger entries
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-white border border-stone-200 p-5 sm:p-6 shadow-xs space-y-2">
            <span className="text-[10.5px] uppercase tracking-wider text-stone-500 font-medium block">
              Total Invoiced & Settled
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 truncate">
              {currency} {totalConvertedInvoiced.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500">
              ≈ {totalOMRInvoiced.toFixed(2)} OMR (Incl. Taxes)
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-white border border-stone-200 p-5 sm:p-6 shadow-xs space-y-2">
            <span className="text-[10.5px] uppercase tracking-wider text-[#a87a6d] font-bold block">
              Bonvoy Points Earned
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-medium text-[#a87a6d]">
              +{totalBonvoyPoints.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-[#caa296]" />
              <span>Marriott Bonvoy Elite Credit</span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            3. SEARCH & STATUS FILTER TOOLBAR
           ========================================================================= */}
        <div className="bg-white border border-stone-200 p-4 sm:p-5 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Confirmed', 'Completed', 'Cancelled'] as const).map((tab) => {
              const isActive = statusFilter === tab;
              const count =
                tab === 'All'
                  ? bookings.length
                  : bookings.filter((b) => b.status.toLowerCase() === tab.toLowerCase()).length;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition cursor-pointer flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-stone-700 text-stone-200' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search confirmation, guest, or folio..."
              className="w-full bg-[#fdfdfc] border border-stone-300 pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* =========================================================================
            4. BOOKING CARDS LIST
           ========================================================================= */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white border border-stone-200 p-12 text-center space-y-4 shadow-xs">
            <FileText className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              No Booking Reports Found
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              {searchQuery
                ? `No reservations matched your query "${searchQuery}". Please verify the confirmation reference or guest name.`
                : 'There are no active booking reports under this category.'}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 border border-stone-300 hover:bg-stone-100 text-xs font-semibold uppercase tracking-wider text-stone-700 cursor-pointer"
              >
                Clear Search Filter
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((b) => {
              const totalConverted = Math.round(b.pricing.totalOMR * mult);
              const subtotalConverted = Math.round(b.pricing.subtotalOMR * mult);
              const tourismTaxConverted = Math.round(b.pricing.tourismTaxOMR * mult);
              const vatConverted = Math.round(b.pricing.vatOMR * mult);
              const serviceConverted = Math.round(b.pricing.serviceChargeOMR * mult);

              const isConfirmed = b.status === 'Confirmed';
              const isCompleted = b.status === 'Completed';
              const isCancelled = b.status === 'Cancelled';

              return (
                <div
                  key={b.id}
                  className="bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Card Header Bar */}
                  <div className="bg-[#242424] text-white px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    
                    {/* Left: Confirmation & Dates */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#caa296] font-semibold">
                          Confirmation:
                        </span>
                        <strong className="font-mono text-sm tracking-wider text-white">
                          {b.confirmationNumber}
                        </strong>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(b.confirmationNumber)}
                          className="p-1 text-stone-400 hover:text-white transition cursor-pointer"
                          title="Copy Confirmation Number"
                        >
                          {copiedId === b.confirmationNumber ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <span className="hidden sm:inline text-stone-600">|</span>

                      <div className="text-stone-300 text-[11px] flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <span>Booked on {new Date(b.bookingDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                      </div>
                    </div>

                    {/* Right: Status Pill & Folio Reference */}
                    <div className="flex items-center space-x-3">
                      <div className="hidden lg:flex items-center space-x-1 text-[11px] text-stone-400 font-mono">
                        <span>Folio:</span>
                        <span className="text-stone-200">{b.payment.folioNumber}</span>
                      </div>

                      <span
                        className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 ${
                          isConfirmed
                            ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                            : isCompleted
                            ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                            : 'bg-red-600/30 text-red-300 border border-red-500/50'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                  </div>

                  {/* Card Content: 2-Column Responsive Breakdown */}
                  <div className="p-5 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Sub-Column (7 Cols): Room & Stay Parameters */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Room Snapshot */}
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-full sm:w-44 h-32 shrink-0 bg-stone-900 overflow-hidden relative shadow-xs">
                          <HotelImage
                            src={b.room.image}
                            alt={b.room.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 border-l-2 border-[#caa296]">
                            {b.room.category}
                          </div>
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <span className="text-[10px] uppercase tracking-widest text-[#a87a6d] font-bold block">
                            JW Marriott Hotel Muscat
                          </span>
                          <h4 className="font-serif text-lg sm:text-xl font-medium text-stone-900 leading-snug">
                            {b.room.name}
                          </h4>
                          <p className="text-xs text-stone-500">
                            {b.room.bedConfig} • {b.room.view}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-stone-600 pt-1">
                            <span className="flex items-center space-x-1">
                              <Maximize className="w-3 h-3 text-stone-400" />
                              <span>{b.room.sqm} m²</span>
                            </span>
                            <span>•</span>
                            <span className="text-[#a87a6d] font-medium">{b.rateType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stay Parameters Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 border border-stone-200 text-xs">
                        <div>
                          <span className="text-[10px] uppercase text-stone-400 font-semibold block">Check-In</span>
                          <strong className="text-stone-900 block text-xs sm:text-sm">{b.checkIn}</strong>
                          <span className="text-[11px] text-stone-500">From 3:00 PM</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase text-stone-400 font-semibold block">Check-Out</span>
                          <strong className="text-stone-900 block text-xs sm:text-sm">{b.checkOut}</strong>
                          <span className="text-[11px] text-stone-500">Until 12:00 PM</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase text-stone-400 font-semibold block">Nights</span>
                          <strong className="text-stone-900 block text-xs sm:text-sm">{b.nights} Night{b.nights > 1 ? 's' : ''}</strong>
                          <span className="text-[11px] text-stone-500">{b.rooms} Room</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase text-stone-400 font-semibold block">Guests</span>
                          <strong className="text-stone-900 block text-xs sm:text-sm">{b.adults} Adults</strong>
                          <span className="text-[11px] text-stone-500">{b.children > 0 ? `${b.children} Child` : 'No Children'}</span>
                        </div>
                      </div>

                      {/* Guest Details & Preferences */}
                      <div className="text-xs space-y-2 border-t border-stone-100 pt-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-3.5 h-3.5 text-stone-400" />
                            <strong className="text-stone-900">{b.guest.fullName}</strong>
                            <span className="text-stone-400">({b.guest.email} • {b.guest.phone})</span>
                          </div>
                          {b.guest.bonvoyNumber && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-[#f5ede7] text-[#8e5c4e] text-[10.5px] font-semibold border border-[#e8ded1]">
                              Bonvoy: {b.guest.bonvoyNumber}
                            </span>
                          )}
                        </div>

                        {b.guest.specialRequests && (
                          <div className="bg-[#fcfbf9] border border-stone-200/80 p-2.5 text-[11.5px] text-stone-600">
                            <span className="font-semibold text-stone-800">Special Request:</span> {b.guest.specialRequests}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Right Sub-Column (5 Cols): Comprehensive Payment & Tax Breakdown */}
                    <div className="lg:col-span-5 lg:border-l lg:border-stone-200 lg:pl-8 space-y-5 flex flex-col justify-between">
                      
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-[#caa296]" />
                            <span>Payment & Ledger Breakdown</span>
                          </span>

                          <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold uppercase">
                            {b.payment.status}
                          </span>
                        </div>

                        {/* Payment Credentials */}
                        <div className="py-3 text-xs space-y-1.5 text-stone-600 border-b border-stone-100">
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500">Method:</span>
                            <strong className="text-stone-900 font-medium">
                              {b.payment.method} {b.payment.cardLast4 ? `(•••• ${b.payment.cardLast4})` : ''}
                            </strong>
                          </div>

                          <div className="flex items-center justify-between font-mono text-[11px]">
                            <span className="text-stone-500 font-sans">Transaction Ref:</span>
                            <span className="text-stone-800">{b.payment.transactionRef}</span>
                          </div>

                          <div className="flex items-center justify-between font-mono text-[11px]">
                            <span className="text-stone-500 font-sans">Official Folio #:</span>
                            <span className="text-stone-800">{b.payment.folioNumber}</span>
                          </div>

                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">Settled Timestamp:</span>
                            <span className="text-stone-700">{b.payment.paidAt}</span>
                          </div>
                        </div>

                        {/* Itemized Taxes & Total Table */}
                        <div className="py-3 space-y-1.5 text-xs text-stone-600">
                          <div className="flex items-center justify-between">
                            <span>Room Lodging ({b.nights} nights):</span>
                            <span>{currency} {subtotalConverted.toLocaleString()} <span className="text-[10px] text-stone-400">({b.pricing.subtotalOMR} OMR)</span></span>
                          </div>

                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">Oman Municipality & Tourism Tax (8%):</span>
                            <span>{currency} {tourismTaxConverted.toLocaleString()} <span className="text-[10px] text-stone-400">({b.pricing.tourismTaxOMR.toFixed(2)} OMR)</span></span>
                          </div>

                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">Oman Value Added Tax (VAT 5%):</span>
                            <span>{currency} {vatConverted.toLocaleString()} <span className="text-[10px] text-stone-400">({b.pricing.vatOMR.toFixed(2)} OMR)</span></span>
                          </div>

                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">Hotel Service Charge (4%):</span>
                            <span>{currency} {serviceConverted.toLocaleString()} <span className="text-[10px] text-stone-400">({b.pricing.serviceChargeOMR.toFixed(2)} OMR)</span></span>
                          </div>

                          {/* Total Row */}
                          <div className="flex items-baseline justify-between pt-2.5 mt-2 border-t border-stone-200">
                            <div>
                              <strong className="text-stone-900 block text-xs uppercase tracking-wide">Total Amount Settled</strong>
                              <span className="text-[10px] text-emerald-700 font-medium">All Oman Taxes & Surcharges Included</span>
                            </div>

                            <div className="text-right">
                              <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 block">
                                {currency} {totalConverted.toLocaleString()}
                              </span>
                              <span className="text-[10.5px] text-stone-500">
                                ({b.pricing.totalOMR.toFixed(2)} OMR)
                              </span>
                            </div>
                          </div>

                          {/* Marriott Bonvoy Reward Badge */}
                          <div className="mt-2.5 p-2 bg-[#fdfaf8] border border-[#f0e2d8] flex items-center justify-between text-[11px]">
                            <span className="text-stone-700 flex items-center space-x-1.5">
                              <Award className="w-3.5 h-3.5 text-[#caa296]" />
                              <span>Bonvoy Points Credited</span>
                            </span>
                            <strong className="text-[#a87a6d] font-bold">
                              +{b.payment.bonvoyPointsEarned.toLocaleString()} Points
                            </strong>
                          </div>
                        </div>

                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-end gap-2.5">
                        {isConfirmed && (
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-3 py-2 text-stone-500 hover:text-red-700 hover:bg-red-50 text-[11px] font-medium transition cursor-pointer"
                          >
                            Cancel Stay
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setInspectingInvoiceBooking(b)}
                          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#caa296]" />
                          <span>Official Tax Folio</span>
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* =========================================================================
          5. OFFICIAL TAX FOLIO / INVOICE MODAL
         ========================================================================= */}
      {inspectingInvoiceBooking && (
        <TaxInvoiceModal
          booking={inspectingInvoiceBooking}
          currency={currency}
          mult={mult}
          onClose={() => setInspectingInvoiceBooking(null)}
        />
      )}

    </section>
  );
};

// =============================================================================
// PRINTABLE TAX FOLIO / INVOICE MODAL COMPONENT
// =============================================================================
interface TaxInvoiceModalProps {
  booking: BookingRecord;
  currency: string;
  mult: number;
  onClose: () => void;
}

const TaxInvoiceModal: React.FC<TaxInvoiceModalProps> = ({
  booking,
  currency,
  mult,
  onClose,
}) => {
  const totalConverted = Math.round(booking.pricing.totalOMR * mult);
  const subtotalConverted = Math.round(booking.pricing.subtotalOMR * mult);
  const tourismTaxConverted = Math.round(booking.pricing.tourismTaxOMR * mult);
  const vatConverted = Math.round(booking.pricing.vatOMR * mult);
  const serviceConverted = Math.round(booking.pricing.serviceChargeOMR * mult);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      id="tax-invoice-modal-portal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn print:p-0 print:m-0 print:bg-white print:static print:block"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Prominent Floating Top-Right Cross Button (Screen only, completely hidden when printing) */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all duration-200 flex items-center space-x-1.5 cursor-pointer group print:hidden no-print"
        title="Close (Esc)"
        aria-label="Close invoice modal"
      >
        <X className="w-5 h-5 text-[#caa296] group-hover:text-white transition-colors" />
        <span className="text-xs font-semibold uppercase tracking-wider pr-1">Close</span>
      </button>

      <div
        className="bg-white w-full max-w-3xl border border-stone-300 shadow-2xl overflow-hidden my-4 sm:my-8 relative flex flex-col print:border-none print:shadow-none print:my-0 print:max-w-full print:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Cross Bar & Controls (Screen only, completely hidden when printing) */}
        <div className="sticky top-0 z-30 bg-[#242424] text-white px-5 sm:px-6 py-3.5 flex items-center justify-between text-xs shadow-md print:hidden no-print border-b border-stone-800">
          <div className="flex items-center space-x-2 text-[#caa296]">
            <Receipt className="w-4 h-4 text-[#caa296]" />
            <span className="font-semibold uppercase tracking-widest text-[11px]">
              Official Tax Invoice & Folio Receipt
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-[#4a564c] hover:bg-[#3d473f] text-white text-xs font-semibold uppercase tracking-wider transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Folio</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
              title="Close invoice (Esc)"
            >
              <X className="w-4 h-4 text-[#caa296]" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div id="printable-tax-invoice" className="p-8 sm:p-12 space-y-8 text-stone-900 bg-[#fdfdfc] print:bg-white print:p-0 print:space-y-5">
          
          {/* Letterhead Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between pb-6 border-b-2 border-stone-900 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#a87a6d] font-bold block mb-1">
                JW Marriott
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900">
                JW Marriott Hotel Muscat
              </h1>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Madinat Al Irfan, Airport Heights, P.O. Box 112, PC 111, Muscat, Sultanate of Oman<br />
                Telephone: +968 2492 0000 • Email: reservations.muscat@marriott.com<br />
                Commercial Reg (CR): 1308291 • Oman VAT ID: OM1100294821
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0 bg-stone-50 border border-stone-200 p-4">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold">
                Official Tax Folio
              </span>
              <strong className="font-mono text-base font-bold text-stone-900 block mt-0.5">
                {booking.payment.folioNumber}
              </strong>
              <span className="text-xs text-stone-600 block mt-1">
                Date: {new Date(booking.bookingDate).toLocaleDateString('en-US', { dateStyle: 'long' })}
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold uppercase mt-1 inline-block">
                {booking.payment.status}
              </span>
            </div>
          </div>

          {/* Guest & Reservation Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-stone-200 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">Billed To</span>
              <strong className="text-sm text-stone-900 block">{booking.guest.fullName}</strong>
              <p className="text-stone-600">{booking.guest.email} • {booking.guest.phone}</p>
              {booking.guest.bonvoyNumber && (
                <p className="text-[#a87a6d] font-medium">Marriott Bonvoy: {booking.guest.bonvoyNumber}</p>
              )}
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">Reservation Reference</span>
              <strong className="text-sm font-mono text-stone-900 block">{booking.confirmationNumber}</strong>
              <p className="text-stone-600">Check-in: {booking.checkIn} (3:00 PM) — Check-out: {booking.checkOut} (12:00 PM)</p>
              <p className="text-stone-600">Stay Duration: {booking.nights} Night{booking.nights > 1 ? 's' : ''} ({booking.adults} Adults)</p>
            </div>
          </div>

          {/* Itemized Table of Charges */}
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-stone-900 pb-2 mb-3 border-b border-stone-200">
              Itemized Accommodation & Surcharges Breakdown
            </div>

            <table className="w-full text-xs text-stone-800">
              <thead>
                <tr className="border-b border-stone-300 text-stone-500 font-semibold text-[10px] uppercase">
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-center">Nights</th>
                  <th className="py-2 text-right">Lodging Rate</th>
                  <th className="py-2 text-right">Amount ({currency})</th>
                  <th className="py-2 text-right">Amount (OMR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-3 pr-2">
                    <strong className="block text-stone-900">{booking.room.name}</strong>
                    <span className="text-stone-500 text-[11px]">{booking.room.category} • {booking.rateType}</span>
                  </td>
                  <td className="py-3 text-center">{booking.nights}</td>
                  <td className="py-3 text-right">{booking.pricing.ratePerNightOMR} OMR</td>
                  <td className="py-3 text-right font-medium">{currency} {subtotalConverted.toLocaleString()}</td>
                  <td className="py-3 text-right font-medium">{booking.pricing.subtotalOMR.toFixed(2)}</td>
                </tr>

                <tr>
                  <td colSpan={3} className="py-2 text-stone-600 pl-4">
                    Oman Municipality & Tourism Tax (8.0%)
                  </td>
                  <td className="py-2 text-right text-stone-600">{currency} {tourismTaxConverted.toLocaleString()}</td>
                  <td className="py-2 text-right text-stone-600">{booking.pricing.tourismTaxOMR.toFixed(2)}</td>
                </tr>

                <tr>
                  <td colSpan={3} className="py-2 text-stone-600 pl-4">
                    Oman Value Added Tax (VAT 5.0%)
                  </td>
                  <td className="py-2 text-right text-stone-600">{currency} {vatConverted.toLocaleString()}</td>
                  <td className="py-2 text-right text-stone-600">{booking.pricing.vatOMR.toFixed(2)}</td>
                </tr>

                <tr>
                  <td colSpan={3} className="py-2 text-stone-600 pl-4">
                    Hospitality Service Charge (4.0%)
                  </td>
                  <td className="py-2 text-right text-stone-600">{currency} {serviceConverted.toLocaleString()}</td>
                  <td className="py-2 text-right text-stone-600">{booking.pricing.serviceChargeOMR.toFixed(2)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stone-900 text-sm">
                  <td colSpan={3} className="py-4 font-bold uppercase tracking-wide text-stone-900">
                    Total Amount Invoiced
                  </td>
                  <td className="py-4 text-right font-serif font-bold text-stone-900 text-base">
                    {currency} {totalConverted.toLocaleString()}
                  </td>
                  <td className="py-4 text-right font-serif font-bold text-stone-900 text-base">
                    {booking.pricing.totalOMR.toFixed(2)} OMR
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment & Audit Authentication */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 border border-stone-200 p-5 text-xs text-stone-700">
            <div className="space-y-1">
              <strong className="block text-stone-900 font-semibold uppercase text-[10px] tracking-wider">
                Settlement Verification
              </strong>
              <p>Method: {booking.payment.method} {booking.payment.cardLast4 ? `(ending •••• ${booking.payment.cardLast4})` : ''}</p>
              <p className="font-mono text-[11px]">Auth / TXN: {booking.payment.transactionRef}</p>
              <p>Settled: {booking.payment.paidAt}</p>
            </div>

            <div className="space-y-1 sm:text-right">
              <strong className="block text-[#a87a6d] font-bold uppercase text-[10px] tracking-wider">
                Marriott Bonvoy Points Earned
              </strong>
              <div className="font-serif text-lg font-bold text-stone-900">
                +{booking.payment.bonvoyPointsEarned.toLocaleString()} Points
              </div>
              <span className="text-[10px] text-stone-500 block">
                Official electronic tax invoice generated by Marriott International CRS.
              </span>
            </div>
          </div>

          {/* Sign-off Footnote */}
          <div className="pt-4 text-center text-[10.5px] text-stone-400 space-y-1">
            <p>Thank you for choosing JW Marriott Hotel Muscat. We look forward to welcoming you back.</p>
            <p className="font-mono">www.marriott.com/mctmj • VAT Reg. OM1100294821 • Muscat, Sultanate of Oman</p>
          </div>

        </div>

        {/* Bottom Cross & Print Bar (Visible at end of invoice, hidden in print) */}
        <div className="bg-stone-100 border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden no-print">
          <div className="text-xs text-stone-500">
            JW Marriott Hotel Muscat • Tax Registration OM1100294821
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 border border-stone-300 hover:bg-white text-stone-700 text-xs font-semibold uppercase tracking-wider transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Print Invoice</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition flex items-center space-x-1.5 shadow-xs cursor-pointer"
            >
              <X className="w-4 h-4 text-[#caa296]" />
              <span>Close Invoice</span>
            </button>
          </div>
        </div>

      </div>

    </div>,
    document.body
  );
};
