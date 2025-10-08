'use client';

import { ChevronRight, Package, RotateCcw } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface EnhancedOrderCardProps {
  orderId: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
  onViewDetails: () => void;
  onBuyAgain?: () => void;
  onTrackShipment?: () => void;
}

const statusConfig = {
  processing: {
    label: 'Processing',
    color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    dotColor: 'bg-amber-500',
  },
  shipped: {
    label: 'In Transit',
    color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    dotColor: 'bg-blue-500',
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
    dotColor: 'bg-green-500',
  },
  cancelled: {
    label: 'Canceled',
    color: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    dotColor: 'bg-red-500',
  },
};

export function EnhancedOrderCard({
  orderNumber,
  date,
  status,
  items,
  total,
  trackingNumber,
  onViewDetails,
  onBuyAgain,
  onTrackShipment,
}: EnhancedOrderCardProps) {
  const statusInfo = statusConfig[status];
  const displayedItems = items.slice(0, 4);
  const remainingCount = items.length - displayedItems.length;

  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-brand-gold/50">
      {/* Header */}
      <div className="p-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-deep-navy dark:text-white mb-1">
              Order #{orderNumber}
            </h4>
            <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
              {new Date(date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Status Badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.color}`}>
            <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor} animate-pulse`} />
            <span className="text-xs font-semibold">{statusInfo.label}</span>
          </div>
        </div>

        {/* Tracking Number */}
        {trackingNumber && (
          <p className="text-xs text-neutral-gray-500 dark:text-neutral-gray-400">
            Tracking: <span className="font-mono font-semibold">{trackingNumber}</span>
          </p>
        )}
      </div>

      {/* Product Thumbnails */}
      <div className="p-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="flex items-center gap-3 flex-wrap">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="relative w-20 h-20 rounded-lg bg-neutral-gray-100 dark:bg-neutral-gray-800 overflow-hidden group"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-200"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  🪑
                </div>
              )}
              {item.quantity > 1 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-brand-gold text-deep-navy text-xs font-bold rounded-full flex items-center justify-center">
                  {item.quantity}
                </div>
              )}
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="w-20 h-20 rounded-lg bg-neutral-gray-100 dark:bg-neutral-gray-800 flex items-center justify-center">
              <span className="text-sm font-semibold text-neutral-gray-600 dark:text-neutral-gray-400">
                +{remainingCount}
              </span>
            </div>
          )}
        </div>

        {/* Item Names */}
        <div className="mt-3">
          <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 line-clamp-2">
            {items.map((item) => item.name).join(', ')}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400 mb-1">
              Total Amount
            </p>
            <p className="text-2xl font-bold text-deep-navy dark:text-white">
              ${total.toFixed(2)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400">
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onViewDetails}
            size="sm"
            className="w-full bg-deep-navy hover:bg-deep-navy-800 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-deep-navy font-semibold"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>

          {status === 'delivered' && onBuyAgain && (
            <Button
              onClick={onBuyAgain}
              variant="outline"
              size="sm"
              className="w-full border-2 border-neutral-gray-300 dark:border-neutral-gray-700 font-semibold"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Buy Again
            </Button>
          )}

          {(status === 'shipped' || status === 'processing') && onTrackShipment && trackingNumber && (
            <Button
              onClick={onTrackShipment}
              variant="outline"
              size="sm"
              className="w-full border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold"
            >
              <Package className="w-4 h-4 mr-2" />
              Track Order
            </Button>
          )}

          {status === 'cancelled' && (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="w-full border-2 border-neutral-gray-300 dark:border-neutral-gray-700 opacity-50 cursor-not-allowed"
            >
              Canceled
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
