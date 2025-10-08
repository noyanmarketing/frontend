'use client';

import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { FeaturedProducts } from '@/components/organisms/FeaturedProducts';
import { Button } from '@/components/ui/button';

interface EmptyCartProps {
  recommendedProducts?: Array<{
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    slug: string;
  }>;
}

export function EmptyCart({ recommendedProducts = [] }: EmptyCartProps) {
  const router = useRouter();

  return (
    <div className="space-y-12">
      {/* Empty State */}
      <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-12 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-neutral-gray-100 to-neutral-gray-200 dark:from-neutral-gray-800 dark:to-neutral-gray-700 mb-6">
          <ShoppingCart className="w-12 h-12 text-neutral-gray-400" />
        </div>

        <h2 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-3">
          Your Cart is Empty
        </h2>

        <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-8 max-w-md mx-auto">
          Discover our bestsellers and start shopping! Add items to your cart to see them here.
        </p>

        <Button
          onClick={() => router.push('/shop')}
          className="bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold px-8 h-12"
        >
          Start Shopping
        </Button>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <FeaturedProducts
          title="Recommended for You"
          products={recommendedProducts}
        />
      )}
    </div>
  );
}
