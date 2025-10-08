'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

import { FilterSidebar, type FilterState } from './FilterSidebar';
import { Button } from '../ui/button';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearAll: () => void;
  onApply: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  onApply,
}: MobileFilterDrawerProps) {
  // Lock body scroll when drawer is open
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-deep-navy-900 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
          <h2 className="font-heading text-2xl font-bold text-deep-navy dark:text-white">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-gray-200 dark:border-neutral-gray-700 bg-neutral-gray-50 dark:bg-deep-navy-800">
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onApply();
                onClose();
              }}
              className="flex-1 bg-deep-navy hover:bg-deep-navy-800 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
