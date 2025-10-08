import Link from 'next/link';

import { Container } from './container';

export function Footer() {
  return (
    <footer className="border-t mt-auto bg-muted/30 dark:bg-muted/10">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-heading font-bold text-2xl mb-4 text-foreground">
              Noyan Furniture
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Transforming spaces with timeless furniture designs. Handcrafted quality for modern living.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Pinterest">
                📌
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                👤
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/c/living-room" className="text-muted-foreground hover:text-primary transition-colors">
                  Living Room
                </Link>
              </li>
              <li>
                <Link href="/c/bedroom" className="text-muted-foreground hover:text-primary transition-colors">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link href="/c/dining-room" className="text-muted-foreground hover:text-primary transition-colors">
                  Dining Room
                </Link>
              </li>
              <li>
                <Link href="/c/office" className="text-muted-foreground hover:text-primary transition-colors">
                  Office
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-muted-foreground hover:text-primary transition-colors">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Information</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/showroom" className="text-muted-foreground hover:text-primary transition-colors">
                  Visit Showroom
                </Link>
              </li>
              <li>
                <Link href="/design-services" className="text-muted-foreground hover:text-primary transition-colors">
                  Design Services
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Noyan Furniture. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Handcrafted with care • Made to last a lifetime
          </p>
        </div>
      </Container>
    </footer>
  );
}
