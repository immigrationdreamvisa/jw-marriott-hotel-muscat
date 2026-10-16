import { BookingRecord } from '../types/hotel';

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'booking-mctmj-01',
    confirmationNumber: 'MB-MCTMJ-729401',
    bookingDate: '2026-10-10T14:22:00Z',
    status: 'Confirmed',
    room: {
      id: 'executive-club-king',
      name: 'Executive Room, 1 King, Executive Lounge Access',
      category: 'Executive Club',
      image: 'https://cache.marriott.com/content/dam/marriott-renditions/MCTMJ/mctmj-executive-0027-hor-clsc.jpg?output-quality=85&interpolation=progressive-bilinear&downsize=1300px:*',
      bedConfig: '1 King Bed with Feather Down Pillows & Duvet',
      view: 'Panoramic Wadi & Mountain View',
      sqm: 45,
    },
    checkIn: '2026-10-14',
    checkOut: '2026-10-16',
    nights: 2,
    rooms: 1,
    adults: 2,
    children: 0,
    rateType: 'Marriott Bonvoy Member Exclusive Rate',
    pricing: {
      ratePerNightOMR: 118,
      subtotalOMR: 236,
      tourismTaxOMR: 18.88,
      vatOMR: 11.80,
      serviceChargeOMR: 9.44,
      totalOMR: 276.12,
    },
    guest: {
      fullName: 'Alex Vance',
      email: 'alex.vance@marriottbonvoy.com',
      phone: '+968 9123 4567',
      bonvoyNumber: 'MB-984210492',
      specialRequests: 'High floor facing Wadi, quiet location, 2 feather pillows.',
      arrivalTime: '15:00',
    },
    payment: {
      method: 'Credit Card (Visa Signature)',
      cardBrand: 'Visa',
      cardLast4: '4892',
      transactionRef: 'TXN-OM-2026-993812',
      folioNumber: 'FOLIO-MCTMJ-2026-0842',
      paidAt: '2026-10-10 14:22 GMT+4',
      status: 'Paid & Settled',
      bonvoyPointsEarned: 2761,
    },
  },
  {
    id: 'booking-mctmj-02',
    confirmationNumber: 'MB-MCTMJ-510842',
    bookingDate: '2026-08-15T09:14:00Z',
    status: 'Completed',
    room: {
      id: 'luban-executive-suite',
      name: 'Luban Executive Suite, 1 King, 1 Bedroom, Balcony',
      category: 'Signature Suite',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85',
      bedConfig: '1 King Bed in Private Master Suite + Living Room Sofa',
      view: 'Panoramic Wadi & Al Ansab Reserve View',
      sqm: 76,
    },
    checkIn: '2026-08-20',
    checkOut: '2026-08-23',
    nights: 3,
    rooms: 1,
    adults: 2,
    children: 1,
    rateType: 'Marriott Bonvoy Suite Experience Rate',
    pricing: {
      ratePerNightOMR: 198,
      subtotalOMR: 594,
      tourismTaxOMR: 47.52,
      vatOMR: 29.70,
      serviceChargeOMR: 23.76,
      totalOMR: 694.98,
    },
    guest: {
      fullName: 'Alex Vance',
      email: 'alex.vance@marriottbonvoy.com',
      phone: '+968 9123 4567',
      bonvoyNumber: 'MB-984210492',
      specialRequests: 'Late checkout requested at 14:00, baby cot required.',
      arrivalTime: '14:00',
    },
    payment: {
      method: 'American Express Platinum',
      cardBrand: 'AMEX',
      cardLast4: '1009',
      transactionRef: 'TXN-OM-2026-640192',
      folioNumber: 'FOLIO-MCTMJ-2026-0419',
      paidAt: '2026-08-15 09:14 GMT+4',
      status: 'Paid & Settled',
      bonvoyPointsEarned: 6950,
    },
  },
  {
    id: 'booking-mctmj-03',
    confirmationNumber: 'MB-MCTMJ-384910',
    bookingDate: '2026-06-02T11:45:00Z',
    status: 'Completed',
    room: {
      id: 'deluxe-king',
      name: 'Deluxe Guest Room, 1 King, Garden View',
      category: 'Deluxe Room',
      image: 'https://cache.marriott.com/is/image/marriotts7prod/jw-mctmj-mctmj-deluxeroom-30708-15417:Classic-Hor?wid=1300&fit=constrain',
      bedConfig: '1 King Bed with Luxury Pillowtop Mattress',
      view: 'Lush JW Garden View',
      sqm: 43,
    },
    checkIn: '2026-06-10',
    checkOut: '2026-06-11',
    nights: 1,
    rooms: 1,
    adults: 1,
    children: 0,
    rateType: 'Standard Flexible Rate',
    pricing: {
      ratePerNightOMR: 78,
      subtotalOMR: 78,
      tourismTaxOMR: 6.24,
      vatOMR: 3.90,
      serviceChargeOMR: 3.12,
      totalOMR: 91.26,
    },
    guest: {
      fullName: 'Alex Vance',
      email: 'alex.vance@marriottbonvoy.com',
      phone: '+968 9123 4567',
      bonvoyNumber: 'MB-984210492',
      specialRequests: 'Near elevator, extra bath towels.',
      arrivalTime: '16:00',
    },
    payment: {
      method: 'Mastercard World Elite',
      cardBrand: 'Mastercard',
      cardLast4: '7721',
      transactionRef: 'TXN-OM-2026-218491',
      folioNumber: 'FOLIO-MCTMJ-2026-0182',
      paidAt: '2026-06-02 11:45 GMT+4',
      status: 'Paid & Settled',
      bonvoyPointsEarned: 913,
    },
  },
];

const STORAGE_KEY = 'jw_marriott_bookings_reports';

export const getStoredBookings = (): BookingRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_BOOKINGS;
  } catch (e) {
    return INITIAL_BOOKINGS;
  }
};

export const saveBookingRecord = (record: BookingRecord) => {
  try {
    const existing = getStoredBookings();
    const updated = [record, ...existing.filter((b) => b.id !== record.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [record, ...INITIAL_BOOKINGS];
  }
};
