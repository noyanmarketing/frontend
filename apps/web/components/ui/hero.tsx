import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from './button';
import { Container } from './container';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-neutral-gray-50 via-white to-neutral-gray-100 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-neutral-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#FFD700_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_#1A237E_0%,_transparent_50%)]" />
      </div>

      <Container>
        <div className="relative grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24 min-h-[600px]">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <p className="text-sm font-semibold text-deep-navy dark:text-brand-gold">
                New Collection 2025
              </p>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-deep-navy dark:text-white leading-[1.1]">
                Timeless{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-600 to-brand-gold-400">
                  Furniture
                </span>
                <br />
                for Modern Living
              </h1>
              <p className="text-lg md:text-xl text-neutral-gray-600 dark:text-neutral-gray-300 max-w-xl leading-relaxed">
                Discover handcrafted pieces that blend elegance with comfort. Transform your space
                with furniture designed to last a lifetime.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="text-lg bg-deep-navy hover:bg-deep-navy-800 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 group"
              >
                <Link href="/search" className="flex items-center gap-2">
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg border-2 border-deep-navy dark:border-white text-deep-navy dark:text-white hover:bg-deep-navy hover:text-white dark:hover:bg-white dark:hover:text-deep-navy transition-all"
              >
                <Link href="/c/featured">Explore Categories</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-deep-navy dark:text-brand-gold font-heading">
                  500+
                </p>
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mt-1">
                  Premium Products
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-deep-navy dark:text-brand-gold font-heading">
                  50k+
                </p>
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mt-1">
                  Happy Customers
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-deep-navy dark:text-brand-gold font-heading">
                  5 Year
                </p>
                <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mt-1">
                  Warranty
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder with elegant pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-100 via-neutral-gray-50 to-deep-navy-100 dark:from-deep-navy-800 dark:via-neutral-gray-800 dark:to-deep-navy-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="text-9xl opacity-20">🛋️</div>
                    <p className="text-neutral-gray-500 dark:text-neutral-gray-400 font-medium text-lg">
                      Featured Product Preview
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-6 right-6 bg-brand-gold text-deep-navy px-6 py-3 rounded-full shadow-lg">
                <p className="font-bold text-sm">
                  UP TO <span className="text-xl">40%</span> OFF
                </p>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-deep-navy-800 p-6 rounded-2xl shadow-2xl border border-neutral-gray-200 dark:border-neutral-gray-700 max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <div>
                  <p className="font-semibold text-deep-navy dark:text-white">Free Shipping</p>
                  <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                    On orders over $500
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
