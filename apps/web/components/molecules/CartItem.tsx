'use client';

import { Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { QuantitySelector } from '@/components/molecules/QuantitySelector';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  slug: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  variant?: {
    color?: string;
    size?: string;
  };
  designer?: string;
  sku: string;
  stock: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onMoveToFavorites: (id: string) => void;
}

export function CartItem({
  id,
  name,
  image,
  slug,
  price,
  originalPrice,
  quantity,
  variant,
  designer,
  sku,
  stock,
  isSelected,
  onToggleSelect,
  onQuantityChange,
  onRemove,
  onMoveToFavorites,
}: CartItemProps) {
  const totalPrice = price * quantity;
  const isLowStock = stock <= 5 && stock > 0;
  const isOutOfStock = stock === 0;

  return (
    <div
      className={`
        bg-white dark:bg-deep-navy-800 rounded-xl border-2 p-4 md:p-6 transition-all duration-200
        ${
          isSelected
            ? 'border-brand-gold shadow-lg shadow-brand-gold/20'
            : 'border-neutral-gray-200 dark:border-neutral-gray-700'
        }
        ${isOutOfStock ? 'opacity-60' : ''}
      `}
    >
      <div className="flex gap-4">
        {/* Checkbox */}
        <div className="flex items-start pt-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(id)}
            disabled={isOutOfStock}
            className="w-5 h-5 rounded border-2 border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Product Image */}
        <Link
          href={`/p/${slug}`}
          className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-gray-100 dark:bg-neutral-gray-800 group"
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 96px, 128px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🪑</div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Out of Stock</span>
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Link
                href={`/p/${slug}`}
                className="font-semibold text-deep-navy dark:text-white hover:text-brand-gold dark:hover:text-brand-gold transition-colors line-clamp-2"
              >
                {name}
              </Link>

              {designer && (
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mt-1">
                  {designer}
                </p>
              )}

              {variant && (variant.color || variant.size) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {variant.color && (
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-gray-100 dark:bg-neutral-gray-700 text-neutral-gray-700 dark:text-neutral-gray-300">
                      Color: {variant.color}
                    </span>
                  )}
                  {variant.size && (
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-gray-100 dark:bg-neutral-gray-700 text-neutral-gray-700 dark:text-neutral-gray-300">
                      Size: {variant.size}
                    </span>
                  )}
                </div>
              )}

              <p className="text-xs text-neutral-gray-500 dark:text-neutral-gray-400 mt-1">
                SKU: {sku}
              </p>

              {/* Stock Warning */}
              {isLowStock && !isOutOfStock && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-2">
                  ⚠️ Only {stock} left in stock
                </p>
              )}
              {isOutOfStock && (
                <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-2">
                  Out of Stock
                </p>
              )}
            </div>

            {/* Delete Button - Desktop */}
            <button
              onClick={() => onRemove(id)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Price, Quantity, and Actions */}
          <div className="flex flex-wrap items-end justify-between gap-4 pt-2 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
            {/* Price Section */}
            <div className="flex flex-col">
              <p className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400">
                Unit Price
              </p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-deep-navy dark:text-white">
                  ₺{price.toFixed(2)}
                </p>
                {originalPrice && originalPrice > price && (
                  <p className="text-sm text-neutral-gray-500 line-through">
                    ₺{originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <p className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400 mb-1">
                Quantity
              </p>
              {!isOutOfStock ? (
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={(newQty) => onQuantityChange(id, newQty)}
                  min={1}
                  max={stock}
                />
              ) : (
                <div className="px-4 py-2 bg-neutral-gray-100 dark:bg-neutral-gray-800 rounded-lg text-center">
                  <span className="text-sm text-neutral-gray-500">N/A</span>
                </div>
              )}
            </div>

            {/* Total Price */}
            <div className="flex flex-col">
              <p className="text-xs text-neutral-gray-600 dark:text-neutral-gray-400">Total</p>
              <p className="text-xl font-bold text-brand-gold">₺{totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden gap-2 pt-2">
            <Button
              onClick={() => onMoveToFavorites(id)}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              disabled={isOutOfStock}
            >
              <Heart className="w-4 h-4 mr-1" />
              Save for Later
            </Button>
            <Button
              onClick={() => onRemove(id)}
              variant="outline"
              size="sm"
              className="flex-1 text-xs border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>

          {/* Desktop Move to Favorites */}
          <div className="hidden md:block pt-2">
            <button
              onClick={() => onMoveToFavorites(id)}
              disabled={isOutOfStock}
              className="flex items-center gap-2 text-sm text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-brand-gold dark:hover:text-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Heart className="w-4 h-4" />
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
