import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://noyan.com';
const SITE_NAME = 'Noyan';

interface ImageProps {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  images?: ImageProps[];
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateSEO({
  title,
  description = 'Discover premium products at Noyan. Shop luxury watches, designer bags, smart electronics and more.',
  image,
  images,
  url = SITE_URL,
  type = 'website',
  keywords,
  author,
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  // Use provided images or fallback to single image or default
  const ogImages = images
    ? images.map((img) => ({
        url: img.url.startsWith('http') ? img.url : `${SITE_URL}${img.url}`,
        alt: img.alt || title,
        width: img.width || 1200,
        height: img.height || 630,
      }))
    : [
        {
          url: image?.startsWith('http')
            ? image
            : `${SITE_URL}${image || '/og-image.jpg'}`,
          alt: title,
          width: 1200,
          height: 630,
        },
      ];

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords?.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: author,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: type === 'product' ? 'website' : type,
      url,
      title,
      description,
      images: ogImages,
      siteName: SITE_NAME,
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@noyan',
      creator: '@noyan',
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}
