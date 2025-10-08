import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';
import { Container } from '../ui/container';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  image?: string;
  backgroundColor: string;
  textColor: string;
}

const banners: Banner[] = [
  {
    id: '1',
    title: 'Modern Living Collection',
    subtitle: 'Minimalist designs for contemporary homes',
    link: '/collections/modern-living',
    backgroundColor: 'bg-gradient-to-br from-deep-navy-800 to-deep-navy-900',
    textColor: 'text-white',
  },
  {
    id: '2',
    title: 'Outdoor Paradise',
    subtitle: 'Create your dream outdoor space',
    link: '/collections/outdoor',
    backgroundColor: 'bg-gradient-to-br from-brand-gold-100 to-brand-gold-200',
    textColor: 'text-deep-navy',
  },
  {
    id: '3',
    title: 'Home Office Essentials',
    subtitle: 'Productivity meets comfort',
    link: '/collections/office',
    backgroundColor: 'bg-gradient-to-br from-neutral-gray-800 to-neutral-gray-900',
    textColor: 'text-white',
  },
];

export function CampaignBanners() {
  return (
    <section className="py-16 lg:py-20 bg-white dark:bg-deep-navy-900">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className={`group relative ${banner.backgroundColor} ${banner.textColor} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 min-h-[320px] flex items-end p-8`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.3)_0%,_transparent_70%)]" />
              </div>

              {/* Content */}
              <div className="relative z-10 w-full">
                <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-2">
                  {banner.title}
                </h3>
                <p className="text-sm lg:text-base mb-4 opacity-90">
                  {banner.subtitle}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${banner.textColor} hover:bg-white/20 group-hover:translate-x-1 transition-transform`}
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-6 right-6 text-6xl opacity-20 group-hover:scale-110 transition-transform">
                {banner.id === '1' ? '🛋️' : banner.id === '2' ? '🌿' : '💼'}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
