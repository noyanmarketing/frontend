'use client';

import { Package, Check, Truck, XCircle } from 'lucide-react';

export type OrderStatus = 'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderFilterTabsProps {
  activeStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  counts?: Record<OrderStatus, number>;
}

const tabs = [
  { value: 'all' as OrderStatus, label: 'All Orders', icon: Package },
  { value: 'processing' as OrderStatus, label: 'Processing', icon: Package },
  { value: 'shipped' as OrderStatus, label: 'In Transit', icon: Truck },
  { value: 'delivered' as OrderStatus, label: 'Delivered', icon: Check },
  { value: 'cancelled' as OrderStatus, label: 'Canceled', icon: XCircle },
];

export function OrderFilterTabs({ activeStatus, onStatusChange, counts }: OrderFilterTabsProps) {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-2">
      {/* Desktop Tabs */}
      <div className="hidden md:flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeStatus === tab.value;
          const count = counts?.[tab.value];

          return (
            <button
              key={tab.value}
              onClick={() => onStatusChange(tab.value)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200
                ${
                  isActive
                    ? 'bg-brand-gold text-deep-navy'
                    : 'text-neutral-gray-700 dark:text-neutral-gray-300 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {count !== undefined && (
                <span
                  className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${
                      isActive
                        ? 'bg-deep-navy text-white'
                        : 'bg-neutral-gray-200 dark:bg-neutral-gray-700 text-neutral-gray-700 dark:text-neutral-gray-300'
                    }
                  `}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <select
          value={activeStatus}
          onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
          className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-800 text-deep-navy dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold"
        >
          {tabs.map((tab) => {
            const count = counts?.[tab.value];
            return (
              <option key={tab.value} value={tab.value}>
                {tab.label} {count !== undefined ? `(${count})` : ''}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
