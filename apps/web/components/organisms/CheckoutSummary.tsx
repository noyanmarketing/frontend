'use client';

import { Lock, RotateCcw, Shield } from 'lucide-react';
import Image from 'next/image';

interface CheckoutSummaryProps {
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

export function CheckoutSummary({
  items,
  subtotal,
  shipping,
  discount,
  total,
}: CheckoutSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border-2 border-neutral-gray-200 dark:border-neutral-gray-700 p-6 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-deep-navy dark:text-white">
          Order Summary
        </h2>

        {/* Product List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-gray-100 dark:bg-neutral-gray-800">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
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

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-deep-navy dark:text-white line-clamp-2">
                  {item.name}
                </p>
                <p className="text-sm font-bold text-brand-gold mt-1">
                  ₺{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 pt-4 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-gray-600 dark:text-neutral-gray-400">Subtotal</span>
            <span className="font-semibold text-deep-navy dark:text-white">
              ₺{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-neutral-gray-600 dark:text-neutral-gray-400">Shipping</span>
            <span className="font-semibold text-deep-navy dark:text-white">
              {shipping === 0 ? (
                <span className="text-green-600 dark:text-green-400">FREE</span>
              ) : (
                `₺${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-gray-600 dark:text-neutral-gray-400">Discount</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                -₺{discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold text-deep-navy dark:text-white">Total</span>
              <span className="text-2xl font-bold text-brand-gold">₺{total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-neutral-gray-500 dark:text-neutral-gray-400 mt-1 text-right">
              VAT included
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <h3 className="font-semibold text-deep-navy dark:text-white mb-4">
          Secure Checkout
        </h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                SSL Encrypted
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                256-bit security
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Secure Payment
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                3D Secure protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                Easy Returns
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                30-day guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
