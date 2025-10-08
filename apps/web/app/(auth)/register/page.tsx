'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormCheckbox } from '@/components/atoms/FormCheckbox';
import { FormInput } from '@/components/atoms/FormInput';
import { PasswordStrengthIndicator } from '@/components/molecules/PasswordStrengthIndicator';
import { SocialLoginButtons } from '@/components/molecules/SocialLoginButtons';
import { EnhancedHeader } from '@/components/organisms/Header';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      acceptTerms: false,
      subscribeNewsletter: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // Split full name into first and last name
      const nameParts = data.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const response = await apiClient.register({
        email: data.email,
        password: data.password,
        password_confirm: data.confirmPassword,
        first_name: firstName,
        last_name: lastName,
      });

      console.log('Registration successful:', response);

      // Force a hard navigation to account page to ensure cookies are properly set
      window.location.href = '/account';
    } catch (error: any) {
      console.error('Registration error:', error);
      setApiError(error?.message || 'Registration failed. Please try again or use a different email.');
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
              Create Account
            </h1>
            <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
              Join Noyan Furniture for exclusive deals
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

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <FormInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Name can only contain letters',
                },
              })}
              error={errors.fullName?.message}
              required
            />

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

            {/* Phone Number */}
            <FormInput
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              autoComplete="tel"
              {...register('phone', {
                pattern: {
                  value: /^[\d\s\-\+\(\)]+$/,
                  message: 'Invalid phone number',
                },
              })}
              error={errors.phone?.message}
              helperText="Optional"
            />

            {/* Password */}
            <div>
              <FormInput
                label="Password"
                type="password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                showPasswordToggle
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number',
                  },
                })}
                error={errors.password?.message}
                required
              />
              <PasswordStrengthIndicator password={password || ''} />
            </div>

            {/* Confirm Password */}
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              showPasswordToggle
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              error={errors.confirmPassword?.message}
              required
            />

            {/* Terms & Conditions */}
            <FormCheckbox
              label={
                <>
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="text-brand-gold hover:text-brand-gold/80 underline"
                    target="_blank"
                  >
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-brand-gold hover:text-brand-gold/80 underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </>
              }
              {...register('acceptTerms', {
                required: 'You must accept the terms and conditions',
              })}
              error={errors.acceptTerms?.message}
            />

            {/* Newsletter Subscription */}
            <FormCheckbox
              label="Subscribe to our newsletter for exclusive offers and updates"
              {...register('subscribeNewsletter')}
            />

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
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
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

          {/* Social Sign Up */}
          <SocialLoginButtons mode="register" />

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
        </div>
      </div>
    </>
  );
}
