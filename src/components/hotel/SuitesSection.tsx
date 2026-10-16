import React from 'react';
import { Bed, Users, Maximize, Check, ArrowRight, Sparkles, Award, Eye } from 'lucide-react';
import { ROOMS_DATA } from '../../data/jwMarriottMuscatData';
import { Room } from '../../types/hotel';
import { HotelImage } from '../common/HotelImage';

interface SuitesSectionProps {
  currency: string;
  onProceedToBooking: (room: Room) => void;
  onViewRoomDetails?: (room: Room) => void;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({
  currency,
  onProceedToBooking,
  onViewRoomDetails,
}) => {
  // Filter suites
  const suites = ROOMS_DATA.filter((r) => r.category === 'suite');

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

  return (
    <section id="suites-section" className="py-16 bg-white border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d29a82] block mb-2">
              Bespoke Grandeur & Club Privileges
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Suites
            </h2>
            <p className="text-stone-600 text-sm max-w-2xl mt-2 leading-relaxed">
              Expansive residences boasting separate living and dining chambers, bespoke Omani woodwork, private balconies,
              and VIP Executive Lounge access on the uppermost levels.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#8c6d46] bg-[#fbf9f6] px-3.5 py-2 border border-[#e8ded1]">
            <Award className="w-4 h-4 text-[#c5a880]" />
            <span>Includes Full Executive Lounge Access & Breakfast</span>
          </div>
        </div>

        {/* Suites Cards */}
        <div className="space-y-10">
          {suites.map((suite, index) => {
            const priceConverted = Math.round(suite.pricePerNightOMR * mult);
            const memberPriceConverted = Math.round(suite.memberPriceOMR * mult);
            const isReversed = index % 2 === 1;

            return (
              <div
                key={suite.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-stone-200 bg-stone-50/50 p-6 sm:p-8 hover:shadow-lg transition-shadow group`}
              >
                {/* Images Gallery Preview */}
                <div className={`lg:col-span-7 space-y-2 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div 
                    onClick={() => onViewRoomDetails?.(suite)}
                    className="relative h-72 sm:h-96 overflow-hidden bg-stone-900 cursor-pointer"
                  >
                    <HotelImage
                      src={suite.images[0]}
                      alt={suite.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#1c1c1c]/90 text-white text-[11px] uppercase tracking-wider font-semibold px-3 py-1">
                      {suite.categoryLabel}
                    </div>
                    <div className="absolute top-4 right-4 bg-[#d29a82] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Executive Lounge VIP
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 bg-white/95 text-stone-900 text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-[#d29a82]" />
                        <span>View Suite Details & Gallery</span>
                      </span>
                    </div>
                  </div>
                  {/* Secondary thumbnails */}
                  <div className="grid grid-cols-2 gap-2 h-24 sm:h-28">
                    {suite.images.slice(1, 3).map((thumb, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => onViewRoomDetails?.(suite)}
                        className="relative overflow-hidden bg-stone-900 h-full cursor-pointer group/thumb"
                      >
                        <HotelImage
                          src={thumb}
                          alt={`${suite.name} thumbnail`}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                        />
                        {suite.imageCaptions?.[idx + 1] && (
                          <div className="absolute inset-x-0 bottom-0 bg-black/80 px-2 py-1 text-[10px] text-white font-medium truncate backdrop-blur-xs">
                            {suite.imageCaptions[idx + 1]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-5 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d29a82] block mb-1">
                      {suite.floors} • {suite.view}
                    </span>
                    <h3 
                      onClick={() => onViewRoomDetails?.(suite)}
                      className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium hover:text-[#d29a82] transition cursor-pointer"
                    >
                      {suite.name}
                    </h3>
                  </div>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {suite.description}
                  </p>

                  {/* Room Specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-200 text-xs text-stone-700">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Suite Area</span>
                      <strong className="text-stone-900 font-medium">{suite.sqm} m² ({suite.sqft} sq ft)</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Capacity</span>
                      <strong className="text-stone-900 font-medium">Up to {suite.maxGuests} Guests</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Bedding</span>
                      <strong className="text-stone-900 font-medium truncate block">{suite.bedConfig.split('+')[0]}</strong>
                    </div>
                  </div>

                  {/* Suite Features */}
                  <div className="space-y-1.5 text-xs text-stone-600">
                    {suite.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className="flex items-center">
                        <Check className="w-3.5 h-3.5 mr-2 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and CTA */}
                  <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                        Member Rate per night
                      </span>
                      <div className="flex items-baseline space-x-1">
                        <span className="font-serif text-3xl font-bold text-stone-900">
                          {currency} {memberPriceConverted.toLocaleString()}
                        </span>
                        <span className="text-stone-500 text-xs">/ night</span>
                      </div>
                      <span className="text-[10px] text-stone-400 block">
                        Standard: {currency} {priceConverted.toLocaleString()} ({suite.pricePerNightOMR} OMR)
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => onViewRoomDetails?.(suite)}
                        className="px-4 py-3 border border-stone-300 hover:bg-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider transition"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onProceedToBooking(suite)}
                        className="px-6 py-3 bg-[#4a564c] hover:bg-[#3d473e] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center space-x-2"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
