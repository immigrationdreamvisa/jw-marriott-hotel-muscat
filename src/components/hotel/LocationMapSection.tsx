import React, { useState } from 'react';
import { 
  MapPin, Plane, Building2, Car, Compass, 
  ExternalLink, Navigation, Clock, ShieldCheck, Zap 
} from 'lucide-react';
import { JW_MARRIOTT_MUSCAT_DATA } from '../../data/jwMarriottMuscatData';

export const LocationMapSection: React.FC = () => {
  const hotel = JW_MARRIOTT_MUSCAT_DATA;
  const [selectedPoi, setSelectedPoi] = useState<string>('mct');

  const pointsOfInterest = [
    {
      id: 'mct',
      name: 'Muscat International Airport (MCT)',
      distance: '10 km',
      time: '10–12 min drive',
      desc: 'Modern international hub connecting Oman to Europe, GCC, Asia, and worldwide.',
      type: 'airport',
      coords: { x: 42, y: 32 }
    },
    {
      id: 'ocec',
      name: 'Oman Convention & Exhibition Centre (OCEC)',
      distance: '0.1 km',
      time: 'Direct connected bridge',
      desc: 'Oman’s flagship venue for international summits, expos, and global summits.',
      type: 'business',
      coords: { x: 50, y: 55 }
    },
    {
      id: 'alansab',
      name: 'Al Ansab Wetland Nature Reserve',
      distance: '2.5 km',
      time: '5 min drive',
      desc: 'Protected international sanctuary for over 300 migratory birds and flamingos.',
      type: 'nature',
      coords: { x: 58, y: 62 }
    },
    {
      id: 'mosque',
      name: 'Sultan Qaboos Grand Mosque',
      distance: '12 km',
      time: '12 min drive',
      desc: 'Magnificent marble landmark with Persian carpet, Swarovski chandelier, and minarets.',
      type: 'culture',
      coords: { x: 68, y: 40 }
    },
    {
      id: 'opera',
      name: 'Royal Opera House Muscat',
      distance: '20 km',
      time: '18 min drive',
      desc: 'Shatti Al Qurum performing arts centre presenting world-class musical arts.',
      type: 'culture',
      coords: { x: 80, y: 30 }
    },
    {
      id: 'mutrah',
      name: 'Mutrah Souq & Old Waterfront',
      distance: '28 km',
      time: '25 min drive',
      desc: 'Historic coastal bazaar featuring frankincense, silver khanjars, and antique spices.',
      type: 'heritage',
      coords: { x: 90, y: 25 }
    }
  ];

  const activePoi = pointsOfInterest.find(p => p.id === selectedPoi) || pointsOfInterest[0];

  return (
    <section id="map-section" className="py-16 bg-[#fafafa] border-b border-stone-200 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block mb-1">
              Arrival & Exploration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-medium">
              Hotel Location & Transportation
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5 max-w-2xl">
              Strategically positioned in Madinat Al Irfan with seamless direct access to the Oman Convention & Exhibition Centre and rapid 10-minute transit to Muscat International Airport.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://www.google.com/maps/search/?api=1&query=JW+Marriott+Hotel+Muscat+Madinat+Al+Irfan"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1c1c1c] text-white hover:bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition shadow-sm flex items-center"
            >
              <Navigation className="w-3.5 h-3.5 mr-2 text-[#c5a880]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Map & Landmark Explorer Component */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Visual Map Representation */}
          <div className="lg:col-span-7 bg-[#1e232a] border border-stone-700 relative overflow-hidden h-[420px] rounded-xs shadow-md">
            {/* SVG Stylized Map of Muscat Coastline & Highway Network */}
            <svg viewBox="0 0 800 500" className="w-full h-full object-cover opacity-80">
              <defs>
                <linearGradient id="gulfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#152636" />
                  <stop offset="100%" stopColor="#0c1722" />
                </linearGradient>
              </defs>

              {/* Sea: Gulf of Oman */}
              <path
                d="M 0,0 L 800,0 L 800,160 Q 650,180 500,170 T 250,210 Q 100,240 0,260 Z"
                fill="url(#gulfGradient)"
              />
              <text x="350" y="80" fill="#44607a" fontSize="16" letterSpacing="4" fontFamily="serif">
                GULF OF OMAN
              </text>

              {/* Landmass background */}
              <path
                d="M 0,260 Q 100,240 250,210 T 500,170 Q 650,180 800,160 L 800,500 L 0,500 Z"
                fill="#1f252d"
              />

              {/* Sultan Qaboos Highway & Muscat Expressway Lines */}
              <path
                d="M 0,310 Q 200,280 400,270 T 800,230"
                stroke="#374151"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8 4"
              />
              <path
                d="M 0,390 Q 250,350 480,330 T 800,310"
                stroke="#374151"
                strokeWidth="3"
                fill="none"
              />
              <text x="520" y="320" fill="#6b7280" fontSize="10">Muscat Expressway</text>
              <text x="280" y="260" fill="#6b7280" fontSize="10">Sultan Qaboos St</text>

              {/* Al Ansab Wetland Oasis */}
              <circle cx="480" cy="350" r="30" fill="#1b332b" opacity="0.6" />
              <text x="440" y="395" fill="#34d399" fontSize="10">Al Ansab Wetland</text>

              {/* Airport Runway */}
              <line x1="300" y1="210" x2="380" y2="190" stroke="#4b5563" strokeWidth="6" />
              <text x="290" y="180" fill="#9ca3af" fontSize="11" fontWeight="bold">Muscat Int'l Airport (MCT)</text>

              {/* Madinat Al Irfan Zone */}
              <rect x="360" y="275" width="130" height="70" fill="#292e37" stroke="#4b5563" strokeDasharray="3 3" />
              <text x="370" y="295" fill="#c5a880" fontSize="10" fontWeight="bold">MADINAT AL IRFAN</text>

              {/* Pin 1: JW Marriott Hotel Muscat (Centerpiece) */}
              <g transform="translate(415, 310)">
                <circle cx="0" cy="0" r="16" fill="#c5a880" fillOpacity="0.3" className="animate-ping" />
                <circle cx="0" cy="0" r="9" fill="#c5a880" />
                <circle cx="0" cy="0" r="4" fill="#1c1c1c" />
                <rect x="-85" y="-35" width="170" height="24" rx="2" fill="#1c1c1c" stroke="#c5a880" strokeWidth="1" />
                <text x="0" y="-19" fill="#c5a880" fontSize="10" fontWeight="bold" textAnchor="middle">
                  JW MARRIOTT MUSCAT
                </text>
              </g>

              {/* Pin 2: OCEC */}
              <g transform="translate(390, 325)">
                <circle cx="0" cy="0" r="5" fill="#60a5fa" />
                <text x="-4" y="14" fill="#93c5fd" fontSize="9">OCEC</text>
              </g>

              {/* Pin 3: Sultan Qaboos Grand Mosque */}
              <g transform="translate(560, 260)">
                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                <text x="10" y="4" fill="#fcd34d" fontSize="9">Grand Mosque</text>
              </g>

              {/* Pin 4: Opera House */}
              <g transform="translate(680, 220)">
                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                <text x="10" y="4" fill="#fcd34d" fontSize="9">Royal Opera</text>
              </g>

              {/* Pin 5: Mutrah */}
              <g transform="translate(740, 190)">
                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
                <text x="-50" y="14" fill="#fcd34d" fontSize="9">Mutrah Souq</text>
              </g>
            </svg>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-[#14181f]/90 text-white text-[10px] p-2.5 rounded border border-stone-700 backdrop-blur-xs flex items-center space-x-3">
              <div className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880] mr-1.5" />
                <span>Hotel</span>
              </div>
              <div className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#60a5fa] mr-1.5" />
                <span>OCEC Bridge</span>
              </div>
              <div className="flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] mr-1.5" />
                <span>Landmarks</span>
              </div>
            </div>
          </div>

          {/* Points of Interest & Transfer Details */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-xl font-medium text-stone-900">
              Key Destinations & Transit Times
            </h3>

            {/* POI List */}
            <div className="space-y-2">
              {pointsOfInterest.map((poi) => (
                <button
                  key={poi.id}
                  onClick={() => setSelectedPoi(poi.id)}
                  className={`w-full text-left p-3 border transition flex items-start justify-between ${
                    selectedPoi === poi.id
                      ? 'bg-white border-[#1c1c1c] shadow-xs'
                      : 'bg-white/70 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="pr-3">
                    <span className="font-semibold text-xs text-stone-900 block">{poi.name}</span>
                    <span className="text-[11px] text-stone-500 mt-0.5 block">{poi.desc}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-stone-900 block font-mono">{poi.distance}</span>
                    <span className="text-[10px] text-[#8c6d46] block">{poi.time}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Parking & Airport Services Grid */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-stone-200">
                <div className="flex items-center space-x-1.5 text-stone-900 font-semibold mb-1">
                  <Car className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Complimentary Parking</span>
                </div>
                <p className="text-[11px] text-stone-500">Free covered self-parking & 24/7 valet parking for all guests.</p>
              </div>

              <div className="p-3 bg-white border border-stone-200">
                <div className="flex items-center space-x-1.5 text-stone-900 font-semibold mb-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>EV Charging Stations</span>
                </div>
                <p className="text-[11px] text-stone-500">Fast electric vehicle chargers available in the on-site garage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
