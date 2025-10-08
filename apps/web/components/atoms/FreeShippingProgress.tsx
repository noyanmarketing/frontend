'use client';

import { Truck } from 'lucide-react';

interface FreeShippingProgressProps {
  currentAmount: number;
  freeShippingThreshold: number;
}

export function FreeShippingProgress({
  currentAmount,
  freeShippingThreshold,
}: FreeShippingProgressProps) {
  const remaining = freeShippingThreshold - currentAmount;
  const progress = Math.min((currentAmount / freeShippingThreshold) * 100, 100);
  const isFreeShipping = currentAmount >= freeShippingThreshold;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4 space-y-3">
      {/* Icon and Message */}
      <div className="flex items-center gap-3">
        <div
          className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${
            isFreeShipping
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white'
          }
        `}
        >
          <Truck className="w-5 h-5" />
        </div>
        <div className="flex-1">
          {isFreeShipping ? (
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              🎉 You qualify for FREE shipping!
            </p>
          ) : (
            <p className="text-sm font-semibold text-deep-navy dark:text-white">
              Add <span className="text-brand-gold">₺{remaining.toFixed(2)}</span> more for FREE
              shipping!
            </p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded-full overflow-hidden">
        <div
          className={`
            absolute top-0 left-0 h-full rounded-full transition-all duration-500
            ${
              isFreeShipping
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : 'bg-gradient-to-r from-blue-500 to-brand-gold'
            }
          `}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Text */}
      <p className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400 text-center">
        {isFreeShipping
          ? 'Free shipping applied to your order'
          : `${progress.toFixed(0)}% towards free shipping`}
      </p>
    </div>
  );
}
