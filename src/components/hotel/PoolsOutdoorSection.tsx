import React from 'react';
import { Waves, Sun, Clock, ShieldCheck, Check, Sparkles, MapPin, Wine } from 'lucide-react';
import { HotelImage } from '../common/HotelImage';

export const PoolsOutdoorSection: React.FC = () => {
  const poolHighlights = [
    {
      title: '25-Meter Heated Lap Pool',
      subtitle: 'Adults & Fitness Swimming',
      description: 'Temperature-controlled lap pool situated adjacent to the serene wadi gardens, featuring underwater audio acoustic zones, marked swimming lanes, and panoramic vistas of Oman’s limestone hills.',
      depth: '1.2m – 1.8m Depth',
      temp: 'Heated / Chilled 28°C Year-Round',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Family Leisure Pool & Sun Terrace',
      subtitle: 'Gentle Zero-Entry Lounge',
      description: 'Expansive lagoon-style family pool fringed with native date palms, cushioned sun loungers, and private shaded poolside cabanas for relaxed afternoon lounging.',
      depth: '0.6m – 1.4m Depth',
      temp: 'Climate Regulated 29°C',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Children’s Splash Area (Family by JW)',
      subtitle: 'Safe Water Play for Kids',
      description: 'Dedicated shallow splash area featuring gentle water sprays and non-slip protective flooring, safely sheltered with UV protective sun canopies and supervised by certified staff.',
      depth: '0.3m Shallow Depth',
      temp: 'Warm 30°C Splash Water',
      image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const outdoorFeatures = [
    { title: 'Catch Poolside Grill & Bar', desc: 'Serving freshly prepared chilled juices, local seafood crudos, and light Mediterranean bites straight to your lounger.', icon: Wine },
    { title: 'Authentic Falaj Water Channels', desc: 'Cascading waterways inspired by Oman’s UNESCO falaj irrigation networks, circulating soothing sounds of fresh mountain water.', icon: Waves },
    { title: 'Complimentary Sun Amenities', desc: 'SPF sunscreens, chilled facial towels, infused citrus water stations, and reading material provided by our pool attendants.', icon: Sun },
    { title: 'Private Shaded Luxury Cabanas', desc: 'Furnished daybed cabanas with privacy curtains, USB charging ports, and dedicated beverage call bells (reserve in advance).', icon: Sparkles },
  ];

  return (
    <section id="pools-section" className="py-16 bg-white border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d29a82] block mb-2">
              Aquatic Wellness & Al Fresco Relaxation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Swimming Pools & Outdoor Sanctuaries
            </h2>
            <p className="text-stone-600 text-sm max-w-2xl mt-2 leading-relaxed">
              Immerse yourself in three distinct temperature-controlled outdoor pools nestled amidst native flora,
              cascading falaj channels, and the natural contours of Muscat's tranquil wadi landscape.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end text-xs text-stone-600 bg-stone-50 p-3 border border-stone-200">
            <div className="flex items-center space-x-1.5 font-semibold text-stone-900">
              <Clock className="w-3.5 h-3.5 text-[#d29a82]" />
              <span>Open Daily: 6:00 AM – 8:00 PM</span>
            </div>
            <span className="text-[11px] text-stone-500 mt-0.5">Lifeguards on duty • Pool towels provided</span>
          </div>
        </div>

        {/* 3 Pools Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {poolHighlights.map((pool, idx) => (
            <div
              key={idx}
              className="bg-stone-50 border border-stone-200 flex flex-col overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <HotelImage
                  src={pool.image}
                  alt={pool.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1">
                  {pool.subtitle}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-stone-900">{pool.title}</h3>
                  <p className="text-stone-600 text-xs mt-2.5 leading-relaxed">{pool.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 grid grid-cols-2 gap-2 text-[11px] text-stone-700 font-medium">
                  <div className="flex items-center space-x-1.5">
                    <Waves className="w-3.5 h-3.5 text-[#d29a82]" />
                    <span>{pool.depth}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#d29a82]" />
                    <span>{pool.temp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Outdoor Facilities & Services Bar */}
        <div className="mt-12 p-8 bg-[#242424] text-white">
          <div className="max-w-3xl mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#d29a82] font-semibold block mb-1">
              Guest Services & Al Fresco Living
            </span>
            <h3 className="font-serif text-2xl font-normal text-white">
              Outdoor Amenities & Poolside Comforts
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            {outdoorFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-[#d29a82] font-semibold text-sm">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
