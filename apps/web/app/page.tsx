import { generateSEO } from '@/lib/seo';

import { HomePageClient } from './page-client-new';

import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'Noyan Furniture - Timeless Furniture for Modern Living',
  description:
    'Discover handcrafted furniture pieces that blend elegance with comfort. Shop our collection of premium sofas, beds, dining tables, and more. Free shipping on orders over $500.',
  url: 'https://noyan.com',
  type: 'website',
  keywords: ['furniture', 'home decor', 'interior design', 'modern furniture', 'luxury furniture', 'handcrafted furniture'],
});

export default function HomePage() {
  return <HomePageClient />;
}
