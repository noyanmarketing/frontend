'use client';

import { useState } from 'react';

import { Button } from '../ui/button';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  onApply: (min: number, max: number) => void;
  currentMin?: number;
  currentMax?: number;
}

export function PriceRangeFilter({
  min,
  max,
  onApply,
  currentMin = min,
  currentMax = max,
}: PriceRangeFilterProps) {
  const [minValue, setMinValue] = useState(currentMin);
  const [maxValue, setMaxValue] = useState(currentMax);

  const handleApply = () => {
    onApply(minValue, maxValue);
  };

  const handleReset = () => {
    setMinValue(min);
    setMaxValue(max);
    onApply(min, max);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400 mb-1 block">
            Min Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
              $
            </span>
            <input
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(Number(e.target.value))}
              min={min}
              max={maxValue}
              className="w-full pl-7 pr-3 py-2 border border-neutral-gray-300 dark:border-neutral-gray-700 rounded-lg bg-white dark:bg-deep-navy-800 text-deep-navy dark:text-white focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400 mb-1 block">
            Max Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
              $
            </span>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(Number(e.target.value))}
              min={minValue}
              max={max}
              className="w-full pl-7 pr-3 py-2 border border-neutral-gray-300 dark:border-neutral-gray-700 rounded-lg bg-white dark:bg-deep-navy-800 text-deep-navy dark:text-white focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleApply}
          size="sm"
          className="flex-1 bg-deep-navy hover:bg-deep-navy-800 text-white"
        >
          Apply
        </Button>
        <Button
          onClick={handleReset}
          size="sm"
          variant="outline"
          className="flex-1"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
