import React, { useEffect } from 'react';
import { X, Star, ThumbsUp, CheckCircle, ShieldCheck } from 'lucide-react';
import { RatingDots } from '../common/BrandLogos';

interface GuestReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuestReviewsModal: React.FC<GuestReviewsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const reviews = [
    {
      author: 'Tariq Al-Balushi',
      origin: 'Muscat, Oman',
      stayDate: 'October 2026',
      rating: 5,
      title: 'Flawless luxury and architectural beauty',
      comment: 'An extraordinary urban sanctuary. The direct walkway to OCEC was seamless for our summit, and dining at Pink Salt was world-class. The falaj water features create such a calming ambiance.',
      verified: true,
      helpful: 24,
    },
    {
      author: 'Claire & David Sterling',
      origin: 'London, United Kingdom',
      stayDate: 'September 2026',
      rating: 5,
      title: 'Superb Executive Lounge & Wadi Sunsets',
      comment: 'We stayed in the Luban Executive Suite. The lounge service was impeccable, with sunset views across the nature reserve. Outstanding pool amenities and warm Omani hospitality.',
      verified: true,
      helpful: 19,
    },
    {
      author: 'Dr. Michael Chen',
      origin: 'Singapore',
      stayDate: 'September 2026',
      rating: 4.8,
      title: 'Top-tier business and wellness property in Muscat',
      comment: 'Extremely peaceful sleep quality, high-speed WiFi, LEED Gold environmental architecture, and just 10 minutes from MCT Airport. Spa by JW treatment was rejuvenating.',
      verified: true,
      helpful: 12,
    },
    {
      author: 'Fatima Al-Harthy',
      origin: 'Dubai, UAE',
      stayDate: 'August 2026',
      rating: 5,
      title: 'Family by JW and Kitchen 7 were wonderful',
      comment: 'The kids loved the family pool, and the breakfast spread across seven live stations at Kitchen 7 was second to none. Will certainly return on our next visit to Oman.',
      verified: true,
      helpful: 15,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Floating Top-Right Cross Button */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-stone-900 hover:bg-black text-white px-3.5 py-2 rounded-full shadow-2xl border border-stone-600 hover:border-white transition-all flex items-center space-x-1.5 cursor-pointer group"
        title="Close (Esc)"
        aria-label="Close reviews modal"
      >
        <X className="w-5 h-5 text-[#d29a82] group-hover:text-white transition-colors" />
        <span className="text-xs font-semibold uppercase tracking-wider pr-1">Close</span>
      </button>

      <div
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-none shadow-2xl relative border border-stone-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1c1c1c] text-white p-5 sm:p-6 z-10 flex items-center justify-between border-b border-stone-800">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#d29a82] font-semibold block">
              Marriott Bonvoy Verified Guest Feedback
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">JW Marriott Hotel Muscat Reviews</h3>
          </div>
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-600 transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-[#d29a82]" />
            <span>Close</span>
          </button>
        </div>

        {/* Aggregate Ratings Overview */}
        <div className="p-6 bg-[#2a2827] text-white border-b border-stone-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-4xl font-bold text-white">4.7</span>
              <div>
                <RatingDots rating={4.7} reviewsCount={564} />
                <span className="text-[11px] text-stone-300 block mt-0.5">
                  Excellent • 96% of guests recommend this hotel
                </span>
              </div>
            </div>
            <div className="flex items-center text-xs text-stone-300 bg-stone-800/80 px-3 py-2 border border-stone-700">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-[#d29a82]" />
              <span>Authentic reviews from verified stays</span>
            </div>
          </div>

          {/* Subcategory bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-stone-700 text-xs">
            <div>
              <span className="text-stone-400 block text-[11px]">Cleanliness</span>
              <strong className="text-white font-serif text-base">4.9 / 5</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Service & Staff</span>
              <strong className="text-white font-serif text-base">4.8 / 5</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Dining & Venues</span>
              <strong className="text-white font-serif text-base">4.8 / 5</strong>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px]">Location & Views</span>
              <strong className="text-white font-serif text-base">4.7 / 5</strong>
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="p-6 divide-y divide-stone-200 space-y-6">
          {reviews.map((rev, index) => (
            <div key={index} className={index > 0 ? 'pt-6' : ''}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-stone-900 text-sm">{rev.author}</span>
                    <span className="text-stone-400 text-xs">•</span>
                    <span className="text-stone-500 text-xs">{rev.origin}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 mt-1 text-xs">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-stone-400 text-[11px]">Stayed {rev.stayDate}</span>
                  </div>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Stay
                  </span>
                )}
              </div>

              <h4 className="font-medium text-stone-900 text-sm mt-2">{rev.title}</h4>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">{rev.comment}</p>

              <div className="mt-3 flex items-center text-[11px] text-stone-400">
                <ThumbsUp className="w-3 h-3 mr-1 text-stone-500" />
                <span>{rev.helpful} people found this helpful</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1c1c1c] text-white text-xs uppercase tracking-wider font-semibold hover:bg-black transition"
          >
            Close Reviews
          </button>
        </div>
      </div>
    </div>
  );
};
