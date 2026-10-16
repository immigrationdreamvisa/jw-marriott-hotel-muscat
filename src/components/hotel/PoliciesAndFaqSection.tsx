import React, { useState } from 'react';
import { 
  Award, Shield, Leaf, Clock, Ban, Accessibility, 
  ChevronDown, ChevronUp, HelpCircle, CheckCircle2, Car, Sparkles
} from 'lucide-react';

export const PoliciesAndFaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is the hotel directly connected to the Oman Convention & Exhibition Centre (OCEC)?',
      a: 'Yes. JW Marriott Hotel Muscat features a direct, enclosed, climate-controlled pedestrian footbridge linking the hotel mezzanine level directly into the Oman Convention & Exhibition Centre. Delegates, speakers, and exhibitors can transition smoothly between global congresses and luxury hospitality without stepping outdoors.'
    },
    {
      q: 'How far is JW Marriott Hotel Muscat from Muscat International Airport (MCT) and is airport transport available?',
      a: 'The hotel is conveniently situated just 10 kilometers (approximately 10 to 12 minutes by private vehicle) from Muscat International Airport. The hotel Concierge offers private luxury Mercedes-Benz and BMW limousine transfers equipped with chilled towels, cold water, and high-speed Wi-Fi upon advance reservation.'
    },
    {
      q: 'Who has complimentary access to the JW Executive Lounge?',
      a: 'Complimentary access is extended to all registered guests staying in Executive Club Rooms, Junior Suites, Luban Suites, and the Presidential Suite, as well as Marriott Bonvoy Platinum Elite, Titanium Elite, and Ambassador Elite members with one registered guest. Privileges include gourmet hot breakfast, all-day refreshments, traditional afternoon tea, and evening hors d’oeuvres with sommelier pairings.'
    },
    {
      q: 'Are the outdoor swimming pools temperature-controlled year-round?',
      a: 'Yes. All three outdoor swimming pools—including the 25-meter heated lap pool, the curved resort leisure pool, and the sun-shaded children’s splash pool—are temperature-controlled year-round, ensuring comfortable 28°C to 30°C swimming throughout both the warm summer and mild Omani winter months.'
    },
    {
      q: 'Is alcohol served at the hotel’s restaurants and lounges?',
      a: 'Yes. JW Marriott Hotel Muscat is a fully licensed five-star property. Pink Salt, Catch Pool Bar, Butter Buns, Tonika Botanical Lounge, and the Executive Lounge serve an extensive collection of international fine wines, craft spirits, draft beers, and bespoke cocktails, alongside a dedicated zero-proof botanical beverage program.'
    },
    {
      q: 'What dining policies apply for children and families?',
      a: 'Through the Family by JW initiative, children aged 12 and under dine complimentary from the designated kids menu when dining with an adult ordering from the regular à la carte menu at Kitchen 7 and Catch. High chairs, child-friendly cutlery, and healthy organic meal options are provided.'
    },
    {
      q: 'Can non-hotel guests book dining, spa treatments, or wedding venues?',
      a: 'Absolutely. Local residents and visiting guests in Muscat are warmly welcome to reserve tables at all six dining venues, schedule therapeutic rituals at Spa by JW, or consult with our Certified Marriott Wedding Planners for private galas in our Grand and Junior Ballrooms.'
    },
    {
      q: 'What parking facilities and EV charging are available on property?',
      a: 'The hotel provides complimentary 24-hour valet parking and covered underground self-parking for all registered guests and restaurant patrons. Four high-speed electric vehicle (EV) charging stations (Type 2 and CCS compatible) are available complimentary.'
    },
    {
      q: 'What is the hotel’s cancellation policy for standard bookings?',
      a: 'For standard flexible rate reservations, cancellations can be made free of penalty up to 24 hours prior to 11:59 PM local hotel time on your arrival date. Certain promotional packages or peak holiday dates may require advance notice as noted at time of booking.'
    }
  ];

  return (
    <section id="policies-section" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Sustainability & Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 border-b border-stone-200">
          {/* Sustainability */}
          <div className="bg-emerald-50/50 border border-emerald-100 p-6 sm:p-8">
            <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>LEED Gold Certified Sustainable Hotel</span>
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-medium">
              Environmental Stewardship
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              JW Marriott Hotel Muscat was constructed in accordance with U.S. Green Building Council LEED Gold standards. We actively conserve energy through smart occupancy HVAC systems, eliminate single-use plastics, recycle gray water for desert wadi landscaping, and harvest seasonal herbs directly from our JW Garden.
            </p>
          </div>

          {/* Awards */}
          <div className="bg-amber-50/40 border border-amber-100 p-6 sm:p-8">
            <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Distinguished Honors</span>
            </div>
            <h3 className="font-serif text-2xl text-stone-900 font-medium">
              Industry Awards & Accolades
            </h3>
            <div className="space-y-2.5 mt-3 text-xs text-stone-700">
              <div className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0" />
                <span><strong>Best Luxury Urban Resort in Oman 2024–2026</strong> — Luxury Lifestyle Awards</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0" />
                <span><strong>Leading Culinary Hotel in Middle East</strong> — Haute Grandeur Global Excellence</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0" />
                <span><strong>TripAdvisor Travelers’ Choice Best of the Best</strong> — Ranked in Top 1% Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Grid: Policies & Accessibility */}
        <div className="py-12 border-b border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            {/* Check-in / Check-out */}
            <div className="p-4 bg-stone-50 border border-stone-200">
              <div className="flex items-center space-x-2 text-stone-900 font-semibold mb-2">
                <Clock className="w-4 h-4 text-[#c5a880]" />
                <h4 className="uppercase tracking-wider text-[11px]">Check-In & Out</h4>
              </div>
              <p className="text-stone-600">Check-in from <strong>3:00 PM</strong></p>
              <p className="text-stone-600">Check-out by <strong>12:00 PM</strong></p>
              <p className="text-[11px] text-stone-500 mt-1">Guaranteed late check-out available for Elite members</p>
            </div>

            {/* Parking & Transport */}
            <div className="p-4 bg-stone-50 border border-stone-200">
              <div className="flex items-center space-x-2 text-stone-900 font-semibold mb-2">
                <Car className="w-4 h-4 text-[#c5a880]" />
                <h4 className="uppercase tracking-wider text-[11px]">Valet & Parking</h4>
              </div>
              <p className="text-stone-600">Complimentary 24/7 valet & covered secure self-parking.</p>
              <p className="text-[11px] text-stone-500 mt-1">4 dedicated Type-2 EV charging bays.</p>
            </div>

            {/* Smoke-free */}
            <div className="p-4 bg-stone-50 border border-stone-200">
              <div className="flex items-center space-x-2 text-stone-900 font-semibold mb-2">
                <Ban className="w-4 h-4 text-stone-600" />
                <h4 className="uppercase tracking-wider text-[11px]">Smoke-Free Policy</h4>
              </div>
              <p className="text-stone-600">100% smoke-free policy in all rooms and interior public spaces.</p>
              <p className="text-[11px] text-stone-500 mt-1">Designated outdoor smoking gazebos available.</p>
            </div>

            {/* Accessibility */}
            <div className="p-4 bg-stone-50 border border-stone-200">
              <div className="flex items-center space-x-2 text-stone-900 font-semibold mb-2">
                <Accessibility className="w-4 h-4 text-[#c5a880]" />
                <h4 className="uppercase tracking-wider text-[11px]">Accessibility</h4>
              </div>
              <p className="text-stone-600">Full step-free elevator access, ADA roll-in shower rooms, visual alarms, and wadi rampways.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Expandable FAQs */}
        <div id="faq" className="pt-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c5a880] block mb-1">
              Guest Inquiries
            </span>
            <h3 className="font-serif text-3xl text-stone-900 font-medium">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Everything you need to know about your stay, dining, events, and wellness in Muscat.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-stone-200 bg-[#fafafa] overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-900 hover:text-black focus:outline-none"
                  >
                    <span className="pr-4">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
