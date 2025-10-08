'use client';

import { ArrowRight, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FreeShippingProgress } from '@/components/atoms/FreeShippingProgress';
import { TrustBadges } from '@/components/atoms/TrustBadges';
import { Button } from '@/components/ui/button';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  appliedCoupon?: {
    code: string;
    discount: number;
  };
  onApplyCoupon: (code: string) => Promise<{ success: boolean; message: string; discount?: number }>;
  onRemoveCoupon: () => void;
  onCheckout: () => void;
  isCheckingOut?: boolean;
}

interface CouponFormData {
  couponCode: string;
}

export function OrderSummary({
  subtotal,
  shipping,
  discount,
  total,
  freeShippingThreshold,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
  isCheckingOut = false,
}: OrderSummaryProps) {
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CouponFormData>();

  const handleCouponSubmit = async (data: CouponFormData) => {
    setIsApplyingCoupon(true);
    setCouponMessage(null);

    try {
      const result = await onApplyCoupon(data.couponCode.toUpperCase());

      if (result.success) {
        setCouponMessage({ type: 'success', text: result.message });
        reset();
      } else {
        setCouponMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setCouponMessage({ type: 'error', text: 'Failed to apply coupon. Please try again.' });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    onRemoveCoupon();
    setCouponMessage(null);
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border-2 border-neutral-gray-200 dark:border-neutral-gray-700 p-6 space-y-6">
        {/* Title */}
        <h2 className="font-heading text-2xl font-bold text-deep-navy dark:text-white">
          Order Summary
        </h2>

        {/* Free Shipping Progress */}
        <FreeShippingProgress
          currentAmount={subtotal}
          freeShippingThreshold={freeShippingThreshold}
        />

        {/* Price Breakdown */}
        <div className="space-y-3">
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

        {/* Coupon Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-brand-gold" />
            <h3 className="font-semibold text-deep-navy dark:text-white">Have a coupon?</h3>
          </div>

          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="font-mono font-semibold text-sm text-green-700 dark:text-green-300">
                  {appliedCoupon.code}
                </span>
                <span className="text-xs text-green-600 dark:text-green-400">
                  (-₺{appliedCoupon.discount.toFixed(2)})
                </span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                aria-label="Remove coupon"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleCouponSubmit)} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  {...register('couponCode', {
                    required: 'Please enter a coupon code',
                    minLength: { value: 3, message: 'Code must be at least 3 characters' },
                  })}
                  className={`
                    flex-1 px-4 py-2.5 rounded-lg border-2
                    ${
                      errors.couponCode
                        ? 'border-red-500'
                        : 'border-neutral-gray-300 dark:border-neutral-gray-700'
                    }
                    bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white
                    placeholder:text-neutral-gray-400 text-sm font-mono uppercase
                    focus:outline-none focus:ring-2 focus:ring-brand-gold
                    transition-colors duration-200
                  `}
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="px-6 border-2"
                  disabled={isApplyingCoupon}
                >
                  {isApplyingCoupon ? 'Applying...' : 'Apply'}
                </Button>
              </div>
              {errors.couponCode && (
                <p className="text-red-500 text-xs">{errors.couponCode.message}</p>
              )}
            </form>
          )}

          {/* Coupon Message */}
          {couponMessage && (
            <div
              className={`
                p-3 rounded-lg text-sm
                ${
                  couponMessage.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                }
              `}
            >
              {couponMessage.text}
            </div>
          )}
        </div>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          disabled={isCheckingOut}
          className="w-full h-14 bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold text-lg"
        >
          {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Trust Badges */}
      <TrustBadges />
    </div>
  );
}
