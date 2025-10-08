'use client';

import { Edit, MapPin, Phone, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AddressCardProps {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood?: string;
  addressDetails: string;
  postalCode: string;
  isDefault: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AddressCard({
  id,
  title,
  fullName,
  phone,
  city,
  district,
  neighborhood,
  addressDetails,
  postalCode,
  isDefault,
  onEdit,
  onDelete,
}: AddressCardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-deep-navy-800 rounded-xl border-2 transition-all duration-200
        ${
          isDefault
            ? 'border-brand-gold shadow-lg shadow-brand-gold/20'
            : 'border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold/50 hover:shadow-md'
        }
      `}
    >
      {/* Header */}
      <div className="p-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-gold" />
            <h3 className="font-heading text-lg font-bold text-deep-navy dark:text-white">
              {title}
            </h3>
          </div>
          {isDefault && (
            <span className="px-3 py-1 rounded-full bg-brand-gold text-deep-navy text-xs font-bold">
              Default
            </span>
          )}
        </div>
        <p className="font-semibold text-deep-navy dark:text-white">{fullName}</p>
      </div>

      {/* Address Details */}
      <div className="p-6 space-y-3">
        <div className="flex items-start gap-2">
          <Phone className="w-4 h-4 text-neutral-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300">{phone}</p>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-neutral-gray-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 space-y-1">
            <p>{addressDetails}</p>
            <p>
              {neighborhood && `${neighborhood}, `}
              {district}, {city}
            </p>
            <p className="font-mono font-semibold">Postal Code: {postalCode}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-0 flex gap-3">
        <Button
          onClick={() => onEdit(id)}
          variant="outline"
          size="sm"
          className="flex-1 border-2 border-neutral-gray-300 dark:border-neutral-gray-700 font-semibold"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          onClick={() => onDelete(id)}
          variant="outline"
          size="sm"
          className="flex-1 border-2 border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}
