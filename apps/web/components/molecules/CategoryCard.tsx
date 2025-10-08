import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  icon: string;
  href: string;
  count?: number;
}

export function CategoryCard({ name, icon, href, count }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-neutral-gray-50 dark:bg-deep-navy-800 p-6 lg:p-8 rounded-2xl text-center hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-brand-gold overflow-hidden"
      aria-label={`Shop ${name} furniture`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-deep-navy/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="aspect-square mb-4 bg-white dark:bg-neutral-gray-700 rounded-2xl flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors">
          <span
            className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform"
            role="img"
            aria-label={name}
          >
            {icon}
          </span>
        </div>
        <h3 className="font-heading text-lg lg:text-xl font-bold text-deep-navy dark:text-white group-hover:text-brand-gold dark:group-hover:text-brand-gold transition-colors mb-1">
          {name}
        </h3>
        {count && (
          <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
            {count} Products
          </p>
        )}
      </div>
    </Link>
  );
}
