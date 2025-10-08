'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

interface WishlistCardProps {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  stock: number;
  isInStock: boolean;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export function WishlistCard({
  id,
  name,
  slug,
  image,
  price,
  originalPrice,
  stock,
  isInStock,
  onRemove,
  onAddToCart,
}: WishlistCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(id);
    // Animation will be handled by parent component
  };

  const handleAddToCart = async () => {
    if (!isInStock) return;
    setIsAdding(true);
    await onAddToCart(id);
    setIsAdding(false);
  };

  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div
      className={`
        group relative bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700
        overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-gold/50
        ${isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${!isInStock ? 'opacity-75' : ''}
      `}
    >
      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={isRemoving}
        className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-deep-navy-900/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Remove from favorites"
        title="Remove from favorites"
      >
        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
      </button>

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold">
          -{discount}%
        </div>
      )}

      {/* Out of Stock Badge */}
      {!isInStock && (
        <div className="absolute top-12 left-3 z-10 px-2 py-1 rounded-lg bg-neutral-gray-900/80 text-white text-xs font-bold">
          Out of Stock
        </div>
      )}

      {/* Product Image */}
      <Link href={`/p/${slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-neutral-gray-100 dark:bg-neutral-gray-800">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🪑
            </div>
          )}
          {!isInStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Unavailable</span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link
          href={`/p/${slug}`}
          className="block min-h-[3rem]"
        >
          <h3 className="font-semibold text-deep-navy dark:text-white line-clamp-2 group-hover:text-brand-gold transition-colors">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-gold">
            ₺{price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-neutral-gray-500 line-through">
              ₺{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {isInStock ? (
          <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
            ✓ In Stock
            {stock <= 5 && stock > 0 && (
              <span className="text-amber-600 dark:text-amber-400 ml-2">
                (Only {stock} left)
              </span>
            )}
          </p>
        ) : (
          <p className="text-xs text-red-600 dark:text-red-400 font-semibold">
            ✗ Out of Stock
          </p>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!isInStock || isAdding}
          className={`
            w-full h-11 font-bold transition-all duration-200
            ${
              isInStock
                ? 'bg-brand-gold hover:bg-brand-gold/90 text-deep-navy'
                : 'bg-neutral-gray-300 dark:bg-neutral-gray-700 text-neutral-gray-500 cursor-not-allowed'
            }
          `}
          title={!isInStock ? 'Out of stock' : 'Add to cart'}
        >
          {isAdding ? (
            'Adding...'
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
