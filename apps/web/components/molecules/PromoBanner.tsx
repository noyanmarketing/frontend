'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface PromoBannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
  variant?: 'gold' | 'gradient' | 'dark';
}

const variantStyles = {
  gold: 'bg-gradient-to-r from-brand-gold to-brand-gold/80 text-deep-navy',
  gradient: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white',
  dark: 'bg-gradient-to-r from-deep-navy to-deep-navy-800 text-white',
};

export function PromoBanner({
  title,
  description,
  ctaText,
  ctaLink,
  image,
  variant = 'gold',
}: PromoBannerProps) {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden p-8
        ${variantStyles[variant]}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
          {title}
        </h3>
        <p className="text-sm md:text-base mb-6 opacity-90">
          {description}
        </p>

        <Button
          asChild
          size="lg"
          className={`
            ${
              variant === 'gold'
                ? 'bg-deep-navy text-white hover:bg-deep-navy-800'
                : 'bg-white text-deep-navy hover:bg-neutral-gray-100'
            }
            font-bold
          `}
        >
          <Link href={ctaLink}>
            {ctaText}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Optional Image */}
      {image && (
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
    </div>
  );
}
