import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, headers = {}, ...restOptions } = options;

  const config: RequestInit = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (requiresAuth) {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'GET', requiresAuth }),

  post: <T>(endpoint: string, data: unknown, requiresAuth = false) =>
    apiClient<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth,
    }),

  put: <T>(endpoint: string, data: unknown, requiresAuth = false) =>
    apiClient<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      requiresAuth,
    }),

  delete: <T>(endpoint: string, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'DELETE', requiresAuth }),
};
