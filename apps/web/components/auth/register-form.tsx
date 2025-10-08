'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { apiClient, APIError } from '@/lib/api-client';

export function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      await apiClient.register(formData);
      // Redirect to account page on success
      router.push('/account');
    } catch (err) {
      if (err instanceof APIError && err.data) {
        // Handle validation errors from backend
        const backendErrors = err.data as Record<string, string[]>;
        setErrors(backendErrors);
      } else if (err instanceof APIError) {
        setErrors({ general: [err.message] });
      } else {
        setErrors({ general: ['An unexpected error occurred'] });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div
          className="p-3 rounded-md bg-destructive/10 text-destructive text-sm"
          role="alert"
        >
          {errors.general[0]}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">First Name</Label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            placeholder="John"
            disabled={isLoading}
            autoComplete="given-name"
          />
          {errors.first_name && (
            <p className="mt-1 text-xs text-destructive">
              {errors.first_name[0]}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="last_name">Last Name</Label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            placeholder="Doe"
            disabled={isLoading}
            autoComplete="family-name"
          />
          {errors.last_name && (
            <p className="mt-1 text-xs text-destructive">
              {errors.last_name[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          placeholder="you@example.com"
          required
          disabled={isLoading}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          placeholder="••••••••"
          required
          disabled={isLoading}
          autoComplete="new-password"
          minLength={8}
        />
        {errors.password && (
          <div className="mt-1 space-y-1">
            {errors.password.map((error, index) => (
              <p key={index} className="text-xs text-destructive">
                • {error}
              </p>
            ))}
          </div>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Must be at least 8 characters with uppercase, lowercase, number, and
          special character
        </p>
      </div>

      <div>
        <Label htmlFor="password_confirm">Confirm Password</Label>
        <input
          id="password_confirm"
          name="password_confirm"
          type="password"
          value={formData.password_confirm}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          placeholder="••••••••"
          required
          disabled={isLoading}
          autoComplete="new-password"
          minLength={8}
        />
        {errors.password_confirm && (
          <p className="mt-1 text-xs text-destructive">
            {errors.password_confirm[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>

      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
