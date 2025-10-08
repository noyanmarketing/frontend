'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Button } from '../ui/button';
import { Container } from '../ui/container';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image?: string;
  badge?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: 'New Collection 2025',
    title: 'Timeless Furniture',
    subtitle: 'for Modern Living',
    description: 'Discover handcrafted pieces that blend elegance with comfort. Transform your space with furniture designed to last a lifetime.',
    ctaText: 'Shop Collection',
    ctaLink: '/shop',
    secondaryCtaText: 'Explore Categories',
    secondaryCtaLink: '/collections',
  },
  {
    id: 2,
    badge: 'Limited Time Offer',
    title: 'Summer Sale',
    subtitle: 'Up to 40% Off',
    description: 'Refresh your home with premium furniture at unbeatable prices. Limited stock available on selected items.',
    ctaText: 'Shop Sale',
    ctaLink: '/shop?sale=true',
    secondaryCtaText: 'View All Deals',
    secondaryCtaLink: '/deals',
  },
  {
    id: 3,
    badge: 'Designer Collection',
    title: 'Luxury Interiors',
    subtitle: 'Curated by Experts',
    description: 'Exclusive designer pieces handpicked for discerning homeowners. Elevate your space with sophistication.',
    ctaText: 'Explore Luxury',
    ctaLink: '/collections/luxury',
    secondaryCtaText: 'Book Consultation',
    secondaryCtaLink: '/consultation',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative bg-gradient-to-br from-neutral-gray-50 via-white to-neutral-gray-100 dark:from-deep-navy-900 dark:via-deep-navy-800 dark:to-neutral-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#FFD700_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_#1A237E_0%,_transparent_50%)]" />
      </div>

      <Container>
        <div className="relative">
          {/* Slide Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24 min-h-[600px]">
            {/* Left Content */}
            <div className="space-y-8 z-10" key={slide.id}>
              {/* Badge */}
              {slide.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-sm animate-fade-in">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                  <p className="text-sm font-semibold text-deep-navy dark:text-brand-gold">
                    {slide.badge}
                  </p>
                </div>
              )}

              {/* Heading */}
              <div className="space-y-4 animate-slide-up">
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-deep-navy dark:text-white leading-[1.1]">
                  {slide.title}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-600 to-brand-gold-400">
                    {slide.subtitle}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-gray-600 dark:text-neutral-gray-300 max-w-xl leading-relaxed">
                  {slide.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="text-lg bg-deep-navy hover:bg-deep-navy-800 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 group"
                >
                  <Link href={slide.ctaLink} className="flex items-center gap-2">
                    {slide.ctaText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                {slide.secondaryCtaText && slide.secondaryCtaLink && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-lg border-2 border-deep-navy dark:border-white text-deep-navy dark:text-white hover:bg-deep-navy hover:text-white dark:hover:bg-white dark:hover:text-deep-navy transition-all"
                  >
                    <Link href={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
                  </Button>
                )}
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
                      <div className="text-9xl opacity-20">
                        {currentSlide === 0 ? '🛋️' : currentSlide === 1 ? '🏷️' : '✨'}
                      </div>
                      <p className="text-neutral-gray-500 dark:text-neutral-gray-400 font-medium text-lg">
                        Featured Product Preview
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Badge */}
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

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-0 z-20">
            <button
              onClick={prevSlide}
              className="bg-white/90 dark:bg-deep-navy-800/90 hover:bg-white dark:hover:bg-deep-navy-700 p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-deep-navy dark:text-white" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-0 z-20">
            <button
              onClick={nextSlide}
              className="bg-white/90 dark:bg-deep-navy-800/90 hover:bg-white dark:hover:bg-deep-navy-700 p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-deep-navy dark:text-white" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-brand-gold'
                    : 'w-2 bg-neutral-gray-400 hover:bg-neutral-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
