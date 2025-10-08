'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-neutral-gray-700 dark:text-neutral-gray-300">
        Quantity:
      </span>
      <div className="flex items-center border-2 border-neutral-gray-300 dark:border-neutral-gray-700 rounded-lg">
        <button
          onClick={decrease}
          disabled={quantity <= min}
          className="p-2 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value) || min;
            if (val >= min && val <= max) {
              onQuantityChange(val);
            }
          }}
          className="w-16 text-center font-semibold bg-transparent focus:outline-none"
          min={min}
          max={max}
        />
        <button
          onClick={increase}
          disabled={quantity >= max}
          className="p-2 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
