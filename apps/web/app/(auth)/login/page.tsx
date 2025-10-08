'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormCheckbox } from '@/components/atoms/FormCheckbox';
import { FormInput } from '@/components/atoms/FormInput';
import { SocialLoginButtons } from '@/components/molecules/SocialLoginButtons';
import { EnhancedHeader } from '@/components/organisms/Header';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await apiClient.login({
        email: data.email,
        password: data.password,
      });

      console.log('Login successful:', response);

      // Force a hard navigation to account page to ensure cookies are properly set
      window.location.href = '/account';
    } catch (error: any) {
      console.error('Login error:', error);
      setApiError(error?.message || 'Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <EnhancedHeader />
      <div className="min-h-screen bg-gradient-to-br from-neutral-gray-50 via-white to-brand-gold/5 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-deep-navy-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-deep-navy-800 rounded-2xl shadow-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                {apiError}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FormInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message}
              required
            />

            {/* Password */}
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              showPasswordToggle
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message}
              required
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <FormCheckbox label="Remember me" {...register('rememberMe')} />

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full bg-deep-navy hover:bg-deep-navy-800 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-deep-navy font-bold text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-gray-300 dark:border-neutral-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-deep-navy-800 text-neutral-gray-500 dark:text-neutral-gray-400 font-medium">
                or
              </span>
            </div>
          </div>

          {/* Social Login */}
          <SocialLoginButtons mode="login" />

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-neutral-gray-500 dark:text-neutral-gray-400">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-brand-gold transition-colors">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-brand-gold transition-colors">
            Privacy Policy
          </Link>
        </p>
        </div>
      </div>
    </>
  );
}
