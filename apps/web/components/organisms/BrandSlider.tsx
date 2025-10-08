'use client';

import { useEffect, useRef } from 'react';

import { Container } from '../ui/container';

const brands = [
  { name: 'Herman Miller', logo: '🪑' },
  { name: 'West Elm', logo: '🏠' },
  { name: 'CB2', logo: '✨' },
  { name: 'Article', logo: '🛋️' },
  { name: 'Floyd', logo: '📐' },
  { name: 'Burrow', logo: '🏗️' },
  { name: 'Joybird', logo: '🎨' },
  { name: 'Interior Define', logo: '🖼️' },
];

export function BrandSlider() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Duplicate brands for infinite scroll
    const scrollerInner = scroller.querySelector('.scroller-inner');
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerInner.appendChild(duplicatedItem);
    });
  }, []);

  return (
    <section className="py-16 lg:py-20 bg-neutral-gray-50 dark:bg-neutral-gray-900 border-y border-neutral-gray-200 dark:border-neutral-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-deep-navy dark:text-white mb-2">
            Featured Brands & Designers
          </h2>
          <p className="text-neutral-gray-600 dark:text-neutral-gray-300">
            Partnering with the world&apos;s leading furniture designers
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div ref={scrollerRef} className="scroller overflow-hidden">
          <div className="scroller-inner flex gap-12 animate-scroll">
            {brands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center w-40 h-32 bg-white dark:bg-deep-navy-800 rounded-2xl border border-neutral-gray-200 dark:border-neutral-gray-700 hover:border-brand-gold hover:shadow-lg transition-all cursor-pointer"
              >
                <span className="text-4xl mb-2" role="img" aria-label={brand.name}>
                  {brand.logo}
                </span>
                <p className="font-semibold text-sm text-deep-navy dark:text-white">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .scroller:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
