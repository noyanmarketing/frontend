'use client';

import { Heart, Menu, Search, Settings, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { IconButton } from '../atoms/IconButton';
import { Logo } from '../atoms/Logo';
import { SearchInput } from '../atoms/SearchInput';
import { CategoryMenu } from '../molecules/CategoryMenu';
import { ThemeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { DiscountBanner } from '../ui/discount-banner';

export function EnhancedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Discount Banner */}
      <DiscountBanner />

      {/* Main Header */}
      <div className="border-b bg-white dark:bg-deep-navy-900 shadow-sm">
        <Container>
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Logo />

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <SearchInput
                placeholder="Search furniture, home decor..."
                onSearch={(query) => console.log('Search:', query)}
              />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <IconButton
                icon={searchOpen ? X : Search}
                label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden"
              />

              {/* Desktop Search Icon */}
              <IconButton
                icon={Search}
                label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden lg:flex"
              />

              {/* Favorites */}
              <IconButton
                icon={Heart}
                label="Favorites"
                badge={0}
                className="hidden sm:flex"
              />

              {/* User Account */}
              <Link href="/login">
                <IconButton
                  icon={User}
                  label="Account"
                  className="hidden sm:flex"
                />
              </Link>

              {/* Shopping Cart */}
              <IconButton
                icon={ShoppingCart}
                label="Shopping cart"
                badge={0}
              />

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Admin Panel Access (Temporary) */}
              <a
                href="http://localhost:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex"
              >
                <IconButton
                  icon={Settings}
                  label="Admin Panel"
                  className="border-2 border-brand-gold dark:border-brand-gold/50"
                />
              </a>

              {/* Mobile Menu Toggle */}
              <IconButton
                icon={mobileMenuOpen ? X : Menu}
                label="Menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
              />
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="lg:hidden pb-4">
              <SearchInput
                placeholder="Search furniture..."
                onSearch={(query) => {
                  console.log('Search:', query);
                  setSearchOpen(false);
                }}
              />
            </div>
          )}
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

      {/* Category Menu */}
      <CategoryMenu />
    </header>
  );
}
