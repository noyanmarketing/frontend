'use client';

import { Building2, CreditCard, DollarSign, Lock, Shield, User, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormCheckbox } from '@/components/atoms/FormCheckbox';
import { FormInput } from '@/components/atoms/FormInput';
import { Button } from '@/components/ui/button';

interface PaymentStepProps {
  totalAmount: number;
  onPayment: (paymentData: PaymentData) => Promise<void>;
  onBack: () => void;
}

interface PaymentData {
  method: 'card' | 'cod' | 'bank-transfer' | 'wallet';
  cardData?: {
    cardNumber: string;
    cardName: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    installment: number;
    saveCard: boolean;
  };
  billingType: 'individual' | 'corporate';
  agreements: {
    preInfo: boolean;
    distanceSales: boolean;
    privacy: boolean;
  };
}

interface CardFormData {
  cardNumber: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  installment: string;
  saveCard: boolean;
}

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
  { id: 'cod', name: 'Cash on Delivery', icon: DollarSign },
  { id: 'bank-transfer', name: 'Bank Transfer / EFT', icon: Building2 },
  { id: 'wallet', name: 'Digital Wallet', icon: Wallet },
];

const INSTALLMENT_OPTIONS = [
  { value: '1', label: 'Single Payment', rate: 0 },
  { value: '3', label: '3 Installments', rate: 0.02 },
  { value: '6', label: '6 Installments', rate: 0.04 },
  { value: '9', label: '9 Installments', rate: 0.06 },
  { value: '12', label: '12 Installments', rate: 0.08 },
];

export function PaymentStep({ totalAmount, onPayment, onBack }: PaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'bank-transfer' | 'wallet'>('card');
  const [billingType, setBillingType] = useState<'individual' | 'corporate'>('individual');
  const [agreements, setAgreements] = useState({
    preInfo: false,
    distanceSales: false,
    privacy: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CardFormData>({
    defaultValues: {
      installment: '1',
      saveCard: false,
    },
  });

  const selectedInstallment = watch('installment');
  const installmentOption = INSTALLMENT_OPTIONS.find((opt) => opt.value === selectedInstallment);
  const installmentAmount = totalAmount * (1 + (installmentOption?.rate || 0));

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const handlePaymentSubmit = async (data: CardFormData) => {
    // Validate agreements
    if (!agreements.preInfo || !agreements.distanceSales || !agreements.privacy) {
      alert('Please accept all required agreements to proceed');
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData: PaymentData = {
        method: paymentMethod,
        billingType,
        agreements,
      };

      if (paymentMethod === 'card') {
        paymentData.cardData = {
          cardNumber: data.cardNumber.replace(/\s/g, ''),
          cardName: data.cardName,
          expiryMonth: data.expiryMonth,
          expiryYear: data.expiryYear,
          cvv: data.cvv,
          installment: parseInt(data.installment),
          saveCard: data.saveCard,
        };
      }

      await onPayment(paymentData);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNonCardPayment = async () => {
    if (!agreements.preInfo || !agreements.distanceSales || !agreements.privacy) {
      alert('Please accept all required agreements to proceed');
      return;
    }

    setIsProcessing(true);

    try {
      await onPayment({
        method: paymentMethod,
        billingType,
        agreements,
      });
    } catch (error) {
      alert('Order placement failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
          Payment Method
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const isSelected = paymentMethod === method.id;

            return (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200
                  ${
                    isSelected
                      ? 'border-brand-gold bg-brand-gold/5'
                      : 'border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold/50'
                  }
                `}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-brand-gold' : 'text-neutral-gray-500'}`} />
                <p className={`text-xs font-semibold ${isSelected ? 'text-brand-gold' : 'text-neutral-gray-600 dark:text-neutral-gray-400'}`}>
                  {method.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit(handlePaymentSubmit)} className="space-y-6">
          <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
            <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
              Card Information
            </h3>

            <div className="space-y-4">
              <FormInput
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                error={errors.cardNumber?.message}
                {...register('cardNumber', {
                  required: 'Card number is required',
                  pattern: {
                    value: /^[\d\s]{16,19}$/,
                    message: 'Invalid card number',
                  },
                  onChange: (e) => {
                    e.target.value = formatCardNumber(e.target.value);
                  },
                })}
              />

              <FormInput
                label="Name on Card"
                placeholder="JOHN DOE"
                error={errors.cardName?.message}
                {...register('cardName', {
                  required: 'Cardholder name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                })}
              />

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
                    Month <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('expiryMonth', { required: 'Month is required' })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, '0');
                      return (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      );
                    })}
                  </select>
                  {errors.expiryMonth && (
                    <p className="text-red-500 text-xs mt-1">{errors.expiryMonth.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('expiryYear', { required: 'Year is required' })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString().slice(-2);
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  {errors.expiryYear && (
                    <p className="text-red-500 text-xs mt-1">{errors.expiryYear.message}</p>
                  )}
                </div>

                <FormInput
                  label="CVV"
                  placeholder="123"
                  type="password"
                  maxLength={4}
                  error={errors.cvv?.message}
                  {...register('cvv', {
                    required: 'CVV is required',
                    pattern: { value: /^\d{3,4}$/, message: 'Invalid CVV' },
                  })}
                />
              </div>

              <FormCheckbox
                label="Save my card for future purchases"
                {...register('saveCard')}
              />
            </div>
          </div>

          {/* Installment Options */}
          <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
            <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
              Installment Options
            </h3>

            <div className="space-y-3">
              {INSTALLMENT_OPTIONS.map((option) => {
                const isSelected = selectedInstallment === option.value;
                const optionTotal = totalAmount * (1 + option.rate);
                const monthlyAmount = optionTotal / parseInt(option.value);

                return (
                  <label
                    key={option.value}
                    className={`
                      flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                      ${
                        isSelected
                          ? 'border-brand-gold bg-brand-gold/5'
                          : 'border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        value={option.value}
                        {...register('installment')}
                        className="w-5 h-5 text-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                      />
                      <div>
                        <p className="font-semibold text-deep-navy dark:text-white">
                          {option.label}
                        </p>
                        {parseInt(option.value) > 1 && (
                          <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                            ₺{monthlyAmount.toFixed(2)} x {option.value} months
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="font-bold text-brand-gold">
                      ₺{optionTotal.toFixed(2)}
                      {option.rate > 0 && (
                        <span className="text-xs text-neutral-gray-500 ml-1">
                          (+{(option.rate * 100).toFixed(0)}%)
                        </span>
                      )}
                    </p>
                  </label>
                );
              })}
            </div>
          </div>
        </form>
      )}

      {/* Non-Card Payment Info */}
      {paymentMethod !== 'card' && (
        <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
          <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
            {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.name}
          </h3>

          {paymentMethod === 'cod' && (
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                You will pay in cash when your order is delivered. Please have the exact amount ready.
              </p>
            </div>
          )}

          {paymentMethod === 'bank-transfer' && (
            <div className="space-y-3">
              <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                After placing your order, you will receive bank account details via email. Please complete the transfer within 24 hours.
              </p>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-xs font-mono text-blue-800 dark:text-blue-300">
                  Order Reference: #XXXX-XXXX-XXXX
                </p>
              </div>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="grid grid-cols-3 gap-3">
              <button className="p-4 rounded-lg border-2 border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold transition-colors">
                <p className="font-semibold text-sm">PayPal</p>
              </button>
              <button className="p-4 rounded-lg border-2 border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold transition-colors">
                <p className="font-semibold text-sm">Apple Pay</p>
              </button>
              <button className="p-4 rounded-lg border-2 border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold transition-colors">
                <p className="font-semibold text-sm">Google Pay</p>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Billing Information */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
          Billing Information
        </h3>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setBillingType('individual')}
            className={`
              flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200
              ${
                billingType === 'individual'
                  ? 'border-brand-gold bg-brand-gold/5 text-brand-gold'
                  : 'border-neutral-gray-200 dark:border-neutral-gray-700 text-neutral-gray-600 dark:text-neutral-gray-400'
              }
            `}
          >
            <User className="w-5 h-5 inline mr-2" />
            Individual
          </button>
          <button
            onClick={() => setBillingType('corporate')}
            className={`
              flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200
              ${
                billingType === 'corporate'
                  ? 'border-brand-gold bg-brand-gold/5 text-brand-gold'
                  : 'border-neutral-gray-200 dark:border-neutral-gray-700 text-neutral-gray-600 dark:text-neutral-gray-400'
              }
            `}
          >
            <Building2 className="w-5 h-5 inline mr-2" />
            Corporate
          </button>
        </div>

        <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
          {billingType === 'individual'
            ? 'Invoice will be issued to your delivery address'
            : 'Please provide your company tax information in the next step'}
        </p>
      </div>

      {/* Agreements */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
          Terms & Agreements
        </h3>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreements.preInfo}
              onChange={(e) => setAgreements({ ...agreements, preInfo: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-2 border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            />
            <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
              I have read and accept the{' '}
              <a href="/pre-information" className="text-brand-gold hover:underline">
                Pre-Information Form
              </a>{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreements.distanceSales}
              onChange={(e) => setAgreements({ ...agreements, distanceSales: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-2 border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            />
            <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
              I have read and accept the{' '}
              <a href="/distance-sales" className="text-brand-gold hover:underline">
                Distance Sales Agreement
              </a>{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={(e) => setAgreements({ ...agreements, privacy: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-2 border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            />
            <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">
              I have read and accept the{' '}
              <a href="/privacy" className="text-brand-gold hover:underline">
                Privacy Policy
              </a>{' '}
              <span className="text-red-500">*</span>
            </span>
          </label>
        </div>
      </div>

      {/* Trust Badges & Submit */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6">
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
              256-bit SSL
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              3D Secure
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-14 border-2 font-bold text-lg"
            disabled={isProcessing}
          >
            Back
          </Button>
          <Button
            onClick={paymentMethod === 'card' ? handleSubmit(handlePaymentSubmit) : handleNonCardPayment}
            className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Place Order - ₺${installmentAmount.toFixed(2)}`}
          </Button>
        </div>

        <p className="text-xs text-center text-neutral-gray-600 dark:text-neutral-gray-400 mt-3">
          🔒 Your payment information is encrypted and secure
        </p>
      </div>
    </div>
  );
}
