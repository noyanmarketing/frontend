'use client';

import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'gold' | 'blue' | 'green' | 'purple';
}

const colorClasses = {
  gold: 'from-brand-gold/20 to-brand-gold/5 text-brand-gold border-brand-gold/20',
  blue: 'from-blue-500/20 to-blue-500/5 text-blue-500 border-blue-500/20',
  green: 'from-green-500/20 to-green-500/5 text-green-500 border-green-500/20',
  purple: 'from-purple-500/20 to-purple-500/5 text-purple-500 border-purple-500/20',
};

export function StatsCard({ icon: Icon, label, value, trend, color = 'gold' }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-gray-600 dark:text-neutral-gray-400 mb-2">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-deep-navy dark:text-white">
              {value}
            </h3>
            {trend && (
              <span
                className={`text-xs font-semibold ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '+' : '-'}
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>

        {/* Icon */}
        <div
          className={`
            w-12 h-12 rounded-lg bg-gradient-to-br border flex items-center justify-center
            ${colorClasses[color]}
          `}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
