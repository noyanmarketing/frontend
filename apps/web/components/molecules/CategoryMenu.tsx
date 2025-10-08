'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { name: 'Living Room', href: '/shop?category=living-room', items: ['Sofas', 'Chairs', 'Tables', 'TV Units'] },
  { name: 'Bedroom', href: '/shop?category=bedroom', items: ['Beds', 'Wardrobes', 'Nightstands', 'Dressers'] },
  { name: 'Dining', href: '/shop?category=dining', items: ['Dining Tables', 'Dining Chairs', 'Buffets'] },
  { name: 'Office', href: '/shop?category=office', items: ['Desks', 'Office Chairs', 'Bookcases'] },
  { name: 'Outdoor', href: '/shop?category=outdoor', items: ['Patio Sets', 'Loungers', 'Outdoor Storage'] },
];

export function CategoryMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700 bg-white dark:bg-deep-navy-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 py-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative group"
              onMouseEnter={() => setActiveCategory(category.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={category.href}
                className="flex items-center gap-1 text-sm font-semibold text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-deep-navy dark:hover:text-white transition-colors py-2"
              >
                {category.name}
                <ChevronDown className="w-4 h-4" />
              </Link>

              {activeCategory === category.name && (
                <div className="absolute top-full left-0 mt-0 bg-white dark:bg-deep-navy-800 border border-neutral-gray-200 dark:border-neutral-gray-700 rounded-lg shadow-xl min-w-[200px] z-50">
                  <div className="py-2">
                    {category.items.map((item) => (
                      <Link
                        key={item}
                        href={`${category.href}&subcategory=${item.toLowerCase().replace(' ', '-')}`}
                        className="block px-4 py-2 text-sm text-neutral-gray-700 dark:text-neutral-gray-300 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700 hover:text-deep-navy dark:hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/shop"
            className="text-sm font-semibold text-brand-gold hover:text-brand-gold-600 transition-colors py-2"
          >
            View All
          </Link>
        </div>
      </div>
    </nav>
  );
}
