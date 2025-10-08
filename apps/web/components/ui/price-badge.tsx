import { cn } from '@/lib/utils';

interface PriceBadgeProps {
  price: number;
  currency: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PriceBadge({
  price,
  currency,
  size = 'md',
  className,
}: PriceBadgeProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return (
    <span
      className={cn(
        'font-bold text-gold-600 dark:text-gold-400',
        sizeClasses[size],
        className
      )}
    >
      {formatter.format(price)}
    </span>
  );
}
