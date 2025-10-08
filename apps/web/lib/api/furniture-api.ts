/**
 * Furniture API Client
 * Base URL: https://furniture-api.fly.dev
 */

const FURNITURE_API_BASE_URL = 'https://furniture-api.fly.dev';

export interface FurnitureProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  wood_type: string;
  finish: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  price: number;
  discount_price: number | null;
  weight: number;
  image_path: string;
  stock: number;
  sku: string;
  status: 'active' | 'inactive';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface FurnitureApiResponse<T> {
  success: boolean;
  count: number;
  data: T;
}

export interface ProductFilters {
  limit?: number;
  offset?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'oldest';
  name?: string;
  category?: string;
  wood_type?: string;
  finish?: string;
  min_price?: number;
  max_price?: number;
  min_stock?: number;
  max_stock?: number;
  featured?: boolean;
}

/**
 * Fetch products from Furniture API
 */
export async function fetchFurnitureProducts(
  filters?: ProductFilters
): Promise<FurnitureApiResponse<FurnitureProduct[]>> {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
  }

  const queryString = params.toString();
  const url = `${FURNITURE_API_BASE_URL}/v1/products${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single product by SKU
 */
export async function fetchFurnitureProduct(sku: string): Promise<FurnitureProduct> {
  const response = await fetch(`${FURNITURE_API_BASE_URL}/v1/products/${sku}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

/**
 * Get available categories from products
 */
export async function fetchCategories(): Promise<string[]> {
  const response = await fetchFurnitureProducts({ limit: 100 });
  const categories = new Set(response.data.map((p) => p.category));
  return Array.from(categories).sort();
}

/**
 * Transform Furniture API product to our frontend format
 */
export function transformFurnitureProduct(product: FurnitureProduct) {
  return {
    slug: product.sku,
    title: product.name,
    price: product.discount_price || product.price,
    originalPrice: product.discount_price ? product.price : undefined,
    currency: 'USD',
    brand: product.wood_type,
    image: product.image_path,
    category: product.category,
    description: product.description,
    stock: product.stock,
    discount: product.discount_price
      ? Math.round(((product.price - product.discount_price) / product.price) * 100)
      : undefined,
  };
}
