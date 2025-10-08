'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card';
import { fetchFurnitureProducts, transformFurnitureProduct } from '@/lib/api/furniture-api';

export function CollectionsClient() {
  // Fetch featured products
  const { data: featuredData, isLoading: featuredLoading } = useQuery({
    queryKey: ['furniture-featured'],
    queryFn: () => fetchFurnitureProducts({ limit: 4, featured: true }),
    staleTime: 60000,
  });

  // Fetch new arrivals (newest products)
  const { data: newArrivalsData, isLoading: newArrivalsLoading } = useQuery({
    queryKey: ['furniture-new-arrivals'],
    queryFn: () => fetchFurnitureProducts({ limit: 4, sort: 'newest' }),
    staleTime: 60000,
  });

  // Fetch discounted products
  const { data: allProducts, isLoading: allProductsLoading } = useQuery({
    queryKey: ['furniture-all-for-discount'],
    queryFn: () => fetchFurnitureProducts({ limit: 100 }),
    staleTime: 60000,
  });

  const featuredProducts = (featuredData?.data || []).map(transformFurnitureProduct);
  const newArrivals = (newArrivalsData?.data || []).map(transformFurnitureProduct);
  const discountedProducts = (allProducts?.data || [])
    .filter((p) => p.discount_price !== null)
    .slice(0, 4)
    .map(transformFurnitureProduct);

  const collections = [
    {
      id: 'featured',
      title: 'Featured Collection',
      description: 'Handpicked pieces that define modern living',
      icon: Sparkles,
      products: featuredProducts,
      isLoading: featuredLoading,
      color: 'from-brand-gold/20 via-brand-gold/10 to-transparent',
      iconColor: 'text-brand-gold',
      link: '/shop?featured=true',
    },
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      description: 'Latest additions to our furniture collection',
      icon: TrendingUp,
      products: newArrivals,
      isLoading: newArrivalsLoading,
      color: 'from-deep-navy/20 via-deep-navy/10 to-transparent',
      iconColor: 'text-deep-navy dark:text-white',
      link: '/shop?sort=newest',
    },
    {
      id: 'on-sale',
      title: 'On Sale',
      description: 'Premium furniture at unbeatable prices',
      icon: Sparkles,
      products: discountedProducts,
      isLoading: allProductsLoading,
      color: 'from-red-500/20 via-red-500/10 to-transparent',
      iconColor: 'text-red-600',
      link: '/shop',
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-deep-navy-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-navy via-deep-navy-800 to-neutral-gray-900 text-white py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <p className="text-sm font-semibold text-brand-gold">Curated Collections</p>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore Our Collections
            </h1>
            <p className="text-xl text-neutral-gray-200 leading-relaxed">
              Discover handcrafted furniture pieces organized into thoughtfully curated
              collections. From timeless classics to modern designs, find the perfect pieces
              for your home.
            </p>
          </div>
        </Container>
      </section>

      {/* Collections */}
      <section className="py-20">
        <Container>
          <div className="space-y-20">
            {collections.map((collection, index) => (
              <div key={collection.id}>
                {/* Collection Header */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${collection.color} border-2 border-brand-gold/20 flex items-center justify-center`}
                    >
                      <collection.icon className={`w-8 h-8 ${collection.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy dark:text-white mb-2">
                        {collection.title}
                      </h2>
                      <p className="text-neutral-gray-600 dark:text-neutral-gray-300">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={collection.link}
                    className="hidden md:flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 font-semibold transition-colors group"
                  >
                    View All
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Loading State */}
                {collection.isLoading && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
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

                {/* Products Grid */}
                {!collection.isLoading && collection.products.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collection.products.map((product) => (
                      <ProductCard key={product.slug} product={product} />
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!collection.isLoading && collection.products.length === 0 && (
                  <div className="text-center py-16 bg-neutral-gray-50 dark:bg-neutral-gray-900 rounded-2xl">
                    <div className="text-6xl mb-4 opacity-20">🪑</div>
                    <p className="text-neutral-gray-500 dark:text-neutral-gray-400">
                      No products in this collection yet
                    </p>
                  </div>
                )}

                {/* Mobile View All Link */}
                <div className="md:hidden mt-8 text-center">
                  <Link
                    href={collection.link}
                    className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 font-semibold transition-colors group"
                  >
                    View All {collection.title}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Divider */}
                {index < collections.length - 1 && (
                  <div className="mt-20 border-t border-neutral-gray-200 dark:border-neutral-gray-800" />
                )}
              </div>
            ))}
          </div>

          {/* Category Collections */}
          <div className="mt-28">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy dark:text-white mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-300">
                Browse furniture organized by room and style
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Chairs', icon: '🪑', link: '/shop?category=Chairs' },
                { name: 'Tables', icon: '🪵', link: '/shop?category=Tables' },
                { name: 'Sofas', icon: '🛋️', link: '/shop?category=Sofas' },
                { name: 'Beds', icon: '🛏️', link: '/shop?category=Beds' },
                { name: 'Storage', icon: '🗄️', link: '/shop?category=Storage' },
                { name: 'Desks', icon: '💼', link: '/shop?category=Desks' },
                { name: 'Shelving', icon: '📚', link: '/shop?category=Shelving' },
                { name: 'Cabinets', icon: '🚪', link: '/shop?category=Cabinets' },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.link}
                  className="group relative bg-white dark:bg-deep-navy-800 p-8 rounded-2xl text-center hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-brand-gold overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-deep-navy/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-deep-navy dark:text-white group-hover:text-brand-gold dark:group-hover:text-brand-gold transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
