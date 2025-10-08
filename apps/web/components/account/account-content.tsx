'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiClient, APIError } from '@/lib/api-client';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  created_at: string;
}

export function AccountContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUser = async () => {
    try {
      const userData = await apiClient.me();
      setUser(userData);
    } catch (err) {
      if (err instanceof APIError && err.status === 401) {
        // Not authenticated - redirect to login
        router.push('/login');
      } else {
        setError('Failed to load user data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.logout();
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Redirect anyway
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => router.push('/login')}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">
          My Account
        </h1>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      <div className="grid gap-6">
        {/* User Info Card */}
        <Card className="p-6">
          <h2 className="font-heading text-xl font-semibold mb-4">
            Account Information
          </h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Name:</dt>
              <dd className="font-medium">
                {user.first_name || user.last_name
                  ? `${user.first_name} ${user.last_name}`.trim()
                  : 'Not provided'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Email:</dt>
              <dd className="font-medium">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Status:</dt>
              <dd>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    user.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Member since:</dt>
              <dd className="font-medium">
                {new Date(user.created_at).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="font-heading text-xl font-semibold mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start" disabled>
              <span className="mr-2">📦</span>
              View Orders (Coming Soon)
            </Button>
            <Button variant="outline" className="justify-start" disabled>
              <span className="mr-2">🔒</span>
              Change Password (Coming Soon)
            </Button>
            <Button variant="outline" className="justify-start" disabled>
              <span className="mr-2">📍</span>
              Manage Addresses (Coming Soon)
            </Button>
            <Button variant="outline" className="justify-start" disabled>
              <span className="mr-2">⚙️</span>
              Account Settings (Coming Soon)
            </Button>
          </div>
        </Card>

        {/* Protected Content Example */}
        <Card className="p-6 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎉</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                Welcome to Your Dashboard!
              </h3>
              <p className="text-sm text-muted-foreground">
                This is a protected page that requires authentication. You
                successfully registered/logged in and can now access exclusive
                features.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
