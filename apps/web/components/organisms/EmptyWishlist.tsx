'use client';

import { Heart, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { FeaturedProducts } from '@/components/organisms/FeaturedProducts';
import { Button } from '@/components/ui/button';

interface EmptyWishlistProps {
  recommendedProducts?: Array<{
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    slug: string;
  }>;
}

export function EmptyWishlist({ recommendedProducts = [] }: EmptyWishlistProps) {
  const router = useRouter();

  return (
    <div className="space-y-12">
      {/* Empty State */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-12 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20 mb-6 relative">
          <Heart className="w-12 h-12 text-red-500" />
          <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
        </div>

        <h2 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-3">
          Your Wishlist is Empty
        </h2>

        <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-8 max-w-md mx-auto">
          You don&apos;t have any favorite products yet. Start adding products you love to keep track of them!
        </p>

        <Button
          onClick={() => router.push('/shop')}
          className="bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold px-8 h-12"
        >
          <Heart className="w-5 h-5 mr-2" />
          Discover Products
        </Button>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <FeaturedProducts
          title="You Might Also Like"
          subtitle="Handpicked products just for you"
          products={recommendedProducts}
        />
      )}
    </div>
  );
}
