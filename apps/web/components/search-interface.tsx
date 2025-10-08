'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ProductCard } from '@/components/ui/product-card';

interface Product {
  slug: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  brand: string;
}

// Mock search function - in production, call API
function searchProducts(query: string): Product[] {
  const allProducts: Product[] = [
    {
      slug: 'modern-sofa',
      title: 'Modern Sectional Sofa',
      price: 1899.99,
      currency: 'USD',
      image: '/products/sofa.jpg',
      brand: 'Noyan Home',
    },
    {
      slug: 'wooden-dining-table',
      title: 'Solid Wood Dining Table',
      price: 1299.99,
      currency: 'USD',
      image: '/products/dining-table.jpg',
      brand: 'Noyan Home',
    },
    {
      slug: 'ergonomic-office-chair',
      title: 'Ergonomic Office Chair',
      price: 599.99,
      currency: 'USD',
      image: '/products/office-chair.jpg',
      brand: 'Noyan Pro',
    },
    {
      slug: 'luxury-bed-frame',
      title: 'Luxury Upholstered Bed',
      price: 2299.99,
      currency: 'USD',
      image: '/products/bed.jpg',
      brand: 'Noyan Premium',
    },
    {
      slug: 'coffee-table-set',
      title: 'Modern Coffee Table Set',
      price: 799.99,
      currency: 'USD',
      image: '/products/coffee-table.jpg',
      brand: 'Noyan Home',
    },
  ];

  if (!query || query.trim() === '') {
    return allProducts;
  }

  const lowerQuery = query.toLowerCase();
  return allProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
  );
}

export function SearchInterface() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Update URL when debounced query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(newUrl, { scroll: false });
  }, [debouncedQuery, pathname, router, searchParams]);

  // Get search results
  const results = searchProducts(debouncedQuery);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-8">
        <label htmlFor="search-input" className="sr-only">
          Search products
        </label>
        <div className="relative max-w-2xl">
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-4 py-3 pr-12 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            autoComplete="off"
            aria-label="Search products"
          />
          {isSearching && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              role="status"
              aria-live="polite"
            >
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="sr-only">Searching...</span>
            </div>
          )}
        </div>
        {query && (
          <p className="mt-2 text-sm text-muted-foreground">
            Found {results.length} result{results.length !== 1 ? 's' : ''} for
            &quot;{query}&quot;
          </p>
        )}
      </div>

      {/* Search Results */}
      {results.length > 0 ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
          aria-label="Search results"
        >
          {results.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4" role="img" aria-label="No results">
            🔍
          </div>
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground mb-4">
            {query
              ? `No results for &quot;${query}&quot;. Try a different search term.`
              : 'Start typing to search for products.'}
          </p>
        </div>
      )}
    </div>
  );
}
