import Image from 'next/image';
import Link from 'next/link';

import { FavoriteButton } from '@/components/atoms/FavoriteButton';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  badge?: string;
  discount?: number;
}

export function ProductCard({
  id,
  title,
  price,
  originalPrice,
  image,
  slug,
  badge,
  discount,
}: ProductCardProps) {
  return (
    <Link
      href={`/p/${slug}`}
      className="group relative bg-white dark:bg-deep-navy-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 border border-neutral-gray-200 dark:border-neutral-gray-700"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-gray-100 dark:bg-neutral-gray-800">
        <Image
          src={image || '/placeholder-product.jpg'}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        {badge && (
          <div className="absolute top-3 left-3 bg-deep-navy text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
            {badge}
          </div>
        )}
        {discount && (
          <div className="absolute top-3 right-3 bg-brand-gold text-deep-navy px-3 py-1 rounded-full text-xs font-bold">
            -{discount}% OFF
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <FavoriteButton productId={id} size="md" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-base text-deep-navy dark:text-white mb-2 line-clamp-2 group-hover:text-brand-gold dark:group-hover:text-brand-gold transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-deep-navy dark:text-brand-gold">
            ${price.toFixed(2)}
          </p>
          {originalPrice && originalPrice > price && (
            <p className="text-sm text-neutral-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
