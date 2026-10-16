import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, Calendar, Users, 
  MapPin, Printer, ArrowRight, Sparkles, Building2, 
  Info, CreditCard, Lock, Check, AlertCircle, Copy,
  Phone, Mail, Bed, Maximize, Clock, ChevronLeft, Receipt
} from 'lucide-react';
import { Room, BookingState, BookingRecord } from '../../types/hotel';
import { saveBookingRecord } from '../../data/bookingsData';
import { PaymentCardIcon, JWGriffinStackedLogo } from '../common/BrandLogos';
import { HotelImage } from '../common/HotelImage';

interface BookingConfirmationModalProps {
  room: Room | null;
  bookingState: BookingState;
  currency: string;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  room,
  bookingState,
  currency,
  onClose,
}) => {
  if (!room) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'confirmed'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Lock body scroll while full-screen modal is open & add ESC key listener
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Lock body scroll and add Escape key listener
  useEffect(() => {
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Guest Details
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Vance',
    email: 'alex.vance@marriottbonvoy.com',
    phone: '+968 9123 4567',
    bonvoyNumber: 'MB-984210492',
    specialRequests: 'High floor with panoramic wadi view, quiet room.',
    arrivalTime: '15:00',
  });

  // International Card Details
  const [cardData, setCardData] = useState({
    cardholderName: 'Alex Vance',
    cardNumber: '4532 •••• •••• 8824',
    expiry: '08/28',
    cvv: '842',
    cardType: 'visa' as 'visa' | 'mastercard' | 'amex' | 'jcb',
  });

  // PayPal Details
  const [paypalEmail, setPaypalEmail] = useState('alex.vance@marriottbonvoy.com');
  const [confirmationNumber, setConfirmationNumber] = useState('');

  // Quick special request chips
  const requestOptions = [
    'High floor room',
    'Quiet room away from elevators',
    'Feather-free hypoallergenic bedding',
    'Extra luxury towels & pillows',
    'Late arrival after 8:00 PM',
    'Baby crib requested (complimentary)',
  ];

  const toggleSpecialRequest = (req: string) => {
    if (formData.specialRequests.includes(req)) {
      setFormData({
        ...formData,
        specialRequests: formData.specialRequests.replace(req, '').replace(/,\s*,/, ',').trim(),
      });
    } else {
      const updated = formData.specialRequests ? `${formData.specialRequests}, ${req}` : req;
      setFormData({ ...formData, specialRequests: updated });
    }
  };

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

  const basePriceOMR = bookingState.rateType === 'member' ? room.memberPriceOMR : room.pricePerNightOMR;
  const roomSubtotalOMR = basePriceOMR * nights * roomsCount;
  const taxesOMR = Math.round(roomSubtotalOMR * 0.17); // 8% service + 4% tourism + 5% VAT
  const totalOMR = roomSubtotalOMR + taxesOMR;

  const basePriceConverted = Math.round(basePriceOMR * mult);
  const roomSubtotalConverted = Math.round(roomSubtotalOMR * mult);
  const taxesConverted = Math.round(taxesOMR * mult);
  const totalConverted = Math.round(totalOMR * mult);
  const bonvoyPointsEarned = Math.round(roomSubtotalOMR * 25);

  const handleCardNumberChange = (val: string) => {
    let detected: 'visa' | 'mastercard' | 'amex' | 'jcb' = 'visa';
    const clean = val.replace(/\D/g, '');
    if (clean.startsWith('5')) detected = 'mastercard';
    else if (clean.startsWith('3')) detected = 'amex';
    else if (clean.startsWith('2')) detected = 'mastercard';
    else if (clean.startsWith('35')) detected = 'jcb';

    setCardData({
      ...cardData,
      cardNumber: val,
      cardType: detected,
    });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete all required guest fields (First Name, Last Name, Email, and Phone).');
      return;
    }
    setErrorMsg(null);
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (paymentMethod === 'card') {
      if (!cardData.cardholderName.trim() || !cardData.cardNumber.trim() || !cardData.expiry.trim() || !cardData.cvv.trim()) {
        setErrorMsg('Please complete all required card details.');
        return;
      }
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail.trim()) {
        setErrorMsg('Please provide your valid PayPal account email address.');
        return;
      }
    }

    setStep('processing');

    setTimeout(() => {
      const code = `MB-MCTMJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationNumber(code);

      // Centralized Booking Report Record Generation
      const tourismTaxOMR = Math.round(roomSubtotalOMR * 0.08 * 100) / 100;
      const vatOMR = Math.round(roomSubtotalOMR * 0.05 * 100) / 100;
      const serviceChargeOMR = Math.round(roomSubtotalOMR * 0.04 * 100) / 100;
      const calculatedTotalOMR = roomSubtotalOMR + tourismTaxOMR + vatOMR + serviceChargeOMR;

      const record: BookingRecord = {
        id: `booking-${Date.now()}`,
        confirmationNumber: code,
        bookingDate: new Date().toISOString(),
        status: 'Confirmed',
        room: {
          id: room.id,
          name: room.name,
          category: room.categoryLabel || room.category,
          image: room.images[0],
          bedConfig: room.bedConfig,
          view: room.view,
          sqm: room.sqm,
        },
        checkIn: bookingState.checkIn,
        checkOut: bookingState.checkOut,
        nights,
        rooms: roomsCount,
        adults: bookingState.adults,
        children: bookingState.children || 0,
        rateType: bookingState.rateType === 'member' ? 'Marriott Bonvoy Member Exclusive Rate' : 'Standard Flexible Rate',
        pricing: {
          ratePerNightOMR: basePriceOMR,
          subtotalOMR: roomSubtotalOMR,
          tourismTaxOMR,
          vatOMR,
          serviceChargeOMR,
          totalOMR: calculatedTotalOMR,
        },
        guest: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          bonvoyNumber: formData.bonvoyNumber || undefined,
          specialRequests: formData.specialRequests || undefined,
          arrivalTime: formData.arrivalTime || '15:00',
        },
        payment: {
          method: paymentMethod === 'card' ? `Credit Card (${cardData.cardType.toUpperCase()})` : 'PayPal Express',
          cardBrand: paymentMethod === 'card' ? cardData.cardType.toUpperCase() : 'PayPal',
          cardLast4: paymentMethod === 'card' ? cardData.cardNumber.slice(-4) || '8824' : undefined,
          transactionRef: `TXN-OM-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          folioNumber: `FOLIO-MCTMJ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          paidAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          status: 'Paid & Settled',
          bonvoyPointsEarned,
        },
      };

      saveBookingRecord(record);
      window.dispatchEvent(new CustomEvent('jw_booking_created'));

      setStep('confirmed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1400);
  };

  const handleGoToBookingsReport = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('bookings-section') || document.getElementById('bookings-report-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(confirmationNumber);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#fbfaf8] overflow-y-auto flex flex-col text-[#1c1c1c] animate-fadeIn select-none">
      
      {/* =========================================================================
          1. STICKY TOP LUXURY HEADER WITH PROPERLY ARRANGED NAVIGATION & PROGRESS
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#242424] text-white shadow-md border-b border-stone-800">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4 lg:gap-6">
          
          {/* Left: Brand Identity & Title */}
          <div className="flex items-center space-x-4 shrink-0">
            <JWGriffinStackedLogo />
            <div className="border-l border-stone-700 pl-4 hidden sm:block">
              <div className="text-[9.5px] uppercase tracking-[0.22em] text-[#caa296] font-semibold leading-tight">
                Direct Reservation
              </div>
              <div className="font-serif text-sm lg:text-base font-medium text-white truncate max-w-[160px] xl:max-w-[220px]">
                JW Marriott Muscat
              </div>
            </div>
          </div>

          {/* Center: 3-Step Progress Indicator (Properly centered & isolated with no collision) */}
          <nav aria-label="Checkout Progress" className="hidden md:flex items-center justify-center space-x-2 lg:space-x-4 flex-1 max-w-xl mx-2">
            {/* Step 1 */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                step === 'details' 
                  ? 'bg-[#caa296] text-stone-900 ring-2 ring-[#caa296]/40' 
                  : 'bg-emerald-600 text-white'
              }`}>
                {step === 'details' ? '1' : '✓'}
              </span>
              <span className={`text-[11.5px] uppercase tracking-wider ${
                step === 'details' ? 'font-semibold text-white' : 'text-stone-400'
              }`}>
                Guest Details
              </span>
            </div>

            <div className="w-5 lg:w-8 h-[1px] bg-stone-700 shrink-0" />

            {/* Step 2 */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                step === 'payment' || step === 'processing'
                  ? 'bg-[#caa296] text-stone-900 ring-2 ring-[#caa296]/40'
                  : step === 'confirmed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-800 text-stone-400 border border-stone-700'
              }`}>
                {step === 'confirmed' ? '✓' : '2'}
              </span>
              <span className={`text-[11.5px] uppercase tracking-wider ${
                step === 'payment' || step === 'processing' ? 'font-semibold text-white' : 'text-stone-400'
              }`}>
                Payment & Guarantee
              </span>
            </div>

            <div className="w-5 lg:w-8 h-[1px] bg-stone-700 shrink-0" />

            {/* Step 3 */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                step === 'confirmed'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-500/40'
                  : 'bg-stone-800 text-stone-400 border border-stone-700'
              }`}>
                3
              </span>
              <span className={`text-[11.5px] uppercase tracking-wider ${
                step === 'confirmed' ? 'font-semibold text-white' : 'text-stone-400'
              }`}>
                Confirmation
              </span>
            </div>
          </nav>

          {/* Right: Security Badge & Close Action */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="hidden xl:flex items-center space-x-1.5 text-stone-300 text-[11px] bg-stone-800/90 px-3 py-1.5 border border-stone-700">
              <Lock className="w-3.5 h-3.5 text-[#caa296]" />
              <span>256-Bit TLS</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
              title="Close reservation (Esc)"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Mobile Step Bar for Small Screens */}
        <div className="md:hidden bg-[#1c1c1c] border-t border-stone-800 px-4 py-2 flex items-center justify-between text-xs text-stone-300">
          <span className="text-[11px] uppercase tracking-wider text-[#caa296] font-semibold">
            {step === 'details' && 'Step 1 of 2: Guest Details'}
            {step === 'payment' && 'Step 2 of 2: Payment & Guarantee'}
            {step === 'processing' && 'Processing Reservation...'}
            {step === 'confirmed' && 'Reservation Confirmed'}
          </span>
          <span className="text-[10px] text-stone-400 font-mono">JW Marriott Muscat</span>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN CHECKOUT WORKSPACE (2-Column Architecture)
         ========================================================================= */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-10 py-10">
        
        {/* Step 3: Processing Full View */}
        {step === 'processing' && (
          <div className="max-w-xl mx-auto py-24 text-center space-y-6">
            <div className="w-16 h-16 border-4 border-stone-200 border-t-[#caa296] rounded-full animate-spin mx-auto" />
            <h2 className="font-serif text-3xl font-medium text-stone-900">
              Authorizing Reservation...
            </h2>
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Securely transmitting booking credentials to Marriott International Reservation System for JW Marriott Hotel Muscat. Please do not refresh.
            </p>
          </div>
        )}

        {/* Step 4: Official Confirmed Receipt View */}
        {step === 'confirmed' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Success Banner */}
            <div className="bg-white border border-stone-200 p-8 sm:p-12 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#a87a6d] font-bold">
                Marriott Bonvoy • Instant Confirmation
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
                Your reservation at <strong>JW Marriott Hotel Muscat</strong> is officially confirmed. A copy of this receipt and itinerary has been sent to <strong className="text-stone-900">{formData.email}</strong>.
              </p>

              {/* Official Confirmation Code Display */}
              <div className="max-w-md mx-auto mt-6 p-4 bg-[#fbf9f6] border border-[#e8ded1] text-center space-y-1">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-medium">
                  Official Confirmation Reference Number
                </span>
                <div className="flex items-center justify-center space-x-3">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 tracking-wider">
                    {confirmationNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-1.5 text-stone-500 hover:text-stone-900 border border-stone-300 rounded transition"
                    title="Copy code"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedCode && <span className="text-[10px] text-emerald-700 block">✓ Copied to clipboard</span>}
              </div>
            </div>

            {/* Comprehensive Reservation Breakdown */}
            <div className="bg-white border border-stone-200 p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-2xl text-stone-900 font-medium pb-4 border-b border-stone-200">
                Reservation Summary & Inclusions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-stone-700">
                
                {/* Stay & Room Details */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-20 shrink-0 bg-stone-900 overflow-hidden shadow-xs">
                      <HotelImage src={room.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#a87a6d] font-bold uppercase tracking-wider block">
                        {room.categoryLabel}
                      </span>
                      <strong className="text-sm text-stone-900 font-serif block">{room.name}</strong>
                      <span className="text-stone-500">{room.bedConfig} • {room.sqm} m²</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100">
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] block font-semibold">Check-In</span>
                      <strong className="text-stone-900 text-sm block">{bookingState.checkIn}</strong>
                      <span className="text-stone-500">From 3:00 PM</span>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] block font-semibold">Check-Out</span>
                      <strong className="text-stone-900 text-sm block">{bookingState.checkOut}</strong>
                      <span className="text-stone-500">Until 12:00 PM</span>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] block font-semibold">Guests & Rooms</span>
                      <strong className="text-stone-900">{bookingState.adults} Adults ({bookingState.rooms} Room)</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] block font-semibold">Total Duration</span>
                      <strong className="text-stone-900">{nights} Night{nights > 1 ? 's' : ''}</strong>
                    </div>
                  </div>
                </div>

                {/* Guest & Payment Summary */}
                <div className="space-y-4 md:border-l md:border-stone-200 md:pl-8">
                  <div>
                    <span className="text-stone-400 uppercase text-[10px] block font-semibold">Registered Guest</span>
                    <strong className="text-stone-900 text-sm block">{formData.firstName} {formData.lastName}</strong>
                    <span className="text-stone-500">{formData.email} • {formData.phone}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase text-[10px] block font-semibold">Guarantee Method</span>
                    <strong className="text-stone-900 text-sm block">
                      {paymentMethod === 'card' ? `Credit Card (${cardData.cardType.toUpperCase()} ending in •••• ${cardData.cardNumber.slice(-4)})` : `PayPal (${paypalEmail})`}
                    </strong>
                    <span className="text-stone-500">No payment charged today. Pay upon departure.</span>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase text-[10px] block font-semibold">Total Authorized (Incl. Taxes & Fees)</span>
                    <div className="font-serif text-2xl font-bold text-stone-900">
                      {currency} {totalConverted.toLocaleString()} <span className="text-xs font-normal text-stone-500">({totalOMR} OMR)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Special Requests */}
              {formData.specialRequests && (
                <div className="p-4 bg-stone-50 border border-stone-200 text-xs text-stone-600">
                  <strong className="text-stone-900 block mb-1">Special Requests Noted for Front Desk:</strong>
                  <p>{formData.specialRequests}</p>
                </div>
              )}
            </div>

            {/* Arrival & Location Advice */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-600 bg-white border border-stone-200 p-6">
              <div className="space-y-1">
                <strong className="text-stone-900 block font-semibold">Direct Airport Access</strong>
                <p>Located just 10 minutes from Muscat International Airport (MCT) with direct limousine transfer available upon request.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-stone-900 block font-semibold">OCEC Direct Skybridge</strong>
                <p>Connected via an air-conditioned pedestrian skybridge to Oman Convention & Exhibition Centre.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-stone-900 block font-semibold">Need Assistance?</strong>
                <p>Contact 24/7 Concierge at <strong>+968 2492 0000</strong> or <strong>reservations.muscat@marriott.com</strong>.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-stone-500" />
                <span>Print Official Confirmation</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleGoToBookingsReport}
                  className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-[#caa296] font-semibold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Receipt className="w-3.5 h-3.5 text-[#caa296]" />
                  <span>View in Booking Reports & Folios</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 bg-[#4a564c] hover:bg-[#3d473f] text-white font-bold text-xs uppercase tracking-widest transition shadow-md cursor-pointer"
                >
                  Return to Hotel Sanctuary
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Steps 1 & 2: 2-Column Checkout Workflow */}
        {(step === 'details' || step === 'payment') && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* ===================================================================
                LEFT COLUMN (8 Cols): Progressive Checkout Form
               =================================================================== */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* STEP 1: GUEST DETAILS FORM */}
              {step === 'details' && (
                <form onSubmit={handleProceedToPayment} className="space-y-8">
                  
                  {/* Step Header */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a87a6d]">
                      Step 1 of 2 • Guest Details
                    </span>
                    <h2 className="font-serif text-3xl font-medium text-stone-900">
                      Who will be staying with us?
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm">
                      Please enter the details of the primary guest. Your confirmation and keyless mobile check-in details will be sent here.
                    </p>
                  </div>

                  {/* Primary Inputs Grid */}
                  <div className="bg-white border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-200">
                      Primary Contact Information
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                          placeholder="e.g. Alex"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                          placeholder="e.g. Vance"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                          placeholder="e.g. name@domain.com"
                        />
                        <span className="text-[11px] text-stone-400 mt-1 block">Confirmation will be emailed immediately</span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                          Mobile Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                          placeholder="e.g. +968 9123 4567"
                        />
                        <span className="text-[11px] text-stone-400 mt-1 block">For reservation updates & SMS itinerary</span>
                      </div>
                    </div>

                    {/* Marriott Bonvoy Membership Number */}
                    <div className="pt-4 border-t border-stone-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-stone-700 uppercase">
                          Marriott Bonvoy Membership Number (Optional)
                        </label>
                        <span className="text-[11px] text-[#a87a6d] font-semibold">
                          Earn +{bonvoyPointsEarned.toLocaleString()} Points
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.bonvoyNumber}
                        onChange={(e) => setFormData({ ...formData, bonvoyNumber: e.target.value })}
                        className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                        placeholder="e.g. MB-984210492"
                      />
                      <span className="text-[11px] text-stone-500 mt-1 block">
                        Include your Bonvoy number for Elite tier upgrades, free Wi-Fi, and credit towards status.
                      </span>
                    </div>

                  </div>

                  {/* Special Requests & Arrival Time */}
                  <div className="bg-white border border-stone-200 p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-200">
                      Personal Preferences & Special Requests
                    </div>

                    {/* Quick Selection Chips */}
                    <div>
                      <span className="text-xs text-stone-500 block mb-2.5">
                        Click any preference to add to your reservation request:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {requestOptions.map((opt, i) => {
                          const isSelected = formData.specialRequests.includes(opt);
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => toggleSpecialRequest(opt)}
                              className={`px-3 py-1.5 text-xs transition cursor-pointer border ${
                                isSelected
                                  ? 'bg-[#caa296]/20 border-[#caa296] text-stone-900 font-semibold'
                                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600'
                              }`}
                            >
                              {isSelected ? '✓ ' : '+ '} {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                        Detailed Note for Front Desk
                      </label>
                      <textarea
                        rows={3}
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="w-full border border-stone-300 p-3 text-xs focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                        placeholder="Please share any dietary requirements, connecting room requests, or celebrations..."
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 flex items-center space-x-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Continue Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                    >
                      Cancel & Return
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#4a564c] hover:bg-[#3d473f] text-white text-xs font-bold uppercase tracking-widest transition shadow-md flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Continue to Payment & Guarantee</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

              {/* STEP 2: PAYMENT & GUARANTEE FORM */}
              {step === 'payment' && (
                <form onSubmit={handleProcessPayment} className="space-y-8">
                  
                  {/* Step Header */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a87a6d]">
                      Step 2 of 2 • Guarantee & Payment
                    </span>
                    <h2 className="font-serif text-3xl font-medium text-stone-900">
                      Guaranteed Reservation with Zero Deposit
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm">
                      Your payment information is held securely to guarantee your room. <strong>No payment is charged today</strong>; you will settle all room charges at check-out.
                    </p>
                  </div>

                  {/* Payment Method Selector Tabs */}
                  <div className="bg-white border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                        Select Guarantee Method
                      </span>
                      <div className="flex items-center space-x-1.5 text-emerald-700 text-xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>PCI-DSS Level 1 Encrypted</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Option 1: Credit / Debit Card */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-5 border text-left transition-all relative cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-stone-900 bg-[#faf8f5] ring-2 ring-[#caa296]'
                            : 'border-stone-200 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-stone-900 text-sm">Credit or Debit Card</span>
                          <CreditCard className="w-5 h-5 text-[#a87a6d]" />
                        </div>
                        <p className="text-xs text-stone-500 mb-3">All major credit & debit cards</p>
                        <div className="flex items-center space-x-2">
                          <PaymentCardIcon type="card" className="h-4.5" />
                        </div>
                      </button>

                      {/* Option 2: PayPal */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-5 border text-left transition-all relative cursor-pointer ${
                          paymentMethod === 'paypal'
                            ? 'border-stone-900 bg-[#f4f7fb] ring-2 ring-[#0079C1]'
                            : 'border-stone-200 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-stone-900 text-sm">PayPal</span>
                          <PaymentCardIcon type="paypal" className="h-5" />
                        </div>
                        <p className="text-xs text-stone-500 mb-3">Connect your international PayPal account for guaranteed reservation</p>
                        <div className="inline-flex items-center px-2 py-0.5 bg-[#003087] text-white text-[10px] font-bold">
                          One-Touch Authorized
                        </div>
                      </button>
                    </div>

                    {/* Card Fields */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4 pt-4 border-t border-stone-200">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardData.cardholderName}
                            onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                            className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                            placeholder="Name as it appears on card"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5 flex items-center justify-between">
                            <span>Card Number *</span>
                            <PaymentCardIcon type={cardData.cardType} className="h-4" />
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="4532 0000 0000 8824"
                            value={cardData.cardNumber}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                            className="w-full border border-stone-300 p-3 text-sm font-mono focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                              Expiration (MM/YY) *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                              className="w-full border border-stone-300 p-3 text-sm font-mono focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5 flex items-center justify-between">
                              <span>CVV / Security Code *</span>
                              <span className="text-[10px] text-stone-400 font-normal">3-4 digits</span>
                            </label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              placeholder="•••"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                              className="w-full border border-stone-300 p-3 text-sm font-mono focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PayPal Fields */}
                    {paymentMethod === 'paypal' && (
                      <div className="space-y-4 pt-4 border-t border-stone-200">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 uppercase mb-1.5">
                            PayPal Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={paypalEmail}
                            onChange={(e) => setPaypalEmail(e.target.value)}
                            className="w-full border border-stone-300 p-3 text-sm focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 bg-[#fdfdfc]"
                            placeholder="paypal.account@email.com"
                          />
                        </div>
                        <div className="p-3 bg-[#f8faff] border border-[#d0e1fd] text-xs text-stone-700 flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Ready to link with Marriott International reservation engine</span>
                          </span>
                        </div>
                      </div>
                    )}

                  </div>

                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 flex items-center space-x-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="px-6 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center space-x-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Guest Details</span>
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-[#4a564c] hover:bg-[#3d473f] text-white text-xs font-bold uppercase tracking-widest transition shadow-md flex items-center space-x-2 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-[#caa296]" />
                      <span>Authorize & Complete Reservation</span>
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* ===================================================================
                RIGHT COLUMN (4 Cols): Sticky Luxury Stay Summary Card
               =================================================================== */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                
                {/* Stay Summary Card */}
                <div className="bg-white border border-stone-200 shadow-md p-6 space-y-6">
                  
                  {/* Room Photo & Header */}
                  <div className="space-y-3 pb-5 border-b border-stone-200">
                    <div className="relative h-44 w-full bg-stone-900 overflow-hidden shadow-xs">
                      <HotelImage
                        src={room.images[0]}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider border-l-2 border-[#caa296]">
                        {room.categoryLabel || room.category}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#a87a6d] font-bold">
                        JW Marriott Hotel Muscat
                      </span>
                      <h3 className="font-serif text-xl font-medium text-stone-900 leading-tight">
                        {room.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">{room.bedConfig} • {room.view}</p>
                    </div>
                  </div>

                  {/* Dates & Occupancy Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs text-stone-700 pb-5 border-b border-stone-200">
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] block font-semibold">Check-In</span>
                      <strong className="text-stone-900 text-sm block">{bookingState.checkIn}</strong>
                      <span className="text-stone-500">From 3:00 PM</span>
                    </div>

                    <div>
                      <span className="text-stone-400 uppercase text-[10px] block font-semibold">Check-Out</span>
                      <strong className="text-stone-900 text-sm block">{bookingState.checkOut}</strong>
                      <span className="text-stone-500">Until 12:00 PM</span>
                    </div>

                    <div>
                      <span className="text-stone-400 uppercase text-[10px] block font-semibold">Duration</span>
                      <strong className="text-stone-900">{nights} Night{nights > 1 ? 's' : ''}</strong>
                    </div>

                    <div>
                      <span className="text-stone-400 uppercase text-[10px] block font-semibold">Occupancy</span>
                      <strong className="text-stone-900">{bookingState.adults} Adults ({roomsCount} Room)</strong>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-xs text-stone-600 pb-5 border-b border-stone-200">
                    <div className="flex justify-between">
                      <span>Rate per night ({bookingState.rateType === 'member' ? 'Member Exclusive' : 'Flexible'}):</span>
                      <span className="text-stone-900 font-medium">{currency} {basePriceConverted.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Room Subtotal ({nights} nights x {roomsCount} room):</span>
                      <span className="text-stone-900 font-medium">{currency} {roomSubtotalConverted.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated Taxes & Fees (17%):</span>
                      <span className="text-stone-900 font-medium">{currency} {taxesConverted.toLocaleString()}</span>
                    </div>

                    <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                      <div>
                        <strong className="text-stone-900 text-sm block">Total Due at Check-Out:</strong>
                        <span className="text-[11px] text-stone-400">Includes all taxes & resort fees</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-stone-900">
                          {currency} {totalConverted.toLocaleString()}
                        </span>
                        <span className="block text-[11px] text-stone-500 font-normal">({totalOMR} OMR)</span>
                      </div>
                    </div>
                  </div>

                  {/* Bonvoy Points & Guarantee Highlights */}
                  <div className="space-y-2 text-xs text-stone-600">
                    <div className="flex items-center space-x-2 text-[#8c6d46]">
                      <Sparkles className="w-4 h-4 text-[#caa296] shrink-0" />
                      <span>Earn <strong>+{bonvoyPointsEarned.toLocaleString()}</strong> Marriott Bonvoy Points</span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Free cancellation up to 24h prior to arrival</span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>No upfront charge today • Pay at hotel</span>
                    </div>
                  </div>

                </div>

                {/* Direct Concierge Contact */}
                <div className="bg-[#f7f6f4] border border-stone-200 p-4 text-xs text-stone-600 space-y-2">
                  <div className="font-semibold text-stone-900 flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-[#caa296]" />
                    <span>Direct Concierge Assistance</span>
                  </div>
                  <p className="text-[11px]">
                    Questions regarding airport transfers or connecting rooms? Call <strong>+968 2492 0000</strong>.
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};
