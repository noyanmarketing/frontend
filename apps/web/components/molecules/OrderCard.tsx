'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
}

interface OrderCardProps {
  orderId: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  currency?: string;
}

const statusConfig = {
  processing: {
    label: 'Processing',
    color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  },
};

export function OrderCard({ orderId, date, status, items, total }: OrderCardProps) {
  const statusInfo = statusConfig[status];
  const displayedItems = items.slice(0, 3);
  const remainingCount = items.length - displayedItems.length;

  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6 transition-all duration-200 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-deep-navy dark:text-white mb-1">
            Order #{orderId}
          </h4>
          <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
            {new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Product Thumbnails */}
      <div className="flex items-center gap-3 mb-4">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="relative w-16 h-16 rounded-lg bg-neutral-gray-100 dark:bg-neutral-gray-800 overflow-hidden"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                🪑
              </div>
            )}
            {item.quantity > 1 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-deep-navy text-xs font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </div>
            )}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="w-16 h-16 rounded-lg bg-neutral-gray-100 dark:bg-neutral-gray-800 flex items-center justify-center">
            <span className="text-sm font-semibold text-neutral-gray-600 dark:text-neutral-gray-400">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
        <div>
          <p className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400 mb-1">
            Total Amount
          </p>
          <p className="text-lg font-bold text-deep-navy dark:text-white">
            ${total.toFixed(2)}
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-deep-navy"
        >
          <Link href={`/account/orders/${orderId}`}>
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
