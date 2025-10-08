import { Shield, Truck, Sparkles, Clock } from 'lucide-react';

import { Container } from '../ui/container';

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'White glove delivery on orders over $500',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure and encrypted transactions',
  },
  {
    icon: Sparkles,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Expert customer service always available',
  },
];

export function TrustBadges() {
  return (
    <section
      className="py-16 lg:py-20 bg-white dark:bg-deep-navy-900"
      aria-label="Why choose Noyan Furniture"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-3xl bg-gradient-to-br from-brand-gold/20 via-brand-gold/10 to-transparent border-2 border-brand-gold/20 group-hover:scale-110 transition-transform shadow-lg">
                <badge.icon className="w-10 h-10 text-brand-gold" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2 text-deep-navy dark:text-white">
                {badge.title}
              </h3>
              <p className="text-neutral-gray-600 dark:text-neutral-gray-400 leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
