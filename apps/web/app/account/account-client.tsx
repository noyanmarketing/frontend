'use client';

import { Heart, Package, ShoppingBag, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { StatsCardSkeleton, OrderCardSkeleton, ProductCardSkeleton } from '@/components/atoms/Skeleton';
import { OrderCard } from '@/components/molecules/OrderCard';
import { PromoBanner } from '@/components/molecules/PromoBanner';
import { StatsCard } from '@/components/molecules/StatsCard';
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar';
import { FeaturedProducts } from '@/components/organisms/FeaturedProducts';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { apiClient } from '@/lib/api-client';

const mockSuggestedProducts = [
  {
    id: '1',
    name: 'Modern Oak Dining Chair',
    price: 299,
    discount_price: 249,
    image_path: '',
    category: 'chair',
    wood_type: 'oak',
    finish: 'natural',
    stock: 15,
  },
  {
    id: '2',
    name: 'Minimalist Desk Lamp',
    price: 89,
    image_path: '',
    category: 'lamp',
    wood_type: 'metal',
    finish: 'matte black',
    stock: 25,
  },
  {
    id: '3',
    name: 'Walnut Coffee Table',
    price: 599,
    discount_price: 499,
    image_path: '',
    category: 'table',
    wood_type: 'walnut',
    finish: 'polished',
    stock: 8,
  },
  {
    id: '4',
    name: 'Leather Sofa',
    price: 1899,
    image_path: '',
    category: 'sofa',
    wood_type: 'leather',
    finish: 'brown',
    stock: 5,
  },
];

export function AccountClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

  // Load user data and favorites on mount
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Fetch user info
        const userData = await apiClient.me();
        setUser({
          name: `${userData.first_name} ${userData.last_name}`.trim() || userData.email,
          email: userData.email,
        });

        // Fetch favorites
        try {
          const favoritesData = await apiClient.getFavorites();
          setFavorites(favoritesData);
        } catch (error) {
          console.error('Failed to load favorites:', error);
          setFavorites([]);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
        // Redirect to login if not authenticated
        if (typeof window !== 'undefined') {
          window.location.href = '/login?redirect=/account';
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Mock data for orders - TODO: Replace with API call
  const mockRecentOrders: any[] = [];

  const mockStats = {
    totalOrders: 0,
    activeOrders: 0,
    favorites: favorites.length,
    coupons: 0,
  };

  return (
    <>
      <EnhancedHeader />
      <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 py-8">
        <Container>
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden">
            <Button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              variant="outline"
              className="w-full"
            >
              {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
            </Button>
          </div>

          {/* Sidebar - Mobile Overlay */}
          <div
            className={`
              fixed inset-0 z-50 bg-black/50 lg:hidden transition-opacity duration-300
              ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className={`
                absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] transition-transform duration-300
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <DashboardSidebar user={user || { name: '', email: '' }} />
            </div>
          </div>

          {/* Sidebar - Desktop Sticky */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <DashboardSidebar user={user || { name: '', email: '' }} />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* User Profile Card */}
            <div className="bg-white dark:bg-deep-navy-800 rounded-2xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy dark:text-white mb-2">
                    Welcome back, {user?.name.split(' ')[0] || 'Guest'}! 👋
                  </h1>
                  <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
                    Here&apos;s what&apos;s happening with your account today.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex"
                >
                  <Link href="/account/profile">Edit Profile</Link>
                </Button>
              </div>

              {/* User Information */}
              {user && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
                  <div>
                    <label className="text-sm font-semibold text-neutral-gray-500 dark:text-neutral-gray-400">
                      Full Name
                    </label>
                    <p className="text-lg font-medium text-deep-navy dark:text-white mt-1">
                      {user.name || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-neutral-gray-500 dark:text-neutral-gray-400">
                      Email Address
                    </label>
                    <p className="text-lg font-medium text-deep-navy dark:text-white mt-1">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div>
              <h2 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
                Quick Overview
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <StatsCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard
                    icon={Package}
                    label="Total Orders"
                    value={mockStats.totalOrders}
                    color="blue"
                  />
                  <StatsCard
                    icon={ShoppingBag}
                    label="Active Orders"
                    value={mockStats.activeOrders}
                    color="purple"
                  />
                  <StatsCard
                    icon={Heart}
                    label="Favorites"
                    value={mockStats.favorites}
                    color="gold"
                  />
                  <StatsCard
                    icon={Ticket}
                    label="Available Coupons"
                    value={mockStats.coupons}
                    color="green"
                  />
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-deep-navy dark:text-white">
                  Recent Orders
                </h2>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-brand-gold hover:text-brand-gold/80"
                >
                  <Link href="/account/orders">View All</Link>
                </Button>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <OrderCardSkeleton key={i} />
                  ))}
                </div>
              ) : mockRecentOrders.length > 0 && user ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockRecentOrders.map((order) => (
                    <OrderCard key={order.orderId} {...order} />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-gray-100 dark:bg-neutral-gray-800 mb-4">
                    <Package className="w-8 h-8 text-neutral-gray-400" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-2">
                    No orders yet
                  </h3>
                  <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-6">
                    You haven&apos;t placed any orders yet. Start shopping to see your orders here!
                  </p>
                  <Button asChild>
                    <Link href="/shop">Browse Products</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Suggested Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-deep-navy dark:text-white">
                    Recommended For You
                  </h2>
                  <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mt-1">
                    Based on your favorites and browsing history
                  </p>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-brand-gold hover:text-brand-gold/80"
                >
                  <Link href="/account/favorites">See All Favorites</Link>
                </Button>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <FeaturedProducts
                  title=""
                  products={mockSuggestedProducts.map((p) => ({
                    id: p.id,
                    title: p.name,
                    price: p.discount_price || p.price,
                    originalPrice: p.discount_price ? p.price : undefined,
                    image: p.image_path || '',
                    slug: p.id,
                    discount: p.discount_price
                      ? Math.round(((p.price - p.discount_price) / p.price) * 100)
                      : undefined,
                  }))}
                />
              )}
            </div>

            {/* Personalized Campaigns */}
            <div>
              <h2 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-4">
                Special Offers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PromoBanner
                  title="Winter Sale"
                  description="Save up to 40% on selected furniture. Limited time offer!"
                  ctaText="Shop Now"
                  ctaLink="/shop?sale=true"
                  variant="gold"
                />
                <PromoBanner
                  title="Free Shipping"
                  description="Get free shipping on all orders over $500. No code needed!"
                  ctaText="Learn More"
                  ctaLink="/shipping"
                  variant="dark"
                />
              </div>
            </div>
          </div>
        </div>
        </Container>
      </div>
      <EnhancedFooter />
    </>
  );
}
