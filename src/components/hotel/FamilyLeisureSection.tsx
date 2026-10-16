import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  Users, 
  Bed, 
  UtensilsCrossed, 
  Waves, 
  Eye, 
  X,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { HotelImage } from '../common/HotelImage';

interface FacilityItem {
  id: string;
  title: string;
  type: string;
  desc: string;
  badge: string;
  image: string;
  secondaryImage?: string;
  caption: string;
  secondaryCaption?: string;
  tag: string;
  highlights: string[];
  operationalDetails: string;
}

export const FamilyLeisureSection: React.FC = () => {
  // State for card with dual photos (Interconnecting rooms / sofa bed)
  const [selectedRoomPhotoIndex, setSelectedRoomPhotoIndex] = useState<number>(0);
  // State for detail modal
  const [activeModalItem, setActiveModalItem] = useState<FacilityItem | null>(null);

  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActiveModalItem(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeModalItem]);

  const confirmedFamilyFacilities: FacilityItem[] = [
    {
      id: 'splash-pool',
      title: 'Dedicated Children’s Splash Pool',
      type: 'Confirmed On-Site Facility',
      desc: 'Shallow 0.3m depth safe water play zone equipped with gentle jets, non-slip surfaces, and UV-filtering protective shade canopies.',
      badge: 'Available Daily',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1000&q=85',
      caption: 'Children’s Shallow 0.3m Water Play Splash Pool & Fountains',
      tag: 'Kids Water Play',
      highlights: ['0.3m Shallow Depth', 'UV Sun-Safe Canopies', 'Continuous Lifeguard Watch'],
      operationalDetails: 'Open 7:00 AM – 7:00 PM daily. Complimentary child-sized swim vests and pool toys available from the Towel Pavilion.'
    },
    {
      id: 'welcome-amenities',
      title: 'Family by JW In-Room Welcome Amenities',
      type: 'Confirmed On-Site Facility',
      desc: 'Age-appropriate organic toiletries, child-sized plush bathrobes, miniature slippers, and interactive mindfulness activity books upon arrival.',
      badge: 'Complimentary on Request',
      image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=85',
      caption: 'Child Welcome Amenity Set, Organic Toiletries & Plush Robes',
      tag: 'Room Comfort',
      highlights: ['Miniature Robes & Slippers', 'Organic Bath Amenities', 'Mindfulness Activity Kit'],
      operationalDetails: 'Select your children’s ages in pre-arrival preferences or request anytime via At Your Service® button on your room phone.'
    },
    {
      id: 'interconnecting-rooms',
      title: 'Interconnecting Family Rooms & Suites',
      type: 'Confirmed On-Site Facility',
      desc: 'Dedicated connecting door options between King and Double Double Deluxe Rooms to comfortably accommodate families of up to 6 persons.',
      badge: 'Guaranteed at Booking',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      secondaryImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
      caption: 'Connecting Double Bedroom with Interconnecting Doorway',
      secondaryCaption: 'Interconnecting Family Suite Bedroom & Daybed Lounge',
      tag: 'Connected Family Beds',
      highlights: ['Connecting Privacy Door', '2 Double Beds + King Bed / Sofa Bed', 'Two Full Marble Bathrooms'],
      operationalDetails: 'Guaranteed connecting configurations secured during room reservation. Ideal for 2 adults and up to 4 children.'
    },
    {
      id: 'childrens-dining',
      title: 'Children’s Dining at Kitchen 7 & Catch',
      type: 'Confirmed On-Site Facility',
      desc: 'Customized junior menus curated with wholesome nutrients, allergen-conscious options, high chairs, and child-safe cutlery at our restaurants.',
      badge: 'Available Daily',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85',
      caption: 'Nutritious Junior Menus & Wholesome Family Dining',
      tag: 'Fresh Culinary',
      highlights: ['Junior Chef Nutritious Menus', 'Allergen-Conscious Stations', 'Children Under 6 Dine Free'],
      operationalDetails: 'Available at Kitchen 7 and Catch poolside lounge during all meal periods. Pureed baby food available on complimentary request.'
    },
  ];

  const advanceBookingExperiences = [
    {
      title: 'Al Ansab Wetland Guided Naturalist Tour',
      status: 'Advance Booking Required',
      desc: 'Accompanied birdwatching expedition to Oman’s premier wetland sanctuary harboring flamingos and eagles. Includes child-friendly binoculars.',
      timing: '48-hour advance notice via Concierge',
      image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=600&q=80',
      badge: 'Nature Expedition'
    },
    {
      title: 'Junior Chef Masterclass (The JW Garden)',
      status: 'Advance Booking Required',
      desc: 'Hands-on pizza baking and herbal identification workshop in our organic garden led by our pastry chefs for children aged 5 to 12.',
      timing: 'Offered on weekends (requires prior registration)',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
      badge: 'JW Garden'
    },
    {
      title: 'Professional Certified Babysitting',
      status: 'Advance Booking Required',
      desc: 'Qualified and vetted childcare professionals providing in-room child supervision so parents can enjoy Spa by JW or evening dining at Pink Salt.',
      timing: '24-hour advance reservation required',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
      badge: 'Childcare'
    },
    {
      title: 'Private Family Stargazing & Campfire Storytelling',
      status: 'Advance Booking Required',
      desc: 'Telescope constellation viewing and traditional Omani folk legends shared around the outdoor wadi terrace fire pit.',
      timing: 'Scheduled seasonally upon guest request',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
      badge: 'Heritage Evening'
    },
  ];

  return (
    <section id="family-section" className="py-16 bg-[#fbf9f6] border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d29a82] block mb-2">
            Family by JW • Mindful Connection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
            Family & Leisure Experiences
          </h2>
          <p className="text-stone-600 text-sm mt-2 leading-relaxed">
            Thoughtfully crafted moments for multi-generational travelers. Our Muscat sanctuary fosters curiosity,
            well-being, and genuine togetherness amidst serene Omani landscapes.
          </p>
        </div>

        {/* 1. Confirmed On-Site Facilities (Permanent Features with Photos) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Confirmed On-Site Facilities (Always Available)</span>
            </div>
            <span className="hidden sm:inline-block text-[11px] font-sans text-stone-500 uppercase tracking-widest">
              Authentic Hotel Imagery
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {confirmedFamilyFacilities.map((item) => {
              const isRoomCard = item.id === 'interconnecting-rooms';
              const currentImg = (isRoomCard && selectedRoomPhotoIndex === 1 && item.secondaryImage)
                ? item.secondaryImage
                : item.image;
              const currentCaption = (isRoomCard && selectedRoomPhotoIndex === 1 && item.secondaryCaption)
                ? item.secondaryCaption
                : item.caption;

              return (
                <div
                  key={item.id}
                  className="bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Top Image Card */}
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <HotelImage
                        src={currentImg}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Pill: Category tag */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9.5px] font-medium tracking-wide uppercase rounded-xs">
                          {item.tag}
                        </span>
                      </div>

                      {/* Bottom Caption Pill */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 z-10">
                        <p className="text-[10px] text-white/90 font-sans truncate drop-shadow-xs">
                          {currentCaption}
                        </p>
                      </div>

                      {/* Room Bed / Sofa Bed Toggle buttons */}
                      {isRoomCard && item.secondaryImage && (
                        <div className="absolute top-2.5 right-2.5 z-20 flex gap-1 bg-black/75 backdrop-blur-xs p-0.5 rounded-xs">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoomPhotoIndex(0);
                            }}
                            className={`px-1.5 py-0.5 text-[9px] font-medium rounded-xs transition-colors ${
                              selectedRoomPhotoIndex === 0
                                ? 'bg-[#d29a82] text-white'
                                : 'text-stone-300 hover:text-white'
                            }`}
                            title="Deluxe 2 Double Beds"
                          >
                            2 Beds
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoomPhotoIndex(1);
                            }}
                            className={`px-1.5 py-0.5 text-[9px] font-medium rounded-xs transition-colors ${
                              selectedRoomPhotoIndex === 1
                                ? 'bg-[#d29a82] text-white'
                                : 'text-stone-300 hover:text-white'
                            }`}
                            title="Suite Pull-Out Sofa Bed"
                          >
                            Sofa Bed
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-semibold tracking-wider uppercase border border-emerald-200/60 rounded-xs">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-medium text-stone-900 mb-2 leading-snug group-hover:text-[#a06d4e] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-stone-600 text-xs leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-1.5 pt-3 border-t border-stone-100">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="text-[11px] text-stone-700 flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d29a82] shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="px-5 pb-5 pt-0">
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(item)}
                      className="w-full py-2 px-3 border border-stone-300 text-stone-800 hover:border-stone-800 hover:bg-stone-900 hover:text-white transition-all text-xs font-medium tracking-wide flex items-center justify-center space-x-1.5 group/btn cursor-pointer"
                    >
                      <span>Explore Facility Details</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Experiences Requiring Advance Confirmation (Enhanced with imagery) */}
        <div className="p-6 sm:p-8 bg-white border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#8c6d46]">
              <AlertCircle className="w-4 h-4 text-[#c5a880]" />
              <span>Special Family Experiences (Advance Confirmation Required)</span>
            </div>
            <span className="text-[11px] text-stone-500 font-sans">
              Concierge Desk Assisted
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advanceBookingExperiences.map((exp, i) => (
              <div 
                key={i} 
                className="flex flex-col sm:flex-row items-start bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors overflow-hidden group"
              >
                {/* Thumbnail Image */}
                <div className="w-full sm:w-44 h-36 sm:h-full relative shrink-0 overflow-hidden bg-stone-800">
                  <HotelImage
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-0.5 bg-black/65 backdrop-blur-xs text-white text-[9px] font-medium tracking-wide uppercase rounded-xs">
                      {exp.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-base font-medium text-stone-900 group-hover:text-[#a06d4e] transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-stone-600 text-xs mt-1.5 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-stone-200/60 text-[11px] font-medium text-[#8c6d46] flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                    <span>Notice:</span>
                    <span className="underline decoration-stone-300">{exp.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal for Family Cards */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
          onClick={() => setActiveModalItem(null)}
        >
          {/* Prominent Floating Top-Right Cross Button */}
          <button
            type="button"
            onClick={() => setActiveModalItem(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
            title="Close (Esc)"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#caa296] group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold uppercase tracking-wider pr-1">Close</span>
          </button>

          <div 
            className="bg-white max-w-xl w-full border border-stone-300 shadow-2xl relative overflow-hidden my-4 sm:my-8 flex flex-col rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Top Cross Bar */}
            <div className="sticky top-0 z-20 bg-[#1c1c1c] text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296] block">
                  Family by JW Muscat
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-[#caa296]" />
                <span>Close</span>
              </button>
            </div>

            {/* Modal Image Header */}
            <div className="relative aspect-video overflow-hidden bg-stone-900">
              <HotelImage
                src={
                  activeModalItem.id === 'interconnecting-rooms' && selectedRoomPhotoIndex === 1 && activeModalItem.secondaryImage
                    ? activeModalItem.secondaryImage
                    : activeModalItem.image
                }
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
                <span className="inline-block px-2 py-0.5 bg-[#d29a82] text-white text-[10px] font-semibold tracking-wider uppercase mb-1">
                  {activeModalItem.badge}
                </span>
                <p className="text-xs text-stone-200 mt-1">
                  {activeModalItem.id === 'interconnecting-rooms' && selectedRoomPhotoIndex === 1 && activeModalItem.secondaryCaption
                    ? activeModalItem.secondaryCaption
                    : activeModalItem.caption}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-stone-700 text-sm leading-relaxed mb-4">
                {activeModalItem.desc}
              </p>

              <div className="bg-stone-50 border border-stone-200 p-3.5 mb-5 rounded-xs">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Operational Guidelines</span>
                </div>
                <p className="text-stone-700 text-xs leading-relaxed">
                  {activeModalItem.operationalDetails}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
                  Key Inclusions & Amenities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalItem.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-stone-600 bg-stone-50/80 px-2.5 py-1.5 border border-stone-200/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href="#booking-engine"
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium tracking-wide transition-colors"
                >
                  Book Stay & Reserve Family Amenities
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
