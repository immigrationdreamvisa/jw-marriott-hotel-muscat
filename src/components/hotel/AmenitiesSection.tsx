import React, { useState } from 'react';
import { 
  Wifi, Waves, Sparkles, Dumbbell, Building2, Utensils, 
  Car, Zap, Clock, Users, Briefcase, Activity, 
  ShieldCheck, Coins, Shirt, Accessibility, Check 
} from 'lucide-react';

export const AmenitiesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'wellness' | 'convenience' | 'business'>('all');

  const amenities = [
    { name: 'High-Speed Wi-Fi', desc: 'Complimentary high-bandwidth internet in all rooms and public spaces', icon: Wifi, category: 'convenience' },
    { name: '3 Outdoor Swimming Pools', desc: '25m temperature-controlled lap pool, resort family pool & kids splash pool', icon: Waves, category: 'wellness' },
    { name: 'Spa by JW', desc: 'Sensory treatment suites, sauna, steam rooms & customized aromatherapy rituals', icon: Sparkles, category: 'wellness' },
    { name: '24/7 JW Fitness Center', desc: 'Latest Technogym cardio machines, free weights, yoga studio & trainer sessions', icon: Dumbbell, category: 'wellness' },
    { name: 'Direct OCEC Connection', desc: 'Air-conditioned footbridge directly into Oman Convention & Exhibition Centre', icon: Building2, category: 'business' },
    { name: '5 Dining Venues & Bars', desc: 'Pink Salt steakhouse, Kitchen 7, Catch poolside, Butter Buns sports lounge & JW Market', icon: Utensils, category: 'convenience' },
    { name: 'Complimentary Parking', desc: 'On-site covered self-parking and 24-hour valet parking services', icon: Car, category: 'convenience' },
    { name: 'Electric Vehicle (EV) Charging', desc: 'Dedicated fast EV charging stations available for guest vehicles', icon: Zap, category: 'convenience' },
    { name: '24-Hour In-Room Dining', desc: 'Freshly prepared chef specialties delivered to your room at any hour', icon: Clock, category: 'convenience' },
    { name: 'Family by JW Program', desc: 'Engaging kid-friendly workshops, outdoor scavenger hunts & splash zones', icon: Users, category: 'wellness' },
    { name: '2,200 m² Meeting Spaces', desc: '2 Pillarless Ballrooms, 14 conference rooms & executive teleconferencing', icon: Briefcase, category: 'business' },
    { name: 'Outdoor Jogging Circuit', desc: 'Dedicated trail weaving through the desert wadi and indigenous flora', icon: Activity, category: 'wellness' },
    { name: 'Foreign Currency Exchange', desc: 'On-site banking desk, international ATM & currency conversion', icon: Coins, category: 'convenience' },
    { name: 'Valet Dry Cleaning', desc: 'Same-day laundry, pressing, and delicate garment care services', icon: Shirt, category: 'convenience' },
    { name: 'Full Accessible Design', desc: 'Wheelchair-accessible rooms, roll-in showers, ramps, and audio alarms', icon: Accessibility, category: 'convenience' },
  ];

  const filtered = activeCategory === 'all'
    ? amenities
    : amenities.filter(a => a.category === activeCategory);

  return (
    <section className="py-16 bg-[#fafafa] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block mb-1">
              Property Features
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Featured Hotel Amenities
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Thoughtfully curated to enrich your stay with effortless comfort, revitalizing wellness, and world-class productivity.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 font-semibold uppercase tracking-wider rounded-none transition ${
                activeCategory === 'all' ? 'bg-[#1c1c1c] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              All ({amenities.length})
            </button>
            <button
              onClick={() => setActiveCategory('wellness')}
              className={`px-3 py-1.5 font-semibold uppercase tracking-wider rounded-none transition ${
                activeCategory === 'wellness' ? 'bg-[#1c1c1c] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Wellness & Pools
            </button>
            <button
              onClick={() => setActiveCategory('business')}
              className={`px-3 py-1.5 font-semibold uppercase tracking-wider rounded-none transition ${
                activeCategory === 'business' ? 'bg-[#1c1c1c] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Business & OCEC
            </button>
            <button
              onClick={() => setActiveCategory('convenience')}
              className={`px-3 py-1.5 font-semibold uppercase tracking-wider rounded-none transition ${
                activeCategory === 'convenience' ? 'bg-[#1c1c1c] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              Services
            </button>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 border border-stone-200 shadow-xs hover:border-stone-400 transition-all flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-[#c5a880] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-900 leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
