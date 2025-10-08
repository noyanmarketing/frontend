'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormCheckbox } from '@/components/atoms/FormCheckbox';
import { FormInput } from '@/components/atoms/FormInput';
import { Button } from '@/components/ui/button';

interface AddressFormData {
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood?: string;
  addressDetails: string;
  postalCode: string;
  isDefault: boolean;
}

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddressFormData) => void;
  initialData?: Partial<AddressFormData>;
  mode: 'add' | 'edit';
}

// Mock cities and districts for Turkey
const CITIES = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Bursa',
  'Antalya',
  'Adana',
  'Gaziantep',
  'Konya',
  'Mersin',
  'Kayseri',
];

const DISTRICTS: Record<string, string[]> = {
  İstanbul: [
    'Kadıköy',
    'Beşiktaş',
    'Şişli',
    'Beyoğlu',
    'Üsküdar',
    'Maltepe',
    'Kartal',
    'Pendik',
    'Ataşehir',
    'Bakırköy',
  ],
  Ankara: ['Çankaya', 'Keçiören', 'Mamak', 'Yenimahalle', 'Etimesgut', 'Sincan'],
  İzmir: ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli', 'Bayraklı'],
  Bursa: ['Osmangazi', 'Nilüfer', 'Yıldırım', 'Gemlik', 'İnegöl'],
  Antalya: ['Muratpaşa', 'Kepez', 'Konyaaltı', 'Alanya', 'Manavgat'],
};

export function AddressFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: AddressFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<AddressFormData>({
    defaultValues: initialData || {
      title: '',
      fullName: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      addressDetails: '',
      postalCode: '',
      isDefault: false,
    },
  });

  const selectedCity = watch('city');
  const districts = selectedCity ? DISTRICTS[selectedCity] || [] : [];

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

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: AddressFormData) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-deep-navy-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-deep-navy-800 border-b border-neutral-gray-200 dark:border-neutral-gray-700 p-6 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-2">
                  {mode === 'add' ? 'Add New Address' : 'Edit Address'}
                </h2>
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                  {mode === 'add'
                    ? 'Fill in the details to add a new address'
                    : 'Update your address information'}
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

          {/* Form - Scrollable */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 space-y-6">
              {/* Address Title */}
              <FormInput
                label="Address Title"
                placeholder="e.g., Home, Office, etc."
                error={errors.title?.message}
                {...register('title', {
                  required: 'Address title is required',
                  minLength: { value: 2, message: 'Title must be at least 2 characters' },
                })}
              />

              {/* Full Name */}
              <FormInput
                label="Full Name"
                placeholder="Enter your full name"
                error={errors.fullName?.message}
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 3, message: 'Full name must be at least 3 characters' },
                })}
              />

              {/* Phone Number */}
              <FormInput
                label="Phone Number"
                type="tel"
                placeholder="+90 5XX XXX XX XX"
                error={errors.phone?.message}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^(\+90|0)?5\d{9}$/,
                    message: 'Please enter a valid Turkish phone number',
                  },
                })}
              />

              {/* City and District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('city', { required: 'City is required' })}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2
                      ${
                        errors.city
                          ? 'border-red-500'
                          : 'border-neutral-gray-300 dark:border-neutral-gray-700'
                      }
                      bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-brand-gold
                      transition-colors duration-200
                    `}
                  >
                    <option value="">Select City</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('district', { required: 'District is required' })}
                    disabled={!selectedCity}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2
                      ${
                        errors.district
                          ? 'border-red-500'
                          : 'border-neutral-gray-300 dark:border-neutral-gray-700'
                      }
                      bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white
                      focus:outline-none focus:ring-2 focus:ring-brand-gold
                      transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
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

              {/* Neighborhood (Optional) */}
              <FormInput
                label="Neighborhood"
                placeholder="Enter neighborhood (optional)"
                error={errors.neighborhood?.message}
                helperText="Optional"
                {...register('neighborhood')}
              />

              {/* Address Details */}
              <div>
                <label className="block text-sm font-semibold text-deep-navy dark:text-white mb-2">
                  Address Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register('addressDetails', {
                    required: 'Address details are required',
                    minLength: { value: 10, message: 'Address must be at least 10 characters' },
                  })}
                  rows={4}
                  placeholder="Enter street name, building number, apartment number, etc."
                  className={`
                    w-full px-4 py-3 rounded-lg border-2
                    ${
                      errors.addressDetails
                        ? 'border-red-500'
                        : 'border-neutral-gray-300 dark:border-neutral-gray-700'
                    }
                    bg-white dark:bg-deep-navy-900 text-deep-navy dark:text-white
                    placeholder:text-neutral-gray-400
                    focus:outline-none focus:ring-2 focus:ring-brand-gold
                    transition-colors duration-200
                  `}
                />
                {errors.addressDetails && (
                  <p className="text-red-500 text-sm mt-1">{errors.addressDetails.message}</p>
                )}
              </div>

              {/* Postal Code */}
              <FormInput
                label="Postal Code"
                placeholder="Enter postal code"
                error={errors.postalCode?.message}
                {...register('postalCode', {
                  required: 'Postal code is required',
                  pattern: {
                    value: /^\d{5}$/,
                    message: 'Postal code must be 5 digits',
                  },
                })}
              />

              {/* Set as Default */}
              <FormCheckbox
                label="Set as default address"
                {...register('isDefault')}
              />
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-deep-navy-800 border-t border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : mode === 'add' ? 'Add Address' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
