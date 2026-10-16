import React, { useState } from 'react';
import { Tag, Check, Calendar, ArrowRight, Sparkles, Info, ShieldCheck } from 'lucide-react';
import { HOTEL_OFFERS } from '../../data/jwMarriottMuscatData';
import { HotelOffer } from '../../types/hotel';
import { HotelImage } from '../common/HotelImage';

interface OffersSectionProps {
  onSelectOffer: (offer: HotelOffer) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onSelectOffer }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'credits' | 'romance' | 'family' | 'business'>('all');

  const filteredOffers = HOTEL_OFFERS.filter((offer) => {
    if (activeFilter === 'credits') return offer.id.includes('credit') || offer.id.includes('epicurean');
    if (activeFilter === 'romance') return offer.id.includes('romantic');
    if (activeFilter === 'family') return offer.id.includes('family');
    if (activeFilter === 'business') return offer.id.includes('business') || offer.id.includes('stay-longer');
    return true;
  });

  return (
    <section id="offers-section" className="py-16 bg-white border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block mb-1">
              Curated Escapes & Privileges
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium leading-tight">
              Hotel-Exclusive Offers & Packages
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Immerse yourself in authentic Omani hospitality with curated dining credits, wellness retreats, extended stay discounts, and family discovery adventures at JW Marriott Hotel Muscat.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed Best Rates with Marriott Bonvoy</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 py-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-none transition whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#1c1c1c] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Exclusive Offers ({HOTEL_OFFERS.length})
          </button>
          <button
            onClick={() => setActiveFilter('credits')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-none transition whitespace-nowrap ${
              activeFilter === 'credits'
                ? 'bg-[#1c1c1c] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Dining & Spa Credits
          </button>
          <button
            onClick={() => setActiveFilter('romance')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-none transition whitespace-nowrap ${
              activeFilter === 'romance'
                ? 'bg-[#1c1c1c] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Romantic Sanctuary
          </button>
          <button
            onClick={() => setActiveFilter('family')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-none transition whitespace-nowrap ${
              activeFilter === 'family'
                ? 'bg-[#1c1c1c] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Family by JW
          </button>
          <button
            onClick={() => setActiveFilter('business')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-none transition whitespace-nowrap ${
              activeFilter === 'business'
                ? 'bg-[#1c1c1c] text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Business & OCEC Delegate
          </button>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="border border-stone-200 hover:border-stone-400 transition-all bg-[#fafafa] flex flex-col justify-between group overflow-hidden shadow-xs hover:shadow-md"
            >
              <div>
                {/* Offer Image with Badge */}
                <div className="relative h-56 overflow-hidden bg-stone-900">
                  <HotelImage
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#1c1c1c] text-[#c5a880] text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                    {offer.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-[10px] font-mono px-2.5 py-0.5 border border-stone-300">
                    Promo Code: <strong>{offer.promoCode}</strong>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="p-6">
                  {offer.priceHighlight && (
                    <span className="text-[11px] text-[#8c6d46] font-bold uppercase tracking-wider block mb-1">
                      {offer.priceHighlight}
                    </span>
                  )}
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Inclusions */}
                  <div className="mt-4 pt-4 border-t border-stone-200 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Package Privileges:
                    </span>
                    {offer.includes.slice(0, 4).map((inc, i) => (
                      <div key={i} className="flex items-start text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#c5a880] mr-2 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>

                  {offer.termsAndConditions && (
                    <div className="mt-3 pt-2 text-[10px] text-stone-500 space-y-0.5">
                      <span className="font-semibold block uppercase text-stone-600">Terms & Conditions:</span>
                      {offer.termsAndConditions.map((term, tIdx) => (
                        <p key={tIdx}>• {term}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Offer Bottom Action */}
              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-stone-200 bg-white">
                <div className="flex items-center text-[11px] text-stone-500">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-stone-400" />
                  <span className="truncate max-w-[130px]">{offer.validDates}</span>
                </div>
                <button
                  onClick={() => onSelectOffer(offer)}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider bg-[#1c1c1c] text-white hover:bg-black px-4 py-2 transition shadow-xs"
                >
                  <span>Book Package</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
