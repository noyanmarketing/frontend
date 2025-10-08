import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';
import { Container } from '../ui/container';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips for Creating a Cozy Living Room',
    excerpt: 'Transform your living space into a warm and inviting retreat with these expert design tips.',
    image: '/placeholder-blog-1.jpg',
    date: 'Jan 15, 2025',
    readTime: '5 min',
    category: 'Interior Design',
    slug: 'cozy-living-room-tips',
  },
  {
    id: '2',
    title: 'Sustainable Furniture: A Complete Guide',
    excerpt: 'Learn how to choose eco-friendly furniture that is good for you and the planet.',
    image: '/placeholder-blog-2.jpg',
    date: 'Jan 12, 2025',
    readTime: '7 min',
    category: 'Sustainability',
    slug: 'sustainable-furniture-guide',
  },
  {
    id: '3',
    title: 'Modern vs. Contemporary: What is the Difference?',
    excerpt: 'Understand the key distinctions between these popular design styles.',
    image: '/placeholder-blog-3.jpg',
    date: 'Jan 10, 2025',
    readTime: '4 min',
    category: 'Style Guide',
    slug: 'modern-vs-contemporary',
  },
];

export function BlogSection() {
  return (
    <section className="py-16 lg:py-20 bg-neutral-gray-50 dark:bg-neutral-gray-900">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-navy dark:text-white mb-2">
              Design Inspiration
            </h2>
            <p className="text-lg text-neutral-gray-600 dark:text-neutral-gray-300">
              Tips, trends, and ideas for your perfect home
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden md:flex text-deep-navy dark:text-white hover:text-brand-gold"
          >
            <Link href="/blog" className="flex items-center gap-2">
              View All Posts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white dark:bg-deep-navy-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-gray-200 dark:bg-neutral-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-100 to-deep-navy-100 dark:from-deep-navy-800 dark:to-neutral-gray-800 flex items-center justify-center">
                  <span className="text-6xl opacity-30">📝</span>
                </div>
                <div className="absolute top-4 left-4 bg-white dark:bg-deep-navy-700 px-3 py-1 rounded-full">
                  <p className="text-xs font-semibold text-deep-navy dark:text-white">
                    {post.category}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-3 line-clamp-2 group-hover:text-brand-gold dark:group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutral-gray-600 dark:text-neutral-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-gray-500 dark:text-neutral-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/blog" className="flex items-center justify-center gap-2">
              View All Posts
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
