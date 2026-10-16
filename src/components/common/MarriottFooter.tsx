import React from 'react';
import { Shield, Smartphone, Globe, Award, HeartHandshake, CheckCircle } from 'lucide-react';
import { JWMarriottLogo, MarriottBonvoyLogo, PaymentCardIcon } from './BrandLogos';

export const MarriottFooter: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-stone-300 text-xs border-t border-stone-800">
      {/* Primary Brand Logos Banner in Footer */}
      <div className="bg-[#181818] border-b border-stone-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-stone-800">
            {/* JW Marriott Griffin Logo */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <JWMarriottLogo variant="light" className="h-12" />

            </div>

            {/* Marriott Bonvoy Badge & Loyalty Mark */}
            <div className="flex flex-col items-center md:items-end space-y-2">
              <MarriottBonvoyLogo variant="light" className="h-8" />
              <div className="flex items-center space-x-2 text-[11px] text-[#c5a880]">
                <Shield className="w-3.5 h-3.5" />
                <span>Official Luxury Member Property • Marsha Code: MCTMJ</span>
              </div>
            </div>
          </div>

          {/* International Payment Methods Accepted Banner (Only Cards & PayPal) */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
                Accepted International Payment Methods
              </span>
              <p className="text-[11px] text-stone-400">
                Only <strong className="text-stone-200 font-medium">Card</strong> and <strong className="text-stone-200 font-medium">PayPal</strong> accepted. Secure 256-bit SSL encrypted.
              </p>
            </div>

            {/* Payment Icons: Only Card and PayPal */}
            <div className="flex items-center space-x-2.5 bg-[#202020] px-4 py-2 border border-stone-800 rounded-xs">
              <PaymentCardIcon type="card" className="h-5" />
              <div className="h-4 w-[1px] bg-stone-700 mx-1" />
              <PaymentCardIcon type="paypal" className="h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Guarantee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-xs mb-3 border-b border-stone-800 pb-1">
              JW Marriott Hotel Muscat
            </h5>
            <p className="text-stone-400 text-xs leading-relaxed mb-3">
              Madinat Al Irfan, Airport Heights, PO Box 1121, PC 111, Muscat, Oman.
            </p>
            <p className="text-stone-300 text-xs">
              Direct Phone: <a href="tel:+96824920000" className="hover:text-white underline">+968 24 920000</a>
            </p>
            <p className="text-stone-400 text-[11px] mt-2">
              LEED Gold Certified • Direct Connection to OCEC
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-xs mb-3 border-b border-stone-800 pb-1">
              Top Reservations & Stays
            </h5>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><a href="#booking-panel" className="hover:text-white transition">Book JW Marriott Hotel Muscat</a></li>
              <li><a href="#offers-section" className="hover:text-white transition">Muscat Hotel Packages & Deals</a></li>
              <li><a href="#accommodations-section" className="hover:text-white transition">Executive Suites with Lounge Access</a></li>
              <li><a href="#events-section" className="hover:text-white transition">OCEC Connected Conference Bookings</a></li>
              <li><a href="#dining-section" className="hover:text-white transition">Pink Salt Steakhouse Reservations</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-xs mb-3 border-b border-stone-800 pb-1">
              Guest Care & Services
            </h5>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><a href="#policies-section" className="hover:text-white transition">Check-in & Check-out Policies</a></li>
              <li><a href="https://www.google.com/maps/search/?api=1&query=JW+Marriott+Hotel+Muscat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Directions & Map (Airport 10 km)</a></li>
              <li><a href="#policies-section" className="hover:text-white transition">Accessible Rooms & Facilities</a></li>
              <li><a href="#faq" className="hover:text-white transition">Frequently Asked Questions</a></li>
              <li><a href="#wellness-section" className="hover:text-white transition">Spa by JW & Fitness Hours</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white uppercase tracking-wider text-xs mb-3 border-b border-stone-800 pb-1">
              Best Rate Guarantee
            </h5>
            <div className="bg-[#1b1b1b] p-4 rounded border border-stone-800 space-y-2 text-xs">
              <div className="flex items-center text-white font-medium">
                <Award className="w-4 h-4 mr-2 text-[#c5a880]" />
                <span>Marriott Bonvoy Assurance</span>
              </div>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                When you book directly with us, you always get the lowest rate guaranteed, complimentary Wi-Fi, and earn points on your stay.
              </p>
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-[#c5a880]">
                <span>No Booking Fees</span>
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Global Policy & Legal Footnotes */}
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center md:justify-start">
            <a href="#privacy" className="hover:text-stone-300 transition">Privacy Center</a>
            <span>•</span>
            <a href="#terms" className="hover:text-stone-300 transition">Terms of Use</a>
            <span>•</span>
            <a href="#program-terms" className="hover:text-stone-300 transition">Marriott Bonvoy Terms</a>
            <span>•</span>
            <a href="#accessibility" className="hover:text-stone-300 transition">Digital Accessibility</a>
            <span>•</span>
            <a href="#tracking" className="hover:text-stone-300 transition">Tracking Preferences</a>
            <span>•</span>
            <span>Ministry of Heritage & Tourism License No. 1024</span>
          </div>
          <div className="text-center md:text-right">
            <p>© 2026 Marriott International, Inc. All rights reserved. JW Marriott Hotel Muscat.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
