import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '../atoms/Logo';
import { Container } from '../ui/container';

const footerLinks = {
  shop: [
    { label: 'Living Room', href: '/shop?category=living-room' },
    { label: 'Bedroom', href: '/shop?category=bedroom' },
    { label: 'Dining Room', href: '/shop?category=dining' },
    { label: 'Office', href: '/shop?category=office' },
    { label: 'Outdoor', href: '/shop?category=outdoor' },
    { label: 'All Products', href: '/shop' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/story' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  customerService: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping & Delivery', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Warranty', href: '/warranty' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Track Order', href: '/track-order' },
  ],
  resources: [
    { label: 'Design Services', href: '/design-services' },
    { label: 'Visit Showroom', href: '/showroom' },
    { label: 'Blog', href: '/blog' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: 'Trade Program', href: '/trade' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
];

const paymentMethods = ['💳 Visa', '💳 Mastercard', '💳 Amex', '💰 PayPal', '🍎 Apple Pay', '📱 Google Pay'];

export function EnhancedFooter() {
  return (
    <footer className="bg-neutral-gray-50 dark:bg-deep-navy-900 border-t border-neutral-gray-200 dark:border-neutral-gray-800 mt-auto">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Logo className="mb-4" />
              <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 leading-relaxed mb-6">
                Transforming spaces with timeless furniture designs. Handcrafted quality for modern living.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>123 Design Street, New York, NY 10001</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>1-800-NOYAN-01</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-gray-600 dark:text-neutral-gray-400">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>hello@noyan.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white dark:bg-deep-navy-800 border border-neutral-gray-300 dark:border-neutral-gray-700 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-neutral-gray-600 dark:text-neutral-gray-400 group-hover:text-deep-navy" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-heading font-semibold text-base mb-4 text-deep-navy dark:text-white">
                Shop
              </h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-heading font-semibold text-base mb-4 text-deep-navy dark:text-white">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service Links */}
            <div>
              <h4 className="font-heading font-semibold text-base mb-4 text-deep-navy dark:text-white">
                Customer Service
              </h4>
              <ul className="space-y-3">
                {footerLinks.customerService.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-heading font-semibold text-base mb-4 text-deep-navy dark:text-white">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-gray-200 dark:border-neutral-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Noyan Furniture. All rights reserved. |{' '}
              <Link href="/privacy" className="hover:text-deep-navy dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>{' '}
              |{' '}
              <Link href="/terms" className="hover:text-deep-navy dark:hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-neutral-gray-500 dark:text-neutral-gray-500 mr-2">
                We Accept:
              </span>
              {paymentMethods.map((method, index) => (
                <span
                  key={index}
                  className="text-xl"
                  role="img"
                  aria-label={method}
                >
                  {method.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
