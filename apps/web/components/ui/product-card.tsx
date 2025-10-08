import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './button';
import { Card, CardContent } from './card';
import { PriceBadge } from './price-badge';

interface ProductCardProps {
  product: {
    slug: string;
    title: string;
    price: number;
    currency?: string;
    image?: string;
    brand?: string;
    discount?: number;
    originalPrice?: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-neutral-gray-200 dark:border-neutral-gray-700 hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-300 hover:-translate-y-1">
      <Link href={`/p/${product.slug}`} className="block relative">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-neutral-gray-100 via-neutral-gray-50 to-neutral-gray-100 dark:from-neutral-gray-800 dark:via-neutral-gray-900 dark:to-neutral-gray-800 overflow-hidden">
          {/* Product Image */}
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl opacity-30">🪑</span>
                <p className="text-xs text-neutral-gray-400 mt-2 font-medium">No Image</p>
              </div>
            </div>
          )}

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-brand-gold text-deep-navy px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
              -{product.discount}% OFF
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Button
              size="icon"
              variant="secondary"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                // Handle wishlist
              }}
            >
              <Heart className="w-4 h-4 text-deep-navy" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                // Handle add to cart
              }}
            >
              <ShoppingCart className="w-4 h-4 text-deep-navy" />
            </Button>
          </div>

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Product Info */}
        <CardContent className="p-5 space-y-3">
          {product.brand && (
            <p className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
              {product.brand}
            </p>
          )}
          <h3 className="font-heading font-semibold text-base text-deep-navy dark:text-white line-clamp-2 group-hover:text-brand-gold dark:group-hover:text-brand-gold transition-colors min-h-[3rem]">
            {product.title}
          </h3>
          <div className="flex items-center justify-between pt-2">
            <PriceBadge price={product.price} currency={product.currency || 'USD'} />
            {product.originalPrice && (
              <span className="text-sm text-neutral-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
