import { LucideIcon } from 'lucide-react';

import { Button } from '../ui/button';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  badge?: number;
  className?: string;
}

export function IconButton({ icon: Icon, label, onClick, badge, className = '' }: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800 relative ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-neutral-gray-700 dark:text-neutral-gray-300" />
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-gold text-deep-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Button>
  );
}
