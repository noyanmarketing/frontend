'use client';

import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useCallback, useEffect } from 'react';

import { EnhancedOrderCardSkeleton } from '@/components/atoms/Skeleton';
import { EnhancedOrderCard } from '@/components/molecules/EnhancedOrderCard';
import { OrderFilterTabs, type OrderStatus } from '@/components/molecules/OrderFilterTabs';
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { OrderDetailModal } from '@/components/organisms/OrderDetailModal';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { apiClient } from '@/lib/api-client';

const ORDERS_PER_PAGE = 6;

function OrdersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusParam = (searchParams?.get('status') as OrderStatus) || 'all';
  const pageParam = parseInt(searchParams?.get('page') || '1', 10);

  const [activeStatus, setActiveStatus] = useState<OrderStatus>(statusParam);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  // Load user data and orders on mount
  useEffect(() => {
    const loadUserAndOrders = async () => {
      setIsLoading(true);
      try {
        // Fetch user info
        const userData = await apiClient.me();
        setUser({
          name: `${userData.first_name} ${userData.last_name}`.trim() || userData.email,
          email: userData.email,
        });

        // TODO: Fetch orders from API when endpoint is available
        // For now, show empty state
        setOrders([]);
      } catch (error) {
        console.error('Failed to load user data:', error);
        // Redirect to login if not authenticated
        if (typeof window !== 'undefined') {
          window.location.href = '/login?redirect=/account/orders';
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserAndOrders();
  }, []);

  // Filter orders by status
  const filteredOrders = orders.filter((order) =>
    activeStatus === 'all' ? true : order.status === activeStatus
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);

  // Status counts
  const statusCounts = {
    all: orders.length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  // Update URL when status changes
  const handleStatusChange = useCallback(
    (status: OrderStatus) => {
      setActiveStatus(status);
      setCurrentPage(1);
      const params = new URLSearchParams();
      if (status !== 'all') params.set('status', status);
      params.set('page', '1');
      router.push(`/account/orders?${params.toString()}`);
    },
    [router]
  );

  // Update URL when page changes
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const params = new URLSearchParams();
      if (activeStatus !== 'all') params.set('status', activeStatus);
      params.set('page', page.toString());
      router.push(`/account/orders?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router, activeStatus]
  );

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const handleBuyAgain = (orderId: string) => {
    // TODO: Implement buy again logic
    console.log('Buy again:', orderId);
  };

  const handleTrackShipment = (trackingUrl?: string) => {
    if (trackingUrl) {
      window.open(trackingUrl, '_blank');
    }
  };

  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download
    console.log('Download invoice');
  };

  const handleRequestReturn = () => {
    // TODO: Implement return request
    console.log('Request return');
  };

  const handleWriteReview = (itemId: string) => {
    // TODO: Implement review flow
    console.log('Write review for:', itemId);
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
            <div className="space-y-6">
              {/* Page Header */}
              <div>
                <h1 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-2">
                  My Orders
                </h1>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
                  View and manage your orders
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="sticky top-4 z-10">
                <OrderFilterTabs
                  activeStatus={activeStatus}
                  onStatusChange={handleStatusChange}
                  counts={statusCounts}
                />
              </div>

              {/* Orders List */}
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <EnhancedOrderCardSkeleton key={i} />
                  ))}
                </div>
              ) : paginatedOrders.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-6">
                    {paginatedOrders.map((order) => (
                      <EnhancedOrderCard
                        key={order.orderId}
                        orderId={order.orderId}
                        orderNumber={order.orderNumber}
                        date={order.date}
                        status={order.status}
                        items={order.items}
                        total={order.total}
                        trackingNumber={order.trackingNumber}
                        onViewDetails={() => handleViewDetails(order)}
                        onBuyAgain={
                          order.status === 'delivered'
                            ? () => handleBuyAgain(order.orderId)
                            : undefined
                        }
                        onTrackShipment={
                          order.trackingUrl
                            ? () => handleTrackShipment(order.trackingUrl)
                            : undefined
                        }
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, i) => {
                          const page = i + 1;
                          const isActive = page === currentPage;

                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`
                                w-10 h-10 rounded-lg font-semibold transition-all duration-200
                                ${
                                  isActive
                                    ? 'bg-brand-gold text-deep-navy'
                                    : 'bg-white dark:bg-deep-navy-800 text-neutral-gray-700 dark:text-neutral-gray-300 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700'
                                }
                              `}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>

                      <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-gray-100 dark:bg-neutral-gray-800 mb-4">
                    <Package className="w-10 h-10 text-neutral-gray-400" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-2">
                    {activeStatus === 'all' ? 'No orders yet' : 'No orders found'}
                  </h3>
                  <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-6 max-w-md mx-auto">
                    {activeStatus === 'all'
                      ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                      : `You don't have any ${activeStatus} orders at the moment.`}
                  </p>
                  <Button
                    onClick={() => router.push('/shop')}
                    className="bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold"
                  >
                    Start Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
          onDownloadInvoice={handleDownloadInvoice}
          onRequestReturn={handleRequestReturn}
          onWriteReview={handleWriteReview}
        />
      )}

      <EnhancedFooter />
    </>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <>
        <EnhancedHeader />
        <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 py-8">
          <Container>
            <div className="grid grid-cols-1 gap-6">
              {[...Array(3)].map((_, i) => (
                <EnhancedOrderCardSkeleton key={i} />
              ))}
            </div>
          </Container>
        </div>
        <EnhancedFooter />
      </>
    }>
      <OrdersPageContent />
    </Suspense>
  );
}
