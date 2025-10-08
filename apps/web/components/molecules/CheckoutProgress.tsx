'use client';

import { Check, CreditCard, Package, ShoppingBag, Truck } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number;
  steps: Array<{
    number: number;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export function CheckoutProgress({ currentStep, steps }: CheckoutProgressProps) {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6 mb-8">
      {/* Desktop Progress */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-brand-gold text-deep-navy'
                        : 'bg-neutral-gray-200 dark:bg-neutral-gray-700 text-neutral-gray-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p
                    className={`
                      text-sm font-semibold transition-colors
                      ${
                        isCompleted || isCurrent
                          ? 'text-deep-navy dark:text-white'
                          : 'text-neutral-gray-500'
                      }
                    `}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-neutral-gray-500 mt-1">Step {step.number}</p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-1 flex-1 mx-4 rounded-full transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-green-500'
                        : 'bg-neutral-gray-200 dark:bg-neutral-gray-700'
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div
                key={step.number}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-brand-gold text-deep-navy'
                      : 'bg-neutral-gray-200 dark:bg-neutral-gray-700 text-neutral-gray-500'
                  }
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
            );
          })}
        </div>

        {/* Current Step Info */}
        <div className="text-center">
          <p className="font-semibold text-deep-navy dark:text-white">
            {steps[currentStep - 1]?.title}
          </p>
          <p className="text-xs text-neutral-gray-500 mt-1">
            Step {currentStep} of {steps.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-gold transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// Export default steps configuration
export const CHECKOUT_STEPS = [
  { number: 1, title: 'Delivery', icon: Package },
  { number: 2, title: 'Shipping', icon: Truck },
  { number: 3, title: 'Payment', icon: CreditCard },
  { number: 4, title: 'Confirmation', icon: ShoppingBag },
];
