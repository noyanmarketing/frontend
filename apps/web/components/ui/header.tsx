'use client';

import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ThemeToggle } from '../theme-toggle';
import { Button } from './button';
import { Container } from './container';
import { DiscountBanner } from './discount-banner';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <DiscountBanner />
      <div className="border-b bg-white dark:bg-deep-navy-900 shadow-sm">
        <Container>
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-2xl lg:text-3xl font-bold text-deep-navy dark:text-white hover:text-brand-gold dark:hover:text-brand-gold transition-colors"
            >
              NOYAN
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors"
              >
                Shop All
              </Link>
              <Link
                href="/collections"
                className="text-sm font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors"
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-neutral-gray-700 dark:text-neutral-gray-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800 hidden sm:flex"
                aria-label="Account"
                asChild
              >
                <Link href="/login">
                  <User className="w-5 h-5 text-neutral-gray-700 dark:text-neutral-gray-300" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800 relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-neutral-gray-700 dark:text-neutral-gray-300" />
                <span className="absolute -top-1 -right-1 bg-brand-gold text-deep-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <Menu className="w-6 h-6 text-neutral-gray-700 dark:text-neutral-gray-300" />
              </Button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white dark:bg-deep-navy-900">
            <Container>
              <nav className="flex flex-col gap-4 py-6">
                <Link
                  href="/"
                  className="text-base font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-base font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop All
                </Link>
                <Link
                  href="/collections"
                  className="text-base font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Collections
                </Link>
                <Link
                  href="/about"
                  className="text-base font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="border-t pt-4 mt-2 flex gap-3">
                  <Button asChild className="flex-1 bg-deep-navy hover:bg-deep-navy-800">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              </nav>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}
