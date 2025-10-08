'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

import { WishlistCardSkeleton } from '@/components/atoms/Skeleton';
import { WishlistCard } from '@/components/molecules/WishlistCard';
import { EmptyWishlist } from '@/components/organisms/EmptyWishlist';
import { FeaturedProducts } from '@/components/organisms/FeaturedProducts';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { apiClient, APIError } from '@/lib/api-client';

interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  stock: number;
  isInStock: boolean;
}

// Mock recommended products
const mockRecommendedProducts = [
  {
    id: '10',
    title: 'Designer Side Table',
    price: 189.99,
    originalPrice: 229.99,
    image: '',
    slug: 'designer-side-table',
  },
  {
    id: '11',
    title: 'Modern Floor Lamp',
    price: 299.99,
    image: '',
    slug: 'modern-floor-lamp',
  },
  {
    id: '12',
    title: 'Accent Armchair',
    price: 599.99,
    originalPrice: 699.99,
    image: '',
    slug: 'accent-armchair',
  },
  {
    id: '13',
    title: 'Wall Art Set',
    price: 149.99,
    image: '',
    slug: 'wall-art-set',
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingAll, setIsAddingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load wishlist items from API
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Check authentication
        try {
          await apiClient.me();
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Fetch favorites
        const favorites = await apiClient.getFavorites();

        // Transform to wishlist items
        const items: WishlistItem[] = favorites.map((fav) => {
          const price = fav.discount_price
            ? parseFloat(fav.discount_price)
            : parseFloat(fav.price);
          const originalPrice = fav.discount_price ? parseFloat(fav.price) : undefined;

          return {
            id: fav.id.toString(),
            name: fav.name,
            slug: fav.slug,
            image: fav.image_path || '',
            price,
            originalPrice,
            stock: fav.stock_quantity,
            isInStock: fav.stock_quantity > 0,
          };
        });

        setWishlistItems(items);
      } catch (err) {
        console.error('Failed to load wishlist:', err);
        if (err instanceof APIError && err.status === 401) {
          setIsAuthenticated(false);
        } else {
          setError('Failed to load wishlist. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, []);

  // Handlers
  const handleRemoveFromWishlist = async (id: string) => {
    // Optimistic update
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));

    try {
      await apiClient.removeFromFavorites(id);
      // Success - item already removed optimistically
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
      // Revert on error - reload wishlist
      try {
        const favorites = await apiClient.getFavorites();
        const items: WishlistItem[] = favorites.map((fav) => {
          const price = fav.discount_price
            ? parseFloat(fav.discount_price)
            : parseFloat(fav.price);
          const originalPrice = fav.discount_price ? parseFloat(fav.price) : undefined;

          return {
            id: fav.id.toString(),
            name: fav.name,
            slug: fav.slug,
            image: fav.image_path || '',
            price,
            originalPrice,
            stock: fav.stock_quantity,
            isInStock: fav.stock_quantity > 0,
          };
        });
        setWishlistItems(items);
      } catch {
        // Ignore reload error
      }
    }
  };

  const handleAddToCart = async (id: string) => {
    // Simulate API call - TODO: Implement cart API
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Added to cart:', id);
    alert('Added to cart! (Cart API integration pending)');
  };

  const handleAddAllToCart = async () => {
    const inStockItems = wishlistItems.filter((item) => item.isInStock);

    if (inStockItems.length === 0) {
      alert('No items available to add to cart');
      return;
    }

    setIsAddingAll(true);

    try {
      // Simulate bulk API call - TODO: Implement cart bulk API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Added all to cart:', inStockItems.map((item) => item.id));
      alert(`Added ${inStockItems.length} items to cart! (Cart API integration pending)`);
    } catch (error) {
      console.error('Failed to add all items to cart:', error);
      alert('Failed to add items to cart. Please try again.');
    } finally {
      setIsAddingAll(false);
    }
  };

  // Get available items count
  const availableItemsCount = wishlistItems.filter((item) => item.isInStock).length;

  // Show login redirect for unauthenticated users
  if (!isLoading && !isAuthenticated) {
    return (
      <>
        <EnhancedHeader />
        <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 py-8">
          <Container>
            <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-12 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20 mb-6">
                <Heart className="w-12 h-12 text-red-500" />
              </div>

              <h2 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-3">
                Please Log In
              </h2>

              <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-8 max-w-md mx-auto">
                You need to be logged in to view your wishlist. Log in or create an account to save your favorite products.
              </p>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => (window.location.href = '/login?redirect=/wishlist')}
                  className="bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold px-8 h-12"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => (window.location.href = '/register?redirect=/wishlist')}
                  variant="outline"
                  className="border-2 font-bold px-8 h-12"
                >
                  Create Account
                </Button>
              </div>
            </div>
          </Container>
        </div>
        <EnhancedFooter />
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <EnhancedHeader />
        <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 py-8">
          <Container>
            <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-12 text-center">
              <h2 className="font-heading text-2xl font-bold text-deep-navy dark:text-white mb-3">
                Something went wrong
              </h2>
              <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-6">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold px-8 h-12"
              >
                Try Again
              </Button>
            </div>
          </Container>
        </div>
        <EnhancedFooter />
      </>
    );
  }

  // Show empty state
  if (!isLoading && wishlistItems.length === 0) {
    return (
      <>
        <EnhancedHeader />
        <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 py-8">
          <Container>
            <EmptyWishlist recommendedProducts={mockRecommendedProducts} />
          </Container>
        </div>
        <EnhancedFooter />
      </>
    );
  }

  return (
    <>
      <EnhancedHeader />
      <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 py-8">
        <Container>
          {/* Page Header */}
          <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                </div>
                <div>
                  <h1 className="font-heading text-3xl font-bold text-deep-navy dark:text-white">
                    My Favorites
                  </h1>
                  {!isLoading && (
                    <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mt-1">
                      {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                      {availableItemsCount < wishlistItems.length && (
                        <span className="ml-2 text-amber-600 dark:text-amber-400">
                          ({availableItemsCount} available)
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {!isLoading && availableItemsCount > 0 && (
                <Button
                  onClick={handleAddAllToCart}
                  disabled={isAddingAll}
                  className="bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold h-12 px-6"
                >
                  {isAddingAll ? (
                    'Adding All...'
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add All to Cart ({availableItemsCount})
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Wishlist Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {[...Array(8)].map((_, i) => (
                <WishlistCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {wishlistItems.map((item) => (
                <WishlistCard
                  key={item.id}
                  {...item}
                  onRemove={handleRemoveFromWishlist}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {/* Recommended Products */}
          {!isLoading && wishlistItems.length > 0 && (
            <FeaturedProducts
              title="You Might Also Like"
              subtitle="Complete your collection with these products"
              products={mockRecommendedProducts}
            />
          )}
        </Container>
      </div>
      <EnhancedFooter />
    </>
  );
}
