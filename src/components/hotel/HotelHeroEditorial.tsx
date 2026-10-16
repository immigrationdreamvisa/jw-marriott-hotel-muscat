import React from 'react';
import { Compass, Calendar, Award, Building2, Plane, Sparkles, ArrowDown, ShieldCheck } from 'lucide-react';
import { JW_MARRIOTT_MUSCAT_DATA } from '../../data/jwMarriottMuscatData';
import { HotelImage } from '../common/HotelImage';

interface HotelHeroEditorialProps {
  onExploreClick: () => void;
  onCheckAvailabilityClick: () => void;
  isLoadingAvailability?: boolean;
}

export const HotelHeroEditorial: React.FC<HotelHeroEditorialProps> = ({
  onExploreClick,
  onCheckAvailabilityClick,
  isLoadingAvailability = false,
}) => {
  const hotel = JW_MARRIOTT_MUSCAT_DATA;

  return (
    <section className="relative bg-[#1c1c1c] text-white overflow-hidden border-b border-stone-800">
      {/* Grand Hero Backdrop with subtle dark vignette */}
      <div className="relative h-[540px] sm:h-[620px] lg:h-[680px] w-full overflow-hidden">
        <HotelImage
          src="https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-exterior-0242-hor-pano.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1920px:*"
          alt="JW Marriott Hotel Muscat - Architectural Grandeur & Wadi Courtyard"
          className="w-full h-full object-cover scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Editorial Gradients: Darker on left and bottom for flawless typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-black/40" />

        {/* Hero Narrative Overlay Content */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 z-10">
          <div className="max-w-3xl space-y-5 animate-fadeIn">
            {/* Eyebrow and Luxury Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d29a82] bg-black/40 backdrop-blur-xs px-3 py-1 border border-[#d29a82]/40">
                An Urban Sanctuary of Mindful Luxury
              </span>
              <span className="text-stone-400 hidden sm:inline">•</span>
              <span className="text-stone-300 text-xs font-medium tracking-wider">
                Madinat Al Irfan, Muscat, Sultanate of Oman
              </span>
            </div>

            {/* Property Grand Title */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1]">
              JW Marriott Hotel Muscat
            </h1>

            {/* Compelling Short Introduction */}
            <p className="text-stone-200 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl text-shadow-sm">
              Discover a five-star haven designed to nourish the spirit, connect with nature, and foster serenity. 
              Directly linked via an air-conditioned skybridge to the Oman Convention & Exhibition Centre (OCEC), 
              our LEED Gold Certified retreat overlooks the protected Al Ansab wetlands just 10 minutes from Muscat International Airport.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onCheckAvailabilityClick}
                disabled={isLoadingAvailability}
                className="px-8 py-3.5 bg-[#4a564c] hover:bg-[#3d473e] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer group disabled:opacity-85"
              >
                {isLoadingAvailability ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#d29a82] border-t-transparent rounded-full animate-spin" />
                    <span>Loading Hotel Rooms...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-[#d29a82]" />
                    <span>Check Availability</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Explore the Hotel</span>
                <ArrowDown className="w-3.5 h-3.5 ml-1 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Property Highlights Ticker */}
      <div className="bg-[#242424] border-t border-stone-800 py-3.5 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            <div className="flex items-center space-x-2.5">
              <Building2 className="w-4 h-4 text-[#d29a82] shrink-0" />
              <span>Direct Bridge Link to OCEC</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Plane className="w-4 h-4 text-[#d29a82] shrink-0" />
              <span>10 Min from MCT Airport</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Award className="w-4 h-4 text-[#d29a82] shrink-0" />
              <span>LEED Gold Certified Sanctuary</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-[#d29a82] shrink-0" />
              <span>6 Dining Venues & 3 Pools</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
