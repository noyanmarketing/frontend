'use client';

import { ArrowUpDown, Check } from 'lucide-react';
import { useState } from 'react';

export type SortOption = {
  value: string;
  label: string;
};

export const SORT_OPTIONS: SortOption[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'popular', label: 'Most Popular' },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-deep-navy-800 border-2 border-neutral-gray-200 dark:border-neutral-gray-700 rounded-lg hover:border-brand-gold transition-colors"
      >
        <ArrowUpDown className="w-4 h-4 text-neutral-gray-600 dark:text-neutral-gray-400" />
        <span className="text-sm font-medium text-deep-navy dark:text-white">
          {selectedOption?.label || 'Sort By'}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-deep-navy-800 border-2 border-neutral-gray-200 dark:border-neutral-gray-700 rounded-lg shadow-xl z-20">
            <div className="py-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700 transition-colors"
                >
                  <span className="text-sm text-deep-navy dark:text-white">
                    {option.label}
                  </span>
                  {value === option.value && (
                    <Check className="w-4 h-4 text-brand-gold" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
