'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormInput } from '@/components/atoms/FormInput';
import { PasswordStrengthIndicator } from '@/components/molecules/PasswordStrengthIndicator';
import { EnhancedHeader } from '@/components/organisms/Header';
import { Button } from '@/components/ui/button';

type Step = 'email' | 'verification' | 'newPassword' | 'success';

interface EmailFormData {
  email: string;
}

interface VerificationFormData {
  code: string;
}

interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

export function ForgotPasswordClient() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');

  // Email form
  const emailForm = useForm<EmailFormData>();

  // Verification form
  const verificationForm = useForm<VerificationFormData>();

  // New password form
  const newPasswordForm = useForm<NewPasswordFormData>();
  const newPassword = newPasswordForm.watch('password');

  const handleEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // TODO: Replace with actual API call to send verification code
      console.log('Send verification code to:', data.email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setUserEmail(data.email);
      setStep('verification');
    } catch (error) {
      setApiError('Failed to send verification code. Please try again.');
      console.error('Email error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (data: VerificationFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // TODO: Replace with actual API call to verify code
      console.log('Verify code:', data.code);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStep('newPassword');
    } catch (error) {
      setApiError('Invalid verification code. Please try again.');
      console.error('Verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (data: NewPasswordFormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // TODO: Replace with actual API call to reset password
      console.log('Reset password:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStep('success');
    } catch (error) {
      setApiError('Failed to reset password. Please try again.');
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Resend code to:', userEmail);
    } catch (error) {
      setApiError('Failed to resend code. Please try again.');
    } finally {
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
          {/* Step 1: Email */}
          {step === 'email' && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 mb-4">
                  <svg
                    className="w-8 h-8 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h1 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-2">
                  Forgot Password?
                </h1>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
                  Enter your email to receive a verification code
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

              {/* Form */}
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-5">
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...emailForm.register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={emailForm.formState.errors.email?.message}
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-deep-navy hover:bg-deep-navy-800 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-deep-navy font-bold text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Code...</span>
                    </div>
                  ) : (
                    'Send Verification Code'
                  )}
                </Button>
              </form>
            </>
          )}

          {/* Step 2: Verification */}
          {step === 'verification' && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 mb-4">
                  <svg
                    className="w-8 h-8 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h1 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-2">
                  Check Your Email
                </h1>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
                  We sent a verification code to
                </p>
                <p className="text-sm font-semibold text-deep-navy dark:text-brand-gold mt-1">
                  {userEmail}
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

              {/* Form */}
              <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-5">
                <FormInput
                  label="Verification Code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  {...verificationForm.register('code', {
                    required: 'Verification code is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Code must be 6 digits',
                    },
                  })}
                  error={verificationForm.formState.errors.code?.message}
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-deep-navy hover:bg-deep-navy-800 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-deep-navy font-bold text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Verify Code'
                  )}
                </Button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="w-full text-sm text-brand-gold hover:text-brand-gold/80 font-semibold transition-colors disabled:opacity-50"
                >
                  Didn&apos;t receive the code? Resend
                </button>
              </form>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 'newPassword' && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 mb-4">
                  <svg
                    className="w-8 h-8 text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <h1 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-2">
                  Create New Password
                </h1>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
                  Choose a strong password for your account
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

              {/* Form */}
              <form onSubmit={newPasswordForm.handleSubmit(handleNewPasswordSubmit)} className="space-y-5">
                <div>
                  <FormInput
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    showPasswordToggle
                    {...newPasswordForm.register('password', {
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
                    error={newPasswordForm.formState.errors.password?.message}
                    required
                  />
                  <PasswordStrengthIndicator password={newPassword || ''} />
                </div>

                <FormInput
                  label="Confirm New Password"
                  type="password"
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  showPasswordToggle
                  {...newPasswordForm.register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === newPassword || 'Passwords do not match',
                  })}
                  error={newPasswordForm.formState.errors.confirmPassword?.message}
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-deep-navy hover:bg-deep-navy-800 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-deep-navy font-bold text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Resetting Password...</span>
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            </>
          )}

          {/* Step 4: Success */}
          {step === 'success' && (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="font-heading text-3xl font-bold text-deep-navy dark:text-white mb-2">
                  Password Reset Successful!
                </h1>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400">
                  Your password has been successfully reset
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => router.push('/login')}
                className="w-full bg-deep-navy hover:bg-deep-navy-800 dark:bg-brand-gold dark:hover:bg-brand-gold/90 dark:text-deep-navy font-bold text-base"
              >
                Continue to Login
              </Button>
            </>
          )}

          {/* Back to Login */}
          {step !== 'success' && (
            <p className="mt-8 text-center text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
              Remember your password?{' '}
              <Link
                href="/login"
                className="font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
              >
                Back to Login
              </Link>
            </p>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
