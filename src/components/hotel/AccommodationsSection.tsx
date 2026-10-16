import React from 'react';
import { Bed, Users, Maximize, Check, ArrowRight, ShieldCheck, Sparkles, Eye } from 'lucide-react';
import { ROOMS_DATA } from '../../data/jwMarriottMuscatData';
import { Room } from '../../types/hotel';
import { HotelImage } from '../common/HotelImage';

interface AccommodationsSectionProps {
  currency: string;
  onProceedToBooking: (room: Room) => void;
  onViewRoomDetails?: (room: Room) => void;
}

export const AccommodationsSection: React.FC<AccommodationsSectionProps> = ({
  currency,
  onProceedToBooking,
  onViewRoomDetails,
}) => {
  // Filter standard & executive rooms for Accommodations
  const rooms = ROOMS_DATA.filter((r) => r.category === 'deluxe' || r.category === 'premium' || r.category === 'executive');

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
    <section id="accommodations-section" className="py-16 bg-stone-50 border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d29a82] block mb-2">
              JW Marriott Muscat Guest Rooms
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Accommodations
            </h2>
            <p className="text-stone-600 text-sm max-w-2xl mt-2 leading-relaxed">
              Thoughtfully curated sanctuaries infused with soothing desert earth tones, Italian marble bathrooms,
              ergonomic work lounges, and panoramic views of the lush JW Garden or the natural wadi.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-stone-600 bg-white px-3.5 py-2 border border-stone-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Best Rate Guarantee • Complimentary High-Speed Wi-Fi</span>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => {
            const priceConverted = Math.round(room.pricePerNightOMR * mult);
            const memberPriceConverted = Math.round(room.memberPriceOMR * mult);

            return (
              <div
                key={room.id}
                className="bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Room Image */}
                <div 
                  onClick={() => onViewRoomDetails?.(room)}
                  className="relative h-64 sm:h-72 overflow-hidden bg-stone-900 cursor-pointer"
                >
                  <HotelImage
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1">
                    {room.categoryLabel}
                  </div>
                  {room.hasLoungeAccess && (
                    <div className="absolute top-3 right-3 bg-[#d29a82] text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Executive Lounge Access
                    </div>
                  )}
                  {room.imageCaptions?.[0] && (
                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 font-medium border-l-2 border-[#d29a82] shadow-sm">
                      {room.imageCaptions[0]}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/95 text-stone-900 text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center space-x-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#d29a82]" />
                      <span>View Room Details</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onViewRoomDetails?.(room)}
                      className="font-serif text-xl sm:text-2xl text-stone-900 font-medium hover:text-[#d29a82] transition cursor-pointer"
                    >
                      {room.name}
                    </h3>
                    <p className="text-stone-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Specs */}
                    <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-stone-100 text-xs text-stone-700">
                      <div className="flex items-center space-x-1.5">
                        <Maximize className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{room.sqm} m² ({room.sqft} sq ft)</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Up to {room.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center space-x-1.5 truncate">
                        <Bed className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{room.bedConfig.split('with')[0]}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5 text-xs text-stone-600 mb-6">
                      {room.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="w-3.5 h-3.5 mr-2 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                        From (Bonvoy Member Rate)
                      </span>
                      <div className="flex items-baseline space-x-1">
                        <span className="font-serif text-2xl font-bold text-stone-900">
                          {currency} {memberPriceConverted.toLocaleString()}
                        </span>
                        <span className="text-stone-500 text-xs">/ night</span>
                      </div>
                      <span className="text-[10px] text-stone-400 block">
                        Standard: {currency} {priceConverted.toLocaleString()} ({room.pricePerNightOMR} OMR)
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => onViewRoomDetails?.(room)}
                        className="px-3.5 py-2.5 border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider transition"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onProceedToBooking(room)}
                        className="px-5 py-2.5 bg-[#4a564c] hover:bg-[#3d473e] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center space-x-1.5"
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
