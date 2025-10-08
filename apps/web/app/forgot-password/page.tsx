import { generateSEO } from '@/lib/seo';

import { ForgotPasswordClient } from './forgot-password-client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateSEO({
    title: 'Forgot Password - Noyan Furniture',
    description: 'Reset your Noyan Furniture account password securely.',
    url: 'https://noyan.com/forgot-password',
    type: 'website',
  }),
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
