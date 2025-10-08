'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Shield, Sparkles, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Hero } from '@/components/ui/hero';
import { fetchFurnitureProducts, transformFurnitureProduct } from '@/lib/api/furniture-api';

export function HomePageClient() {
  // Fetch 10 products for the grid layout
  const { data, isLoading } = useQuery({
    queryKey: ['furniture-featured-products'],
    queryFn: () => fetchFurnitureProducts({ limit: 10, featured: true }),
    staleTime: 60000, // 1 minute
  });

  // If no featured products, fetch latest products
  const { data: latestData } = useQuery({
    queryKey: ['furniture-latest-products'],
    queryFn: () => fetchFurnitureProducts({ limit: 10, sort: 'newest' }),
    enabled: !isLoading && (!data || data.count === 0),
    staleTime: 60000,
  });

  // Fetch storage & organization products
  const { data: storageData, isLoading: isStorageLoading } = useQuery({
    queryKey: ['furniture-storage-products'],
    queryFn: () => fetchFurnitureProducts({ limit: 8, category: 'garden' }),
    staleTime: 60000,
  });

  // Transform products
  const apiProducts = (data?.count ? data.data : latestData?.data) || [];
  const displayProducts = apiProducts.map(transformFurnitureProduct);
  const storageProducts = (storageData?.data || []).map(transformFurnitureProduct);

  return (
    <main className="min-h-screen bg-white dark:bg-deep-navy-900">
      {/* Hero Section */}
      <Hero />

      {/* Grid Products Section */}
      <section className="py-16 lg:py-20 bg-neutral-gray-50 dark:bg-neutral-gray-900">
        <Container>
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy dark:text-white mb-4">
              Featured Collection
            </h2>
            <p className="text-neutral-gray-600 dark:text-neutral-gray-300 text-lg">
              Explore our carefully curated selection of premium furniture pieces
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 h-[800px]">
              <div className="lg:col-span-2 lg:row-span-3 animate-pulse bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded-2xl" />
              <div className="lg:col-span-2 lg:row-span-3 grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded-2xl" />
                ))}
              </div>
              <div className="lg:col-span-2 grid grid-rows-2 gap-4">
                <div className="animate-pulse bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded-2xl" />
                <div className="animate-pulse bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded-2xl" />
              </div>
            </div>
          )}

          {/* Grid Layout - Desktop */}
          {!isLoading && displayProducts.length >= 10 && (
            <div className="hidden lg:grid lg:grid-cols-6 gap-4 h-[800px]">
              {/* LEFT: Large Card (2 cols x 3 rows) */}
              <Link
                href={`/p/${displayProducts[0].slug}`}
                className="lg:col-span-2 lg:row-span-3 relative overflow-hidden rounded-2xl group"
              >
                <Image
                  src={displayProducts[0].image || '/placeholder-product.jpg'}
                  alt={displayProducts[0].title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-semibold text-brand-gold mb-1 uppercase tracking-wider">
                    {displayProducts[0].brand || 'Featured'}
                  </p>
                  <h3 className="text-2xl font-heading font-bold mb-2 line-clamp-2">
                    {displayProducts[0].title}
                  </h3>
                  <p className="text-3xl font-bold text-brand-gold">
                    ${displayProducts[0].price.toFixed(2)}
                  </p>
                </div>
              </Link>

              {/* MIDDLE: 6 Small Cards (2x3 grid) */}
              <div className="lg:col-span-2 lg:row-span-3 grid grid-cols-2 grid-rows-3 gap-4">
                {displayProducts.slice(1, 7).map((product) => (
                  <Link
                    key={product.slug}
                    href={`/p/${product.slug}`}
                    className="relative overflow-hidden rounded-xl group"
                  >
                    <Image
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-semibold mb-1 line-clamp-1">
                        {product.title}
                      </p>
                      <p className="text-sm font-bold text-brand-gold">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    {product.discount && (
                      <div className="absolute top-3 right-3 bg-brand-gold text-deep-navy px-2 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {/* RIGHT: 2 Large Horizontal Cards */}
              <div className="lg:col-span-2 grid grid-rows-2 gap-4">
                {displayProducts.slice(7, 9).map((product) => (
                  <Link
                    key={product.slug}
                    href={`/p/${product.slug}`}
                    className="relative overflow-hidden rounded-2xl group"
                  >
                    <Image
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-semibold text-brand-gold mb-1 uppercase tracking-wider">
                        {product.brand || 'Premium'}
                      </p>
                      <h3 className="text-lg font-heading font-bold mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-2xl font-bold text-brand-gold">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    {product.discount && (
                      <div className="absolute top-4 right-4 bg-brand-gold text-deep-navy px-3 py-1.5 rounded-full text-xs font-bold">
                        -{product.discount}% OFF
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Grid - Stack vertically */}
          {!isLoading && displayProducts.length >= 10 && (
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayProducts.slice(0, 8).map((product) => (
                <Link
                  key={product.slug}
                  href={`/p/${product.slug}`}
                  className="relative overflow-hidden rounded-2xl group h-64 sm:h-80"
                >
                  <Image
                    src={product.image || '/placeholder-product.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold text-brand-gold mb-1 uppercase tracking-wider">
                      {product.brand || 'Featured'}
                    </p>
                    <h3 className="text-base font-heading font-bold mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xl font-bold text-brand-gold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  {product.discount && (
                    <div className="absolute top-4 right-4 bg-brand-gold text-deep-navy px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-deep-navy hover:bg-deep-navy-800 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-deep-navy"
            >
              <Link href="/shop" className="flex items-center gap-2">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Categories Preview */}
      <section
        className="bg-white dark:bg-deep-navy-900 py-20 lg:py-28"
        aria-labelledby="categories-heading"
      >
        <Container>
          <div className="text-center mb-16 space-y-4">
            <h2
              id="categories-heading"
              className="font-heading text-4xl md:text-5xl font-bold text-deep-navy dark:text-white"
            >
              Shop by Room
            </h2>
            <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-300 max-w-2xl mx-auto">
              Find the perfect furniture for every space in your home
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Living Room', icon: '🛋️', href: '/shop?category=Sofas' },
              { name: 'Bedroom', icon: '🛏️', href: '/shop?category=Beds' },
              { name: 'Dining Room', icon: '🍽️', href: '/shop?category=Tables' },
              { name: 'Office', icon: '💼', href: '/shop?category=Desks' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative bg-neutral-gray-50 dark:bg-deep-navy-800 p-8 rounded-2xl text-center hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-brand-gold overflow-hidden"
                aria-label={`Shop ${category.name} furniture`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-deep-navy/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="aspect-square mb-4 bg-white dark:bg-neutral-gray-700 rounded-2xl flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
                    <span className="text-6xl group-hover:scale-110 transition-transform" role="img" aria-label={category.name}>
                      {category.icon}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white group-hover:text-brand-gold dark:group-hover:text-brand-gold transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Storage & Organization Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-deep-navy-900" aria-labelledby="storage-heading">
        <Container>
          <div className="mb-12">
            <h2
              id="storage-heading"
              className="font-heading text-3xl md:text-4xl font-bold text-deep-navy dark:text-white mb-4"
            >
              Storage & Organization
            </h2>
            <p className="text-neutral-gray-600 dark:text-neutral-gray-300 text-lg">
              Keep your space organized with our functional storage solutions
            </p>
          </div>

          {/* Loading State */}
          {isStorageLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-neutral-gray-200 dark:bg-neutral-gray-700 rounded-2xl h-80"
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isStorageLoading && storageProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-gray-500 dark:text-neutral-gray-400 text-lg">
                No storage products available at the moment. Check back soon!
              </p>
            </div>
          )}

          {/* Product Grid */}
          {!isStorageLoading && storageProducts.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {storageProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/p/${product.slug}`}
                    className="group relative bg-white dark:bg-deep-navy-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 border border-neutral-gray-200 dark:border-neutral-gray-700"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-gray-100 dark:bg-neutral-gray-800">
                      <Image
                        src={product.image || '/placeholder-product.jpg'}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.discount && (
                        <div className="absolute top-3 right-3 bg-brand-gold text-deep-navy px-3 py-1 rounded-full text-xs font-bold">
                          -{product.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-base text-deep-navy dark:text-white mb-2 line-clamp-2 group-hover:text-brand-gold dark:group-hover:text-brand-gold transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-bold text-deep-navy dark:text-brand-gold">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-sm text-neutral-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Button */}
              <div className="mt-12 text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-deep-navy hover:bg-deep-navy-800 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-deep-navy"
                >
                  <Link href="/shop?category=garden" className="flex items-center gap-2">
                    View All Storage Products
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="py-20 lg:py-28 bg-neutral-gray-50 dark:bg-neutral-gray-900 border-y border-neutral-gray-200 dark:border-neutral-gray-800" aria-label="Why choose Noyan Furniture">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-brand-gold/20 via-brand-gold/10 to-transparent border-2 border-brand-gold/20 group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="w-12 h-12 text-brand-gold" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-3 text-deep-navy dark:text-white">
                Free Delivery
              </h3>
              <p className="text-neutral-gray-600 dark:text-neutral-gray-400 leading-relaxed max-w-xs mx-auto">
                White glove delivery and setup on orders over $500
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-brand-gold/20 via-brand-gold/10 to-transparent border-2 border-brand-gold/20 group-hover:scale-110 transition-transform shadow-lg">
                <Sparkles className="w-12 h-12 text-brand-gold" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-3 text-deep-navy dark:text-white">
                Premium Quality
              </h3>
              <p className="text-neutral-gray-600 dark:text-neutral-gray-400 leading-relaxed max-w-xs mx-auto">
                Handcrafted by skilled artisans with finest materials
              </p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-brand-gold/20 via-brand-gold/10 to-transparent border-2 border-brand-gold/20 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-12 h-12 text-brand-gold" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-3 text-deep-navy dark:text-white">
                5-Year Warranty
              </h3>
              <p className="text-neutral-gray-600 dark:text-neutral-gray-400 leading-relaxed max-w-xs mx-auto">
                Comprehensive coverage on all furniture pieces
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
