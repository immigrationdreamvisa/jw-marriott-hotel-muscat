import React, { useState, useEffect } from 'react';
import { Sparkles, Dumbbell, Waves, Heart, Clock, Check, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { HotelImage } from '../common/HotelImage';

export const WellnessPoolsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pools' | 'spa' | 'fitness' | 'family'>('pools');
  const [spaMenuModalOpen, setSpaMenuModalOpen] = useState(false);
  const [spaBookingModalOpen, setSpaBookingModalOpen] = useState(false);
  const [spaBooked, setSpaBooked] = useState(false);

  useEffect(() => {
    const isAnyModalOpen = spaMenuModalOpen || spaBookingModalOpen;
    if (!isAnyModalOpen) return;

    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSpaMenuModalOpen(false);
        setSpaBookingModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [spaMenuModalOpen, spaBookingModalOpen]);

  const [spaForm, setSpaForm] = useState({
    treatment: 'Dhofar Frankincense Signature Ritual (90 Mins)',
    date: '2026-10-22',
    time: '14:00',
    guestName: 'Alex Vance',
    guestPhone: '+968 9123 4567',
    notes: 'Gentle pressure, focus on neck and shoulders.'
  });

  const spaTreatments = [
    {
      name: 'Dhofar Frankincense Signature Ritual',
      duration: '90 Minutes',
      priceOMR: '65.000',
      category: 'Signature Rituals',
      description: 'Our celebrated wellness journey. Starts with a frankincense foot bath, followed by a warm botanical oil body massage and inhalation therapy using rare Green Hojari resin.'
    },
    {
      name: 'Warm Marble Stone & Herbal Compress Massage',
      duration: '75 Minutes',
      priceOMR: '55.000',
      category: 'Body Therapy',
      description: 'Smooth Omani marble stones heated to therapeutic temperature, applied with lavender and eucalyptus oil to melt deep-seated muscular stiffness.'
    },
    {
      name: 'Moroccan Argan & Rose Body Glow',
      duration: '60 Minutes',
      priceOMR: '45.000',
      category: 'Exfoliation & Hammam',
      description: 'Traditional black eucalyptus soap scrub with Kessa mitt, followed by pure organic Argan oil hydration and Jebel Akhdar rose mist.'
    },
    {
      name: 'De-Stress Aromatherapy Deep Sleep Massage',
      duration: '60 Minutes',
      priceOMR: '48.000',
      category: 'Body Therapy',
      description: 'Clinically developed rhythmic Swedish and acupressure strokes using custom Aromatherapy Associates blends to re-align circadian rhythms.'
    },
    {
      name: 'Revitalizing Marine Collagen Facial',
      duration: '60 Minutes',
      priceOMR: '52.000',
      category: 'Facial Aesthetics',
      description: 'Deep pore enzymatic peel, cryo-sculpting lymphatic massage, and hydrating algae mask for radiant youthfulness.'
    },
    {
      name: 'Couple’s Wadi Sanctuary Retreat',
      duration: '120 Minutes',
      priceOMR: '115.000',
      category: 'Couples Sanctuary',
      description: 'Private VIP double suite with deep hydrotherapy tub soak, side-by-side full body frankincense massages, and fresh strawberry mocktails.'
    }
  ];

  const handleSpaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSpaBooked(true);
    setTimeout(() => {
      setSpaBooked(false);
      setSpaBookingModalOpen(false);
    }, 2800);
  };

  return (
    <section id="wellness-section" className="py-16 bg-white border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block mb-2">
            Mindful Well-Being
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
            Spa by JW, Pools & Fitness Center
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2">
            Invigorate your senses across three outdoor temperature-controlled pools, holistic botanical therapies at Spa by JW, and 24/7 Technogym fitness facilities.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center space-x-2 border-b border-stone-200 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('pools')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition whitespace-nowrap ${
              activeTab === 'pools'
                ? 'bg-[#1c1c1c] text-white shadow-xs'
                : 'text-stone-600 hover:text-black hover:bg-stone-100'
            }`}
          >
            3 Swimming Pools (25m Lap Pool)
          </button>
          <button
            onClick={() => setActiveTab('spa')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition whitespace-nowrap ${
              activeTab === 'spa'
                ? 'bg-[#1c1c1c] text-white shadow-xs'
                : 'text-stone-600 hover:text-black hover:bg-stone-100'
            }`}
          >
            Spa by JW & Saunas
          </button>
          <button
            onClick={() => setActiveTab('fitness')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition whitespace-nowrap ${
              activeTab === 'fitness'
                ? 'bg-[#1c1c1c] text-white shadow-xs'
                : 'text-stone-600 hover:text-black hover:bg-stone-100'
            }`}
          >
            24/7 JW Fitness Center
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition whitespace-nowrap ${
              activeTab === 'family'
                ? 'bg-[#1c1c1c] text-white shadow-xs'
                : 'text-stone-600 hover:text-black hover:bg-stone-100'
            }`}
          >
            Family by JW Program
          </button>
        </div>

        {/* Tab 1: Pools */}
        {activeTab === 'pools' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8c6d46]">
                Outdoor Aquatic Sanctuaries
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
                Three Temperature-Controlled Swimming Pools
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Framed by native date palms and Omani rock gardens, our outdoor pool oasis offers three distinct aquatic zones tailored for lap training, leisurely soaking, and family splash time.
              </p>
              <div className="space-y-3 pt-2 text-xs text-stone-700">
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-[#c5a880] mr-2 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-serif text-sm">25-Meter Heated Lap Pool</strong>
                    <span className="text-stone-500">Dedicated swimming lanes designed for endurance cardio and morning laps overlooking the wadi.</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-[#c5a880] mr-2 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-serif text-sm">Resort Leisure Pool & Cabanas</strong>
                    <span className="text-stone-500">Curved lagoon-style pool served by Catch Pool Bar with poolside service, sun loungers, and plush towels.</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-[#c5a880] mr-2 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block font-serif text-sm">Dedicated Children's Splash Pool</strong>
                    <span className="text-stone-500">Shallow, sun-protected play pool with fun water features designed safely for young swimmers.</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 flex items-center text-xs text-stone-500 space-x-4">
                <span>Hours: <strong>7:00 AM – 8:00 PM Daily</strong></span>
                <span>•</span>
                <span>Lifeguard on duty</span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <HotelImage
                src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=1000&q=80"
                alt="JW Marriott Muscat Swimming Pool & Wadi Oasis"
                className="w-full h-80 object-cover shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Spa by JW */}
        {activeTab === 'spa' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <HotelImage
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80"
                alt="Spa by JW Treatment Suite & Frankincense Aromatherapy"
                className="w-full h-80 object-cover shadow-lg"
              />
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8c6d46]">
                Sensory Restoration & Aromatherapy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
                Spa by JW
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Step into a world of tailored tranquility designed around four key benefits: Calm, Indulge, Invigorate, and Renew. Spa by JW blends time-tested Omani botanical therapies with contemporary clinical techniques.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-stone-50 border border-stone-200">
                  <h4 className="font-semibold text-stone-900">Frankincense Ritual</h4>
                  <p className="text-[11px] text-stone-500 mt-1">90-minute signature massage infused with Dhofar Frankincense essential oils to relieve stress and muscle tension.</p>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200">
                  <h4 className="font-semibold text-stone-900">Steam & Sauna Suite</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Separate men’s and women’s thermal facilities, ice fountains, and sensory relaxation loungers.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setSpaMenuModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 border border-stone-300 hover:border-black text-stone-800 text-xs font-semibold uppercase tracking-wider transition"
                >
                  View Spa Menu ({spaTreatments.length} Treatments)
                </button>
                <button
                  onClick={() => setSpaBookingModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#1c1c1c] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  Book Spa Treatment
                </button>
              </div>

              <div className="pt-1 text-xs text-stone-500">
                <span>Appointments: <strong>9:00 AM – 10:00 PM</strong> | In-room treatments available for suite guests</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Fitness */}
        {activeTab === 'fitness' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8c6d46]">
                Performance & Vitality
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
                24/7 JW Fitness Center
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Stay energised during your stay in Muscat with our expansive, light-filled fitness center. Equipped with high-performance Technogym equipment, panoramic floor-to-ceiling windows, and dedicated wellness zones.
              </p>
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#c5a880] mr-2" />
                  <span>Cardiovascular machines with interactive HD screens and streaming apps</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#c5a880] mr-2" />
                  <span>Free weights, kettlebells, and Technogym multi-functional strength towers</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#c5a880] mr-2" />
                  <span>Dedicated yoga studio with mats, resistance bands, and foam rollers</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#c5a880] mr-2" />
                  <span>Outdoor scenic jogging track winding through the wadi landscaping</span>
                </li>
              </ul>
              <div className="pt-2 text-xs text-stone-500">
                <span>Access: <strong>24 Hours Daily</strong> with guest room keycard</span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <HotelImage
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=80"
                alt="JW Fitness Center Muscat Technogym Equipment"
                className="w-full h-80 object-cover shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Family */}
        {activeTab === 'family' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <HotelImage
                src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80"
                alt="Family by JW Children's Swimming Pool & Splash Play"
                className="w-full h-80 object-cover shadow-lg"
              />
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#8c6d46]">
                Connection & Joy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium">
                Family by JW
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Inspired by the belief that family time should be meaningful and enriching, Family by JW offers thoughtfully curated experiences that encourage children and parents to play, create, and explore nature together.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-stone-50 border border-stone-200">
                  <h4 className="font-semibold text-stone-900">Junior Chef Baking Workshop</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Interactive pizza and cookie decorating sessions led by our pastry chefs at Kitchen 7.</p>
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200">
                  <h4 className="font-semibold text-stone-900">Wadi Nature Scavenger Hunt</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Guided exploration discovering indigenous plants, falaj channels, and bird habitats.</p>
                </div>
              </div>
              <div className="pt-2 text-xs text-stone-500">
                <span>Children under 12 receive custom welcome backpacks and amenity kits upon check-in</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spa Menu Modal */}
      {spaMenuModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSpaMenuModalOpen(false);
          }}
        >
          {/* Prominent Floating Top-Right Cross Button */}
          <button
            type="button"
            onClick={() => setSpaMenuModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
            title="Close (Esc)"
            aria-label="Close spa menu modal"
          >
            <X className="w-5 h-5 text-[#caa296] group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold uppercase tracking-wider pr-1">Close</span>
          </button>

          <div
            className="bg-white max-w-2xl w-full rounded-none shadow-2xl relative my-4 sm:my-8 border border-stone-300 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Top Cross Bar */}
            <div className="sticky top-0 z-20 bg-[#1c1c1c] text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296] block">
                  JW Marriott Hotel Muscat • Holistic Wellness
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  Spa by JW — Treatment Menu
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSpaMenuModalOpen(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-[#caa296]" />
                <span>Close</span>
              </button>
            </div>

            <div className="p-6 max-h-[calc(85vh-130px)] overflow-y-auto space-y-4">
              {spaTreatments.map((treatment, idx) => (
                <div key={idx} className="p-4 border border-stone-200 hover:border-stone-400 transition bg-white flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-serif text-base font-bold text-stone-900">{treatment.name}</h4>
                      <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 uppercase tracking-wider font-semibold">
                        {treatment.duration}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8c6d46] font-semibold uppercase tracking-wider block mt-0.5">
                      {treatment.category}
                    </span>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-lg">
                      {treatment.description}
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 pt-1">
                    <span className="font-mono text-sm font-bold text-stone-900">
                      OMR {treatment.priceOMR}
                    </span>
                    <button
                      onClick={() => {
                        setSpaForm({ ...spaForm, treatment: `${treatment.name} (${treatment.duration})` });
                        setSpaMenuModalOpen(false);
                        setSpaBookingModalOpen(true);
                      }}
                      className="block mt-2 text-[11px] font-bold uppercase tracking-wider text-black underline hover:text-[#c5a880]"
                    >
                      Book This
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-stone-50 p-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-stone-500">All treatments include access to steam, sauna, and relaxation vitality lounge.</span>
              <button
                onClick={() => {
                  setSpaMenuModalOpen(false);
                  setSpaBookingModalOpen(true);
                }}
                className="w-full sm:w-auto px-5 py-2 bg-[#1c1c1c] text-white hover:bg-black font-semibold uppercase tracking-wider text-xs"
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spa Booking Modal */}
      {spaBookingModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSpaBookingModalOpen(false);
          }}
        >
          {/* Prominent Floating Top-Right Cross Button */}
          <button
            type="button"
            onClick={() => setSpaBookingModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
            title="Close (Esc)"
            aria-label="Close spa booking modal"
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
                  Spa by JW Muscat
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  Book Your Treatment
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSpaBookingModalOpen(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-[#caa296]" />
                <span>Close</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[calc(85vh-70px)] overflow-y-auto">
              {spaBooked ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296] block">
                    Spa Appointment Scheduled
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">We Await You</h4>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                    Your appointment for <strong>{spaForm.treatment}</strong> on {spaForm.date} at {spaForm.time} has been reserved. Please arrive 15 minutes early to enjoy the thermal vitality suites.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-stone-500 mb-4">
                    Relax and restore in our private sensory wellness suites.
                  </p>

                  <form onSubmit={handleSpaSubmit} className="space-y-3 mt-1 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Treatment
                      </label>
                      <select
                        value={spaForm.treatment}
                        onChange={(e) => setSpaForm({ ...spaForm, treatment: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      >
                        {spaTreatments.map((t, idx) => (
                          <option key={idx}>{t.name} ({t.duration}) - OMR {t.priceOMR}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          required
                          value={spaForm.date}
                          onChange={(e) => setSpaForm({ ...spaForm, date: e.target.value })}
                          className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                          Time
                        </label>
                        <select
                          value={spaForm.time}
                          onChange={(e) => setSpaForm({ ...spaForm, time: e.target.value })}
                          className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                        >
                          <option>10:00 AM</option>
                          <option>11:30 AM</option>
                          <option>01:00 PM</option>
                          <option>02:30 PM</option>
                          <option>04:00 PM</option>
                          <option>05:30 PM</option>
                          <option>07:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Guest Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={spaForm.guestName}
                        onChange={(e) => setSpaForm({ ...spaForm, guestName: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={spaForm.guestPhone}
                        onChange={(e) => setSpaForm({ ...spaForm, guestPhone: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Special Health / Pressure Preferences
                      </label>
                      <textarea
                        rows={2}
                        value={spaForm.notes}
                        onChange={(e) => setSpaForm({ ...spaForm, notes: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#1c1c1c] text-white py-3 font-semibold uppercase tracking-wider text-xs hover:bg-black transition mt-2 shadow-sm"
                    >
                      Confirm Spa Appointment
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
