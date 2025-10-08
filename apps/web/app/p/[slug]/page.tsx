import { notFound } from 'next/navigation';

import { fetchFurnitureProduct } from '@/lib/api/furniture-api';
import { generateSEO } from '@/lib/seo';

import { ProductClient } from './product-client';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const product = await fetchFurnitureProduct(params.slug);
    const discount = product.discount_price
      ? Math.round(((product.price - product.discount_price) / product.price) * 100)
      : 0;

    // Product Schema for SEO
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image_path,
      sku: product.sku,
      brand: {
        '@type': 'Brand',
        name: product.wood_type,
      },
      offers: {
        '@type': 'Offer',
        price: product.discount_price || product.price,
        priceCurrency: 'USD',
        availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: `https://noyan.com/p/${params.slug}`,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        reviewCount: '0',
      },
    };

    return {
      ...generateSEO({
        title: `${product.name} - Premium ${product.wood_type.charAt(0).toUpperCase() + product.wood_type.slice(1)} Furniture | Noyan`,
        description: `${product.description} ${discount > 0 ? `Save ${discount}% today!` : ''} Free shipping on orders over $500. 5-year warranty included.`,
        url: `https://noyan.com/p/${params.slug}`,
        type: 'product',
        keywords: [product.category, product.wood_type, product.finish, 'furniture', 'handcrafted', product.name],
        images: product.image_path
          ? [
              {
                url: product.image_path,
                alt: product.name,
                width: 1200,
                height: 1200,
              },
            ]
          : [],
      }),
      other: {
        'product:price:amount': (product.discount_price || product.price).toString(),
        'product:price:currency': 'USD',
        'product:schema': JSON.stringify(productSchema),
      },
    };
  } catch {
    return {
      title: 'Product Not Found - Noyan Furniture',
      description: 'The product you are looking for could not be found.',
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const product = await fetchFurnitureProduct(params.slug);

    if (!product) {
      notFound();
    }

    return <ProductClient sku={params.slug} />;
  } catch {
    notFound();
  }
}
