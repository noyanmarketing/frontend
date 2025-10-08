'use client';

import { useEffect, useState } from 'react';

import { CheckoutProgress, CHECKOUT_STEPS } from '@/components/molecules/CheckoutProgress';
import { CheckoutSummary } from '@/components/organisms/CheckoutSummary';
import { ConfirmationStep } from '@/components/organisms/ConfirmationStep';
import { DeliveryStep } from '@/components/organisms/DeliveryStep';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { PaymentStep } from '@/components/organisms/PaymentStep';
import { ShippingStep } from '@/components/organisms/ShippingStep';
import { Container } from '@/components/ui/container';

// Mock data
const mockCartItems = [
  {
    id: '1',
    name: 'Modern Oak Dining Chair',
    image: '',
    price: 249.99,
    quantity: 2,
  },
  {
    id: '2',
    name: 'Luxury Velvet Sofa',
    image: '',
    price: 1299.99,
    quantity: 1,
  },
];

const mockAddresses = [
  {
    id: '1',
    title: 'Home',
    fullName: 'John Doe',
    phone: '+90 555 123 4567',
    city: 'İstanbul',
    district: 'Kadıköy',
    addressDetails: 'Caferağa Mah. Mühürdar Cad. No: 45 D: 8',
    postalCode: '34710',
  },
];

const mockRecommendedProducts = [
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
];

interface CheckoutState {
  step: number;
  selectedAddressId?: string;
  newAddresses: typeof mockAddresses;
  contactEmail: string;
  contactPhone: string;
  selectedShipping?: string;
  shippingCost: number;
  deliveryNotes: string;
  orderNumber?: string;
}

export default function CheckoutPage() {
  const [state, setState] = useState<CheckoutState>({
    step: 1,
    newAddresses: mockAddresses,
    contactEmail: 'john.doe@example.com',
    contactPhone: '+90 555 123 4567',
    shippingCost: 0,
    deliveryNotes: '',
  });

  // Load saved state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('checkoutState');
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load checkout state:', error);
      }
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    localStorage.setItem('checkoutState', JSON.stringify(state));
  }, [state]);

  // Calculate totals
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const shipping = state.shippingCost;
  const total = subtotal + shipping - discount;

  // Handlers
  const handleAddressSelect = (addressId: string) => {
    setState((prev) => ({ ...prev, selectedAddressId: addressId }));
  };

  const handleAddNewAddress = (address: Omit<(typeof mockAddresses)[0], 'id'>) => {
    const newAddress = { ...address, id: Date.now().toString() };
    setState((prev) => ({
      ...prev,
      newAddresses: [...prev.newAddresses, newAddress],
      selectedAddressId: newAddress.id,
    }));
  };

  const handleContactInfoChange = (email: string, phone: string) => {
    setState((prev) => ({ ...prev, contactEmail: email, contactPhone: phone }));
  };

  const handleShippingSelect = (shippingId: string) => {
    const shippingCosts: Record<string, number> = {
      free: 0,
      standard: 29.9,
      express: 49.9,
    };
    setState((prev) => ({
      ...prev,
      selectedShipping: shippingId,
      shippingCost: shippingCosts[shippingId] || 0,
    }));
  };

  const handleNotesChange = (notes: string) => {
    setState((prev) => ({ ...prev, deliveryNotes: notes }));
  };

  const handlePayment = async (paymentData: unknown) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

    setState((prev) => ({ ...prev, step: 4, orderNumber }));

    // Clear localStorage after successful order
    localStorage.removeItem('checkoutState');

    // TODO: Send payment data to Iyzico API
    console.log('Payment data:', paymentData);
    console.log('Order placed:', orderNumber);
  };

  const goToNextStep = () => {
    setState((prev) => ({ ...prev, step: prev.step + 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousStep = () => {
    setState((prev) => ({ ...prev, step: prev.step - 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get selected address for display
  const selectedAddress = state.newAddresses.find((addr) => addr.id === state.selectedAddressId);

  return (
    <>
      <EnhancedHeader />
      <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 py-8">
        <Container>
          {/* Progress Bar */}
          <CheckoutProgress currentStep={state.step} steps={CHECKOUT_STEPS} />

          {/* Main Content */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Left Column - Steps */}
            <div>
              {state.step === 1 && (
                <DeliveryStep
                  savedAddresses={state.newAddresses}
                  selectedAddressId={state.selectedAddressId}
                  contactEmail={state.contactEmail}
                  contactPhone={state.contactPhone}
                  onAddressSelect={handleAddressSelect}
                  onAddNewAddress={handleAddNewAddress}
                  onContactInfoChange={handleContactInfoChange}
                  onContinue={goToNextStep}
                />
              )}

              {state.step === 2 && (
                <ShippingStep
                  selectedShippingId={state.selectedShipping}
                  deliveryNotes={state.deliveryNotes}
                  onShippingSelect={handleShippingSelect}
                  onNotesChange={handleNotesChange}
                  onContinue={goToNextStep}
                  onBack={goToPreviousStep}
                />
              )}

              {state.step === 3 && (
                <PaymentStep
                  totalAmount={total}
                  onPayment={handlePayment}
                  onBack={goToPreviousStep}
                />
              )}

              {state.step === 4 && state.orderNumber && (
                <ConfirmationStep
                  orderNumber={state.orderNumber}
                  orderEmail={state.contactEmail}
                  orderSummary={{
                    items: mockCartItems.map((item) => ({
                      id: item.id,
                      name: item.name,
                      quantity: item.quantity,
                      price: item.price,
                    })),
                    total,
                    paymentMethod: 'Credit Card',
                    deliveryAddress: selectedAddress
                      ? `${selectedAddress.addressDetails}, ${selectedAddress.district}, ${selectedAddress.city}`
                      : 'Selected Address',
                  }}
                  recommendedProducts={mockRecommendedProducts}
                />
              )}
            </div>

            {/* Right Column - Order Summary (Sticky, hide on confirmation) */}
            {state.step < 4 && (
              <div className="lg:sticky lg:top-8 h-fit">
                <CheckoutSummary
                  items={mockCartItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                />
              </div>
            )}
          </div>
        </Container>
      </div>
      <EnhancedFooter />
    </>
  );
}
