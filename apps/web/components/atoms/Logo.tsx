import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-heading text-2xl lg:text-3xl font-bold text-deep-navy dark:text-white hover:text-brand-gold dark:hover:text-brand-gold transition-colors ${className}`}
      aria-label="Noyan Home"
    >
      NOYAN
    </Link>
  );
}
