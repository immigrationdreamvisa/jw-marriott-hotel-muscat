/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MarriottFooter } from './components/common/MarriottFooter';
import { HotelDetailPage } from './components/hotel/HotelDetailPage';
import { BookingState } from './types/hotel';

export default function App() {
  const [currency, setCurrency] = useState<string>('OMR');
  const [language, setLanguage] = useState<string>('en');

  // Default booking dates matching user screenshot: Wed, Oct 14 -> Thu, Oct 15 (1 night, 1 room, 1 adult)
  const [bookingState, setBookingState] = useState<BookingState>({
    checkIn: '2026-10-14',
    checkOut: '2026-10-15',
    rooms: 1,
    adults: 1,
    children: 0,
    rateType: 'standard',
  });

  return (
    <div className={`min-h-screen flex flex-col bg-white text-[#1c1c1c] ${language === 'ar' ? 'rtl font-sans' : 'ltr'}`}>
      {/* Main Hotel Overview Content with Top Header, Property Subnav & Booking Bar matching screenshot */}
      <div className="flex-1">
        <HotelDetailPage
          bookingState={bookingState}
          onUpdateBooking={setBookingState}
          currency={currency}
          onChangeCurrency={setCurrency}
          language={language}
          onChangeLanguage={setLanguage}
        />
      </div>

      {/* Global Marriott Bonvoy Footer with Brand Logos & Payment Badges */}
      <MarriottFooter />
    </div>
  );
}
