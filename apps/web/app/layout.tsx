import { Open_Sans, Poppins } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/lib/query-provider';

import './globals.css';

import type { Metadata } from 'next';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Noyan Furniture - Timeless Designs for Modern Living',
    template: '%s | Noyan Furniture',
  },
  description: 'Transform your space with handcrafted furniture from Noyan. Discover premium sofas, dining tables, bedroom sets, and office furniture. Timeless designs, exceptional quality.',
  keywords: ['furniture', 'home furnishings', 'sofas', 'dining tables', 'bedroom furniture', 'office furniture', 'handcrafted furniture', 'modern furniture', 'interior design'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
