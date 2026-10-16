import { HotelData, GalleryImage, Room, DiningVenue, HotelOffer, MeetingSpace, WeddingPackage } from '../types/hotel';

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'hero-exterior',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
    title: 'Hotel Exterior & Sunlit Wadi Courtyard',
    category: 'Exterior & Grounds',
    description: 'Contemporary Omani architectural grandeur set against the tranquil Madinat Al Irfan landscape.'
  },
  {
    id: 'hero-lobby',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    title: 'Grand Atrium Lobby with Natural Light',
    category: 'Exterior & Grounds',
    description: 'Sculptural brass light installations and natural stone inspired by Oman’s historic falaj water channels.'
  },
  {
    id: 'hero-pool',
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=85',
    title: '25-Meter Heated Lap Pool & Cabanas',
    category: 'Pools & Wellness',
    description: 'One of three outdoor temperature-controlled pools overlooking the wadi and palm groves.'
  },
  {
    id: 'hero-room-presidential',
    url: 'https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-presidential-0033-hor-clsc.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1300px:*',
    title: 'Presidential Suite Master Bedroom & King Bed',
    category: 'Rooms & Suites',
    description: 'Opulent master chamber with custom silk headboard and panoramic wadi vistas.'
  },
  {
    id: 'hero-pink-salt',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    title: 'Pink Salt - Signature Dry-Aged Steakhouse',
    category: 'Dining',
    description: 'Fire-cooked culinary mastery with Himalayan salt brick displays and open show kitchen.'
  },
  {
    id: 'hero-executive-lounge',
    url: 'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-executivelounge-41139-53306:Classic-Hor?wid=1200&fit=constrain',
    title: 'JW Executive Lounge - Muscat’s Largest Club',
    category: 'Rooms & Suites',
    description: 'Dedicated sanctuary on high floors providing all-day refreshments, meeting salons, and wadi terrace.'
  },
  {
    id: 'room-deluxe-king',
    url: 'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-mctmj-deluxeroom-30708-15417:Classic-Hor?wid=1300&fit=constrain',
    title: 'Deluxe Guest Room - 1 King Bed',
    category: 'Rooms & Suites',
    description: 'Spacious 43 sqm room with authentic JW Marriott pillowtop king bed and ergonomic lounge.'
  },
  {
    id: 'room-deluxe-twin',
    url: 'https://cache.marriott.com/is/image/marriotts7prod/mctmj-queen-0024:Wide-Hor?wid=1336&fit=constrain',
    title: 'Deluxe Guest Room - 2 Double Beds',
    category: 'Rooms & Suites',
    description: 'Authentic twin bed room featuring two double beds with 300-thread-count Egyptian cotton.'
  },
  {
    id: 'room-junior-suite-sofa',
    url: 'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-living-room-29295:Pano-Hor?wid=1600&fit=constrain',
    title: 'Junior Suite Living Lounge with Pull-out Sofa Bed',
    category: 'Rooms & Suites',
    description: 'Open-concept suite living space featuring the authentic pull-out sofa bed and sitting area.'
  },
  {
    id: 'room-luban-suite',
    url: 'https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-executive-0027-hor-clsc.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1300px:*',
    title: 'Luban Executive Suite Master Bedroom & Sofa Lounge',
    category: 'Rooms & Suites',
    description: '76 sqm one-bedroom luxury suite with master king bed, separate living salon, and lounge privileges.'
  },
  {
    id: 'bath-marble-suite',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    title: 'Marble Bathroom with Deep Soaking Tub',
    category: 'Rooms & Suites',
    description: 'Italian marble bathroom with rain shower, double vanity, and bespoke Aromatherapy Associates amenities.'
  },
  {
    id: 'dining-kitchen7',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    title: 'Kitchen 7 - Interactive World Kitchen',
    category: 'Dining',
    description: 'Seven live cooking stations spanning Middle Eastern mezze, Asian woks, tandoori, and artisan bakeries.'
  },
  {
    id: 'dining-catch',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    title: 'Catch Pool Bar & Mediterranean Seafood',
    category: 'Dining',
    description: 'Open-air al fresco dining by the illuminated resort pool serving freshly caught local fish and chilled drinks.'
  },
  {
    id: 'dining-butter-buns',
    url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85',
    title: 'Butter Buns - Gourmet Sports Burgers & Shakes',
    category: 'Dining',
    description: 'Signature brioche burgers, craft freakshakes, and 22 HD screens for premier global sports.'
  },
  {
    id: 'dining-jw-market',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    title: 'JW Market - Specialty Coffee & Omani Delights',
    category: 'Dining',
    description: 'Artisan patisserie, locally roasted cardamom coffee, and gourmet grab-and-go selections.'
  },
  {
    id: 'spa-treatment-room',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    title: 'Spa by JW - Sensory Treatment Suite',
    category: 'Pools & Wellness',
    description: 'Holistic wellness rituals with sauna, steam bath, customized aromatherapy, and couple suites.'
  },
  {
    id: 'fitness-center',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    title: 'JW Fitness Center 24/7',
    category: 'Pools & Wellness',
    description: 'State-of-the-art Technogym cardio machines, free weights, yoga studio, and outdoor jogging circuit.'
  },
  {
    id: 'jw-garden',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=85',
    title: 'The JW Garden & Herb Nursery',
    category: 'Exterior & Grounds',
    description: 'Sustainable garden producing mint, rosemary, and seasonal herbs utilized across our restaurant kitchens.'
  },
  {
    id: 'ballroom-grand',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
    title: 'Grand Ballroom - Gala & Wedding Setting',
    category: 'Meetings & Events',
    description: 'Pillarless ballroom spanning 1,100 sqm with Swarovski crystal chandeliers and separate bridal suite.'
  },
  {
    id: 'meeting-room-board',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    title: 'State-of-the-Art Executive Boardroom',
    category: 'Meetings & Events',
    description: 'High-definition video teleconferencing, ergonomic leather seating, and natural daylight.'
  },
  {
    id: 'family-by-jw',
    url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=85',
    title: 'Family by JW - Kids Discovery Zone',
    category: 'Pools & Wellness',
    description: 'Curated creative adventures, junior chef sessions, and outdoor nature exploration.'
  }
];

export const ROOMS_DATA: Room[] = [
  {
    id: 'deluxe-king',
    name: 'Deluxe Guest Room, 1 King, Garden View',
    category: 'deluxe',
    categoryLabel: 'Deluxe Room',
    sqm: 43,
    sqft: 463,
    maxGuests: 3,
    maxAdults: 2,
    maxChildren: 1,
    bedConfig: '1 King Bed with Luxury Pillowtop Mattress',
    view: 'Lush JW Garden or Courtyard View',
    description: 'Unwind in an expansive sanctuary infused with soothing desert tones, natural Omani light, and contemporary furnishings. Features an oversized marble bath with separate rain shower and deep soaking tub.',
    pricePerNightOMR: 78,
    memberPriceOMR: 74,
    images: [
      'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-mctmj-deluxeroom-30708-15417:Classic-Hor?wid=1300&fit=constrain',
      'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-sleeping-in-the-room-26653:Classic-Hor?wid=1200&fit=constrain',
      'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-reading-in-room-37255:Classic-Hor?wid=1200&fit=constrain',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    ],
    imageCaptions: [
      '1 King Bed with Luxury Headboard & Ambient Lighting',
      'JW Marriott Signature Pillowtop Bedding Closeup',
      'In-Room Sitting Daybed & Ergonomic Work Desk',
      'Italian Marble Bathroom with Deep Soaking Tub'
    ],
    features: ['High-speed complimentary WiFi', '55-inch Smart LED TV', 'Nespresso coffee maker & fine teas', 'Ergonomic work desk with international adapters', 'Soundproof double-glazed windows'],
    amenities: ['Aromatherapy Associates toiletries', 'Plush bathrobes & slippers', 'Daily turndown service', 'In-room safe with laptop charger', 'Mini refrigerator & 24h room service'],
    hasLoungeAccess: false,
    balcony: false,
    floors: 'Floors 1-3',
    bathDetails: 'Marble bathroom, separate deep soaking bathtub and glass-enclosed rain shower'
  },
  {
    id: 'deluxe-twin',
    name: 'Deluxe Guest Room, 2 Double Beds, Garden View',
    category: 'deluxe',
    categoryLabel: 'Deluxe Room',
    sqm: 43,
    sqft: 463,
    maxGuests: 4,
    maxAdults: 2,
    maxChildren: 2,
    bedConfig: '2 Double Beds with 300-thread-count Egyptian cotton',
    view: 'JW Garden & Courtyard View',
    description: 'Perfect for families or colleagues attending events at OCEC. Enjoy two double beds, serene color palettes, quiet acoustic insulation, and an elegant marble bathroom.',
    pricePerNightOMR: 82,
    memberPriceOMR: 78,
    images: [
      'https://cache.marriott.com/is/image/marriotts7prod/mctmj-queen-0024:Wide-Hor?wid=1336&fit=constrain',
      'https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-queen-0024-hor-clsc.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1300px:*',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80'
    ],
    imageCaptions: [
      '2 Double Beds with Crisp Egyptian Cotton Linens',
      'Authentic MCTMJ Twin Double Bed Chamber Setting',
      'Spacious Double Vanity Marble Bathroom'
    ],
    features: ['Two double beds', '55-inch Smart TV with streaming capability', 'Nespresso station', 'High-speed Wi-Fi', 'USB charging bedside ports'],
    amenities: ['Spacious double vanities', 'Signature JW bath amenities', 'Bathrobes & slippers', 'Iron & ironing board', 'Bottled mineral water replenished daily'],
    hasLoungeAccess: false,
    balcony: false,
    floors: 'Floors 1-3',
    bathDetails: 'Spacious marble bath with separate walk-in shower and deep bathtub'
  },
  {
    id: 'premium-wadi-king',
    name: 'Premium Guest Room, 1 King, Panoramic Wadi View',
    category: 'premium',
    categoryLabel: 'Premium Room',
    sqm: 45,
    sqft: 484,
    maxGuests: 3,
    maxAdults: 2,
    maxChildren: 1,
    bedConfig: '1 King Bed with JW Signature Feather Bed',
    view: 'Panoramic Wadi & Al Ansab Wetland Nature Reserve',
    description: 'Elevated luxury facing the tranquil natural wadi and green wetlands. Watch migratory birds and sunset reflections across the dramatic Omani plateau from oversized panoramic windows.',
    pricePerNightOMR: 95,
    memberPriceOMR: 90,
    images: [
      'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-mctmj-premium-22625-06129:Classic-Hor?wid=1300&fit=constrain',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-balcony-40344:Classic-Hor?wid=1200&fit=constrain'
    ],
    imageCaptions: [
      '1 King Bed with Panoramic Wadi Window Views',
      'Sunlit Luxury Bed Chamber Overlooking Nature Reserve',
      'Private Terrace Overlooking the Natural Wadi'
    ],
    features: ['Unobstructed Wadi sunset view', 'High floor location', 'Nespresso machine with premium pods', 'Bluetooth surround sound', 'Reading chaise lounge'],
    amenities: ['Aromatherapy Associates bath essentials', 'Nightly mindful turndown ritual', 'Complimentary pressing of 2 garments per stay', 'High-speed Wi-Fi', '24-hour in-room dining'],
    hasLoungeAccess: false,
    balcony: true,
    floors: 'Floors 3-5',
    bathDetails: 'Large marble bathroom with natural daylight, soaking tub, and rainfall shower'
  },
  {
    id: 'executive-club-king',
    name: 'Executive Room, 1 King, Executive Lounge Access',
    category: 'executive',
    categoryLabel: 'Executive Lounge Access',
    sqm: 45,
    sqft: 484,
    maxGuests: 3,
    maxAdults: 2,
    maxChildren: 1,
    bedConfig: '1 King Bed with Feather Down Pillows & Duvet',
    view: 'Panoramic Wadi or Mountain View',
    description: 'Includes full access to the largest Executive Lounge in Muscat. Enjoy private check-in, complimentary hot breakfast buffet, all-day refreshments, afternoon tea, and evening cocktails with hors d’oeuvres on the panoramic lounge terrace.',
    pricePerNightOMR: 125,
    memberPriceOMR: 118,
    images: [
      'https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-executive-0027-hor-clsc.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1300px:*',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-executivelounge-41139-53306:Classic-Hor?wid=1200&fit=constrain'
    ],
    imageCaptions: [
      'Executive King Bed Chamber with Sitting Area',
      'High-Floor Executive Bedroom Salon',
      'Exclusive JW Executive Lounge Access on High Floors'
    ],
    features: ['Exclusive Executive Lounge privileges', 'Private express check-in and check-out', 'Complimentary evening cocktails & hors d’oeuvres', '2 hours complimentary boardroom use per stay', 'Top floor commanding views'],
    amenities: ['Breakfast included daily in Lounge or Kitchen 7', 'Personalized concierge service', 'Luxury Aromatherapy Associates amenities', 'Garment pressing service', 'High-speed business Wi-Fi'],
    hasLoungeAccess: true,
    balcony: false,
    floors: 'Executive Floors 4-5',
    bathDetails: 'Spa-inspired marble sanctuary with deep soaking tub and separate rain shower'
  },
  {
    id: 'junior-suite',
    name: 'Junior Suite, 1 King, Sofa Bed, Living Area',
    category: 'suite',
    categoryLabel: 'Luxury Suite',
    sqm: 56,
    sqft: 602,
    maxGuests: 3,
    maxAdults: 3,
    maxChildren: 2,
    bedConfig: '1 King Bed + 1 Comfortable Pull-out Sofa Bed',
    view: 'Scenic Wadi or Garden View',
    description: 'An open-concept suite designed for relaxation and productivity, with a designated sitting lounge, sofa bed, dual work desk, and lavish marble bathroom.',
    pricePerNightOMR: 155,
    memberPriceOMR: 147,
    images: [
      'https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-suite-0038-hor-clsc.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1300px:*',
      'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-living-room-29295:Pano-Hor?wid=1600&fit=constrain',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80'
    ],
    imageCaptions: [
      'Junior Suite 1 King Bed & Open Living Layout',
      'Living Lounge with Comfortable Pull-out Sofa Bed',
      'Junior Suite Writing Desk & Private Sitting Lounge',
      'Ensuite Marble Bathroom with Freestanding Soaking Tub'
    ],
    features: ['Executive Lounge access included', 'Integrated open living area with sofa bed', 'Double vanity marble bathroom', 'Two 55-inch Smart TVs', 'Expansive floor-to-ceiling wadi windows'],
    amenities: ['Complimentary daily breakfast & cocktail hour', 'Nespresso Creatista machine', 'Luxury plush bathrobes and velvet slippers', 'Premium sound system', 'Free high-speed WiFi'],
    hasLoungeAccess: true,
    balcony: false,
    floors: 'Floors 2-4',
    bathDetails: 'Oversized marble bathroom with freestanding soaking tub and glass rain shower'
  },
  {
    id: 'luban-executive-suite',
    name: 'Luban Executive Suite, 1 King, 1 Bedroom, Balcony',
    category: 'suite',
    categoryLabel: 'Signature Suite',
    sqm: 76,
    sqft: 818,
    maxGuests: 4,
    maxAdults: 3,
    maxChildren: 2,
    bedConfig: '1 King Bed in Private Master Suite + Living Room Sofa',
    view: 'Panoramic Wadi, Al Ansab & Pool View',
    description: 'Named after Oman’s sacred Frankincense (Luban), this palatial one-bedroom suite features a separate living room with dining table for four, private outdoor balcony, guest powder room, and full Executive Lounge privileges.',
    pricePerNightOMR: 210,
    memberPriceOMR: 198,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
    ],
    imageCaptions: [
      'Private Master Bedroom with 1 King Bed & Panoramic View',
      'Luban Executive Living Salon & Private Dining Table',
      'Private Furnished Balcony Overlooking the Wadi'
    ],
    features: ['Private furnished balcony overlooking the wadi', 'Separate master bedroom and living salon', 'Dining area for 4 persons', 'Guest powder room in addition to master bath', 'Full Executive Lounge access'],
    amenities: ['Welcome Omani dates & Frankincense amenities', 'Complimentary minibar non-alcoholic beverages', 'Butler service on request', 'Pressing of 3 items per stay', 'Daily fresh fruit and flowers'],
    hasLoungeAccess: true,
    balcony: true,
    floors: 'Floors 3-5',
    bathDetails: 'Master bathroom with freestanding tub, rainfall shower, twin stone vanities, plus separate guest toilet'
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite, 1 King, Top Floor, Whirlpool',
    category: 'suite',
    categoryLabel: 'Presidential Luxury',
    sqm: 220,
    sqft: 2368,
    maxGuests: 4,
    maxAdults: 4,
    maxChildren: 2,
    bedConfig: '1 Ultra-Luxury King Bed with Custom Silk Linens',
    view: '360° Panoramic Vista of Muscat Hills & Wadi',
    description: 'The pinnacle of Omani hospitality. Features an opulent grand salon, formal dining room for 10 guests, private butler pantry with service entrance, study, whirlpool hydrotherapy bath, and private wraparound terrace.',
    pricePerNightOMR: 520,
    memberPriceOMR: 490,
    images: [
      'https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-presidential-0033-hor-clsc.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1300px:*',
      'https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-presidential-0035-hor-pano.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1600px:*',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    ],
    imageCaptions: [
      'Presidential Master Suite with Ultra-Luxury King Bed',
      'Palatial Grand Living Salon & 10-Seat Dining Table',
      'Presidential Formal 10-Seat Dining Boardroom'
    ],
    features: ['220 sqm top-floor penthouse', 'Wraparound terrace with outdoor lounge', 'Formal 10-seat dining table', 'Private kitchen & butler pantry', 'Personal VIP check-in & Dedicated Butler'],
    amenities: ['Limousine airport transfers included', 'Unlimited Spa by JW hydrotherapy access', 'Curated wine cellar selection', 'Bespoke Omani perfumery gifts', 'Executive Lounge full VIP access'],
    hasLoungeAccess: true,
    balcony: true,
    floors: '5th Floor Penthouse Wing',
    bathDetails: 'Oversized marble spa bathroom with jetted whirlpool, infrared sauna, and dual rain shower'
  }
];

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'pink-salt',
    name: 'Pink Salt',
    cuisine: 'Signature Steakhouse & Coastal Seafood',
    description: 'Muscat’s premier grill destination, renowned for dry-aged USDA Prime & Australian Wagyu cuts seared over open applewood embers, paired with fresh Arabian Sea catches seasoned with pure Himalayan pink salt.',
    atmosphere: 'Sophisticated & Intimate, Open Show Kitchen, Candlelit Wadi Terrace',
    dressCode: 'Smart Casual (collared shirts; no athletic wear)',
    hours: 'Dinner: 6:30 PM – 11:30 PM (Daily)',
    signatureDish: '45-Day Dry-Aged USDA Prime Tomahawk & Omani Rock Lobster with smoked sea salt butter',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Fire-Cooked Passion, Himalayan Salt Artistry',
    features: ['Dry-aging glass maturation cellar', 'Private dining salon for up to 14 guests', 'Award-winning sommelier wine pairings', 'Outdoor terrace overlooking landscaped wadi water features'],
    chef: {
      name: 'Chef Tariq Al Balushi',
      title: 'Head of Culinary & Master Griller',
      quote: 'We celebrate the elemental harmony of fire, stone, and the purest pink salt to honor the natural character of each prime cut and coastal harvest.'
    },
    menuCategories: ['Raw Bar & Starters', 'Charcoal & Hickory Grill', 'Coastal Seafood', 'Sides & Sauces', 'Artisanal Desserts'],
    fullMenu: [
      {
        name: '45-Day Dry-Aged USDA Prime Tomahawk (1.2 kg)',
        category: 'Charcoal & Hickory Grill',
        description: 'Dry-aged in-house in our Himalayan pink salt chamber. Carved tableside with roasted marrow, confit garlic, and signature herb butter.',
        priceOMR: '48.000',
        dietary: ['Halal', 'Chef Signature'],
        pairing: 'Full-bodied Cabernet Sauvignon or Reserve Syrah'
      },
      {
        name: 'Australian Wagyu Ribeye MBS 7+ (300g)',
        category: 'Charcoal & Hickory Grill',
        description: 'Grain-fed marbled beef, seared over binchotan charcoal, glazed with aged balsamic reduction and black garlic jus.',
        priceOMR: '28.500',
        dietary: ['Halal', 'Chef Signature'],
        pairing: 'Oaked Bordeaux Blend'
      },
      {
        name: 'Omani Spiced Braised Short Ribs',
        category: 'Charcoal & Hickory Grill',
        description: '14-hour slow braise with Omani black lime, cardamom, roasted heirloom carrots, and shallot reduction.',
        priceOMR: '19.500',
        dietary: ['Halal', 'Gluten-Free']
      },
      {
        name: 'Whole Roasted Omani Rock Lobster',
        category: 'Coastal Seafood',
        description: 'Locally dived rock lobster, split and flame-broiled with smoked chili-herb butter, samphire, and charred lemon.',
        priceOMR: '24.000',
        dietary: ['Halal', 'Gluten-Free', 'Chef Signature'],
        pairing: 'Crisp Chablis or Sauvignon Blanc'
      },
      {
        name: 'Pan-Roasted Chilean Sea Bass',
        category: 'Coastal Seafood',
        description: 'Miso-mirin glaze, ginger dashi broth, baby bok choy, and crispy lotus root crisps.',
        priceOMR: '21.000',
        dietary: ['Halal', 'Gluten-Free']
      },
      {
        name: 'Gulf Yellowfin Tuna Tartare',
        category: 'Raw Bar & Starters',
        description: 'Hand-cut yellowfin tuna, Haas avocado purée, citrus ponzu pearls, sesame tuile, and pink rock salt crystals.',
        priceOMR: '11.500',
        dietary: ['Halal', 'Gluten-Free']
      },
      {
        name: 'Himalayan Pink Salt Seared Hokkaido Scallops',
        category: 'Raw Bar & Starters',
        description: 'Pan-seared on a 250°C salt block, cauliflower velvet, crispy beef bacon bits, and truffle oil.',
        priceOMR: '13.000',
        dietary: ['Halal', 'Chef Signature']
      },
      {
        name: 'Truffle Potato Mousseline',
        category: 'Sides & Sauces',
        description: 'French butter potatoes whipped with Perigord black truffle butter and chives.',
        priceOMR: '4.500',
        dietary: ['Vegetarian', 'Gluten-Free']
      },
      {
        name: 'Charred Asparagus & King Oyster Mushrooms',
        category: 'Sides & Sauces',
        description: 'Grilled with rosemary oil from the JW Garden and 24-month aged parmesan crisps.',
        priceOMR: '4.000',
        dietary: ['Vegetarian', 'Gluten-Free', 'JW Garden Organic']
      },
      {
        name: 'Valrhona Dark Chocolate Lava Sphere',
        category: 'Artisanal Desserts',
        description: 'Smoked Guanaja 70% molten core, Madagascar bourbon vanilla bean gelato, and gold leaf crumble.',
        priceOMR: '6.000',
        dietary: ['Vegetarian', 'Chef Signature']
      },
      {
        name: 'Frankincense & Rose Infused Crème Brûlée',
        category: 'Artisanal Desserts',
        description: 'Silky custard perfumed with edible green Hojari frankincense and Jebel Akhdar rose petals.',
        priceOMR: '5.500',
        dietary: ['Vegetarian', 'Gluten-Free']
      }
    ],
    menuHighlights: [
      { item: 'Dry-Aged Wagyu Ribeye MB7', description: 'Charred over applewood, roasted bone marrow, truffle jus', priceOMR: '28.500' },
      { item: 'Gulf Yellowfin Tuna Tartare', description: 'Avocado mousse, citrus ponzu, pink salt tuile', priceOMR: '11.500' },
      { item: 'Whole Omani Rock Lobster', description: 'Smoked chili herb butter, samphire, charred lemon', priceOMR: '24.000' }
    ]
  },
  {
    id: 'kitchen-7',
    name: 'Kitchen 7',
    cuisine: 'International Buffet & Interactive Live Kitchens',
    description: 'An expansive culinary journey honoring seven distinct global cuisines. Watch master chefs prepare Asian wok creations, wood-fired Middle Eastern breads, Indian tandoor, fresh Italian pasta, and Gulf seafood across seven live theatrical stations.',
    atmosphere: 'Vibrant, Family-friendly, Light-Filled & Social',
    dressCode: 'Casual (smart footwear, no beachwear)',
    hours: 'Breakfast: 6:30 AM – 10:30 AM | Lunch: 12:30 PM – 3:30 PM | Dinner: 7:00 PM – 11:00 PM',
    signatureDish: 'Live Tandoor Shish Tawook & Slow-Cooked Omani Shuwa with fragrant saffron rice',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Seven Continents of Flavor at One Table',
    features: ['Seven live theater cooking stations', 'Daily themed culinary evenings (Omani Heritage, Seafood Market, Asian Night)', 'Spacious wadi terrace seating', 'Family by JW kids dining station with healthy favorites'],
    chef: {
      name: 'Chef Marco D’Souza',
      title: 'Executive Sous Chef & Station Curator',
      quote: 'At Kitchen 7, eating is a theatrical experience. We bring guests face-to-face with culinary traditions from Tokyo to Salalah.'
    },
    menuCategories: ['Omani & Levantine Hearth', 'Asian Wok & Dim Sum', 'Tandoori Oven & Curry', 'Rotisserie & Carvery', 'Pastry & Dessert Carousel'],
    fullMenu: [
      {
        name: 'Traditional Omani Shuwa Station',
        category: 'Omani & Levantine Hearth',
        description: 'Tender marinated lamb shank wrapped in banana leaves, pit-roasted for 24 hours with coriander, dried lime, and saffron basmati.',
        priceOMR: 'Included in Buffet',
        dietary: ['Halal', 'Chef Signature', 'Gluten-Free']
      },
      {
        name: 'Live Tandoor Shish Tawook & Kofta',
        category: 'Tandoori Oven & Curry',
        description: 'Yogurt-marinated chicken breast and hand-ground spiced lamb skewered and blistered at 400°C over charcoal.',
        priceOMR: 'Included in Buffet',
        dietary: ['Halal', 'Gluten-Free']
      },
      {
        name: 'Grand Gulf Seafood on Crushed Ice',
        category: 'Rotisserie & Carvery',
        description: 'Freshly shucked Dibba Bay oysters, chilled Tiger prawns, blue crab claws, and yellowfin sashimi with wasabi and mignonette.',
        priceOMR: 'Included in Buffet',
        dietary: ['Halal', 'Gluten-Free']
      },
      {
        name: 'Handmade Italian Pasta Wheel',
        category: 'Rotisserie & Carvery',
        description: 'Fresh egg fettuccine tossed in a 36-month Parmigiano Reggiano wheel with black truffle cream and wild chanterelles.',
        priceOMR: 'Included in Buffet',
        dietary: ['Vegetarian']
      },
      {
        name: 'Singapore Wok Chili Tiger Prawns',
        category: 'Asian Wok & Dim Sum',
        description: 'Jumbo prawns flashed in high heat with ginger, shallots, sweet-spicy chili egg sauce, and crispy mantou buns.',
        priceOMR: 'Included in Buffet',
        dietary: ['Halal', 'spicy']
      },
      {
        name: 'Slow-Smoked USDA Prime Beef Brisket',
        category: 'Rotisserie & Carvery',
        description: 'Carved to order from our rotisserie station, served with charred corn relish and smoked bourbon jus.',
        priceOMR: 'Included in Buffet',
        dietary: ['Halal']
      },
      {
        name: 'Warm Omani Halwa & Date Pudding',
        category: 'Pastry & Dessert Carousel',
        description: 'Cardamom scented sponge infused with Khalas date syrup, saffron cream, and crushed Nizwa pistachios.',
        priceOMR: 'Included in Buffet',
        dietary: ['Vegetarian', 'Chef Signature']
      }
    ],
    menuHighlights: [
      { item: 'Grand Seafood & Sushi Bar', description: 'Freshly shucked oysters, king crab legs, sashimi selection', priceOMR: 'Included in Buffet' },
      { item: 'Traditional Omani Shuwa Station', description: 'Marinated lamb braised for 24 hours, cumin yogurt', priceOMR: 'Included in Buffet' },
      { item: 'Artisanal Gelato & Pastry Carousel', description: 'Handcrafted French pastries, fondue, date pudding', priceOMR: 'Included in Buffet' }
    ]
  },
  {
    id: 'catch',
    name: 'Catch Pool Bar & Restaurant',
    cuisine: 'Mediterranean Coastal & Refreshing Cocktails',
    description: 'A sunlit outdoor oasis beside our 25-meter temperature-controlled lap pool. Savor Mediterranean mezze, wood-fired flatbreads, and day-boat Arabian Gulf seafood accompanied by chilled botanical mocktails beneath swaying palms.',
    atmosphere: 'Relaxed Resort Chic, Sun-Drenched & Open Air',
    dressCode: 'Resort Casual (Swimwear permitted with cover-up)',
    hours: '10:00 AM – 8:00 PM (Food service from 12:00 PM)',
    signatureDish: 'Pan-Seared Sea Bass with Salmoriglio and Grilled Lemon Herbs from the JW Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Chilled Breezes, Crisp Bites, Poolside Bliss',
    features: ['Swim-up bar stools and pool cabana service', 'Chilled towels and complimentary fruit skewers', 'Zero-proof botanical cocktail program', 'Sunset acoustic DJ lounge sessions'],
    menuCategories: ['Poolside Starters', 'Artisan Flatbreads', 'Gulf Catch of the Day', 'Healthy Bowls & Salads', 'Chilled Cocktails & Mocktails'],
    fullMenu: [
      {
        name: 'Crispy Salt & Pepper Calamari & Tiger Prawns',
        category: 'Poolside Starters',
        description: 'Lightly dusted local squid and prawns, preserved lemon aioli, caper berries, and sumac seasoning.',
        priceOMR: '8.500',
        dietary: ['Halal']
      },
      {
        name: 'Wadi Green Glow Superfood Bowl',
        category: 'Healthy Bowls & Salads',
        description: 'Tri-color quinoa, Hass avocado, edamame, pomegranate, baby spinach from JW Garden, and citrus-agave vinaigrette.',
        priceOMR: '7.000',
        dietary: ['Vegan', 'Gluten-Free', 'JW Garden Organic']
      },
      {
        name: 'Catch Wood-Fired Burrata Flatbread',
        category: 'Artisan Flatbreads',
        description: 'Hand-stretched sourdough, Italian burrata, heirloom cherry tomatoes, wild rocket, and basil pesto.',
        priceOMR: '9.000',
        dietary: ['Vegetarian', 'JW Garden Organic']
      },
      {
        name: 'Whole Grilled Sultan Ibrahim (Red Mullet)',
        category: 'Gulf Catch of the Day',
        description: 'Locally caught red mullet, herb chimichurri, grilled baby courgettes, and sea salt fries.',
        priceOMR: '14.000',
        dietary: ['Halal', 'Gluten-Free', 'Chef Signature']
      },
      {
        name: 'Maine Lobster Brioche Roll',
        category: 'Poolside Starters',
        description: 'Chilled sweet lobster meat, yuzu kewpie mayo, celery crunch, and chives in toasted Japanese milk bread.',
        priceOMR: '14.500',
        dietary: ['Halal', 'Chef Signature']
      },
      {
        name: 'Madinat Al Irfan Sunset Spritz',
        category: 'Chilled Cocktails & Mocktails',
        description: 'Fresh pomegranate, rosemary from the garden, pink grapefruit cordial, and sparkling mountain spring water.',
        priceOMR: '4.000',
        dietary: ['Vegan', 'Gluten-Free', 'JW Garden Organic']
      }
    ],
    menuHighlights: [
      { item: 'Crispy Calamari & Tiger Prawns', description: 'Preserved lemon aioli, caperberries, sumac dust', priceOMR: '8.500' },
      { item: 'Wadi Green Glow Bowl', description: 'Quinoa, avocado, edamame, pomegranate, citrus vinaigrette', priceOMR: '7.000' },
      { item: 'Catch Wood-Fired Flatbread', description: 'Smoked burrata, heirloom tomatoes, basil from JW Garden', priceOMR: '9.000' }
    ]
  },
  {
    id: 'butter-buns',
    name: 'Butter Buns',
    cuisine: 'Gourmet Burgers, Craft Shakes & Sports Lounge',
    description: 'Muscat’s ultimate sports dining hub. Features 22 ultra-high-definition screens for live international sports, decadent smash and wagyu beef burgers on fresh brioche, loaded crinkle waffle fries, and towering dessert freakshakes.',
    atmosphere: 'High-Energy, Contemporary, Sports Memorabilia & Billiards',
    dressCode: 'Casual (Athletic jerseys welcome during match days)',
    hours: '12:00 PM – Midnight (Daily)',
    signatureDish: 'The JW Butter Bun: Double Wagyu Patty, Truffle Aioli, Aged Cheddar on Toasted Brioche',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Artisan Burgers and Premier Live Sports',
    features: ['22 screens broadcasting English Premier League, UEFA Champions League, and Formula 1', 'Craft beer taps and international cider list', 'Dedicated billiard table and dart board lounge', 'Game-day burger & drink combos'],
    menuCategories: ['Artisan Smash & Wagyu Burgers', 'Wings & Loaded Bites', 'Towering Freakshakes & Sweets', 'Beverages & Drafts'],
    fullMenu: [
      {
        name: 'The JW Butter Bun (Signature)',
        category: 'Artisan Smash & Wagyu Burgers',
        description: 'Two 100g Australian Wagyu beef patties, melted 18-month cave cheddar, black truffle aioli, and caramelized onions on toasted brioche.',
        priceOMR: '9.500',
        dietary: ['Halal', 'Chef Signature']
      },
      {
        name: 'Omani Spiced Camel Burger',
        category: 'Artisan Smash & Wagyu Burgers',
        description: 'Lean tender ground camel patty, grilled halloumi cheese, sweet date chutney, and crisp mint leaves on charcoal sesame bun.',
        priceOMR: '8.500',
        dietary: ['Halal', 'Chef Signature']
      },
      {
        name: 'Nashville Hot Crispy Chicken Burger',
        category: 'Artisan Smash & Wagyu Burgers',
        description: 'Buttermilk-brined fried chicken breast dipped in cayenne chili oil, house pickles, and creamy creamy ranch.',
        priceOMR: '7.500',
        dietary: ['Halal', 'spicy']
      },
      {
        name: 'Beyond Meat Truffle Mushroom Burger (Plant-Based)',
        category: 'Artisan Smash & Wagyu Burgers',
        description: '100% plant-based patty, sautéed wild forest mushrooms, vegan smoked gouda, and truffle mayo on potato bun.',
        priceOMR: '8.000',
        dietary: ['Vegan']
      },
      {
        name: 'Black Truffle & Parmesan Waffle Fries',
        category: 'Wings & Loaded Bites',
        description: 'Crispy potato waffle fries tossed with white truffle oil, grated parmesan, and smoked garlic dip.',
        priceOMR: '4.200',
        dietary: ['Vegetarian', 'Gluten-Free']
      },
      {
        name: 'Sticky Hickory BBQ Smoked Chicken Wings (10 Pcs)',
        category: 'Wings & Loaded Bites',
        description: 'Applewood smoked wings tossed in house honey BBQ sauce with celery sticks and blue cheese dip.',
        priceOMR: '6.500',
        dietary: ['Halal']
      },
      {
        name: 'The 24K Golden Frankincense Freakshake',
        category: 'Towering Freakshakes & Sweets',
        description: 'Madagascar vanilla bean milkshake, edible 24K gold leaf, honeyed frankincense syrup, donut topper, and whipped cream.',
        priceOMR: '5.000',
        dietary: ['Vegetarian', 'Chef Signature']
      }
    ],
    menuHighlights: [
      { item: 'Smokey Jalapeño Crunch Burger', description: 'Smoked brisket bacon, pepper jack, crispy onions, chipotle glaze', priceOMR: '8.000' },
      { item: 'Golden Frankincense Shake', description: 'Salted caramel, vanilla bean, edible gold leaf, honeycomb', priceOMR: '4.500' },
      { item: 'Truffle Parmesan Waffle Fries', description: 'Aged parmesan, black truffle cream, chives', priceOMR: '4.000' }
    ]
  },
  {
    id: 'jw-market',
    name: 'JW Market',
    cuisine: 'Artisan Café, Specialty Coffee & Omani Sweets',
    description: 'A sun-drenched, tranquil gathering spot celebrating artisanal coffee culture. Enjoy single-origin espresso roasted by Omani master roasters, fresh French viennoiserie, gourmet sandwiches, and handcrafted boxes of Omani dates and frankincense honey.',
    atmosphere: 'Calm, Elegant, Work-Friendly & Social',
    dressCode: 'Casual',
    hours: '7:00 AM – 10:00 PM (Daily)',
    signatureDish: 'Cardamom Omani Latte paired with Date & Frankincense Mille-Feuille',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Artisan Sips and Locally Crafted Delights',
    features: ['Single-origin beans ethically sourced and roasted in Oman', 'Bespoke takeaway gift hampers of Omani frankincense, honey, and dates', 'Complimentary charging stations and ultra-fast Wi-Fi for remote work', 'Fresh organic salads and cold-pressed juices to go'],
    menuCategories: ['Specialty Coffee & Teas', 'Omani Heritage Brews', 'French Viennoiserie', 'Artisan Sandwiches & Sweets'],
    fullMenu: [
      {
        name: 'Signature Omani Qahwa & Medjool Dates',
        category: 'Omani Heritage Brews',
        description: 'Traditional lightly roasted coffee brewed with green cardamom, saffron, and rosewater, served in customary finjan cups.',
        priceOMR: '3.500',
        dietary: ['Vegan', 'Gluten-Free', 'Chef Signature']
      },
      {
        name: 'Spanish Cardamom Rose Latte',
        category: 'Specialty Coffee & Teas',
        description: 'Double espresso pulled over condensed milk, infused with steamed whole milk, cardamom, and Damascus rose petals.',
        priceOMR: '3.800',
        dietary: ['Vegetarian']
      },
      {
        name: 'Bronte Pistachio Supreme Croissant',
        category: 'French Viennoiserie',
        description: 'Flaky 72-hour cultured butter dough filled with rich Sicilian pistachio cream and coated with chopped roasted nuts.',
        priceOMR: '3.200',
        dietary: ['Vegetarian', 'Chef Signature']
      },
      {
        name: 'Smoked Salmon & Dill Cream Cheese Brioche Bagel',
        category: 'Artisan Sandwiches & Sweets',
        description: 'Scottish smoked salmon, whipped cream cheese, capers, pickled red onion, and fresh garden dill on toasted bagel.',
        priceOMR: '5.500',
        dietary: ['Halal']
      },
      {
        name: 'Frankincense & Dark Chocolate Bonbons (Box of 6)',
        category: 'Artisan Sandwiches & Sweets',
        description: 'Handcrafted Valrhona 66% ganache infused with culinary Frankincense oil, dusted with bronze powder.',
        priceOMR: '6.000',
        dietary: ['Vegetarian', 'Gluten-Free']
      }
    ],
    menuHighlights: [
      { item: 'Signature Omani Cardamom Qahwa', description: 'Served in traditional Finjan with medjool dates', priceOMR: '3.500' },
      { item: 'Pistachio Croissant Supreme', description: 'Flaky French butter pastry filled with Bronte pistachio cream', priceOMR: '3.200' }
    ]
  },
  {
    id: 'tonika',
    name: 'Tonika Craft Lounge',
    cuisine: 'Evening Craft Lounge & Botanical Mixology',
    description: 'An alluring evening sanctuary nestled near the atrium. Tonika pays homage to the ancient spice routes and herbal apothecaries with inventive botanical cocktails, zero-proof elixirs, and decadent sharing plates.',
    atmosphere: 'Intimate, Sultry, Low-Lit with Amber Architectural Accents',
    dressCode: 'Smart Casual (no sportswear or beach sandals)',
    hours: '5:00 PM – 1:00 AM (Daily)',
    signatureDish: 'The Sultan’s Frankincense Old Fashioned with Smoked Orange Bitters',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    tagline: 'Botanical Apothecary and Refined Nightfall Sips',
    features: ['Infusion jars with herbs gathered from the on-site JW Garden', 'Live jazz and ambient acoustic trios on Thursday and Friday evenings', 'Extensive curated cellar of vintage Ports, Single Malts, and Cognacs', 'Intimate velvet booth seating and bar-side masterclasses'],
    menuCategories: ['Botanical Mixology', 'Zero-Proof Elixirs', 'Gourmet Tapas & Sliders'],
    fullMenu: [
      {
        name: 'The Sultan’s Frankincense Old Fashioned',
        category: 'Botanical Mixology',
        description: 'Small-batch bourbon infused with smoked Hojari frankincense resin, Angostura, demerara syrup, and flamed orange zest.',
        priceOMR: '8.500',
        dietary: ['Chef Signature']
      },
      {
        name: 'Wadi Botanical Tonic',
        category: 'Botanical Mixology',
        description: 'Artisanal gin, Mediterranean tonic, charred rosemary sprig from the JW Garden, and pink peppercorns.',
        priceOMR: '8.000',
        dietary: ['JW Garden Organic']
      },
      {
        name: 'Jebel Akhdar Pomegranate & Rose Elixir (Zero-Proof)',
        category: 'Zero-Proof Elixirs',
        description: 'Fresh pomegranate reduction, mountain rosewater, sparkling tonic, and crushed lime leaves.',
        priceOMR: '4.500',
        dietary: ['Vegan', 'Gluten-Free']
      },
      {
        name: 'Trio of Wagyu Truffle Sliders',
        category: 'Gourmet Tapas & Sliders',
        description: 'Australian Wagyu beef patties, brie cheese, black truffle mayo, and microgreens on toasted mini brioche buns.',
        priceOMR: '9.000',
        dietary: ['Halal', 'Chef Signature']
      },
      {
        name: 'Crispy Duck Bao Buns with Hoisin & Plum Sauce',
        category: 'Gourmet Tapas & Sliders',
        description: 'Steamed lotus leaf buns filled with confit duck, cucumber ribbons, and sweet scallion relish.',
        priceOMR: '7.500',
        dietary: ['Halal']
      }
    ],
    menuHighlights: [
      { item: 'The Sultan’s Frankincense Old Fashioned', description: 'Smoked frankincense, bourbon, orange bitters', priceOMR: '8.500' },
      { item: 'Trio of Wagyu Truffle Sliders', description: 'Brie, black truffle mayo, microgreens', priceOMR: '9.000' },
      { item: 'Jebel Akhdar Pomegranate Elixir', description: 'Fresh pomegranate, mountain rosewater, tonic', priceOMR: '4.500' }
    ]
  }
];

export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: 'royal-al-irfan',
    name: 'The Royal Al Irfan Grand Ballroom Wedding',
    tagline: 'A Majestic Gala of Unparalleled Luxury & Grandeur',
    guestCapacity: 'Up to 1,200 Guests (Pillarless Ballroom)',
    venueName: 'Grand Ballroom & Private Bridal Suite',
    priceStartingOMR: '35 OMR per guest',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    description: 'Immerse your celebration in timeless magnificence. Our 1,100 sqm pillarless Grand Ballroom accommodates grand royal weddings with crystal chandeliers, customizable mood lighting, separate VIP entrances, and a lavish dedicated Bridal Salon.',
    inclusions: [
      'Complimentary overnight stay in the Presidential Suite with late check-out and breakfast',
      'Exclusive access to private Bridal Salon with glam vanity stations and dressing room',
      'Dedicated Marriott Certified Wedding Specialist to coordinate every detail',
      'Customized 5-course royal banquet menu with tasting for up to 6 persons prior to the wedding',
      'Five-tier decorative wedding cake and sparkling cider toast celebration',
      'Red carpet arrival and valet parking service for all wedding guests',
      'Built-in state-of-the-art audiovisual lighting, motorized screens, and bridal stage setup'
    ],
    menuPreview: [
      'Cold Mezze Platter: Truffled Hommus, Mutable, Tabbouleh, and Vine Leaves with Fresh Khobz',
      'Hot Appetizers: Omani Lobster Sambousek and Crispy Spinach Fatayer',
      'Main Course: Slow-Cooked Omani Shuwa Lamb with Saffron Rice & Almond Flakes',
      'Seafood Entrée: Pan-Seared Seabass with Harra Sauce and Roasted Pine Nuts',
      'Dessert: Warm Omani Halwa Molten Pudding and Pistachio Baklava with Saffron Ice Cream'
    ],
    bridalServices: [
      'Pre-wedding Frankincense Ritual at Spa by JW for bride & groom',
      'Personal bridal butler assigned for the wedding day',
      'Special discounted room rates for wedding guests and family'
    ]
  },
  {
    id: 'sunset-wadi-garden',
    name: 'Sunset Wadi Lawn Garden Romance',
    tagline: 'An Enchanting Open-Air Celebration Under Omani Stars',
    guestCapacity: 'Up to 500 Guests',
    venueName: 'Wadi Garden Lawn & Terrace Deck',
    priceStartingOMR: '28 OMR per guest',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80',
    description: 'Exchange vows surrounded by fragrant frangipani trees and illuminated date palms overlooking the natural wadi. Complete with fairy light canopies, ambient live acoustic setup, and an al fresco charcoal grill station.',
    inclusions: [
      'Overnight stay in the Luban Executive Suite with romantic balcony overlooking the garden',
      'Romantic candlelit dinner setup for the newlyweds on their first anniversary',
      'Outdoor live grilling stations with fresh Arabian Gulf seafood and prime steaks',
      'Welcome mocktail bar featuring botanical drinks infused with herbs from the JW Garden',
      'Special ambient fairy light installation and lanterns across the garden lawn'
    ],
    menuPreview: [
      'Live Charcoal Grills: Jumbo Gulf Tiger Prawns, Australian Lamb Chops, and Shish Tawook',
      'Salad Bar: Heirloom Tomatoes with Burrata, Wadi Quinoa Glow Salad, and Pomegranate Fattoush',
      'Carvery Station: Herb-Crusted Prime Beef Ribeye with Truffle Jus',
      'Sweet Station: Live Kunafa Station with Orange Blossom Syrup and Rosewater Gelato'
    ],
    bridalServices: [
      'Bridal hair and makeup preparation space in the Executive Club Salon',
      'Romantic rose petal turndown and champagne breakfast in bed'
    ]
  },
  {
    id: 'intimate-junior-ballroom',
    name: 'The Intimate Al Irfan Soirée',
    tagline: 'Refined Elegance for Cherished Family Gatherings',
    guestCapacity: 'Up to 280 Guests',
    venueName: 'Junior Ballroom & Pre-Function Terrace',
    priceStartingOMR: '24 OMR per guest',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    description: 'Perfect for intimate family weddings, engagement galas, and rehearsal dinners. Features high ceilings, natural sunlight during day events, a dedicated pre-function terrace, and tailored multi-course dining.',
    inclusions: [
      'Overnight stay in the Junior Suite with Executive Lounge privileges',
      'Complimentary food tasting for 4 family members prior to the event',
      'Customized 4-course seated dinner or opulent international buffet',
      '3-tier wedding cake personalized with your wedding theme colors',
      'Complimentary self-parking and special rates for hotel guest rooms'
    ],
    menuPreview: [
      'Starters: Smoked Salmon Rosette, Buffalo Mozzarella Caprese, and Arabic Mezze',
      'Mains: Corn-fed Chicken Supreme with Wild Mushroom Sauce and Potato Gratin',
      'Regional Favorite: Braised Lamb Shank Machboos with Golden Cashews',
      'Dessert: Dark Chocolate Dome with Raspberry Coulis and Umm Ali'
    ],
    bridalServices: [
      '60-minute relaxing Swedish massage for the bride prior to the big day',
      'Express bridal salon touch-up room'
    ]
  },
  {
    id: 'henna-bridal-pampering',
    name: 'Bridal Pampering & Henna Night',
    tagline: 'Cherished Sisterhood, Henna Artistry & Spa Tranquility',
    guestCapacity: 'Up to 80 Guests',
    venueName: 'Spa by JW Terrace & Private Salon',
    priceStartingOMR: '20 OMR per guest',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80',
    description: 'Celebrate the traditional Henna night with sisterhood, song, and authentic Omani hospitality. Features dedicated henna artists, Arabic afternoon tea, Omani coffee service, and hydrotherapy access.',
    inclusions: [
      'Exclusive hire of the Spa by JW relaxation lounge and outdoor terrace',
      'Traditional Omani high tea buffet with savory pastries, date cakes, and sliders',
      'Traditional Qahwa station served with five varieties of local stuffed dates',
      'Lush flower wall backdrop for photography and social memories',
      'Aromatherapy gift bags for the bride and her wedding party'
    ],
    menuPreview: [
      'Savory Bites: Mini Chicken Shawarma, Halloumi Sliders, and Truffle Arancini',
      'Sweet Delights: Mini Pistachio Eclairs, Date Scones with Clotted Cream, and Rose Macarons',
      'Beverages: Mint Tea, Saffron Karak, Hibiscus Cooler, and Fresh Mango Juice'
    ],
    bridalServices: [
      'Complimentary 60-minute bridal aromatherapy facial',
      'Access to steam room, sauna, and vitality hydrotherapy pool'
    ]
  }
];

export const HOTEL_OFFERS: HotelOffer[] = [
  {
    id: 'stay-longer-muscat',
    title: 'Stay Longer & Save in Muscat',
    tagline: 'Save up to 25% when you linger in the Sultanate',
    badge: 'Best Seller',
    description: 'Extend your escape in Madinat Al Irfan. Save 20% on 3-night stays, or 25% on 4 nights or more, including daily breakfast at Kitchen 7, late checkout until 3:00 PM, and high-speed Wi-Fi.',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80',
    promoCode: 'D3Q',
    validDates: 'Valid for stays through December 31, 2026',
    priceHighlight: 'From 58 OMR / night (25% off)',
    includes: [
      'Up to 25% discount off standard flexible rates',
      'Daily international buffet breakfast for two at Kitchen 7',
      'Guaranteed 3:00 PM late check-out subject to availability',
      'Complimentary self-parking and high-speed Wi-Fi',
      'Access to 3 swimming pools, Spa by JW hydrotherapy, and fitness center'
    ],
    termsAndConditions: [
      'Minimum stay of 3 nights required',
      'Full prepayment required 24 hours prior to arrival',
      'Subject to availability and blackout dates'
    ]
  },
  {
    id: 'experience-spa-credit',
    title: 'Experience More: Daily 25 OMR Hotel Credit',
    tagline: 'Spend your resort credit on dining, spa & cocktails',
    badge: 'Member Exclusive',
    description: 'Immerse in holistic wellness and culinary discovery with a daily 25 OMR credit redeemable at Spa by JW, Pink Salt, Catch poolside, or Tonika craft lounge.',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=80',
    promoCode: '24F',
    validDates: 'Valid seven days a week through 2026',
    priceHighlight: 'Includes 25 OMR daily credit',
    includes: [
      '25 OMR resort credit per room, per night',
      'Valid at Spa by JW, Pink Salt, Catch, Butter Buns, and Kitchen 7',
      'Daily lavish buffet breakfast for two at Kitchen 7',
      'Marriott Bonvoy bonus 2,000 points per stay',
      'Welcome Omani dates and Frankincense aromatherapy in room'
    ],
    termsAndConditions: [
      'Credit is non-cumulative and non-refundable for cash',
      'Cannot be applied toward room room rate or tax charges'
    ]
  },
  {
    id: 'romantic-escape-sultanate',
    title: 'Romantic Sanctuary for Couples & Wadi Sunset',
    tagline: 'An unforgettable celebration of romance in Muscat',
    badge: 'Special Occasion',
    description: 'Celebrate love in our sunlit haven. Receive a bottle of chilled sparkling beverage, chocolate-dipped strawberries, couples hydrotherapy session, and a 3-course candlelight dinner at Pink Salt.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    promoCode: 'LVU',
    validDates: 'Year-round romantic retreat',
    priceHighlight: 'All-inclusive couples package',
    includes: [
      'Upgrade to Premium Wadi View Room (subject to availability)',
      '60-minute Couples Aromatherapy Massage at Spa by JW',
      '3-course candlelight dinner for two at Pink Salt Steakhouse',
      'Chilled sparkling cider, luxury chocolates, and romantic rose petal turndown',
      'Lavish breakfast served in bed or at Kitchen 7'
    ],
    termsAndConditions: [
      'Must book at least 48 hours in advance for dinner & spa booking',
      'Romantic inclusions are provided once per stay'
    ]
  },
  {
    id: 'family-by-jw-package',
    title: 'Family by JW Discovery Retreat',
    tagline: 'Create lifelong memories across nature, splash pools & play',
    badge: 'Family Favorite',
    description: 'Bring the entire family together with 50% discount on a second connecting room, complimentary meals for children under 12, guided nature walks at Al Ansab Wetland, and kids junior chef workshops.',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1000&q=85',
    promoCode: 'MAJ',
    validDates: 'Available year-round for family getaways',
    priceHighlight: '50% off second connecting room',
    includes: [
      '50% discount on second connecting room for children up to 16 years',
      'Children under 12 dine complimentary from children’s menu with dining adult',
      'Family by JW discovery activity backpack and culinary cookie workshop',
      'Complimentary access to 3 outdoor pools and dedicated kids splash playground',
      'Late check-out until 2:00 PM for a relaxed departure'
    ],
    termsAndConditions: [
      'Second room discount applied upon check-in with children present',
      'Maximum 2 adults and 2 children per room'
    ]
  },
  {
    id: 'epicurean-brunch-stay',
    title: 'Weekend Epicurean Brunch & Stay',
    tagline: 'Award-winning Friday buffet, dry-aged steaks & pool day',
    badge: 'Weekend Special',
    description: 'Elevate your weekend with Muscat’s renowned Friday Brunch at Kitchen 7 & Pink Salt, featuring live seafood stations, dry-aged carvery, followed by poolside cocktails at Catch and late check-out on Saturday.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1000&q=85',
    promoCode: 'BRU',
    validDates: 'Thursday & Friday check-ins through 2026',
    priceHighlight: 'Includes Friday Grand Brunch for two',
    includes: [
      'Deluxe Guest Room accommodation with serene wadi view',
      'Award-winning Friday Grand Brunch for two persons including house beverages',
      'Saturday late check-out until 4:00 PM',
      'Complimentary poolside sunbed reservation at Catch with chilled coconut water',
      '20% discount on all Spa by JW weekend treatments'
    ],
    termsAndConditions: [
      'Available for Thursday or Friday night stays only',
      'Brunch reservation is secured automatically at booking'
    ]
  },
  {
    id: 'business-ocec-delegate',
    title: 'Business & OCEC Delegate All-Inclusive',
    tagline: 'Direct skybridge to Oman Convention & Exhibition Centre',
    badge: 'Corporate Advantage',
    description: 'Designed for conference delegates and business leaders. Walk straight to the OCEC exhibition halls via our climate-controlled bridge, enjoy Executive Lounge access, laundry pressing, and high-speed boardroom privileges.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    promoCode: 'BIZ',
    validDates: 'Valid during all major OCEC exhibitions & summits',
    priceHighlight: 'Includes Executive Lounge & dry cleaning',
    includes: [
      'Executive Room or Suite with direct indoor air-conditioned access to OCEC',
      'Full Executive Lounge privileges: breakfast, afternoon tea, and evening cocktail reception',
      'Complimentary pressing of two garments daily',
      '2 hours complimentary use of Executive Boardroom per stay',
      'Priority early check-in from 10:00 AM upon availability'
    ],
    termsAndConditions: [
      'Proof of convention attendance or corporate affiliation requested at check-in',
      'Cancellation allowed up to 24 hours prior without penalty'
    ]
  }
];

export const MEETING_SPACES: MeetingSpace[] = [
  {
    name: 'Grand Ballroom',
    areaSqm: 1100,
    capacityReception: 1200,
    capacityBanquet: 750,
    capacityTheater: 1050,
    dimensions: '36.5m x 30.2m',
    ceilingHeight: '7.5m',
    features: 'Pillarless, direct vehicle loading access, crystal chandeliers, state-of-the-art motorized 4K projection screens, divisible into 3 soundproof sections'
  },
  {
    name: 'Junior Ballroom',
    areaSqm: 420,
    capacityReception: 450,
    capacityBanquet: 280,
    capacityTheater: 380,
    dimensions: '21.0m x 20.0m',
    ceilingHeight: '6.0m',
    features: 'Divisible into two soundproof sections, dedicated pre-function terrace, natural lighting, drop-down laser projectors'
  },
  {
    name: 'Wadi Garden Event Lawn',
    areaSqm: 650,
    capacityReception: 600,
    capacityBanquet: 380,
    capacityTheater: 450,
    dimensions: 'Outdoor Landscaped',
    ceilingHeight: 'Open Sky',
    features: 'Surrounded by date palms, ambient architectural lighting, private outdoor bar setups, unobstructed wadi views'
  },
  {
    name: 'Meeting Suites 1 to 6 (OCEC Skybridge Wing)',
    areaSqm: 95,
    capacityReception: 80,
    capacityBanquet: 50,
    capacityTheater: 75,
    dimensions: '11.5m x 8.2m',
    ceilingHeight: '4.0m',
    features: 'Direct indoor air-conditioned bridge connection to Oman Convention & Exhibition Centre, 85-inch interactive displays, video teleconferencing'
  },
  {
    name: 'Executive Boardroom',
    areaSqm: 68,
    capacityReception: 25,
    capacityBanquet: 20,
    capacityTheater: 22,
    dimensions: '9.8m x 6.9m',
    ceilingHeight: '3.8m',
    features: 'Built-in 4K teleconference screen, luxury ergonomic executive leather armchairs, private butler pantry and coffee bar'
  },
  {
    name: 'Al Irfan Outdoor Amphitheater & Terrace',
    areaSqm: 380,
    capacityReception: 300,
    capacityBanquet: 180,
    capacityTheater: 240,
    dimensions: 'Terraced Stone',
    ceilingHeight: 'Open Sky',
    features: 'Multi-tiered Omani stone amphitheater, natural acoustics, ideal for cultural performances and evening award galas'
  }
];

export const JW_MARRIOTT_MUSCAT_DATA: HotelData = {
  id: 'mctmj-jw-marriott-hotel-muscat',
  name: 'JW Marriott Hotel Muscat',
  brand: 'JW Marriott',
  marshaCode: 'MCTMJ',
  starRating: 5,
  address: {
    street: 'Madinat Al Irfan, Airport Heights',
    district: 'Madinat Al Irfan',
    city: 'Muscat',
    postalCode: 'PO Box 1121, PC 111',
    country: 'Sultanate of Oman'
  },
  phone: '+968 24 920000',
  email: 'mctmj.reservations@marriott.com',
  checkInTime: '3:00 PM',
  checkOutTime: '12:00 PM',
  totalRooms: 304,
  totalSuites: 49,
  meetingRoomsCount: 14,
  totalMeetingSpaceSqm: 2200,
  coordinates: {
    lat: 23.5786,
    lng: 58.3072
  },
  heroImages: GALLERY_IMAGES.slice(0, 5),
  gallery: GALLERY_IMAGES,
  rooms: ROOMS_DATA,
  dining: DINING_VENUES,
  offers: HOTEL_OFFERS,
  meetingSpaces: MEETING_SPACES
};
