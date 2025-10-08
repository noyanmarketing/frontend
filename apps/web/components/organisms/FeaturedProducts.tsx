'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { ProductCard } from '../molecules/ProductCard';
import { Button } from '../ui/button';
import { Container } from '../ui/container';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  badge?: string;
  discount?: number;
}

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  badge?: string;
}

export function FeaturedProducts({
  title,
  subtitle,
  products,
  viewAllLink,
  badge,
}: FeaturedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-neutral-gray-50 dark:bg-neutral-gray-900">
      <Container>
        <div className="flex items-end justify-between mb-8">
          <div>
            {badge && (
              <span className="inline-block px-3 py-1 bg-brand-gold/20 text-brand-gold text-xs font-bold rounded-full mb-2">
                {badge}
              </span>
            )}
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy dark:text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-300 mt-2">
                {subtitle}
              </p>
            )}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-neutral-gray-300 dark:border-neutral-gray-700 hover:bg-neutral-gray-200 dark:hover:bg-neutral-gray-800 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-neutral-gray-300 dark:border-neutral-gray-700 hover:bg-neutral-gray-200 dark:hover:bg-neutral-gray-800 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-none w-[280px] md:w-[320px] snap-start">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {viewAllLink && (
          <div className="mt-8 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-deep-navy dark:border-white text-deep-navy dark:text-white hover:bg-deep-navy hover:text-white dark:hover:bg-white dark:hover:text-deep-navy"
            >
              <Link href={viewAllLink} className="flex items-center gap-2">
                View All
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
