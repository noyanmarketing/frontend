'use client';

import { ChevronDown, ChevronUp, MapPin, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormInput } from '@/components/atoms/FormInput';
import { Button } from '@/components/ui/button';

interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  addressDetails: string;
  postalCode: string;
}

interface DeliveryStepProps {
  savedAddresses?: Address[];
  selectedAddressId?: string;
  contactEmail?: string;
  contactPhone?: string;
  onAddressSelect: (addressId: string) => void;
  onAddNewAddress: (address: Omit<Address, 'id'>) => void;
  onContactInfoChange: (email: string, phone: string) => void;
  onContinue: () => void;
}

interface NewAddressFormData {
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  addressDetails: string;
  postalCode: string;
}

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'];
const DISTRICTS: Record<string, string[]> = {
  İstanbul: ['Kadıköy', 'Beşiktaş', 'Şişli', 'Beyoğlu'],
  Ankara: ['Çankaya', 'Keçiören', 'Mamak'],
  İzmir: ['Konak', 'Karşıyaka', 'Bornova'],
};

export function DeliveryStep({
  savedAddresses = [],
  selectedAddressId,
  contactEmail = '',
  contactPhone = '',
  onAddressSelect,
  onAddNewAddress,
  onContactInfoChange,
  onContinue,
}: DeliveryStepProps) {
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [localEmail, setLocalEmail] = useState(contactEmail);
  const [localPhone, setLocalPhone] = useState(contactPhone);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewAddressFormData>();

  const selectedCity = watch('city');
  const districts = selectedCity ? DISTRICTS[selectedCity] || [] : [];

  const handleAddAddress = (data: NewAddressFormData) => {
    onAddNewAddress(data);
    reset();
    setShowNewAddressForm(false);
  };

  const handleContinue = () => {
    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }
    if (!localEmail || !localPhone) {
      alert('Please provide contact email and phone number');
      return;
    }
    onContactInfoChange(localEmail, localPhone);
    onContinue();
  };

  return (
    <div className="space-y-6">
      {/* Saved Addresses */}
      {savedAddresses.length > 0 && (
        <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
          <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
            Select Delivery Address
          </h3>

          <div className="space-y-3">
            {savedAddresses.map((address) => (
              <label
                key={address.id}
                className={`
                  block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${
                    selectedAddressId === address.id
                      ? 'border-brand-gold bg-brand-gold/5'
                      : 'border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold/50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="deliveryAddress"
                    value={address.id}
                    checked={selectedAddressId === address.id}
                    onChange={() => onAddressSelect(address.id)}
                    className="mt-1 w-5 h-5 text-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <span className="font-semibold text-deep-navy dark:text-white">
                        {address.title}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 mb-1">
                      {address.fullName}
                    </p>
                    <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                      {address.addressDetails}
                    </p>
                    <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                      {address.district}, {address.city} - {address.postalCode}
                    </p>
                    <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mt-1">
                      {address.phone}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Add New Address */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <button
          onClick={() => setShowNewAddressForm(!showNewAddressForm)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-brand-gold" />
            <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white">
              Add New Address
            </h3>
          </div>
          {showNewAddressForm ? (
            <ChevronUp className="w-5 h-5 text-neutral-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-neutral-gray-500" />
          )}
        </button>

        {showNewAddressForm && (
          <form onSubmit={handleSubmit(handleAddAddress)} className="mt-6 space-y-4">
            <FormInput
              label="Address Title"
              placeholder="e.g., Home, Office"
              error={errors.title?.message}
              {...register('title', { required: 'Address title is required' })}
            />

            <FormInput
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.fullName?.message}
              {...register('fullName', { required: 'Full name is required' })}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              placeholder="+90 5XX XXX XX XX"
              error={errors.phone?.message}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: { value: /^(\+90|0)?5\d{9}$/, message: 'Invalid phone number' },
              })}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('city', { required: 'City is required' })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                >
                  <option value="">Select City</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('district', { required: 'District is required' })}
                  disabled={!selectedCity}
                  className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
                Address Details <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('addressDetails', { required: 'Address details are required' })}
                rows={3}
                placeholder="Street, building number, apartment number"
                className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              {errors.addressDetails && (
                <p className="text-red-500 text-sm mt-1">{errors.addressDetails.message}</p>
              )}
            </div>

            <FormInput
              label="Postal Code"
              placeholder="XXXXX"
              error={errors.postalCode?.message}
              {...register('postalCode', {
                required: 'Postal code is required',
                pattern: { value: /^\d{5}$/, message: 'Postal code must be 5 digits' },
              })}
            />

            <Button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold">
              Save Address
            </Button>
          </form>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
        <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
          Contact Information
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <p className="text-xs text-neutral-gray-500 mt-1">Order confirmation will be sent to this email</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value)}
              placeholder="+90 5XX XXX XX XX"
              className="w-full px-4 py-3 rounded-lg border-2 border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <p className="text-xs text-neutral-gray-500 mt-1">For delivery notifications</p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        className="w-full h-14 bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold text-lg"
      >
        Continue to Shipping
      </Button>
    </div>
  );
}
