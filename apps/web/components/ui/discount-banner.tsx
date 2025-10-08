import { X } from 'lucide-react';
import { useState } from 'react';

export function DiscountBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand-gold-600 via-brand-gold-500 to-brand-gold-600 text-deep-navy-900 px-4 py-2 text-center font-medium text-sm">
      <p className="font-semibold">
        🎉 Get <span className="font-bold text-base">10% OFF</span> on your first order! Use code:{' '}
        <span className="font-bold bg-white/30 px-2 py-0.5 rounded">WELCOME10</span>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
