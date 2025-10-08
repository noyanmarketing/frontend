import { generateSEO } from '@/lib/seo';

import { AccountClient } from './account-client';

import type { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: 'My Account - Noyan Furniture',
  description: 'Manage your account, view orders, track shipments, and access exclusive deals.',
  url: 'https://noyan.com/account',
});

export default function AccountPage() {
  return <AccountClient />;
}
