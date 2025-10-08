'use client';

import { Clock, Package, Truck, Zap } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ShippingStepProps {
  selectedShippingId?: string;
  deliveryNotes?: string;
  onShippingSelect: (shippingId: string) => void;
  onNotesChange: (notes: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'free',
    name: 'Free Shipping',
    description: 'Standard delivery',
    price: 0,
    estimatedDays: '3-5 business days',
    icon: Package,
  },
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Fast and reliable',
    price: 29.9,
    estimatedDays: '2-3 business days',
    icon: Truck,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Next day delivery',
    price: 49.9,
    estimatedDays: '1 business day',
    icon: Zap,
  },
];

export function ShippingStep({
  selectedShippingId,
  deliveryNotes = '',
  onShippingSelect,
  onNotesChange,
  onContinue,
  onBack,
}: ShippingStepProps) {
  const [localNotes, setLocalNotes] = useState(deliveryNotes);

  const selectedOption = SHIPPING_OPTIONS.find((opt) => opt.id === selectedShippingId);

  const handleContinue = () => {
    if (!selectedShippingId) {
      alert('Please select a shipping option');
      return;
    }
    onNotesChange(localNotes);
    onContinue();
  };

  const getEstimatedDeliveryDate = (days: string) => {
    const today = new Date();
    const maxDays = parseInt(days.split('-')[1] || days.split(' ')[0]);
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + maxDays);

    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Shipping Options */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
          Select Shipping Method
        </h3>

        <div className="space-y-3">
          {SHIPPING_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedShippingId === option.id;

            return (
              <label
                key={option.id}
                className={`
                  block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${
                    isSelected
                      ? 'border-brand-gold bg-brand-gold/5'
                      : 'border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold/50'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="shippingOption"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => onShippingSelect(option.id)}
                    className="mt-1 w-5 h-5 text-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-deep-navy dark:text-white">
                            {option.name}
                          </span>
                          <span className="font-bold text-brand-gold">
                            {option.price === 0 ? 'FREE' : `₺${option.price.toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{option.estimatedDays}</span>
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Estimated Delivery */}
      {selectedOption && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-deep-navy dark:text-white">Estimated Delivery</p>
              <p className="text-lg font-bold text-green-700 dark:text-green-400">
                {getEstimatedDeliveryDate(selectedOption.estimatedDays)}
              </p>
            </div>
          </div>
          <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
            Your order will arrive by this date
          </p>
        </div>
      )}

      {/* Delivery Notes */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
          Delivery Notes (Optional)
        </h3>

        <textarea
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          rows={4}
          placeholder="Add any special instructions for delivery (e.g., gate code, preferred delivery time)"
          maxLength={500}
          className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white placeholder:text-neutral-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
        />
        <p className="text-xs text-neutral-gray-500 mt-2 text-right">
          {localNotes.length}/500 characters
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 h-14 border-2 font-bold text-lg"
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className="flex-1 h-14 bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold text-lg"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
