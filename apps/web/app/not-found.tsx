import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center">
        <Container>
          <div className="text-center py-20">
            <div className="mb-8">
              <h1 className="font-heading text-8xl md:text-9xl font-bold text-primary mb-4">
                404
              </h1>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
              It might have been moved or deleted.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">
                  <span className="mr-2">🏠</span>
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/search">
                  <span className="mr-2">🔍</span>
                  Search Products
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t max-w-md mx-auto">
              <h3 className="font-semibold mb-4">Popular Pages</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/c/electronics"
                    className="text-primary hover:underline"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/c/fashion"
                    className="text-primary hover:underline"
                  >
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/c/home-living"
                    className="text-primary hover:underline"
                  >
                    Home & Living
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
