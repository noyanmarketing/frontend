'use client';

import { useQuery } from '@tanstack/react-query';
import { Filter, Search, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card';
import {
  fetchFurnitureProducts,
  transformFurnitureProduct,
  type ProductFilters,
} from '@/lib/api/furniture-api';

const CATEGORIES = [
  'All',
  'Chairs',
  'Tables',
  'Sofas',
  'Beds',
  'Storage',
  'Desks',
  'Shelving',
  'Cabinets',
];

export function ShopClient() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setSearchQuery(nameParam);
    }
  }, [searchParams]);

  // Build filters object
  const filters: ProductFilters = {
    limit: 50,
    ...(searchQuery && { name: searchQuery }),
    ...(selectedCategory !== 'All' && { category: selectedCategory }),
  };

  // Fetch products
  const { data, isLoading, error } = useQuery({
    queryKey: ['furniture-products', filters],
    queryFn: () => fetchFurnitureProducts(filters),
    staleTime: 60000, // 1 minute
  });

  const products = data?.data.map(transformFurnitureProduct) || [];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Query will automatically update via searchQuery state
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen bg-white dark:bg-deep-navy-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-navy via-deep-navy-800 to-neutral-gray-900 text-white py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Shop Our Collection
            </h1>
            <p className="text-xl text-neutral-gray-200">
              Discover handcrafted furniture pieces that blend timeless design with modern comfort
            </p>
          </div>
        </Container>
      </section>

      <Container>
        {/* Search and Filter Bar */}
        <div className="py-8 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search furniture by name..."
                className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-neutral-gray-200 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-800 text-deep-navy dark:text-white placeholder:text-neutral-gray-400 focus:outline-none focus:border-brand-gold transition-colors text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Filter Toggle Button (Mobile) */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Category Filters */}
          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } lg:block overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0`}
          >
            <div className="flex gap-3 min-w-max lg:flex-wrap">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-deep-navy text-white dark:bg-brand-gold dark:text-deep-navy shadow-lg'
                      : 'bg-neutral-gray-100 text-neutral-gray-700 dark:bg-neutral-gray-800 dark:text-neutral-gray-300 hover:bg-neutral-gray-200 dark:hover:bg-neutral-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-neutral-gray-600 dark:text-neutral-gray-300">
              {isLoading ? (
                'Loading products...'
              ) : (
                <>
                  <span className="font-semibold text-deep-navy dark:text-white">
                    {data?.count || 0}
                  </span>{' '}
                  products found
                  {searchQuery && (
                    <span>
                      {' '}
                      for &ldquo;
                      <span className="font-semibold text-deep-navy dark:text-white">
                        {searchQuery}
                      </span>
                      &rdquo;
                    </span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span>
                      {' '}
                      in{' '}
                      <span className="font-semibold text-deep-navy dark:text-white">
                        {selectedCategory}
                      </span>
                    </span>
                  )}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="pb-20">
          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
                <X className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-2">
                Error Loading Products
              </h3>
              <p className="text-neutral-gray-600 dark:text-neutral-gray-300 mb-6">
                {error instanceof Error ? error.message : 'Failed to fetch products'}
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-deep-navy hover:bg-deep-navy-800"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-neutral-gray-200 dark:bg-neutral-gray-700 aspect-square rounded-t-2xl" />
                  <div className="bg-neutral-gray-100 dark:bg-neutral-gray-800 p-5 space-y-3 rounded-b-2xl">
                    <div className="h-4 bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded w-1/3" />
                    <div className="h-6 bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded w-full" />
                    <div className="h-5 bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products */}
          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 opacity-20">🪑</div>
              <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-2">
                No Products Found
              </h3>
              <p className="text-neutral-gray-600 dark:text-neutral-gray-300 mb-6">
                Try adjusting your search or filter to find what you&apos;re looking for
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                variant="outline"
                className="border-2 border-deep-navy dark:border-white text-deep-navy dark:text-white hover:bg-deep-navy hover:text-white dark:hover:bg-white dark:hover:text-deep-navy"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
