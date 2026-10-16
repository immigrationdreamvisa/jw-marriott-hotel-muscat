import React, { useState, useEffect } from 'react';
import { 
  Building, Compass, Waves, UtensilsCrossed, Clock, ChevronDown, ChevronUp,
  Sparkles, Award, ShieldCheck, ArrowRight, Leaf, MapPin, Feather, Droplets, X, Check, Calendar, Users
} from 'lucide-react';
import { JW_MARRIOTT_MUSCAT_DATA } from '../../data/jwMarriottMuscatData';
import { HotelImage } from '../common/HotelImage';

export const HotelOverviewSection: React.FC = () => {
  const hotel = JW_MARRIOTT_MUSCAT_DATA;
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  useEffect(() => {
    if (isBookModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsBookModalOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isBookModalOpen]);

  // Table reservation draft state
  const [partySize, setPartySize] = useState('2');
  const [resDate, setResDate] = useState('2026-10-15');
  const [resTime, setResTime] = useState('7:30 PM');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const keyFacts = [
    { label: '304 Serene Rooms & Suites', sub: 'Wadi & garden panoramas with Italian marble baths', icon: Building },
    { label: '6 Dining Destinations', sub: 'Kitchen 7, Pink Salt, Catch, Butter Buns, JW Market & Tonika', icon: UtensilsCrossed },
    { label: '3 Temperature Pools', sub: '25m heated lap pool, family pool & kids splash area', icon: Waves },
    { label: 'Air-Conditioned OCEC Bridge', sub: 'Direct pedestrian link to Oman Convention Centre', icon: Compass },
    { label: 'Spa by JW & 24/7 Fitness', sub: 'Sensory treatment suites, sauna, steam & Technogym', icon: Sparkles },
    { label: 'LEED Gold Certified', sub: 'Pioneering sustainable luxury design in the Middle East', icon: Award },
  ];

  const pillars = [
    {
      title: 'Inspired by Omani Falaj Architecture',
      description: 'The property’s flowing water channels, sunlit atrium, and natural limestone pay reverent tribute to Oman’s centuries-old falaj irrigation systems and geological wadis.',
      icon: Droplets
    },
    {
      title: 'Adjacent to Al Ansab Wetland',
      description: 'Overlooking a protected sanctuary harboring over 300 species of indigenous and migratory birds, including eagles and flamingos.',
      icon: Feather
    },
    {
      title: 'Mindful Wellness & The JW Garden',
      description: 'From organic herbs harvested daily for our restaurants to mindful yoga on the wadi deck, mindfulness is woven into every experience.',
      icon: Leaf
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationConfirmed(true);
    setTimeout(() => {
      setReservationConfirmed(false);
      setIsBookModalOpen(false);
    }, 2500);
  };

  return (
    <section id="overview-section" className="py-16 bg-[#faf9f8] border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* =========================================================================
            FEATURED SECTION: "AT THIS HOTEL" - EXACTLY LIKE REFERENCE IMAGE
            - Header: AT THIS HOTEL (centered, tracked)
            - 50/50 Card: Real Kitchen 7 Photo on Left, Details & Hours on Right
            - Mon-Thu,Sun & Fri-Sat operating times with Clock icon
            - "More ⌄" expandable details & "[Book a Table]" button
           ========================================================================= */}
        <div>
          <div className="text-center mb-6">
            <span className="text-[11px] font-normal tracking-[0.3em] uppercase text-stone-500 block">
              AT THIS HOTEL
            </span>
          </div>

          <div className="max-w-5xl mx-auto bg-white border border-stone-200/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              {/* Left Column: Authentic Kitchen 7 Photo from Marriott CDN */}
              <div className="md:col-span-6 relative min-h-[300px] sm:min-h-[360px] bg-stone-100">
                <HotelImage
                  src="https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-dsc03333-12808:Wide-Hor?wid=1336&fit=constrain"
                  alt="Kitchen 7 Restaurant Interior at JW Marriott Hotel Muscat"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column: Restaurant Information & Operating Hours */}
              <div className="md:col-span-6 p-7 sm:p-9 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-light tracking-wide text-stone-900 uppercase">
                    KITCHEN 7
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 font-normal">
                    International
                  </p>

                  <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed mt-4 font-normal">
                    Enjoy a tasteful selection of international cuisines, Asian woks, Middle Eastern grills, European breads and Indian tandoors while watching the chefs at work in the open kitchen of our lively restaurant.
                  </p>

                  {/* Hours with Clock Icon */}
                  <div className="mt-6 pt-4 border-t border-stone-100 space-y-2.5">
                    <div className="flex items-center text-stone-600 mb-1">
                      <Clock className="w-4 h-4 text-stone-600 mr-2 shrink-0" strokeWidth={1.5} />
                    </div>

                    <div className="grid grid-cols-12 gap-2 text-xs">
                      <span className="col-span-5 text-stone-700 font-normal">Mon-Thu,Sun</span>
                      <div className="col-span-7 space-y-0.5 text-stone-900 font-normal">
                        <div>6:30 AM-10:30 AM</div>
                        <div>12:30 PM-4:00 PM</div>
                        <div>6:30 PM-10:30 PM</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 text-xs pt-1">
                      <span className="col-span-5 text-stone-700 font-normal">Fri-Sat</span>
                      <div className="col-span-7 space-y-0.5 text-stone-900 font-normal">
                        <div>6:30 AM-11:00 AM, 12:30 PM-4:00 PM, 6:30 PM-10:30 PM</div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable "More" disclosure */}
                  {isMoreOpen && (
                    <div className="mt-4 pt-4 border-t border-dashed border-stone-200 text-xs text-stone-600 space-y-1.5 animate-fadeIn">
                      <div><strong>Dress Code:</strong> Smart Casual (No athletic apparel)</div>
                      <div><strong>Cuisine:</strong> 7 Interactive Live Theatrical Stations (Asian, Levantine, Tandoor, Rotisserie)</div>
                      <div><strong>Location:</strong> Ground Floor with Wadi Terrace seating</div>
                      <div><strong>Direct Inquiries:</strong> +968 24-920000</div>
                    </div>
                  )}
                </div>

                {/* Bottom Row: "More ⌄" and "Book a Table" */}
                <div className="mt-6 pt-4 flex items-center justify-between border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className="text-xs text-stone-800 hover:text-black font-normal flex items-center space-x-1 cursor-pointer select-none"
                  >
                    <span>More</span>
                    {isMoreOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(true)}
                    className="border border-stone-400 hover:border-black text-stone-900 px-6 py-2 text-xs font-normal tracking-wide transition-colors cursor-pointer bg-white"
                  >
                    Book a Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Editorial & Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-stone-200">
          {/* Left Column: Narrative Editorial */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d29a82] block mb-2">
                An Urban Sanctuary of Mindful Luxury
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium leading-tight">
                Welcome to JW Marriott Hotel Muscat
              </h2>
            </div>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Nestled within the prestigious Madinat Al Irfan district of Oman’s historic capital, 
              <strong> JW Marriott Hotel Muscat</strong> is an authentic five-star urban retreat designed to enrich 
              the mind, nourish the body, and foster meaningful human connection. Directly connected via an air-conditioned 
              pedestrian skybridge to the <em>Oman Convention & Exhibition Centre (OCEC)</em>, our LEED Gold Certified sanctuary 
              stands just 10 minutes from Muscat International Airport.
            </p>

            <p className="text-stone-600 text-sm leading-relaxed">
              Every detail celebrates Oman’s rich cultural legacy — from the delicate scent of <em>Hojari frankincense</em> greeting 
              you in our sunlit grand atrium to water features inspired by ancient <em>Falaj</em> mountain channels. 
              Whether you are savoring dry-aged cuts at <em>Pink Salt</em>, dining at <em>Kitchen 7</em>, swimming in our 25-meter heated 
              lap pool, or conducting global enterprise in Muscat’s most expansive Executive Lounge, you will discover the transformative 
              art of being fully present.
            </p>

            {/* Quick Actions / Link Outs */}
            <div className="pt-2 flex flex-wrap gap-5 text-xs font-semibold uppercase tracking-wider">
              <a
                href="#dining-section"
                className="inline-flex items-center text-stone-900 border-b-2 border-[#1c1c1c] pb-1 hover:text-[#d29a82] hover:border-[#d29a82] transition"
              >
                <span>Explore 6 Dining Venues</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
              <a
                href="#accommodations-section"
                className="inline-flex items-center text-stone-600 border-b-2 border-stone-300 pb-1 hover:text-black hover:border-black transition"
              >
                <span>View Guest Rooms & Beds</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
              <a
                href="#suites-section"
                className="inline-flex items-center text-stone-600 border-b-2 border-stone-300 pb-1 hover:text-black hover:border-black transition"
              >
                <span>Suites & Sofa Bed Living</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Exterior & Accolades Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-none shadow-xl border border-stone-200 bg-white">
              <HotelImage
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85"
                alt="JW Marriott Hotel Muscat Architectural Exterior & Wadi Gardens"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#d29a82] block">
                  Global Hospitality Accolades
                </span>
                <h4 className="font-serif text-lg text-stone-900 font-medium">
                  Leading Luxury Urban Resort in Oman 2024–2026
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Honored for sustainable architectural excellence, green building leadership, and premier gastronomy across the Sultanate of Oman.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-[11px] text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>LEED Gold Certified • Zero Single-Use Plastics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Philosophical Pillars */}
        <div className="pt-8 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-5 bg-white border border-stone-200 rounded-none space-y-2 hover:border-stone-400 transition">
                <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-[#d29a82] shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {pillar.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Property Highlights Grid */}
        <div className="pt-8 border-t border-stone-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {keyFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <div key={index} className="space-y-2 p-3.5 rounded bg-white border border-stone-200/80 hover:border-stone-400 transition">
                  <div className="w-8 h-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-[#d29a82] shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 leading-snug">
                    {fact.label}
                  </h4>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    {fact.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Interactive Table Booking Modal for Kitchen 7 */}
      {isBookModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsBookModalOpen(false);
          }}
        >
          {/* Prominent Floating Top-Right Cross Button */}
          <button
            type="button"
            onClick={() => setIsBookModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
            title="Close (Esc)"
            aria-label="Close table reservation modal"
          >
            <X className="w-5 h-5 text-[#caa296] group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold uppercase tracking-wider pr-1">Close</span>
          </button>

          <div
            className="bg-white max-w-md w-full rounded-none shadow-2xl relative my-4 sm:my-8 border border-stone-300 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Top Cross Bar */}
            <div className="sticky top-0 z-20 bg-[#1c1c1c] text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296] block">
                  JW Marriott Hotel Muscat
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  Reserve a Table at Kitchen 7
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-[#caa296]" />
                <span>Close</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[calc(85vh-70px)] overflow-y-auto">
              {reservationConfirmed ? (
                <div className="text-center py-8 space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296] block">
                    Table Reserved
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">Kitchen 7 Awaits You</h4>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                    Your reservation for {partySize} guests on {resDate} at {resTime} has been confirmed. A confirmation SMS has been sent.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-stone-500 mb-4">
                    International cuisines and live theatrical show kitchens.
                  </p>

                  <form onSubmit={handleBookingSubmit} className="space-y-3 mt-1 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                          Party Size
                        </label>
                        <select
                          value={partySize}
                          onChange={(e) => setPartySize(e.target.value)}
                          className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-stone-800"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="6">6 Guests</option>
                          <option value="8+">8+ Guests</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                          Time
                        </label>
                        <select
                          value={resTime}
                          onChange={(e) => setResTime(e.target.value)}
                          className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-stone-800"
                        >
                          <option value="6:30 AM">6:30 AM (Breakfast)</option>
                          <option value="8:00 AM">8:00 AM (Breakfast)</option>
                          <option value="12:30 PM">12:30 PM (Lunch)</option>
                          <option value="1:30 PM">1:30 PM (Lunch)</option>
                          <option value="7:00 PM">7:00 PM (Dinner)</option>
                          <option value="7:30 PM">7:30 PM (Dinner)</option>
                          <option value="8:30 PM">8:30 PM (Dinner)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={resDate}
                        onChange={(e) => setResDate(e.target.value)}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                        Guest Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-stone-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-600 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+968 ..."
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-stone-800"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 bg-[#1c1c1c] text-white py-3 font-semibold uppercase tracking-wider text-xs hover:bg-black transition shadow-sm cursor-pointer"
                    >
                      Confirm Table Reservation
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
