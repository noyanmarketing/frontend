import { Suspense } from 'react';

import { generateSEO } from '@/lib/seo';

import { ShopClientEnhanced } from './shop-client-enhanced';

import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'Shop All Furniture - Premium Collection | Noyan Furniture',
  description:
    'Browse our complete collection of premium handcrafted furniture. Filter by category, price, color, material, and brand. Free shipping on orders over $500. Shop chairs, tables, sofas, beds, and more.',
  url: 'https://noyan.com/shop',
  type: 'website',
  keywords: ['furniture shop', 'buy furniture online', 'premium furniture', 'modern furniture', 'furniture store', 'home furnishings'],
});

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-deep-navy-900"><div className="animate-spin w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full" /></div>}>
      <ShopClientEnhanced />
    </Suspense>
  );
}
