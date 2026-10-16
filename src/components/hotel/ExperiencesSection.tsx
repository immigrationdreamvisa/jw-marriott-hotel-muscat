import React from 'react';
import { Leaf, Bird, Sun, Droplets, Sparkles, Coffee, Moon } from 'lucide-react';
import { HotelImage } from '../common/HotelImage';

export const ExperiencesSection: React.FC = () => {
  const experiences = [
    {
      id: 'jw-garden',
      title: 'The JW Garden & Herb Harvesting',
      category: 'Culinary & Garden',
      icon: Leaf,
      image: '/images/experiences/jw-garden.jpg',
      fallback: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=85',
      description: 'Grounded in our founder J. Willard Marriott’s passion for nature, our on-site courtyard garden flourishes with fresh rosemary, peppermint, wild basil, and citrus trees. Our master chefs harvest these botanicals daily for Pink Salt steaks and artisan mocktails.',
      highlight: 'Daily Chef’s Herb Garden Tour & Tasting at 4:30 PM'
    },
    {
      id: 'spa-suite',
      title: 'Spa by JW Sensory Treatment Suite',
      category: 'Holistic Wellness & Spa',
      icon: Sparkles,
      image: '/images/experiences/spa-suite.jpg',
      fallback: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
      description: 'Step into our on-site sensory sanctuary for customized rejuvenation. Features private couples massage suites, deep marble soaking tubs strewn with rose petals, native Omani Frankincense aromatherapy diffusers, and warm candlelight vitality lounges.',
      highlight: 'Daily Signature Aromatherapy & Couples Rituals'
    },
    {
      id: 'mindful-yoga',
      title: 'Sunlit Studio Yoga & Sound Healing',
      category: 'Mindful Wellness',
      icon: Sun,
      image: '/images/experiences/mindful-yoga.jpg',
      fallback: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85',
      description: 'Rebalance mind and body in our light-filled wellness studio opening directly onto the hotel’s courtyard pool and palm gardens. Professional resident instructors lead restorative Hatha yoga, pranayama breathwork, and Tibetan singing bowl sound healing.',
      highlight: 'Complimentary Morning Sessions: Tue, Thu & Sat at 7:00 AM'
    },
    {
      id: 'falaj-architecture',
      title: 'Ancient Falaj Waterway & Art Tour',
      category: 'Heritage & Architecture',
      icon: Droplets,
      image: '/images/experiences/falaj-architecture.jpg',
      fallback: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
      description: 'Our award-winning hotel design pays tribute to Oman’s historic UNESCO Falaj water networks. Stroll through sunlit limestone colonnades, cascading indoor reflection pools, and curated contemporary Omani bronze art installations across the hotel atrium.',
      highlight: 'Curated Hotel Architecture & Art Walking Tour on Request'
    },
    {
      id: 'qahwa-ceremony',
      title: 'Traditional Omani Qahwa & Date Protocol',
      category: 'Cultural Immersion',
      icon: Coffee,
      image: '/images/experiences/qahwa-ceremony.jpg',
      fallback: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85',
      description: 'Experience genuine Omani hospitality in our Grand Atrium Lobby with our daily afternoon coffee ritual. Savor freshly brewed cardamom-saffron coffee poured from traditional golden Dallah pots, paired with royal Khalas dates and warm Muscat halwa.',
      highlight: 'Complimentary Daily Ceremony in Grand Atrium at 4:00 PM'
    },
    {
      id: 'terrace-lounge',
      title: 'Poolside Wadi Fireside Lounge & Drinks',
      category: 'Evening Gathering',
      icon: Moon,
      image: '/images/experiences/terrace-lounge.jpg',
      fallback: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=85',
      description: 'As twilight falls across the resort, gather on our outdoor poolside terrace around warm bronze fire tables. Enjoy handcrafted botanical mocktails and cocktails from Tonika, cozy plush sofas, glowing lanterns, and ambient music under the hotel lights.',
      highlight: 'Nightly Fireside Lounge from 7:00 PM – Midnight'
    }
  ];

  return (
    <section id="experiences-section" className="py-16 bg-[#fafafa] border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block mb-2">
            Mindful Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
            Curated Hotel Experiences & Highlights
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2">
            Immerse yourself in authentic rituals, protected wetland nature, botanical discoveries, and mindful serenity tailored to restore balance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                className="bg-white border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-stone-900">
                    <HotelImage
                      src={exp.image}
                      fallbackSrc={exp.fallback}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#1c1c1c]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 backdrop-blur-xs flex items-center">
                      <Icon className="w-3 h-3 mr-1.5 text-[#c5a880]" />
                      {exp.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-medium text-stone-900">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center text-xs text-[#8c6d46] font-medium bg-stone-50/50">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#c5a880] shrink-0" />
                  <span className="truncate">{exp.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
