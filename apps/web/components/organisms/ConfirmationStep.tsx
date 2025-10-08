'use client';

import { CheckCircle, Mail, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { FeaturedProducts } from '@/components/organisms/FeaturedProducts';
import { Button } from '@/components/ui/button';

interface ConfirmationStepProps {
  orderNumber: string;
  orderEmail: string;
  orderSummary: {
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    paymentMethod: string;
    deliveryAddress: string;
  };
  recommendedProducts?: Array<{
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    slug: string;
  }>;
}

export function ConfirmationStep({
  orderNumber,
  orderEmail,
  orderSummary,
  recommendedProducts = [],
}: ConfirmationStepProps) {
  const router = useRouter();

  // Confetti animation on mount
  useEffect(() => {
    // TODO: Add confetti animation library (e.g., canvas-confetti)
    console.log('🎉 Order placed successfully!');
  }, []);

  return (
    <div className="space-y-8">
      {/* Success Animation */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 mb-6 animate-bounce">
          <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
        </div>

        <h2 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-3">
          Order Placed Successfully! 🎉
        </h2>

        <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-400 mb-2">
          Thank you for your purchase!
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-gold/10 border border-brand-gold/30">
          <Package className="w-5 h-5 text-brand-gold" />
          <span className="font-mono font-bold text-brand-gold">Order #{orderNumber}</span>
        </div>
      </div>

      {/* Email Confirmation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-300">
            Confirmation Email Sent
          </h3>
        </div>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          We&apos;ve sent order confirmation and tracking details to{' '}
          <span className="font-semibold">{orderEmail}</span>
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
          Order Summary
        </h3>

        <div className="space-y-3 mb-4">
          {orderSummary.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-neutral-gray-700 dark:text-neutral-gray-300">
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold text-deep-navy dark:text-white">
                ₺{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-lg font-bold text-deep-navy dark:text-white">Total</span>
            <span className="text-2xl font-bold text-brand-gold">
              ₺{orderSummary.total.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2 text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
            <p>
              <span className="font-semibold">Payment Method:</span> {orderSummary.paymentMethod}
            </p>
            <p>
              <span className="font-semibold">Delivery Address:</span> {orderSummary.deliveryAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => router.push('/account/orders')}
          className="flex-1 h-14 bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold text-lg"
        >
          Go to My Orders
        </Button>
        <Button
          onClick={() => router.push('/shop')}
          variant="outline"
          className="flex-1 h-14 border-2 font-bold text-lg"
        >
          Continue Shopping
        </Button>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <FeaturedProducts
            title="You Might Also Like"
            subtitle="Complete your home with these products"
            products={recommendedProducts}
          />
        </div>
      )}
    </div>
  );
}
