import React, { useState } from 'react';
import { Award, Sparkles, Check, Gift, Shield, ChevronRight } from 'lucide-react';

export const BonvoyBenefitsSection: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<number>(3); // Default Platinum

  const tiers = [
    {
      name: 'Member',
      nights: 'Join for Free',
      bonus: 'Standard Points',
      lounge: false,
      lateCheckout: 'Standard',
      benefits: [
        'Exclusive Member Rates on all rooms & suites',
        'Complimentary standard high-speed Wi-Fi',
        'Mobile Check-In & Mobile Key via Marriott Bonvoy app',
        'Earn points on eligible dining at Pink Salt and Kitchen 7'
      ]
    },
    {
      name: 'Silver Elite',
      nights: '10 Nights / Year',
      bonus: '10% Bonus Points',
      lounge: false,
      lateCheckout: 'Priority Late Checkout',
      benefits: [
        'All Member benefits included',
        '10% Bonus points on eligible hotel purchases',
        'Priority late check-out (subject to availability)',
        'Dedicated Elite reservation support line'
      ]
    },
    {
      name: 'Gold Elite',
      nights: '25 Nights / Year',
      bonus: '25% Bonus Points',
      lounge: false,
      lateCheckout: '2:00 PM Late Checkout',
      benefits: [
        'All Silver Elite benefits included',
        '25% Bonus points on hotel room and dining spend',
        '2:00 PM late check-out guaranteed (subject to availability)',
        'Complimentary enhanced room upgrade (view or high floor)',
        'Welcome gift of 500 bonus points upon arrival'
      ]
    },
    {
      name: 'Platinum Elite',
      nights: '50 Nights / Year',
      bonus: '50% Bonus Points',
      lounge: true,
      lateCheckout: '4:00 PM Late Checkout',
      benefits: [
        'Guaranteed Executive Lounge Access with daily complimentary hot breakfast, tea & evening cocktails',
        'Complimentary room upgrade up to select luxury suites',
        'Guaranteed 4:00 PM late check-out',
        '50% Bonus points on all eligible hotel spend',
        'Choice of welcome gift: 1,000 points or Omani artisan gift'
      ]
    },
    {
      name: 'Titanium & Ambassador',
      nights: '75+ Nights / Year',
      bonus: '75% Bonus Points',
      lounge: true,
      lateCheckout: 'Your24™ & 4:00 PM Late Checkout',
      benefits: [
        'All Platinum Elite privileges with highest suite upgrade priority',
        '75% Bonus points on all eligible folio spend',
        'Your24™ flexibility: Choose your 24-hour check-in/out window',
        'Dedicated Personal Ambassador concierge service'
      ]
    }
  ];

  const current = tiers[selectedTier];

  return (
    <section id="bonvoy-section" className="py-16 bg-[#181818] text-white border-b border-stone-800 scroll-section-offset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 border-b border-stone-800 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#c5a880] text-[11px] font-bold uppercase tracking-[0.25em] mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Loyalty Privileges</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
              Marriott Bonvoy at JW Marriott Hotel Muscat
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
              Unlock exclusive member rates, room upgrades, and complimentary Executive Lounge access in Oman.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#booking-panel"
              className="inline-flex items-center px-6 py-2.5 bg-[#c5a880] text-black font-semibold uppercase tracking-wider text-xs hover:bg-[#d6bc96] transition"
            >
              <span>Join & Book Member Rate</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        {/* Tier Tabs */}
        <div className="flex items-center space-x-2 py-6 overflow-x-auto no-scrollbar">
          {tiers.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTier(idx)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition ${
                selectedTier === idx
                  ? 'bg-[#c5a880] text-black'
                  : 'bg-[#252525] text-stone-300 hover:bg-[#333]'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Tier Details Card */}
        <div className="bg-[#222222] border border-stone-700 p-6 sm:p-8 rounded-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-3 border-b md:border-b-0 md:border-r border-stone-700 pb-6 md:pb-0 md:pr-8">
              <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest block">
                Tier Qualification: {current.nights}
              </span>
              <h3 className="font-serif text-3xl text-white font-medium">
                {current.name} Status
              </h3>
              <div className="pt-2 space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-300">
                  <span>Bonus Points on Stay:</span>
                  <strong className="text-white font-mono">{current.bonus}</strong>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span>Executive Lounge Access:</span>
                  <strong className={current.lounge ? 'text-[#c5a880]' : 'text-stone-500'}>
                    {current.lounge ? 'Guaranteed Included' : 'Available with Club Rooms'}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span>Late Checkout Privilege:</span>
                  <strong className="text-white">{current.lateCheckout}</strong>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c5a880]">
                Privileges at JW Marriott Hotel Muscat:
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {current.benefits.map((b, i) => (
                  <div key={i} className="flex items-start text-xs text-stone-300">
                    <Check className="w-4 h-4 text-[#c5a880] mr-2 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
