import { redirect } from 'next/navigation';

export default function CategoryRedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  // Map old category slugs to shop page with category filter
  const categoryMap: Record<string, string> = {
    'living-room': 'Living Room',
    'bedroom': 'Bedroom',
    'dining-room': 'Dining Room',
    'office': 'Office',
    'featured': 'Featured',
  };

  const category = categoryMap[params.slug] || params.slug.replace(/-/g, ' ');

  // Redirect to shop page with category filter
  redirect(`/shop?category=${encodeURIComponent(category)}`);
}
