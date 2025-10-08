'use client';

import { Download, MapPin, Package, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    orderNumber: string;
    date: string;
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: string;
    items: OrderItem[];
    deliveryAddress: Address;
    billingAddress: Address;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    trackingNumber?: string;
    trackingUrl?: string;
  };
  onRequestReturn?: () => void;
  onDownloadInvoice?: () => void;
  onWriteReview?: (itemId: string) => void;
}

const statusConfig = {
  processing: {
    label: 'Processing',
    color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
  },
  shipped: {
    label: 'In Transit',
    color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  },
  cancelled: {
    label: 'Canceled',
    color: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  },
};

export function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onRequestReturn,
  onDownloadInvoice,
  onWriteReview,
}: OrderDetailModalProps) {
  const statusInfo = statusConfig[order.status];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-deep-navy-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-deep-navy-800 border-b border-neutral-gray-200 dark:border-neutral-gray-700 p-6 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-2">
                  Order #{order.orderNumber}
                </h2>
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                  Placed on {new Date(order.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-gray-50 dark:bg-neutral-gray-900 rounded-lg p-4">
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mb-1">
                  Status
                </p>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>

              <div className="bg-neutral-gray-50 dark:bg-neutral-gray-900 rounded-lg p-4">
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mb-1">
                  Payment Method
                </p>
                <p className="font-semibold text-deep-navy dark:text-white">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="bg-neutral-gray-50 dark:bg-neutral-gray-900 rounded-lg p-4">
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mb-1">
                  Total Amount
                </p>
                <p className="text-xl font-bold text-deep-navy dark:text-white">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-heading text-lg font-bold text-deep-navy dark:text-white mb-4">
                Products
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-neutral-gray-50 dark:bg-neutral-gray-900 rounded-lg"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg bg-neutral-gray-200 dark:bg-neutral-gray-800 overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          🪑
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-deep-navy dark:text-white mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-bold text-deep-navy dark:text-white">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {order.status === 'delivered' && onWriteReview && (
                      <Button
                        onClick={() => onWriteReview(item.id)}
                        variant="outline"
                        size="sm"
                        className="self-start"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Address */}
              <div>
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-deep-navy dark:text-white mb-4">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                  Delivery Address
                </h3>
                <div className="bg-neutral-gray-50 dark:bg-neutral-gray-900 rounded-lg p-4 space-y-1">
                  <p className="font-semibold text-deep-navy dark:text-white">
                    {order.deliveryAddress.name}
                  </p>
                  <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
                    {order.deliveryAddress.street}
                  </p>
                  <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zip}
                  </p>
                  <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
                    {order.deliveryAddress.country}
                  </p>
                  <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
                    Phone: {order.deliveryAddress.phone}
                  </p>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-deep-navy dark:text-white mb-4">
                  <Package className="w-5 h-5 text-brand-gold" />
                  Billing Address
                </h3>
                <div className="bg-neutral-gray-50 dark:bg-neutral-gray-900 rounded-lg p-4 space-y-1">
                  <p className="font-semibold text-deep-navy dark:text-white">
                    {order.billingAddress.name}
                  </p>
                  <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
                    {order.billingAddress.street}
                  </p>
                  <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
                  </p>
                  <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
                    {order.billingAddress.country}
                  </p>
                  <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
                    Phone: {order.billingAddress.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div>
              <h3 className="font-heading text-lg font-bold text-deep-navy dark:text-white mb-4">
                Price Breakdown
              </h3>
              <div className="bg-neutral-gray-50 dark:bg-neutral-gray-900 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-gray-600 dark:text-neutral-gray-400">Subtotal</span>
                  <span className="font-semibold text-deep-navy dark:text-white">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-gray-600 dark:text-neutral-gray-400">Shipping</span>
                  <span className="font-semibold text-deep-navy dark:text-white">
                    {order.shipping > 0 ? `$${order.shipping.toFixed(2)}` : 'Free'}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-gray-600 dark:text-neutral-gray-400">Discount</span>
                    <span className="font-semibold text-green-600">-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-deep-navy dark:text-white">Total</span>
                    <span className="text-lg font-bold text-deep-navy dark:text-white">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
              {order.trackingUrl && (
                <Button
                  onClick={() => window.open(order.trackingUrl, '_blank')}
                  variant="outline"
                  className="flex-1 border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Track Shipment
                </Button>
              )}

              {onDownloadInvoice && (
                <Button
                  onClick={onDownloadInvoice}
                  variant="outline"
                  className="flex-1 border-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
              )}

              {order.status === 'delivered' && onRequestReturn && (
                <Button
                  onClick={onRequestReturn}
                  variant="outline"
                  className="flex-1 border-2 border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Request Return
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
