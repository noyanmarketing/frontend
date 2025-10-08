'use client';

import { MapPin, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

import { AddressCardSkeleton } from '@/components/atoms/Skeleton';
import { AddressCard } from '@/components/molecules/AddressCard';
import { AddressFormModal } from '@/components/organisms/AddressFormModal';
import { ConfirmDeleteDialog } from '@/components/organisms/ConfirmDeleteDialog';
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { apiClient } from '@/lib/api-client';

interface AddressFormData {
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood?: string;
  addressDetails: string;
  postalCode: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Load user data on mount
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

        // TODO: Fetch addresses from API when endpoint is available
        // For now, show empty state
        setAddresses([]);
      } catch (error) {
        console.error('Failed to load user data:', error);
        // Redirect to login if not authenticated
        if (typeof window !== 'undefined') {
          window.location.href = '/login?redirect=/account/addresses';
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  // Delete dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<{ id: string; title: string } | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Get selected address data for editing
  const selectedAddress = selectedAddressId
    ? addresses.find((addr) => addr.id === selectedAddressId)
    : null;

  // Handle Add Address
  const handleAddAddress = () => {
    setFormMode('add');
    setSelectedAddressId(null);
    setIsFormModalOpen(true);
  };

  // Handle Edit Address
  const handleEditAddress = (id: string) => {
    setFormMode('edit');
    setSelectedAddressId(id);
    setIsFormModalOpen(true);
  };

  // Handle Delete Address (Open Dialog)
  const handleDeleteAddress = (id: string) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      setAddressToDelete({ id: address.id, title: address.title });
      setIsDeleteDialogOpen(true);
    }
  };

  // Confirm Delete Address
  const confirmDeleteAddress = () => {
    if (!addressToDelete) return;

    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressToDelete.id));
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setAddressToDelete(null);

      // TODO: Show success toast
      console.log('Address deleted successfully');
    }, 1000);
  };

  // Handle Form Submit (Add or Edit)
  const handleFormSubmit = (data: AddressFormData) => {
    if (formMode === 'add') {
      // Add new address
      const newAddress = {
        id: Date.now().toString(),
        ...data,
      };

      // If this is set as default, remove default from others
      if (data.isDefault) {
        setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: false })));
      }

      setAddresses((prev) => [...prev, newAddress]);

      // TODO: Show success toast
      console.log('Address added successfully');
    } else {
      // Edit existing address
      setAddresses((prev) =>
        prev.map((addr) => {
          if (addr.id === selectedAddressId) {
            return { ...addr, ...data };
          }
          // If new address is set as default, remove default from others
          if (data.isDefault && addr.id !== selectedAddressId) {
            return { ...addr, isDefault: false };
          }
          return addr;
        })
      );

      // TODO: Show success toast
      console.log('Address updated successfully');
    }

    setIsFormModalOpen(false);
    setSelectedAddressId(null);
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
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-2">
                    My Addresses
                  </h1>
                  <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
                    Manage your delivery and billing addresses
                  </p>
                </div>

                <Button
                  onClick={handleAddAddress}
                  className="bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Address
                </Button>
              </div>

              {/* Addresses Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <AddressCardSkeleton key={i} />
                  ))}
                </div>
              ) : addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      {...address}
                      onEdit={handleEditAddress}
                      onDelete={handleDeleteAddress}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-gray-100 dark:bg-neutral-gray-800 mb-4">
                    <MapPin className="w-10 h-10 text-neutral-gray-400" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-2">
                    No addresses found
                  </h3>
                  <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-6">
                    You haven&apos;t added any addresses yet. Add your first address to get started.
                  </p>
                  <Button
                    onClick={handleAddAddress}
                    className="bg-brand-gold hover:bg-brand-gold/90 text-deep-navy font-bold"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Address
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Address Form Modal */}
      <AddressFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedAddressId(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={selectedAddress || undefined}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setAddressToDelete(null);
        }}
        onConfirm={confirmDeleteAddress}
        title={addressToDelete?.title || ''}
        isDeleting={isDeleting}
      />

      <EnhancedFooter />
    </>
  );
}
