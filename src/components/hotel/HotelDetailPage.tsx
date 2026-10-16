import React, { useState } from 'react';
import { HotelHeaderHeroBooking } from './HotelHeaderHeroBooking';
import { HotelHeroEditorial } from './HotelHeroEditorial';
import { HotelGallery } from './HotelGallery';
import { AvailableRatesSection } from './AvailableRatesSection';
import { AccommodationsSection } from './AccommodationsSection';
import { SuitesSection } from './SuitesSection';
import { PoolsOutdoorSection } from './PoolsOutdoorSection';
import { DiningSection } from './DiningSection';
import { FamilyLeisureSection } from './FamilyLeisureSection';
import { ExperiencesSection } from './ExperiencesSection';
import { MeetingsEventsSection } from './MeetingsEventsSection';
import { ExecutiveLoungeSection } from './ExecutiveLoungeSection';
import { AmenitiesSection } from './AmenitiesSection';
import { OffersSection } from './OffersSection';
import { WellnessPoolsSection } from './WellnessPoolsSection';
import { PoliciesAndFaqSection } from './PoliciesAndFaqSection';
import { RoomDetailsModal } from './RoomDetailsModal';
import { GuestReviewsModal } from './GuestReviewsModal';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { BookingsReportSection } from './BookingsReportSection';
import { Room, BookingState, HotelOffer } from '../../types/hotel';
import { ROOMS_DATA } from '../../data/jwMarriottMuscatData';

interface HotelDetailPageProps {
  bookingState: BookingState;
  onUpdateBooking: (state: BookingState) => void;
  currency: string;
  onChangeCurrency: (cur: string) => void;
  language: string;
  onChangeLanguage: (lang: string) => void;
}

export const HotelDetailPage: React.FC<HotelDetailPageProps> = ({
  bookingState,
  onUpdateBooking,
  currency,
  onChangeCurrency,
  language,
  onChangeLanguage,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [inspectingRoom, setInspectingRoom] = useState<Room | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [isRatesSectionOpen, setIsRatesSectionOpen] = useState(false);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  const handleSelectOffer = (offer: HotelOffer) => {
    onUpdateBooking({
      ...bookingState,
      rateType: 'promo',
      promoCode: offer.promoCode,
    });
    // Open checkout directly for the offer with primary room
    setSelectedRoomForBooking(ROOMS_DATA[0]);
  };

  const handleCheckAvailability = () => {
    setIsLoadingAvailability(true);
    setIsRatesSectionOpen(true);

    const performScroll = (attempts = 0) => {
      const el = document.getElementById('availability-section') || document.getElementById('available-rates-section');
      if (el) {
        const headerOffset = window.innerWidth < 768 ? 96 : 72;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = Math.max(0, elementPosition - headerOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Release loading indicator after smooth scroll begins
        setTimeout(() => {
          setIsLoadingAvailability(false);
        }, 350);
      } else if (attempts < 25) {
        // Retry until React mounts the element in the DOM
        setTimeout(() => performScroll(attempts + 1), 35);
      } else {
        setIsLoadingAvailability(false);
      }
    };

    // Use requestAnimationFrame for synchronized layout calculation
    requestAnimationFrame(() => {
      setTimeout(() => performScroll(0), 40);
    });
  };

  const handleScrollToOverview = () => {
    const el = document.getElementById('accommodations-section') || document.getElementById('dining-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-white min-h-screen text-[#1c1c1c]">
      {/* 1. Official JW Marriott Dark Header & 5 Centered Nav Buttons */}
      <HotelHeaderHeroBooking
        bookingState={bookingState}
        onUpdateBooking={onUpdateBooking}
        currency={currency}
        onChangeCurrency={onChangeCurrency}
        language={language}
        onChangeLanguage={onChangeLanguage}
        onOpenGallery={() => setIsLightboxOpen(true)}
        onOpenReviews={() => setIsReviewsModalOpen(true)}
        onProceedToBooking={(room) => setSelectedRoomForBooking(room)}
        onViewRates={handleCheckAvailability}
      />

      {/* 2. Hero Section: Cinematic Photograph, Narrative Overview, Explore & Check Availability Buttons */}
      <HotelHeroEditorial
        onExploreClick={handleScrollToOverview}
        onCheckAvailabilityClick={handleCheckAvailability}
        isLoadingAvailability={isLoadingAvailability}
      />

      {/* 3. Dedicated Section: ALL HOTEL ROOMS AVAILABILITY & DETAILS (Opens when Check Availability is clicked) */}
      {isRatesSectionOpen && (
        <AvailableRatesSection
          bookingState={bookingState}
          onUpdateBooking={onUpdateBooking}
          currency={currency}
          onProceedToBooking={(room) => setSelectedRoomForBooking(room)}
          onViewRoomDetails={(room) => setInspectingRoom(room)}
          onCloseRates={() => setIsRatesSectionOpen(false)}
          onModifyDates={handleCheckAvailability}
        />
      )}

      {/* 4. Prominent Mosaic Hotel Gallery with Lightbox Viewer */}
      <HotelGallery
        isLightboxOpen={isLightboxOpen}
        setIsLightboxOpen={setIsLightboxOpen}
      />

      {/* 5. Rooms & Accommodations (Deluxe, Premium Wadi View & Executive Rooms) */}
      <AccommodationsSection
        currency={currency}
        onProceedToBooking={(room) => setSelectedRoomForBooking(room)}
        onViewRoomDetails={(room) => setInspectingRoom(room)}
      />

      {/* 6. Luxury Suites (Junior Suite, Luban Executive Suite & Presidential Penthouse) */}
      <SuitesSection
        currency={currency}
        onProceedToBooking={(room) => setSelectedRoomForBooking(room)}
        onViewRoomDetails={(room) => setInspectingRoom(room)}
      />

      {/* 7. Swimming Pools & Outdoor Spaces (25m Heated Lap Pool, Family Pool, Kids Splash Area, Cabanas) */}
      <PoolsOutdoorSection />

      {/* 8. Dining & Restaurants (Pink Salt, Kitchen 7, Catch, Butter Buns, JW Market, Tonika) */}
      <DiningSection />

      {/* 9. Family & Leisure Experiences (Family by JW, Confirmed Facilities vs Advance Bookings) */}
      <FamilyLeisureSection />

      {/* 10. Luxury & Mindful Experiences (JW Garden, Al Ansab Wetland, Sunrise Yoga, Qahwa Ceremony) */}
      <ExperiencesSection />

      {/* 11. Meetings, Conferences & Weddings (Junior Ballroom, 14 Studios, OCEC Skybridge, Request a Quote) */}
      <MeetingsEventsSection />

      {/* 12. Executive Lounge & Club Privileges (Muscat's Largest Club Lounge) */}
      <ExecutiveLoungeSection />

      {/* 13. Spa by JW, 24/7 Fitness Centre, Saunas & Mindful Yoga Deck */}
      <WellnessPoolsSection />

      {/* 14. Verified Hotel Amenities & Guest Services (LEED Gold, Wi-Fi, Valet, EV Charging) */}
      <AmenitiesSection />

      {/* 15. Exclusive Offers & Packages */}
      <OffersSection onSelectOffer={handleSelectOffer} />

      {/* 16. Booking Reports & Payment Details (Official Guest Folios, Invoices & Reservations) */}
      <BookingsReportSection
        currency={currency}
        onNewBookingClick={handleCheckAvailability}
      />

      {/* 17. Property Policies, LEED Sustainability & FAQs */}
      <PoliciesAndFaqSection />

      {/* Interactive Room Details Modal (Activated on "View Room Details") */}
      <RoomDetailsModal
        room={inspectingRoom}
        onClose={() => setInspectingRoom(null)}
        onProceedToBooking={(room) => {
          setInspectingRoom(null);
          setSelectedRoomForBooking(room);
        }}
        currency={currency}
      />

      {/* Verified Guest Reviews Modal (Activated on "564 Reviews") */}
      <GuestReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
      />

      {/* Booking Checkout / Reservation Confirmation Modal */}
      {selectedRoomForBooking && (
        <BookingConfirmationModal
          room={selectedRoomForBooking}
          bookingState={bookingState}
          currency={currency}
          onClose={() => setSelectedRoomForBooking(null)}
        />
      )}
    </main>
  );
};
