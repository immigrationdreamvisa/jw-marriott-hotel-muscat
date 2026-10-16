import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, Clock, Shirt, Sparkles, 
  Calendar, Check, X, CheckCircle2, ChevronRight,
  Leaf, Award, BookOpen, Flame, Wine, Coffee, Filter,
  Star, MapPin, Moon, Sun, Heart, Info, ArrowRight, ShieldCheck
} from 'lucide-react';
import { DINING_VENUES } from '../../data/jwMarriottMuscatData';
import { DiningVenue, MenuItem } from '../../types/hotel';
import { HotelImage } from '../common/HotelImage';

export const DiningSection: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<DiningVenue>(DINING_VENUES[0]);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('All');
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [tastingMenuModalOpen, setTastingMenuModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Lock body scroll and add Escape key listener
  useEffect(() => {
    const isAnyModalOpen = reserveModalOpen || menuModalOpen || tastingMenuModalOpen;
    if (!isAnyModalOpen) return;

    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setReserveModalOpen(false);
        setMenuModalOpen(false);
        setTastingMenuModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [reserveModalOpen, menuModalOpen, tastingMenuModalOpen]);

  const [reserveForm, setReserveForm] = useState({
    venueName: DINING_VENUES[0].name,
    date: '2026-10-15',
    time: '19:30',
    guests: '2 Guests',
    seatingPreference: 'Candlelit Wadi Terrace',
    occasion: 'Romantic Dinner',
    guestName: 'Alex Vance',
    guestPhone: '+968 9123 4567',
    guestEmail: 'alex.vance@marriottbonvoy.com',
    specialRequests: 'Window or terrace table overlooking the wadi water fountains.'
  });

  const handleOpenReserve = (venue: DiningVenue, customOccasion?: string) => {
    setSelectedVenue(venue);
    setReserveForm(prev => ({
      ...prev,
      venueName: venue.name,
      occasion: customOccasion || prev.occasion
    }));
    setReserveModalOpen(true);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setReserveModalOpen(false);
    }, 2800);
  };

  // Filter menu items for selected venue
  const allMenuItems = selectedVenue.fullMenu || [];
  const categories = ['All', ...(selectedVenue.menuCategories || [])];

  const filteredMenuItems = allMenuItems.filter((item) => {
    if (selectedMenuCategory === 'All') return true;
    return item.category === selectedMenuCategory;
  });

  const renderDietaryBadge = (tag: string) => {
    switch (tag) {
      case 'Chef Signature':
        return (
          <span key={tag} className="inline-flex items-center px-2 py-0.5 bg-[#c5a880]/15 text-[#8c6d46] border border-[#c5a880]/40 text-[9px] font-bold uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5 mr-1 text-[#c5a880]" />
            Signature
          </span>
        );
      case 'JW Garden Organic':
        return (
          <span key={tag} className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold uppercase tracking-wider">
            <Leaf className="w-2.5 h-2.5 mr-1 text-emerald-600" />
            JW Garden
          </span>
        );
      case 'Gluten-Free':
        return (
          <span key={tag} className="inline-flex items-center px-1.5 py-0.5 bg-stone-100 text-stone-700 text-[9px] font-semibold uppercase">
            GF
          </span>
        );
      case 'Vegan':
        return (
          <span key={tag} className="inline-flex items-center px-1.5 py-0.5 bg-emerald-100/60 text-emerald-800 text-[9px] font-semibold uppercase">
            Vegan
          </span>
        );
      case 'Vegetarian':
        return (
          <span key={tag} className="inline-flex items-center px-1.5 py-0.5 bg-lime-50 text-lime-800 text-[9px] font-semibold uppercase">
            Veg
          </span>
        );
      case 'Halal':
        return (
          <span key={tag} className="inline-flex items-center px-1.5 py-0.5 bg-stone-100 text-stone-600 text-[9px] font-semibold uppercase">
            Halal
          </span>
        );
      default:
        return null;
    }
  };

  const tastingCourses = [
    {
      course: 'Amuse-Bouche',
      title: 'Himalayan Pink Salt Seared Scallop',
      description: 'Hokkaido sea scallop flashed on a 250°C salt block with cauliflower velvet and truffle essence.',
      pairing: 'Laurent-Perrier La Cuvée Brut Champagne'
    },
    {
      course: 'First Course',
      title: 'Gulf Yellowfin Tuna Tartare',
      description: 'Hand-cut day-boat tuna with avocado emulsion, citrus ponzu pearls, and JW Garden microgreens.',
      pairing: 'Chablis Premier Cru, Domaine Laroche'
    },
    {
      course: 'Main Course (Choice of)',
      title: '45-Day Dry-Aged USDA Prime Wagyu OR Omani Rock Lobster',
      description: 'Charred over binchotan embers with bone marrow butter, black garlic jus, and roasted wadi asparagus.',
      pairing: 'Château Batailley Grand Cru Pauillac, Bordeaux'
    },
    {
      course: 'Grand Finale',
      title: 'Frankincense & Jebel Akhdar Rose Crème Brûlée',
      description: 'Silky custard perfumed with edible royal Hojari frankincense and fresh Nizwa pistachios.',
      pairing: 'Omani Royal Qahwa & Artisan Date Liqueur'
    }
  ];

  return (
    <section id="dining-section" className="py-16 bg-[#faf9f8] border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* =========================================================================
            1. SECTION HEADER WITH QUICK ACTIONS & VALUE BADGES
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block">
                Gastronomic Excellence
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                6 Award-Winning Venues
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium leading-tight">
              Culinary Journeys & Fine Dinner at JW Marriott Muscat
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              As twilight embraces the Omani plateau, savor memorable dinner moments across candlelit wadi terraces and theatrical show kitchens. From 45-day Himalayan salt-aged Tomahawk cuts at Pink Salt to 7 global interactive dinner buffets at Kitchen 7 and Mediterranean sunset plates at Catch.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-stone-600">
              <span className="inline-flex items-center px-2.5 py-1 bg-white border border-stone-200 shadow-2xs">
                <Check className="w-3 h-3 text-emerald-600 mr-1.5" />
                100% Certified Halal Poultry & Meats
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-white border border-stone-200 shadow-2xs">
                <Leaf className="w-3 h-3 text-emerald-600 mr-1.5" />
                Daily JW Garden Organic Herbs
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-white border border-stone-200 shadow-2xs">
                <Moon className="w-3 h-3 text-stone-700 mr-1.5" />
                Candlelit Wadi Outdoor Terraces
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setTastingMenuModalOpen(true)}
              className="px-5 py-2.5 border border-stone-300 hover:border-black text-stone-900 text-xs font-semibold uppercase tracking-wider transition bg-white flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>4-Course Tasting Menu</span>
            </button>
            <button
              onClick={() => handleOpenReserve(selectedVenue)}
              className="bg-[#1c1c1c] text-white hover:bg-black px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. FEATURED EVENING SPOTLIGHT: THE 3 SIGNATURE DINNER EXPERIENCES
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spotlight 1: Pink Salt */}
          <div 
            onClick={() => {
              setSelectedVenue(DINING_VENUES[0]);
              setSelectedMenuCategory('All');
            }}
            className="cursor-pointer group bg-white border border-stone-200 hover:border-stone-400 transition-all duration-300 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <HotelImage
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                  alt="Pink Salt Dry Aged Steakhouse"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1c1c1c]/90 text-[#c5a880] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
                  Signature Dinner
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-[10px] font-semibold px-2 py-0.5 shadow-xs">
                  6:30 PM – 11:30 PM
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6d46] block mb-1">
                  Fire & Himalayan Salt Block
                </span>
                <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-[#8c6d46] transition-colors">
                  Pink Salt
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  In-house glass maturation cellar dry-aging USDA Prime Tomahawks and grain-fed Wagyu. Flame-broiled Omani rock lobster and candlelit wadi terrace tables.
                </p>
                <div className="mt-3 flex items-center text-[11px] text-stone-500 font-medium">
                  <Wine className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                  <span>Curated Sommelier Wine Cellar</span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-stone-700">Dress: Smart Casual</span>
              <span className="text-[#8c6d46] font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform">
                Explore Menu <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Spotlight 2: Kitchen 7 */}
          <div 
            onClick={() => {
              setSelectedVenue(DINING_VENUES[1]);
              setSelectedMenuCategory('All');
            }}
            className="cursor-pointer group bg-white border border-stone-200 hover:border-stone-400 transition-all duration-300 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <HotelImage
                  src="https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-dsc03333-12808:Wide-Hor?wid=800&fit=constrain"
                  alt="Kitchen 7 Live Theater Buffet"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1c1c1c]/90 text-[#c5a880] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
                  Theatrical Dinner
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-[10px] font-semibold px-2 py-0.5 shadow-xs">
                  7:00 PM – 11:00 PM
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6d46] block mb-1">
                  7 Global Live Kitchens
                </span>
                <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-[#8c6d46] transition-colors">
                  Kitchen 7
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Interactive culinary theater with pit-roasted 24-hr Omani Shuwa, fresh wok sautés, live tandoor kofta, and Gulf seafood over crushed ice.
                </p>
                <div className="mt-3 flex items-center text-[11px] text-stone-500 font-medium">
                  <Flame className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                  <span>Themed Evenings (Omani, Seafood, Asian)</span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-stone-700">Dress: Casual Chic</span>
              <span className="text-[#8c6d46] font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform">
                Explore Menu <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Spotlight 3: Catch Pool Bar & Grill */}
          <div 
            onClick={() => {
              setSelectedVenue(DINING_VENUES[2]);
              setSelectedMenuCategory('All');
            }}
            className="cursor-pointer group bg-white border border-stone-200 hover:border-stone-400 transition-all duration-300 shadow-xs overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <HotelImage
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Catch Mediterranean Pool Grill"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#1c1c1c]/90 text-[#c5a880] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1">
                  Sunset & Poolside
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-[10px] font-semibold px-2 py-0.5 shadow-xs">
                  Until 8:00 PM Daily
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6d46] block mb-1">
                  Mediterranean Coastal
                </span>
                <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-[#8c6d46] transition-colors">
                  Catch Poolside Grill
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Al fresco poolside dinner overlooking the illuminated 25-meter lap pool. Wood-fired sourdough flatbreads, pan-seared local sea bass, and citrus coolers.
                </p>
                <div className="mt-3 flex items-center text-[11px] text-stone-500 font-medium">
                  <Sun className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                  <span>Open-Air Terrace & Cabana Dining</span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-stone-700">Dress: Resort Chic</span>
              <span className="text-[#8c6d46] font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform">
                Explore Menu <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. ALL VENUES SELECTOR TABS
           ========================================================================= */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Select Venue for Menus & Hours:
            </span>
            <span className="text-xs text-stone-500">
              Showing <strong>{selectedVenue.name}</strong>
            </span>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
            {DINING_VENUES.map((venue) => (
              <button
                key={venue.id}
                onClick={() => {
                  setSelectedVenue(venue);
                  setSelectedMenuCategory('All');
                }}
                className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border ${
                  selectedVenue.id === venue.id
                    ? 'bg-[#1c1c1c] text-white border-[#1c1c1c] shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-50 border-stone-200'
                }`}
              >
                {venue.name}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            4. SELECTED RESTAURANT SHOWCASE WITH FULL PRACTICAL INFORMATION
           ========================================================================= */}
        <div className="bg-white border border-stone-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Venue Image & Chef Signature Banner */}
            <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full bg-stone-900">
              <HotelImage
                src={selectedVenue.image}
                alt={selectedVenue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#1c1c1c]/90 text-[#c5a880] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 backdrop-blur-xs">
                {selectedVenue.cuisine}
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3.5 text-white text-xs border border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a880] block mb-0.5">
                  Chef’s Dinner Highlight
                </span>
                <p className="font-serif text-sm font-semibold text-white line-clamp-2">
                  {selectedVenue.signatureDish}
                </p>
              </div>
            </div>

            {/* Right: Narrative, Operating Hours, Chef Info, and Menu Snippet */}
            <div className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs text-[#8c6d46] font-semibold uppercase tracking-wider block mb-1">
                  {selectedVenue.tagline}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                  {selectedVenue.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {selectedVenue.description}
                </p>

                {/* Practical Hours & Dress Code Grid */}
                <div className="mt-5 p-4 bg-stone-50 border border-stone-200/90 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-start">
                    <Clock className="w-4 h-4 mr-2.5 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block text-[11px] uppercase tracking-wider">Service Hours</strong>
                      <span className="text-[11px] text-stone-600 leading-normal block mt-0.5">{selectedVenue.hours}</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shirt className="w-4 h-4 mr-2.5 text-[#c5a880] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block text-[11px] uppercase tracking-wider">Dress Code</strong>
                      <span className="text-[11px] text-stone-600 leading-normal block mt-0.5">{selectedVenue.dressCode}</span>
                    </div>
                  </div>
                </div>

                {/* Atmosphere & Features */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedVenue.features.map((feat, i) => (
                    <span key={i} className="inline-flex items-center text-[11px] bg-stone-100 text-stone-700 px-2.5 py-1 font-medium">
                      <Check className="w-3 h-3 text-[#c5a880] mr-1.5 shrink-0" />
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Chef Spotlight if available */}
                {selectedVenue.chef && (
                  <div className="mt-5 p-4 bg-[#fbf9f6] border border-[#e8dfd5] flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#1c1c1c] text-[#c5a880] flex items-center justify-center shrink-0 font-serif font-bold text-sm shadow-xs">
                      {selectedVenue.chef.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <strong className="text-xs text-stone-900">{selectedVenue.chef.name}</strong>
                        <span className="text-[10px] text-[#8c6d46] font-medium">— {selectedVenue.chef.title}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 italic mt-1 leading-relaxed">
                        “{selectedVenue.chef.quote}”
                      </p>
                    </div>
                  </div>
                )}

                {/* Signature Dishes Preview */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 flex items-center">
                      <Flame className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                      <span>Signature Dishes Preview:</span>
                    </h4>
                    <button
                      onClick={() => setMenuModalOpen(true)}
                      className="text-[11px] text-[#8c6d46] hover:text-black font-semibold flex items-center space-x-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Explore Full Menu ({allMenuItems.length} Dishes) →</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(selectedVenue.fullMenu?.slice(0, 3) || selectedVenue.menuHighlights).map((item: any, i) => (
                      <div key={i} className="p-3 bg-stone-50 border border-stone-200/80 text-xs flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-stone-900">{item.name || item.item}</span>
                            {item.dietary?.map((tag: string) => renderDietaryBadge(tag))}
                          </div>
                          <p className="text-[11px] text-stone-600 leading-relaxed">{item.description}</p>
                          {item.pairing && (
                            <span className="text-[10px] text-[#8c6d46] italic flex items-center">
                              <Wine className="w-2.5 h-2.5 mr-1" />
                              Wine Pairing: {item.pairing}
                            </span>
                          )}
                        </div>
                        {item.priceOMR && (
                          <div className="text-right shrink-0">
                            <span className="text-stone-900 font-mono font-semibold text-xs">
                              {item.priceOMR.toString().startsWith('Included') ? item.priceOMR : `OMR ${item.priceOMR}`}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setMenuModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 border border-stone-300 text-stone-800 hover:border-black text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center space-x-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>View Complete Menu</span>
                </button>

                <button
                  onClick={() => handleOpenReserve(selectedVenue)}
                  className="w-full sm:w-auto bg-[#1c1c1c] text-white hover:bg-black px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center space-x-1"
                >
                  <span>Book Table at {selectedVenue.name}</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. ROMANTIC WADI CANDLELIT PRIVATE DINING FEATURE
           ========================================================================= */}
        <div className="bg-[#1c1c1c] text-white p-7 sm:p-10 border border-stone-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a880] block">
                Exclusive Evening Celebration
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Bespoke Candlelit Dinner on the Wadi Terrace
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                Elevate anniversaries, proposals, and intimate family milestones with a private candlelit table situated beside flowing falaj water channels and starlit desert skies. Includes personalized 4-course menu by Executive Sous Chef Marco D’Souza, bespoke floral centerpiece, and dedicated butler service.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-400">
                <span className="flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                  Personalized 4-Course Degustation
                </span>
                <span className="flex items-center">
                  <Wine className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                  Sommelier Pairing Options
                </span>
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880] mr-1.5" />
                  24-Hour Advance Reservation
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => handleOpenReserve(DINING_VENUES[0], 'Private Candlelit Wadi Dinner')}
                className="w-full bg-[#caa296] hover:bg-[#b88f82] text-stone-900 font-semibold px-6 py-3 text-xs uppercase tracking-wider transition text-center shadow-xs"
              >
                Inquire for Private Dinner
              </button>
              <button
                onClick={() => setTastingMenuModalOpen(true)}
                className="w-full border border-stone-700 hover:border-white text-white font-semibold px-6 py-3 text-xs uppercase tracking-wider transition text-center"
              >
                View Degustation Menu
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            6. DINNER VENUES HOURS & ATMOSPHERE AT-A-GLANCE MATRIX
           ========================================================================= */}
        <div className="bg-white border border-stone-200 p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a880] block mb-1">
              Evening Dining Directory
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
              Dinner Hours, Atmosphere & Dress Codes at a Glance
            </h3>
          </div>

          <div className="overflow-x-auto border border-stone-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1c1c1c] text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Venue</th>
                  <th className="p-3.5">Cuisine Type</th>
                  <th className="p-3.5">Dinner Hours</th>
                  <th className="p-3.5">Outdoor Terrace</th>
                  <th className="p-3.5">Dress Code</th>
                  <th className="p-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {DINING_VENUES.map((venue) => (
                  <tr key={venue.id} className="hover:bg-stone-50 transition">
                    <td className="p-3.5 font-semibold text-stone-900">
                      {venue.name}
                    </td>
                    <td className="p-3.5 text-stone-600">{venue.cuisine}</td>
                    <td className="p-3.5 text-stone-800 font-mono text-[11px] font-medium">
                      {venue.hours.includes('Dinner') ? venue.hours.split('|').find(h => h.includes('Dinner')) || venue.hours : venue.hours}
                    </td>
                    <td className="p-3.5 text-stone-700">
                      <span className="inline-flex items-center text-emerald-700 font-medium">
                        <Check className="w-3 h-3 mr-1" />
                        Available
                      </span>
                    </td>
                    <td className="p-3.5 text-stone-600 text-[11px]">{venue.dressCode}</td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleOpenReserve(venue)}
                        className="text-[11px] text-[#8c6d46] hover:text-black font-semibold uppercase tracking-wider"
                      >
                        Book Table →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* =========================================================================
          MODAL 1: 4-COURSE CHEF'S TASTING DINNER EXPERIENCE
         ========================================================================= */}
      {tastingMenuModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTastingMenuModalOpen(false);
          }}
        >
          {/* Floating Top-Right Cross Button */}
          <button
            type="button"
            onClick={() => setTastingMenuModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
            title="Close (Esc)"
            aria-label="Close tasting menu modal"
          >
            <X className="w-5 h-5 text-[#caa296] group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold uppercase tracking-wider pr-1">Close</span>
          </button>

          <div
            className="bg-white max-w-2xl w-full rounded-none shadow-2xl relative my-4 sm:my-8 border border-stone-300 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Top Cross Bar */}
            <div className="sticky top-0 z-20 bg-[#1c1c1c] text-white p-5 sm:p-6 flex items-center justify-between border-b border-stone-800 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296]">
                  JW Marriott Hotel Muscat • Pink Salt
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  The Signature 4-Course Evening Degustation
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Curated by Head Griller Tariq Al Balushi • OMR 38 per guest (OMR 55 with wine pairing)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTastingMenuModalOpen(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-[#caa296]" />
                <span>Close</span>
              </button>
            </div>

            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5 text-xs text-stone-800">
              {tastingCourses.map((c, idx) => (
                <div key={idx} className="p-4 bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6d46]">
                      {c.course}
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500 uppercase">
                      Course {idx + 1} of 4
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-stone-900">
                    {c.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {c.description}
                  </p>
                  <div className="pt-1 flex items-center text-[11px] text-[#8c6d46]">
                    <Wine className="w-3 h-3 mr-1.5 shrink-0" />
                    <span>Sommelier Pairing: <strong>{c.pairing}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-stone-100 p-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-600">
                Vegetarian and seafood-only tasting menu adaptations available upon prior request.
              </span>
              <button
                onClick={() => {
                  setTastingMenuModalOpen(false);
                  handleOpenReserve(DINING_VENUES[0], '4-Course Evening Degustation');
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1c1c1c] text-white hover:bg-black font-semibold uppercase tracking-wider text-xs whitespace-nowrap"
              >
                Reserve Tasting Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: FULL CULINARY MENU VIEWER
         ========================================================================= */}
      {menuModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuModalOpen(false);
          }}
        >
          {/* Floating Top-Right Cross Button */}
          <button
            type="button"
            onClick={() => setMenuModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
            title="Close (Esc)"
            aria-label="Close menu modal"
          >
            <X className="w-5 h-5 text-[#caa296] group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold uppercase tracking-wider pr-1">Close</span>
          </button>

          <div
            className="bg-white max-w-3xl w-full rounded-none shadow-2xl relative my-4 sm:my-8 border border-stone-300 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Top Cross Bar */}
            <div className="sticky top-0 z-20 bg-[#1c1c1c] text-white p-5 flex items-center justify-between border-b border-stone-800 shadow-sm">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296]">
                  JW Marriott Hotel Muscat • {selectedVenue.cuisine}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {selectedVenue.name} — Full Menu
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMenuModalOpen(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-[#caa296]" />
                <span>Close</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="bg-stone-100 border-b border-stone-200 px-6 py-3 flex items-center space-x-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedMenuCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition ${
                    selectedMenuCategory === cat
                      ? 'bg-[#1c1c1c] text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items List */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {filteredMenuItems.length === 0 ? (
                <p className="text-center py-8 text-stone-500 text-xs">
                  No dishes found for this category.
                </p>
              ) : (
                filteredMenuItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-stone-200 hover:border-stone-400 transition bg-white flex flex-col sm:flex-row justify-between sm:items-start gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-base font-bold text-stone-900">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                          [{item.category}]
                        </span>
                        {item.dietary?.map((tag: string) => renderDietaryBadge(tag))}
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                      {item.pairing && (
                        <div className="flex items-center text-[11px] text-[#8c6d46] pt-1">
                          <Wine className="w-3 h-3 mr-1" />
                          <span>Recommended Wine Pairing: {item.pairing}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-left sm:text-right shrink-0 pt-1">
                      <span className="font-mono text-sm font-bold text-stone-900">
                        {item.priceOMR.toString().startsWith('Included') ? item.priceOMR : `OMR ${item.priceOMR}`}
                      </span>
                      <span className="text-[10px] text-stone-400 block">+ taxes & service</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Footer Actions */}
            <div className="bg-stone-50 p-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-stone-500 text-center sm:text-left">
                All poultry and meats are 100% certified Halal. Vegetarian, vegan & gluten-free options available.
              </span>
              <button
                onClick={() => {
                  setMenuModalOpen(false);
                  handleOpenReserve(selectedVenue);
                }}
                className="w-full sm:w-auto px-6 py-2 bg-[#1c1c1c] text-white hover:bg-black font-semibold uppercase tracking-wider text-xs whitespace-nowrap"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: TABLE RESERVATION MODAL
         ========================================================================= */}
      {reserveModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setReserveModalOpen(false);
          }}
        >
          {/* Prominent Floating Top-Right Cross Button (Always on screen) */}
          <button
            type="button"
            onClick={() => setReserveModalOpen(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
            title="Close (Esc)"
            aria-label="Close table reservation modal"
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
                  JW Marriott Hotel Muscat Dining
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  Reserve at {reserveForm.venueName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReserveModalOpen(false)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 hover:border-[#caa296] transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 text-[#caa296]" />
                <span>Close</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[calc(85vh-70px)] overflow-y-auto">
              {bookingConfirmed ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#caa296] block">
                    Reservation Confirmed
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-stone-900">Table Secured</h4>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                    Your table for {reserveForm.guests} at <strong>{reserveForm.venueName}</strong> on {reserveForm.date} at {reserveForm.time} ({reserveForm.seatingPreference}) is confirmed. A confirmation SMS & email have been sent to {reserveForm.guestEmail}.
                  </p>
                  <div className="pt-2 text-[11px] text-stone-500">
                    Confirmation Code: <strong>JWM-DIN-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-stone-500 mb-4">
                    Complimentary dining reservation with instant confirmation.
                  </p>

                  <form onSubmit={handleReserveSubmit} className="space-y-3 mt-1 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Venue
                    </label>
                    <select
                      value={reserveForm.venueName}
                      onChange={(e) => setReserveForm({ ...reserveForm, venueName: e.target.value })}
                      className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                    >
                      {DINING_VENUES.map((v) => (
                        <option key={v.id} value={v.name}>{v.name} ({v.cuisine})</option>
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
                        value={reserveForm.date}
                        onChange={(e) => setReserveForm({ ...reserveForm, date: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Dinner Time Slot
                      </label>
                      <select
                        value={reserveForm.time}
                        onChange={(e) => setReserveForm({ ...reserveForm, time: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black font-mono"
                      >
                        <option>18:30 (Sunset Seating)</option>
                        <option>19:00</option>
                        <option>19:30 (Prime Dinner)</option>
                        <option>20:00</option>
                        <option>20:30 (Prime Dinner)</option>
                        <option>21:00</option>
                        <option>21:30 (Late Evening)</option>
                        <option>22:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Party Size
                      </label>
                      <select
                        value={reserveForm.guests}
                        onChange={(e) => setReserveForm({ ...reserveForm, guests: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests (Couple)</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                        <option>5-6 Guests</option>
                        <option>Private Dining (7-14 Guests)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Seating Area
                      </label>
                      <select
                        value={reserveForm.seatingPreference}
                        onChange={(e) => setReserveForm({ ...reserveForm, seatingPreference: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      >
                        <option>Candlelit Wadi Terrace</option>
                        <option>Indoor Main Dining</option>
                        <option>Chef’s Counter</option>
                        <option>Private Dining Room</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Dining Occasion
                    </label>
                    <select
                      value={reserveForm.occasion}
                      onChange={(e) => setReserveForm({ ...reserveForm, occasion: e.target.value })}
                      className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                    >
                      <option>Romantic Dinner / Anniversary</option>
                      <option>Family Celebration</option>
                      <option>Business Dinner</option>
                      <option>Casual Dining with Friends</option>
                      <option>Private Candlelit Wadi Dinner</option>
                      <option>4-Course Evening Degustation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={reserveForm.guestName}
                      onChange={(e) => setReserveForm({ ...reserveForm, guestName: e.target.value })}
                      className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+968 9123 4567"
                        value={reserveForm.guestPhone}
                        onChange={(e) => setReserveForm({ ...reserveForm, guestPhone: e.target.value })}
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
                        placeholder="guest@domain.com"
                        value={reserveForm.guestEmail}
                        onChange={(e) => setReserveForm({ ...reserveForm, guestEmail: e.target.value })}
                        className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 uppercase mb-1">
                      Special Dietary / Seating Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Anniversary cake, food allergies, quiet wadi view, high chair..."
                      value={reserveForm.specialRequests}
                      onChange={(e) => setReserveForm({ ...reserveForm, specialRequests: e.target.value })}
                      className="w-full border border-stone-300 p-2 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1c1c1c] text-white py-3 font-semibold uppercase tracking-wider text-xs hover:bg-black transition mt-2 shadow-sm"
                  >
                    Confirm Table Reservation
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
