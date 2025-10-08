import { CategoryCard } from '../molecules/CategoryCard';
import { Container } from '../ui/container';

const categories = [
  { name: 'Living Room', icon: '🛋️', href: '/shop?category=living-room', count: 150 },
  { name: 'Bedroom', icon: '🛏️', href: '/shop?category=bedroom', count: 120 },
  { name: 'Dining Room', icon: '🍽️', href: '/shop?category=dining', count: 85 },
  { name: 'Office', icon: '💼', href: '/shop?category=office', count: 95 },
  { name: 'Outdoor', icon: '🌿', href: '/shop?category=outdoor', count: 70 },
  { name: 'Kids Room', icon: '🧸', href: '/shop?category=kids', count: 60 },
  { name: 'Storage', icon: '📦', href: '/shop?category=storage', count: 80 },
  { name: 'Lighting', icon: '💡', href: '/shop?category=lighting', count: 110 },
];

export function CategoryGrid() {
  return (
    <section
      className="bg-white dark:bg-deep-navy-900 py-16 lg:py-20"
      aria-labelledby="categories-heading"
    >
      <Container>
        <div className="text-center mb-12 space-y-4">
          <h2
            id="categories-heading"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-deep-navy dark:text-white"
          >
            Shop by Category
          </h2>
          <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-300 max-w-2xl mx-auto">
            Find the perfect furniture for every space in your home
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              icon={category.icon}
              href={category.href}
              count={category.count}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
