'use client';

import { Lock, RotateCcw, Shield } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: Lock,
      title: 'Secure Payment',
      description: '256-bit SSL encryption',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: Shield,
      title: 'Buyer Protection',
      description: '100% secure shopping',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.title}
            className="flex items-center gap-3 p-3 rounded-lg bg-neutral-gray-50 dark:bg-neutral-gray-900 border border-neutral-gray-200 dark:border-neutral-gray-700"
          >
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-brand-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-deep-navy dark:text-white">
                {badge.title}
              </p>
              <p className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400">
                {badge.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
