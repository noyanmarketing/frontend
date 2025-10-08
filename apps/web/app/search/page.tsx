import { Suspense } from 'react';

import { SearchInterface } from '@/components/search-interface';
import { Container } from '@/components/ui/container';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';
import { generateSEO } from '@/lib/seo';

import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'Search Furniture - Noyan Furniture',
  description:
    'Search our catalog of premium furniture. Find the perfect pieces for your living room, bedroom, dining room, or office.',
  url: 'https://noyan.com/search',
  type: 'website',
});

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="py-8">
        <Container>
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              Search Furniture
            </h1>
            <p className="text-muted-foreground">
              Find your perfect furniture pieces from our curated collection
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading search...</p>
                </div>
              </div>
            }
          >
            <SearchInterface />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
}
