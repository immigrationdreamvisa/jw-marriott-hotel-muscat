export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'All' | 'Exterior & Grounds' | 'Rooms & Suites' | 'Dining' | 'Pools & Wellness' | 'Meetings & Events';
  description?: string;
}

export interface RoomAmenity {
  icon: string;
  name: string;
}

export interface Room {
  id: string;
  name: string;
  category: 'deluxe' | 'premium' | 'executive' | 'suite';
  categoryLabel: string;
  sqm: number;
  sqft: number;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  bedConfig: string;
  view: string;
  description: string;
  pricePerNightOMR: number;
  memberPriceOMR: number;
  images: string[];
  imageCaptions?: string[];
  features: string[];
  amenities: string[];
  hasLoungeAccess: boolean;
  balcony?: boolean;
  floors?: string;
  bathDetails: string;
}

export interface MenuItem {
  name: string;
  category: string;
  description: string;
  priceOMR: number | string;
  dietary?: ('Halal' | 'Gluten-Free' | 'Vegan' | 'Vegetarian' | 'JW Garden Organic' | 'Chef Signature' | 'Spicy' | 'spicy')[];
  pairing?: string;
  spicy?: boolean;
}

export interface DiningVenue {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  atmosphere: string;
  dressCode: string;
  hours: string;
  signatureDish: string;
  image: string;
  tagline: string;
  features: string[];
  chef?: {
    name: string;
    title: string;
    quote: string;
  };
  menuCategories?: string[];
  fullMenu?: MenuItem[];
  menuHighlights: { item: string; description: string; priceOMR?: string }[];
}

export interface WeddingPackage {
  id: string;
  name: string;
  tagline: string;
  guestCapacity: string;
  venueName: string;
  priceStartingOMR: string;
  image: string;
  description: string;
  inclusions: string[];
  menuPreview: string[];
  bridalServices: string[];
}

export interface HotelOffer {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  image: string;
  promoCode: string;
  validDates: string;
  includes: string[];
  termsAndConditions?: string[];
  priceHighlight?: string;
}

export interface MeetingSpace {
  name: string;
  areaSqm: number;
  capacityReception: number;
  capacityBanquet: number;
  capacityTheater: number;
  dimensions: string;
  ceilingHeight: string;
  features: string;
}

export interface HotelData {
  id: string;
  name: string;
  brand: string;
  marshaCode: string;
  starRating: number;
  address: {
    street: string;
    district: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  totalRooms: number;
  totalSuites: number;
  meetingRoomsCount: number;
  totalMeetingSpaceSqm: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImages: GalleryImage[];
  gallery: GalleryImage[];
  rooms: Room[];
  dining: DiningVenue[];
  offers: HotelOffer[];
  meetingSpaces: MeetingSpace[];
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  rateType: string;
  promoCode?: string;
}

export interface ReservationData {
  reservationNumber: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  adults: number;
  children: number;
  ratePerNightOMR: number;
  subtotalOMR: number;
  taxesOMR: number;
  totalOMR: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  bonvoyNumber?: string;
  specialRequests?: string;
}

export interface BookingRecord {
  id: string;
  confirmationNumber: string;
  bookingDate: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  room: {
    id: string;
    name: string;
    category: string;
    image: string;
    bedConfig: string;
    view: string;
    sqm: number;
  };
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  adults: number;
  children: number;
  rateType: string;
  pricing: {
    ratePerNightOMR: number;
    subtotalOMR: number;
    tourismTaxOMR: number;
    vatOMR: number;
    serviceChargeOMR: number;
    totalOMR: number;
  };
  guest: {
    fullName: string;
    email: string;
    phone: string;
    bonvoyNumber?: string;
    specialRequests?: string;
    arrivalTime?: string;
  };
  payment: {
    method: string;
    cardBrand?: string;
    cardLast4?: string;
    transactionRef: string;
    folioNumber: string;
    paidAt: string;
    status: 'Paid & Settled' | 'Authorized' | 'Refunded';
    bonvoyPointsEarned: number;
  };
}
