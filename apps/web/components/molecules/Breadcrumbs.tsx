import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`${className}`}>
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            href="/"
            className="flex items-center text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-neutral-gray-400" />
              {isLast ? (
                <span className="font-semibold text-deep-navy dark:text-white">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
