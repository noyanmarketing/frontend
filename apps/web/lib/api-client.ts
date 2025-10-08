/**
 * API Client with HTTP-only cookie support
 *
 * Automatically handles:
 * - Cookie-based authentication
 * - Token refresh on 401
 * - Error handling
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Make API request with cookie credentials
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, ...fetchOptions } = options;

  const url = `${API_URL}${endpoint}`;

  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type') && fetchOptions.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: 'include', // Include HTTP-only cookies
  });

  // Handle 401 Unauthorized - try to refresh token
  if (response.status === 401 && requiresAuth) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry original request
      const retryResponse = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: 'include',
      });

      if (!retryResponse.ok) {
        throw new APIError(
          retryResponse.status,
          'Request failed after token refresh',
          await retryResponse.json().catch(() => null)
        );
      }

      return retryResponse.json();
    } else {
      // Refresh failed - redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new APIError(401, 'Authentication required');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    // Extract error message from various formats
    let errorMessage = 'Request failed';
    if (errorData?.error) {
      errorMessage = errorData.error;
    } else if (errorData?.detail) {
      errorMessage = errorData.detail;
    } else if (errorData?.message) {
      errorMessage = errorData.message;
    } else if (typeof errorData === 'object') {
      // Handle field-specific errors (e.g., {"email": ["Email already exists"]})
      const firstError = Object.values(errorData)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        errorMessage = firstError[0];
      }
    }

    throw new APIError(
      response.status,
      errorMessage,
      errorData
    );
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * Refresh access token using refresh token cookie
 */
async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh/`, {
      method: 'POST',
      credentials: 'include',
    });

    return response.ok;
  } catch {
    return false;
  }
}

/**
 * API Client
 */
export const apiClient = {
  /**
   * Register new user
   */
  register: (data: {
    email: string;
    password: string;
    password_confirm: string;
    first_name?: string;
    last_name?: string;
  }) => {
    return apiRequest<{
      user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
      };
      message: string;
    }>('/api/v1/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Login user
   */
  login: (data: { email: string; password: string }) => {
    return apiRequest<{
      user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
      };
      message: string;
    }>('/api/v1/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Logout user
   */
  logout: () => {
    return apiRequest<{ message: string }>('/api/v1/auth/logout/', {
      method: 'POST',
      requiresAuth: true,
    });
  },

  /**
   * Get current user
   */
  me: () => {
    return apiRequest<{
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      is_active: boolean;
      created_at: string;
    }>('/api/v1/auth/me/', {
      requiresAuth: true,
    });
  },

  /**
   * Refresh access token
   */
  refresh: () => {
    return apiRequest<{ message: string }>('/api/v1/auth/refresh/', {
      method: 'POST',
    });
  },

  /**
   * Request password reset
   */
  passwordResetRequest: (email: string) => {
    return apiRequest<{ message: string; reset_link?: string }>(
      '/api/v1/auth/password/reset/',
      {
        method: 'POST',
        body: JSON.stringify({ email }),
      }
    );
  },

  /**
   * Confirm password reset
   */
  passwordResetConfirm: (data: {
    uid: string;
    token: string;
    password: string;
    password_confirm: string;
  }) => {
    return apiRequest<{ message: string }>(
      '/api/v1/auth/password/reset/confirm/',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },

  /**
   * Change password
   */
  changePassword: (data: {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
  }) => {
    return apiRequest<{ message: string }>('/api/v1/auth/password/change/', {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth: true,
    });
  },

  /**
   * Get user's favorite products
   */
  getFavorites: () => {
    return apiRequest<{
      id: number;
      name: string;
      slug: string;
      description: string;
      price: string;
      discount_price: string | null;
      image_path: string | null;
      stock_quantity: number;
      category: {
        id: number;
        name: string;
        slug: string;
      };
    }[]>('/api/v1/favorites/', {
      requiresAuth: true,
    });
  },

  /**
   * Add product to favorites
   */
  addToFavorites: (productId: string) => {
    return apiRequest<{ message: string }>('/api/v1/favorites/', {
      method: 'POST',
      body: JSON.stringify({ furniture_id: productId }),
      requiresAuth: true,
    });
  },

  /**
   * Remove product from favorites
   */
  removeFromFavorites: (productId: string) => {
    return apiRequest<{ message: string }>(`/api/v1/favorites/${productId}/`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  /**
   * Check if product is in favorites
   */
  isFavorite: (productId: string) => {
    return apiRequest<{ is_favorite: boolean }>(`/api/v1/favorites/${productId}/check/`, {
      requiresAuth: true,
    });
  },
};

export { APIError };
