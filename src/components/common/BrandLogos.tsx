import React from 'react';

// Authentic JW Marriott Logo (Griffin Crest & Wordmark) from uploaded brand asset
export const JWMarriottLogo: React.FC<{
  className?: string;
  variant?: 'dark' | 'light' | 'gold';
  withSubtitle?: boolean;
}> = ({
  className = 'h-11 sm:h-12',
  variant = 'dark',
  withSubtitle = true,
}) => {
  const logoSrc =
    variant === 'light'
      ? '/images/jw-marriott-logo-white.png'
      : variant === 'gold'
      ? '/images/jw-marriott-logo-gold.png'
      : '/images/jw-marriott-logo-dark.png';

  return (
    <div className="inline-flex flex-col items-start">
      <img
        src={logoSrc}
        alt="JW Marriott"
        className={`${className} w-auto object-contain shrink-0`}
      />
      {withSubtitle && (
        <span
          className="text-[8.5px] sm:text-[9.5px] tracking-[0.36em] uppercase font-sans font-medium mt-1 pl-0.5"
          style={{ color: variant === 'light' ? '#c5a880' : '#78716c' }}
        >
          HOTEL MUSCAT
        </span>
      )}
    </div>
  );
};

// Stacked JW Marriott Griffin Logo exactly as provided in brand asset
export const JWGriffinStackedLogo: React.FC<{
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  onClick?: () => void;
  withSubtitle?: boolean;
}> = ({
  className = 'h-11 sm:h-12',
  variant = 'light',
  onClick,
  withSubtitle = false,
}) => {
  const logoSrc =
    variant === 'light'
      ? '/images/jw-marriott-logo-white.png'
      : variant === 'gold'
      ? '/images/jw-marriott-logo-gold.png'
      : '/images/jw-marriott-logo-dark.png';

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`inline-flex flex-col items-start justify-center ${
        onClick ? 'cursor-pointer select-none group focus:outline-none' : ''
      }`}
      aria-label="JW Marriott Hotel Muscat"
    >
      <img
        src={logoSrc}
        alt="JW Marriott"
        className={`${className} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
      />
      {withSubtitle && (
        <span
          className="text-[8px] sm:text-[9px] tracking-[0.32em] uppercase font-sans font-medium mt-0.5 pl-0.5"
          style={{ color: variant === 'light' ? '#caa296' : '#78716c' }}
        >
          HOTEL MUSCAT
        </span>
      )}
    </div>
  );
};

// 5 Peach Rating Dots matching screenshot: 4 solid circles, 1 half-filled circle, + 4.7 • 564 Reviews
export const RatingDots: React.FC<{
  rating?: number;
  reviewsCount?: number;
  onReviewsClick?: () => void;
  className?: string;
}> = ({ rating = 4.7, reviewsCount = 564, onReviewsClick, className = '' }) => {
  return (
    <div className={`inline-flex items-center space-x-2 text-[13px] text-white ${className}`}>
      {/* 5 Coral / Peach Circles */}
      <div className="flex items-center space-x-[3.5px]" aria-label={`${rating} out of 5 rating`}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#caa296]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#caa296]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#caa296]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#caa296]" />
        {/* Half filled circle with split arc for 4.7 score */}
        <svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4.25" stroke="#caa296" strokeWidth="1" />
          <path d="M5 0.75 A4.25 4.25 0 0 0 5 9.25 Z" fill="#caa296" />
        </svg>
      </div>

      <span className="font-normal text-white text-[13.5px] ml-0.5">{rating.toFixed(1)}</span>
      <span className="text-stone-400 text-xs">•</span>
      <button
        type="button"
        onClick={onReviewsClick}
        className="underline underline-offset-4 decoration-white/80 hover:decoration-[#caa296] font-normal text-white transition-colors hover:text-[#caa296] cursor-pointer"
      >
        {reviewsCount} Reviews
      </button>
    </div>
  );
};

// Marriott Bonvoy Global Brand Mark
export const MarriottBonvoyLogo: React.FC<{ className?: string; variant?: 'dark' | 'light' }> = ({
  className = 'h-7',
  variant = 'dark',
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <div className="flex items-center tracking-[0.22em] uppercase font-serif font-bold text-base sm:text-lg">
        <span className={isLight ? 'text-white' : 'text-[#1c1c1c]'}>MARRIOTT</span>
        <span className="ml-2 px-1.5 py-0.5 bg-[#1c1c1c] text-[#c5a880] text-[10px] tracking-widest font-sans font-bold border border-[#c5a880]/30 rounded-xs">
          BONVOY
        </span>
      </div>
    </div>
  );
};

// Official Payment Method Badges (Only Cards and PayPal)
export const PaymentCardIcon: React.FC<{ type: 'card' | 'paypal' | 'visa' | 'mastercard' | 'amex' | 'jcb'; className?: string }> = ({
  type,
  className = 'h-6',
}) => {
  switch (type) {
    case 'card':
      return (
        <svg viewBox="0 0 64 40" className={`${className} w-auto`} aria-label="Credit or Debit Card">
          <rect width="64" height="40" rx="4" fill="#1e293b" />
          <rect x="0" y="8" width="64" height="7" fill="#0f172a" />
          <rect x="7" y="20" width="10" height="8" rx="1.5" fill="#c5a880" />
          <rect x="22" y="22" width="16" height="2" rx="0.5" fill="#e2e8f0" />
          <rect x="22" y="26" width="10" height="2" rx="0.5" fill="#94a3b8" />
          <text x="57" y="28" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="end" letterSpacing="0.8">
            CARD
          </text>
        </svg>
      );
    case 'visa':
      return (
        <svg viewBox="0 0 64 40" className={`${className} w-auto`} aria-label="Visa">
          <rect width="64" height="40" rx="4" fill="#0E4595" />
          <path d="M25 28l3-16h4.5l-3 16H25zm16.5-15.6c-.9-.4-2.4-.8-4.2-.8-4.6 0-7.9 2.3-7.9 5.6 0 2.4 2.3 3.8 4.1 4.6 1.8.8 2.4 1.4 2.4 2.2 0 1.2-1.5 1.8-2.9 1.8-1.9 0-3-.3-4.6-1l-.6-.3-.7 4.1c1.2.5 3.3.9 5.5.9 5.2 0 8.6-2.4 8.6-5.8 0-1.9-1.2-3.4-3.9-4.6-1.6-.8-2.6-1.3-2.6-2.1 0-.7.8-1.5 2.6-1.5 1.5 0 2.6.3 3.4.7l.4.2.9-3.9zM52 28l-3.5-16h-3.8c-.8 0-1.5.2-1.9 1.1l-6.8 14.9h4.8l1-.2.7-2 5.9.1.5 2.1H52zm-6.7-5.5l2-5.7 1.1 5.7h-3.1zm-30.8-10.5l-4.5 11.2-.5-2.4c-.9-2.8-3.6-5.8-6.6-7.3l4.3 14.5h4.8l7.2-16H14.5z" fill="#FFFFFF" />
        </svg>
      );

    case 'mastercard':
      return (
        <svg viewBox="0 0 64 40" className={`${className} w-auto`} aria-label="Mastercard">
          <rect width="64" height="40" rx="4" fill="#1f1f1f" />
          <circle cx="26" cy="20" r="11" fill="#EB001B" />
          <circle cx="38" cy="20" r="11" fill="#F79E1B" fillOpacity="0.9" />
        </svg>
      );

    case 'amex':
      return (
        <svg viewBox="0 0 64 40" className={`${className} w-auto`} aria-label="American Express">
          <rect width="64" height="40" rx="4" fill="#006FCF" />
          <text x="32" y="24" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
            AMEX
          </text>
        </svg>
      );

    case 'jcb':
      return (
        <svg viewBox="0 0 64 40" className={`${className} w-auto`} aria-label="JCB">
          <rect width="64" height="40" rx="4" fill="#FFFFFF" stroke="#e0e0e0" />
          <rect x="12" y="10" width="12" height="20" rx="2" fill="#0079C1" />
          <rect x="26" y="10" width="12" height="20" rx="2" fill="#E60012" />
          <rect x="40" y="10" width="12" height="20" rx="2" fill="#00873C" />
          <text x="18" y="24" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">J</text>
          <text x="32" y="24" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">C</text>
          <text x="46" y="24" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">B</text>
        </svg>
      );

    case 'paypal':
      return (
        <svg viewBox="0 0 80 40" className={`${className} w-auto`} aria-label="PayPal">
          <rect width="80" height="40" rx="4" fill="#003087" />
          <g transform="translate(18, 9) scale(0.9)">
            <path d="M18.8 4.2C18.2 1.6 15.8 0 12.3 0H4.3C3.6 0 3 0.5 2.9 1.2L0 20.3C0 20.7 0.3 21.1 0.7 21.1H5.4L6.6 13.5C6.7 12.8 7.3 12.3 8 12.3H10.5C15.1 12.3 18.7 10.4 19.7 5.7c.1-.5.1-1.1-.9-1.5z" fill="#0079C1" />
            <path d="M21.2 5.5C21 6.5 20.5 7.6 19.7 8.5 18 10.5 15.1 11.5 11.7 11.5H8.7L6.6 24.8c-.1.5.3.9.8.9h4.8c.6 0 1.2-.5 1.3-1.1l.9-5.7c.1-.6.7-1.1 1.3-1.1h1.5C21.7 17.8 25 15.5 25.8 10.5c.3-1.9 0-3.6-1.1-4.7-.8-.4-2-.4-3.5-.3z" fill="#00457C" />
            <path d="M8.7 11.5H11.7C15.1 11.5 18 10.5 19.7 8.5c.8-.9 1.3-2 1.5-3-1.4-.1-2.6-.1-3.5-.3C17.1 5 15.9 4.8 14.5 4.8H7.7c-.7 0-1.3.5-1.4 1.2L4.6 17.4l2 1.3 2.1-7.2z" fill="#0079C1" opacity="0.3" />
          </g>
          <text x="44" y="25" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontStyle="italic" fontFamily="sans-serif">
            PayPal
          </text>
        </svg>
      );
  }
};
