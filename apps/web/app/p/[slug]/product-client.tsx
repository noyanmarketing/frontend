'use client';

import { useQuery } from '@tanstack/react-query';
import { Heart, Shield, ShoppingCart, Truck } from 'lucide-react';
import { useState } from 'react';

import { Breadcrumbs, type BreadcrumbItem } from '@/components/molecules/Breadcrumbs';
import { ProductImageGallery } from '@/components/molecules/ProductImageGallery';
import { ProductRating } from '@/components/molecules/ProductRating';
import { QuantitySelector } from '@/components/molecules/QuantitySelector';
import { ShareButtons } from '@/components/molecules/ShareButtons';
import { FeaturedProducts } from '@/components/organisms/FeaturedProducts';
import { EnhancedFooter } from '@/components/organisms/Footer';
import { EnhancedHeader } from '@/components/organisms/Header';
import { ProductTabs } from '@/components/organisms/ProductTabs';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import {
  fetchFurnitureProduct,
  fetchFurnitureProducts,
  transformFurnitureProduct,
} from '@/lib/api/furniture-api';

interface ProductClientProps {
  sku: string;
}

export function ProductClient({ sku }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);

  // Fetch product
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', sku],
    queryFn: () => fetchFurnitureProduct(sku),
  });

  // Fetch related products
  const { data: relatedData } = useQuery({
    queryKey: ['related-products', product?.category],
    queryFn: () =>
      fetchFurnitureProducts({
        category: product?.category,
        limit: 8,
      }),
    enabled: !!product?.category,
  });

  const relatedProducts =
    relatedData?.data
      .filter((p) => p.sku !== sku)
      .slice(0, 6)
      .map((p, i) => ({
        ...transformFurnitureProduct(p),
        id: p.id || `related-${i}`,
      })) || [];

  if (isLoading) {
    return (
      <>
        <EnhancedHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full" />
        </div>
        <EnhancedFooter />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <EnhancedHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => window.location.href = '/shop'}>
              Back to Shop
            </Button>
          </div>
        </div>
        <EnhancedFooter />
      </>
    );
  }

  const discount = product.discount_price
    ? Math.round(
        ((product.price - product.discount_price) / product.price) * 100
      )
    : 0;

  const finalPrice = product.discount_price || product.price;
  const images = [product.image_path]; // Add more images if available
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Shop', href: '/shop' },
    {
      label: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      href: `/shop?category=${product.category}`,
    },
    { label: product.name, href: '#' },
  ];

  const specifications = {
    category: product.category,
    wood_type: product.wood_type,
    finish: product.finish,
    dimensions: `${product.dimensions.width}" W × ${product.dimensions.depth}" D × ${product.dimensions.height}" H`,
    weight: `${product.weight} lbs`,
    sku: product.sku,
    stock: product.stock > 0 ? 'In Stock' : 'Out of Stock',
  };

  return (
    <>
      <EnhancedHeader />

      <main className="min-h-screen bg-white dark:bg-deep-navy-900 py-8">
        <Container>
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} className="mb-8" />

          {/* Product Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Images */}
            <div>
              <ProductImageGallery images={images} productName={product.name} />
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
              {/* Title & SKU */}
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy dark:text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                  SKU: {product.sku}
                </p>
              </div>

              {/* Brand & Rating */}
              <div className="flex items-center gap-4 pb-4 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
                <span className="text-sm">
                  <span className="text-neutral-gray-600 dark:text-neutral-gray-400">
                    Wood Type:{' '}
                  </span>
                  <span className="font-semibold text-deep-navy dark:text-white capitalize">
                    {product.wood_type}
                  </span>
                </span>
                <span className="text-neutral-gray-300 dark:text-neutral-gray-700">
                  |
                </span>
                <ProductRating rating={4.5} reviewCount={0} showReviewLink={false} />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-deep-navy dark:text-brand-gold">
                  ${finalPrice.toFixed(2)}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-2xl text-neutral-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-bold">
                      -{discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                  product.stock > 0
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.stock > 0 ? 'bg-green-600' : 'bg-red-600'
                  }`}
                />
                <span className="font-semibold text-sm">
                  {product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="text-neutral-gray-700 dark:text-neutral-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity */}
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                max={product.stock}
              />

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-deep-navy hover:bg-deep-navy-800 text-white font-bold text-lg py-6"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2"
                    disabled={product.stock === 0}
                  >
                    Buy Now
                  </Button>
                  <Button variant="outline" size="lg" className="border-2">
                    <Heart className="w-5 h-5 mr-2" />
                    Wishlist
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="space-y-3 pt-6 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-deep-navy dark:text-white">
                      Free Shipping
                    </p>
                    <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                      On orders over $500 • Est. delivery: 5-7 business days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-deep-navy dark:text-white">
                      30-Day Returns
                    </p>
                    <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                      Easy returns and exchanges • 5-year warranty included
                    </p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="pt-4 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
                <ShareButtons
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title={product.name}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <ProductTabs description={product.description} specifications={specifications} />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <FeaturedProducts
                title="Related Products"
                subtitle="You might also like these items"
                products={relatedProducts}
              />
            </div>
          )}
        </Container>
      </main>

      <EnhancedFooter />
    </>
  );
}
