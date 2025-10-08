import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';
import { generateSEO } from '@/lib/seo';

import { CollectionsClient } from './collections-client';

import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'Collections - Noyan Furniture',
  description:
    'Explore our curated furniture collections. From featured pieces to category-specific selections, find the perfect furniture for your home.',
  url: 'https://noyan.com/collections',
  type: 'website',
});

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <CollectionsClient />
      <Footer />
    </>
  );
}
