'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Anasayfa" },
    { href: "/about", label: "Hakkında" },
    { href: "/products", label: "Ürünler" },
    { href: "/contact", label: "İletişim" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-deep-navy-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-heading text-2xl font-bold text-deep-navy dark:text-white">
          Noyan<span className="text-brand-gold"> Marketing</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-neutral-gray-700 dark:text-neutral-gray-300">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors duration-200 hover:text-brand-gold ${
                  pathname === link.href
                    ? "text-brand-gold font-semibold"
                    : "text-inherit"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search (placeholder) */}
        <div className="hidden md:block w-40 h-8 bg-gray-100 dark:bg-deep-navy-800 rounded-full" />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-navy-800 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-deep-navy-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block text-lg transition-colors ${
                pathname === link.href
                  ? "text-brand-gold font-semibold"
                  : "text-neutral-gray-700 dark:text-neutral-gray-300 hover:text-brand-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
