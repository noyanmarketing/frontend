'use client';

import { useQuery } from '@tanstack/react-query';


// Organisms
import { BlogSection } from '@/components/organisms/BlogSection';
import { BrandSlider } from '@/components/organisms/BrandSlider';
import { CampaignBanners } from '@/components/organisms/CampaignBanners';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { FeaturedProducts } from '@/components/organisms/FeaturedProducts';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { HeroBanner } from '@/components/organisms/HeroBanner';
import { Newsletter } from '@/components/organisms/Newsletter';
import { TrustBadges } from '@/components/organisms/TrustBadges';
import { fetchFurnitureProducts, transformFurnitureProduct } from '@/lib/api/furniture-api';

export function HomePageClient() {
  // Fetch best sellers
  const { data: bestSellers, isLoading: bestSellersLoading } = useQuery({
    queryKey: ['furniture-best-sellers'],
    queryFn: () => fetchFurnitureProducts({ limit: 8, featured: true }),
    staleTime: 60000,
  });

  // Fetch new arrivals
  const { data: newArrivals, isLoading: newArrivalsLoading } = useQuery({
    queryKey: ['furniture-new-arrivals'],
    queryFn: () => fetchFurnitureProducts({ limit: 8, sort: 'newest' }),
    staleTime: 60000,
  });

  // Fetch recommended products
  const { data: recommended } = useQuery({
    queryKey: ['furniture-recommended'],
    queryFn: () => fetchFurnitureProducts({ limit: 8 }),
    staleTime: 60000,
  });

  // Transform products and ensure they have IDs
  const bestSellersProducts = bestSellers?.data?.map((p, i) => ({ ...transformFurnitureProduct(p), id: p.id?.toString() || `best-${i}` })) || [];
  const newArrivalsProducts = newArrivals?.data?.map((p, i) => ({ ...transformFurnitureProduct(p), id: p.id?.toString() || `new-${i}` })) || [];
  const recommendedProducts = recommended?.data?.map((p, i) => ({ ...transformFurnitureProduct(p), id: p.id?.toString() || `rec-${i}` })) || [];

  // Mock products for showcases (Home Decoration, Designer Jewelry, Bags)
  const mockProducts = [
    {
      id: '1',
      title: 'Modern Velvet Sofa',
      price: 1299.99,
      originalPrice: 1699.99,
      discount: 24,
      image: '/placeholder-product.jpg',
      slug: 'modern-velvet-sofa',
      badge: 'Best Seller',
    },
    {
      id: '2',
      title: 'Scandinavian Coffee Table',
      price: 449.99,
      image: '/placeholder-product.jpg',
      slug: 'scandinavian-coffee-table',
    },
    {
      id: '3',
      title: 'Designer Armchair',
      price: 899.99,
      originalPrice: 1099.99,
      discount: 18,
      image: '/placeholder-product.jpg',
      slug: 'designer-armchair',
      badge: 'New',
    },
    {
      id: '4',
      title: 'Mid-Century Bookshelf',
      price: 599.99,
      image: '/placeholder-product.jpg',
      slug: 'mid-century-bookshelf',
    },
    {
      id: '5',
      title: 'Luxury Dining Set',
      price: 2499.99,
      originalPrice: 2999.99,
      discount: 17,
      image: '/placeholder-product.jpg',
      slug: 'luxury-dining-set',
      badge: 'Premium',
    },
    {
      id: '6',
      title: 'Contemporary Bed Frame',
      price: 799.99,
      image: '/placeholder-product.jpg',
      slug: 'contemporary-bed-frame',
    },
  ];

  return (
    <>
      {/* Enhanced Header with Search & Category Menu */}
      <EnhancedHeader />

      <main className="min-h-screen bg-white dark:bg-deep-navy-900">
        {/* Hero Banner with Slider */}
        <HeroBanner />

        {/* Category Cards Grid */}
        <CategoryGrid />

        {/* Best Sellers Section */}
        {!bestSellersLoading && bestSellersProducts.length > 0 && (
          <FeaturedProducts
            title="Best Sellers"
            subtitle="Our most-loved furniture pieces"
            products={bestSellersProducts}
            viewAllLink="/shop?filter=best-sellers"
            badge="Popular"
          />
        )}

        {/* Campaign Banners */}
        <CampaignBanners />

        {/* New Arrivals Section */}
        {!newArrivalsLoading && newArrivalsProducts.length > 0 && (
          <FeaturedProducts
            title="New Arrivals"
            subtitle="Fresh designs just added to our collection"
            products={newArrivalsProducts}
            viewAllLink="/shop?filter=new"
            badge="Just In"
          />
        )}

        {/* Category Showcases */}
        <section className="bg-white dark:bg-deep-navy-900">
          {/* Home Decoration Showcase */}
          <FeaturedProducts
            title="Home Decoration"
            subtitle="Curated pieces to elevate your interior"
            products={mockProducts.slice(0, 6)}
            viewAllLink="/collections/home-decoration"
          />
        </section>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Designer Jewelry (Luxury) Showcase */}
        {recommendedProducts.length > 0 && (
          <FeaturedProducts
            title="Designer Collection"
            subtitle="Exclusive luxury pieces for discerning tastes"
            products={recommendedProducts}
            viewAllLink="/collections/designer"
            badge="Luxury"
          />
        )}

        {/* Brands & Designers Slider */}
        <BrandSlider />

        {/* Bags (Storage & Organization) Showcase */}
        <section className="bg-neutral-gray-50 dark:bg-neutral-gray-900">
          <FeaturedProducts
            title="Storage & Organization"
            subtitle="Smart solutions for a clutter-free home"
            products={mockProducts.slice(2, 6)}
            viewAllLink="/collections/storage"
          />
        </section>

        {/* Blog / Content Section */}
        <BlogSection />

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </>
  );
}
