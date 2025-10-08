'use client';

import { useQuery } from '@tanstack/react-query';
import { Filter, Grid3x3, LayoutGrid, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SearchInput } from '@/components/atoms/SearchInput';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/molecules/Breadcrumbs';
import { Pagination } from '@/components/molecules/Pagination';
import { ProductCard } from '@/components/molecules/ProductCard';
import { SortDropdown } from '@/components/molecules/SortDropdown';
import { CategoryHero } from '@/components/organisms/CategoryHero';
import { FilterSidebar, type FilterState } from '@/components/organisms/FilterSidebar';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { MobileFilterDrawer } from '@/components/organisms/MobileFilterDrawer';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import {
  fetchFurnitureProducts,
  transformFurnitureProduct,
  type ProductFilters,
} from '@/lib/api/furniture-api';

const ITEMS_PER_PAGE = 12;

type ViewMode = 'grid-4' | 'grid-3' | 'grid-2';

export function ShopClientEnhanced() {
  const searchParams = useSearchParams();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('grid-4');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: { min: 0, max: 5000 },
    colors: [],
    materials: [],
    brands: [],
    inStock: false,
    onSale: false,
  });

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Convert category to lowercase to match API format
      setFilters((prev) => ({
        ...prev,
        categories: [categoryParam.toLowerCase()],
      }));
    }
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setSearchQuery(nameParam);
    }
  }, [searchParams]);

  // Map sort values to API format
  const sortMap: Record<string, 'newest' | 'oldest' | 'price_asc' | 'price_desc'> = {
    'newest': 'newest',
    'price-asc': 'price_asc',
    'price-desc': 'price_desc',
    'name-asc': 'newest', // Fallback
    'name-desc': 'oldest',
    'popular': 'newest', // Fallback
  };

  // Build API filters
  const apiFilters: ProductFilters = {
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
    ...(searchQuery && { name: searchQuery }),
    ...(filters.categories.length > 0 && { category: filters.categories[0] }),
    ...(sortBy && { sort: sortMap[sortBy] }),
  };

  // Fetch products
  const { data, isLoading, error } = useQuery({
    queryKey: ['furniture-products', apiFilters, filters],
    queryFn: () => fetchFurnitureProducts(apiFilters),
    staleTime: 60000,
  });

  const products = data?.data.map((p, i) => ({
    ...transformFurnitureProduct(p),
    id: p.id?.toString() || `product-${i}`,
  })) || [];

  const totalPages = Math.ceil((data?.count || 0) / ITEMS_PER_PAGE);

  // Handlers
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 5000 },
      colors: [],
      materials: [],
      brands: [],
      inStock: false,
      onSale: false,
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Shop', href: '/shop' },
    ...(filters.categories.length > 0
      ? [{ label: filters.categories[0], href: '#' }]
      : []),
  ];

  // Category info
  const categoryTitle = filters.categories.length > 0
    ? filters.categories[0].charAt(0).toUpperCase() + filters.categories[0].slice(1)
    : 'All Products';
  const categoryDescription = filters.categories.length > 0
    ? `Browse our collection of ${filters.categories[0]} furniture`
    : 'Discover handcrafted furniture pieces that blend timeless design with modern comfort';

  // Grid columns based on view mode
  const gridCols = {
    'grid-4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    'grid-3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    'grid-2': 'grid-cols-1 sm:grid-cols-2',
  };

  return (
    <>
      <EnhancedHeader />

      <main className="min-h-screen bg-white dark:bg-deep-navy-900">
        {/* Category Hero */}
        <CategoryHero
          title={categoryTitle}
          description={categoryDescription}
          productCount={data?.count}
        />

        <Container>
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} className="py-6" />

          <div className="grid lg:grid-cols-[280px,1fr] gap-8 pb-20">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearFilters}
              />
            </aside>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="max-w-2xl">
                <SearchInput
                  placeholder="Search furniture by name..."
                  onSearch={handleSearch}
                />
              </div>

              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 flex-1 sm:flex-initial"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {(filters.categories.length +
                      (filters.colors?.length || 0) +
                      (filters.materials?.length || 0) +
                      (filters.brands?.length || 0)) > 0 && (
                      <span className="ml-1 px-2 py-0.5 text-xs bg-brand-gold text-deep-navy rounded-full">
                        {filters.categories.length +
                          (filters.colors?.length || 0) +
                          (filters.materials?.length || 0) +
                          (filters.brands?.length || 0)}
                      </span>
                    )}
                  </Button>

                  {/* Results Count */}
                  <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-300 hidden sm:block">
                    {isLoading ? (
                      'Loading...'
                    ) : (
                      <>
                        <span className="font-semibold text-deep-navy dark:text-white">
                          {data?.count || 0}
                        </span>{' '}
                        products
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* View Mode Toggle */}
                  <div className="hidden md:flex items-center gap-1 bg-neutral-gray-100 dark:bg-neutral-gray-800 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid-4')}
                      className={`p-2 rounded ${
                        viewMode === 'grid-4'
                          ? 'bg-white dark:bg-deep-navy-700 shadow-sm'
                          : ''
                      }`}
                      aria-label="4 column grid"
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid-3')}
                      className={`p-2 rounded ${
                        viewMode === 'grid-3'
                          ? 'bg-white dark:bg-deep-navy-700 shadow-sm'
                          : ''
                      }`}
                      aria-label="3 column grid"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid-2')}
                      className={`p-2 rounded ${
                        viewMode === 'grid-2'
                          ? 'bg-white dark:bg-deep-navy-700 shadow-sm'
                          : ''
                      }`}
                      aria-label="2 column grid"
                    >
                      <Grid3x3 className="w-4 h-4 rotate-90" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>
              </div>

              {/* Products Grid */}
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
                    {error instanceof Error
                      ? error.message
                      : 'Failed to fetch products'}
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
                <div className={`grid ${gridCols[viewMode]} gap-6`}>
                  {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-neutral-gray-200 dark:bg-neutral-gray-700 aspect-[4/3] rounded-t-2xl" />
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
                <>
                  <div className={`grid ${gridCols[viewMode]} gap-6`}>
                    {products.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      className="mt-12"
                    />
                  )}
                </>
              )}

              {/* Empty State */}
              {!isLoading && !error && products.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-8xl mb-6 opacity-20">🪑</div>
                  <h3 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-2">
                    No Products Found
                  </h3>
                  <p className="text-neutral-gray-600 dark:text-neutral-gray-300 mb-6">
                    Try adjusting your search or filters to find what
                    you&apos;re looking for
                  </p>
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                    className="border-2 border-deep-navy dark:border-white text-deep-navy dark:text-white hover:bg-deep-navy hover:text-white dark:hover:bg-white dark:hover:text-deep-navy"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearFilters}
          onApply={() => {}}
        />
      </main>

      <EnhancedFooter />
    </>
  );
}
