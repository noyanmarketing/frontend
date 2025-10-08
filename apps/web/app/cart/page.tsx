'use client';

import { ChevronRight, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CartItemSkeleton } from '@/components/atoms/Skeleton';
import { CartItem } from '@/components/molecules/CartItem';
import { EmptyCart } from '@/components/organisms/EmptyCart';
import { FeaturedProducts } from '@/components/organisms/FeaturedProducts';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { OrderSummary } from '@/components/organisms/OrderSummary';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

// Mock cart items
const mockCartItems = [
  {
    id: '1',
    name: 'Modern Oak Dining Chair',
    image: '',
    slug: 'modern-oak-dining-chair',
    price: 249.99,
    originalPrice: 299.99,
    quantity: 2,
    variant: {
      color: 'Natural Oak',
      size: 'Standard',
    },
    designer: 'Noyan Design Studio',
    sku: 'NOY-CH-001',
    stock: 12,
  },
  {
    id: '2',
    name: 'Luxury Velvet Sofa',
    image: '',
    slug: 'luxury-velvet-sofa',
    price: 1299.99,
    quantity: 1,
    variant: {
      color: 'Navy Blue',
      size: '3-Seater',
    },
    designer: 'Premium Collection',
    sku: 'NOY-SF-002',
    stock: 3,
  },
  {
    id: '3',
    name: 'Minimalist Coffee Table',
    image: '',
    slug: 'minimalist-coffee-table',
    price: 399.99,
    originalPrice: 449.99,
    quantity: 1,
    designer: 'Urban Living',
    sku: 'NOY-TB-003',
    stock: 8,
  },
];

// Mock suggested products
const mockSuggestedProducts = [
  {
    id: '10',
    title: 'Scandinavian Side Table',
    price: 189.99,
    originalPrice: 229.99,
    image: '',
    slug: 'scandinavian-side-table',
  },
  {
    id: '11',
    title: 'Designer Floor Lamp',
    price: 299.99,
    image: '',
    slug: 'designer-floor-lamp',
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
    title: 'Wooden Bookshelf',
    price: 449.99,
    image: '',
    slug: 'wooden-bookshelf',
  },
];

const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_COST = 50;

interface CartItemData {
  id: string;
  name: string;
  image: string;
  slug: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  variant?: {
    color?: string;
    size?: string;
  };
  designer?: string;
  sku: string;
  stock: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | undefined>();

  // Load cart items (simulate API call)
  useEffect(() => {
    const loadCart = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCartItems(mockCartItems);
      // Select all items by default
      setSelectedItems(new Set(mockCartItems.map((item) => item.id)));
      setIsLoading(false);
    };

    loadCart();
  }, []);

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = cartItems
      .filter((item) => selectedItems.has(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const discount = appliedCoupon?.discount || 0;
    const total = subtotal + shipping - discount;

    return { subtotal, shipping, discount, total };
  };

  const { subtotal, shipping, discount, total } = calculateTotals();

  // Handlers
  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    // TODO: Update quantity via API
    console.log(`Updated quantity for item ${id} to ${quantity}`);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    // TODO: Remove item via API
    console.log(`Removed item ${id}`);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.size === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to remove ${selectedItems.size} item(s) from your cart?`
    );

    if (confirmed) {
      setCartItems((prev) => prev.filter((item) => !selectedItems.has(item.id)));
      setSelectedItems(new Set());
      // TODO: Remove items via API
      console.log('Removed selected items');
    }
  };

  const handleEmptyCart = () => {
    const confirmed = window.confirm(
      'Are you sure you want to empty your cart? This action cannot be undone.'
    );

    if (confirmed) {
      setCartItems([]);
      setSelectedItems(new Set());
      // TODO: Clear cart via API
      console.log('Cart emptied');
    }
  };

  const handleMoveToFavorites = (id: string) => {
    // TODO: Implement move to favorites
    console.log(`Moved item ${id} to favorites`);
    handleRemoveItem(id);
  };

  const handleApplyCoupon = async (
    code: string
  ): Promise<{ success: boolean; message: string; discount?: number }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock coupon validation
    const validCoupons: Record<string, number> = {
      SAVE10: subtotal * 0.1,
      SAVE20: subtotal * 0.2,
      FLAT50: 50,
      FLAT100: 100,
    };

    if (validCoupons[code]) {
      const discountAmount = validCoupons[code];
      setAppliedCoupon({ code, discount: discountAmount });
      return {
        success: true,
        message: `Coupon "${code}" applied successfully! You saved ₺${discountAmount.toFixed(2)}`,
        discount: discountAmount,
      };
    } else {
      return {
        success: false,
        message: 'Invalid coupon code. Please try again.',
      };
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(undefined);
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      alert('Please select at least one item to proceed to checkout.');
      return;
    }

    // TODO: Navigate to checkout with selected items
    console.log('Proceeding to checkout with items:', Array.from(selectedItems));
    router.push('/checkout');
  };

  // Show empty cart
  if (!isLoading && cartItems.length === 0) {
    return (
      <>
        <EnhancedHeader />
        <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 py-8">
          <Container>
            <EmptyCart recommendedProducts={mockSuggestedProducts} />
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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-brand-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-neutral-gray-400" />
            <span className="text-deep-navy dark:text-white font-semibold">Shopping Cart</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Left Column - Cart Items */}
            <div className="space-y-6">
              {/* Cart Header */}
              <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-brand-gold" />
                    <h1 className="font-heading text-2xl font-bold text-deep-navy dark:text-white">
                      Shopping Cart
                    </h1>
                    {!isLoading && (
                      <span className="px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-semibold">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </div>

                  {!isLoading && cartItems.length > 0 && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.size === cartItems.length}
                        onChange={handleSelectAll}
                        className="w-5 h-5 rounded border-2 border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 cursor-pointer"
                      />
                      <span className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                        Select All
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cart Items List */}
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <CartItemSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      isSelected={selectedItems.has(item.id)}
                      onToggleSelect={handleToggleSelect}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                      onMoveToFavorites={handleMoveToFavorites}
                    />
                  ))}
                </div>
              )}

              {/* Cart Actions */}
              {!isLoading && cartItems.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleDeleteSelected}
                    disabled={selectedItems.size === 0}
                    variant="outline"
                    className="border-2 border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected ({selectedItems.size})
                  </Button>

                  <Button
                    onClick={handleEmptyCart}
                    variant="outline"
                    className="border-2"
                  >
                    Empty Cart
                  </Button>

                  <Link href="/shop" className="ml-auto">
                    <Button variant="outline" className="border-2">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary (Sticky) */}
            {!isLoading && cartItems.length > 0 && (
              <div className="lg:sticky lg:top-8 h-fit">
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                  freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={handleApplyCoupon}
                  onRemoveCoupon={handleRemoveCoupon}
                  onCheckout={handleCheckout}
                />
              </div>
            )}
          </div>

          {/* Suggested Products */}
          {!isLoading && cartItems.length > 0 && (
            <div className="mt-16">
              <FeaturedProducts
                title="You Might Also Like"
                products={mockSuggestedProducts}
              />
            </div>
          )}
        </Container>
      </div>
      <EnhancedFooter />
    </>
  );
}
