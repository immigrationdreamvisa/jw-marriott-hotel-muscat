import React from 'react';
import { Sparkles, Coffee, Wine, Laptop, Users, ShieldCheck, Sun } from 'lucide-react';
import { HotelImage } from '../common/HotelImage';

export const ExecutiveLoungeSection: React.FC = () => {
  const privileges = [
    { title: 'Gourmet Breakfast', time: '6:30 AM – 10:30 AM', desc: 'Made-to-order eggs, artisanal pastries, and freshly pressed botanical juices', icon: Coffee },
    { title: 'Traditional Afternoon Tea', time: '2:30 PM – 4:30 PM', desc: 'Handcrafted finger sandwiches, clotted cream scones, and loose-leaf brews', icon: Sun },
    { title: 'Evening Cocktails & Canapés', time: '5:30 PM – 7:30 PM', desc: 'Sommelier selected wines, house spirits, and hot & cold chef creations', icon: Wine },
    { title: 'Executive Boardroom Use', time: '2 Hours Complimentary', desc: 'High-tech private conference suite with 4K screen and conference audio', icon: Laptop },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1c1c1c] text-white overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Narrative */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center text-[#c5a880] text-[11px] font-bold uppercase tracking-[0.25em] mb-2">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Muscat’s Largest Club Sanctuary
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
                  The JW Executive Lounge
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  Perched on the hotel’s highest floors, our <strong>Executive Lounge</strong> represents the largest dedicated executive club in Muscat. Offering an atmosphere of unhurried elegance, it is a haven for both high-level productivity and peaceful rejuvenation with commanding sunset vistas over the surrounding wadi.
                </p>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {privileges.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <div key={i} className="p-3 bg-stone-900/80 border border-stone-800">
                        <div className="flex items-center space-x-2 text-[#c5a880] mb-1">
                          <Icon className="w-3.5 h-3.5" />
                          <h4 className="font-semibold text-xs text-white">{p.title}</h4>
                        </div>
                        <span className="text-[10px] text-[#c5a880] font-mono block mb-1">{p.time}</span>
                        <p className="text-[11px] text-stone-400 leading-snug">{p.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Eligibility Bar */}
              <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-3">
                <div className="flex items-center space-x-2 text-stone-300">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                  <span>Complimentary for Executive Room & Suite Guests + Marriott Bonvoy Platinum Elite & Above</span>
                </div>
                <a
                  href="#suites-section"
                  className="text-[#c5a880] hover:underline font-semibold uppercase text-[11px] tracking-wider"
                >
                  Explore Executive Rooms →
                </a>
              </div>
            </div>

            {/* Right Lounge Image */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-stone-900">
              <HotelImage
                src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80"
                alt="JW Executive Lounge Muscat"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                <span className="text-xs font-semibold">Panoramic Wadi View Terrace</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
