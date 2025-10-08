import { api } from '../apiClient';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  is_active: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  brand: {
    id: number;
    name: string;
    slug: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

/**
 * Fetch paginated list of products
 */
export async function getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }

  const queryString = params.toString();
  const endpoint = `/api/v1/products/${queryString ? `?${queryString}` : ''}`;

  return api.get<ProductsResponse>(endpoint);
}

/**
 * Fetch a single product by slug
 */
export async function getProduct(slug: string): Promise<Product> {
  return api.get<Product>(`/api/v1/products/${slug}/`);
}

/**
 * Fetch featured products (for homepage)
 */
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const response = await getProducts({
    ordering: '-created_at',
    page_size: limit,
    // You can add a specific featured filter if your API supports it
  });

  return response.results;
}

/**
 * Search products
 */
export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
  const response = await getProducts({
    search: query,
    page_size: limit,
  });

  return response.results;
}

/**
 * Transform API product to frontend format
 */
export function transformProduct(product: Product) {
  return {
    slug: product.slug,
    title: product.name,
    price: parseFloat(product.price),
    currency: 'USD',
    brand: product.brand.name,
    description: product.description,
    stock: product.stock,
    category: product.category.name,
  };
}
