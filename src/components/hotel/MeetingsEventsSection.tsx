import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, Calendar, Heart, Award, 
  Sparkles, Check, ChevronRight, X, Mail, Phone, CheckCircle2,
  Maximize2, ArrowRight, Music, Coffee, Compass, ShieldCheck, UtensilsCrossed
} from 'lucide-react';
import { MEETING_SPACES } from '../../data/jwMarriottMuscatData';
import { HotelImage } from '../common/HotelImage';

export const MeetingsEventsSection: React.FC = () => {
  const [rfpModalOpen, setRfpModalOpen] = useState(false);
  const [rfpSubmitted, setRfpSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'spaces'>('overview');

  useEffect(() => {
    if (!rfpModalOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRfpModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rfpModalOpen]);

  const [rfpData, setRfpData] = useState({
    eventType: 'Conference / Corporate Summit',
    attendees: '150',
    date: '2026-11-20',
    name: 'Alex Vance',
    email: 'alex.vance@marriottbonvoy.com',
    phone: '+968 9123 4567',
    cateringStyle: 'Executive Buffet & Coffee Breaks',
    notes: 'Inquiry regarding Grand Ballroom and Studio breakout spaces with OCEC bridge access.'
  });

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfpSubmitted(true);
    setTimeout(() => {
      setRfpSubmitted(false);
      setRfpModalOpen(false);
    }, 2800);
  };

  return (
    <section id="events-section" className="py-16 bg-white border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block mb-1">
              Summits, Galas & Conventions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Meetings, Conferences & Event Spaces
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5 max-w-2xl leading-relaxed">
              Directly connected via air-conditioned skybridge to the Oman Convention & Exhibition Centre (OCEC). Featuring over 2,200 m² of palatial pillarless ballrooms, 14 executive studios, and certified Marriott event masters.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-3">
            <button
              onClick={() => {
                setRfpData({ ...rfpData, eventType: 'Conference / Corporate Meeting' });
                setRfpModalOpen(true);
              }}
              className="bg-[#1c1c1c] text-white hover:bg-black px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition shadow-sm flex items-center"
            >
              <Calendar className="w-3.5 h-3.5 mr-2 text-[#c5a880]" />
              <span>Request a Proposal (RFP)</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-4 border-b border-stone-200 mt-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#1c1c1c] text-black font-bold'
                : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            Overview & OCEC Skybridge
          </button>
          <button
            onClick={() => setActiveTab('spaces')}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'spaces'
                ? 'border-[#1c1c1c] text-black font-bold'
                : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            Capacities & Floor Plans ({MEETING_SPACES.length} Spaces)
          </button>
        </div>

        {/* Tab 1: Overview & OCEC Skybridge */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                  <Building2 className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                  Direct Climate-Controlled Skybridge to OCEC
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium leading-snug">
                  Muscat’s Premier Gateway for Global Summits & Celebrations
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  JW Marriott Hotel Muscat is uniquely engineered for high-profile summits, ministerial conferences, and high-society banquets. Our direct indoor skybridge seamlessly bridges guests to the 22,000 sqm exhibition halls and 3,200-seat lyric theater of the Oman Convention & Exhibition Centre without braving outdoor temperatures.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#fbf9f6] border border-[#e8dfd5] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6d46] block">
                      1,100 m² Grand Ballroom
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-900">Pillarless Grandeur</h4>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      Accommodates up to 1,200 guests with 7.5-meter ceilings, crystal chandeliers, vehicle loading ramps, and motorized 4K projection screens.
                    </p>
                  </div>
                  <div className="p-4 bg-[#fbf9f6] border border-[#e8dfd5] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6d46] block">
                      Dedicated Event Hub
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-900">14 Dynamic Meeting Suites</h4>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      Equipped with high-definition Cisco video conferencing, natural wadi daylight, ergonomic Herman Miller seating, and live catering.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-600">
                  <div className="flex items-center">
                    <Check className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                    <span>Redundant 1 Gbps High-Speed Fiber Connectivity</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                    <span>Simultaneous Interpretation & Translation Booths</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                    <span>Certified Marriott Meeting & Green Event Planners</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <HotelImage
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80"
                  alt="Grand Ballroom Gala Setup at JW Marriott Muscat"
                  className="w-full h-80 sm:h-96 object-cover shadow-lg border border-stone-200"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 text-white text-xs border border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880] block">
                    Venue Spotlight
                  </span>
                  <p className="font-serif text-sm font-semibold">Grand Ballroom Gala Setup (1,200 Capacity)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Capacities Table & Technical Specs */}
        {activeTab === 'spaces' && (
          <div className="mt-8 space-y-6">
            <div className="overflow-x-auto border border-stone-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1c1c1c] text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3.5">Venue Name</th>
                    <th className="p-3.5">Area (m²)</th>
                    <th className="p-3.5">Reception</th>
                    <th className="p-3.5">Banquet</th>
                    <th className="p-3.5">Theater</th>
                    <th className="p-3.5">Dimensions</th>
                    <th className="p-3.5">Ceiling</th>
                    <th className="p-3.5">Special Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {MEETING_SPACES.map((space, i) => (
                    <tr key={i} className="hover:bg-stone-50 transition">
                      <td className="p-3.5 font-semibold text-stone-900">{space.name}</td>
                      <td className="p-3.5 text-stone-700 font-mono">{space.areaSqm} m²</td>
                      <td className="p-3.5 text-stone-700">{space.capacityReception}</td>
                      <td className="p-3.5 text-stone-700">{space.capacityBanquet}</td>
                      <td className="p-3.5 text-stone-700">{space.capacityTheater}</td>
                      <td className="p-3.5 text-stone-500 font-mono text-[11px]">{space.dimensions}</td>
                      <td className="p-3.5 text-stone-700">{space.ceilingHeight}</td>
                      <td className="p-3.5 text-stone-500 text-[11px] max-w-xs">{space.features}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-3">
              <span>Looking for custom stage rigging, 4K livestreaming, or simultaneous multilingual translation?</span>
              <button
                onClick={() => setRfpModalOpen(true)}
                className="px-5 py-2 bg-[#1c1c1c] text-white hover:bg-black font-semibold uppercase tracking-wider text-xs whitespace-nowrap"
              >
                Contact Event Services
              </button>
            </div>
          </div>
        )}
      </div>



      {/* RFP Modal */}
      {rfpModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setRfpModalOpen(false);
          }}
        >
          {/* Floating Top-Right Cross Button */}
          <button
            type="button"
            onClick={() => setRfpModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
            title="Close (Esc)"
            aria-label="Close RFP modal"
          >
            <X className="w-5 h-5 text-[#caa296] group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold uppercase tracking-wider pr-1">Close</span>
          </button>

          <div
            className="bg-white max-w-lg w-full rounded-none shadow-2xl relative my-4 sm:my-8 border border-stone-300 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Top Cross Bar */}
            <div className="sticky top-0 z-20 bg-[#1c1c1c] text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296] block">
                  JW Marriott Hotel Muscat
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  Request an Event Proposal (RFP)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRfpModalOpen(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-[#caa296]" />
                <span>Close</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[calc(85vh-70px)] overflow-y-auto">
              {rfpSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296] block">
                    Proposal Request Transmitted
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">Thank You, {rfpData.name}</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Your event proposal request for <strong>{rfpData.eventType}</strong> ({rfpData.attendees} guests) has been received. Our dedicated Marriott Certified Event Specialist at JW Marriott Hotel Muscat will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-stone-500 mb-4">
                    Tell us about your upcoming conference, executive summit, or corporate gala.
                  </p>

                  <form onSubmit={handleRfpSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Event Type / Package
                    </label>
                    <input
                      type="text"
                      required
                      value={rfpData.eventType}
                      onChange={(e) => setRfpData({ ...rfpData, eventType: e.target.value })}
                      className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Est. Attendees / Guests
                      </label>
                      <input
                        type="number"
                        required
                        value={rfpData.attendees}
                        onChange={(e) => setRfpData({ ...rfpData, attendees: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Target Date
                      </label>
                      <input
                        type="date"
                        required
                        value={rfpData.date}
                        onChange={(e) => setRfpData({ ...rfpData, date: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={rfpData.name}
                        onChange={(e) => setRfpData({ ...rfpData, name: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={rfpData.email}
                        onChange={(e) => setRfpData({ ...rfpData, email: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+968 9123 4567"
                      value={rfpData.phone}
                      onChange={(e) => setRfpData({ ...rfpData, phone: e.target.value })}
                      className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Event Details & Custom Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Audiovisual requirements, breakout studios, executive banquet catering, guest rooms block..."
                      value={rfpData.notes}
                      onChange={(e) => setRfpData({ ...rfpData, notes: e.target.value })}
                      className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1c1c1c] text-white py-3 font-semibold uppercase tracking-wider text-xs hover:bg-black transition mt-2 shadow-sm"
                  >
                    Submit Proposal Request to Sales Team
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
