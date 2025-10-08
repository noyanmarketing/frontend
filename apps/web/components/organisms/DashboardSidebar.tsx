'use client';

import {
  Heart,
  LogOut,
  MapPin,
  MessageSquare,
  Package,
  Star,
  Ticket,
  UndoIcon,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { apiClient } from '@/lib/api-client';

interface DashboardSidebarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const menuItems = [
  {
    label: 'My Account Information',
    href: '/account',
    icon: User,
  },
  {
    label: 'My Orders',
    href: '/account/orders',
    icon: Package,
  },
  {
    label: 'My Addresses',
    href: '/account/addresses',
    icon: MapPin,
  },
  {
    label: 'My Favorites',
    href: '/account/favorites',
    icon: Heart,
  },
  {
    label: 'My Reviews',
    href: '/account/reviews',
    icon: Star,
  },
  {
    label: 'My Coupons',
    href: '/account/coupons',
    icon: Ticket,
  },
  {
    label: 'Return Requests',
    href: '/account/returns',
    icon: UndoIcon,
  },
  {
    label: 'Support Tickets',
    href: '/account/support',
    icon: MessageSquare,
  },
];

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await apiClient.logout();
      // Force a hard navigation to clear all state
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to login
      window.location.href = '/login';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="bg-white dark:bg-deep-navy-800 rounded-2xl border border-neutral-gray-200 dark:border-neutral-gray-700 overflow-hidden">
      {/* User Profile Section */}
      <div className="p-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold/70 flex items-center justify-center">
                <span className="text-xl font-bold text-deep-navy">
                  {user?.name ? getInitials(user.name) : 'U'}
                </span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-deep-navy-800 rounded-full" />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-deep-navy dark:text-white truncate">
              {user?.name || 'Guest User'}
            </h3>
            <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 truncate">
              {user?.email || 'guest@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? 'bg-brand-gold text-deep-navy font-semibold'
                        : 'text-neutral-gray-700 dark:text-neutral-gray-300 hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-700'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}

          {/* Logout */}
          <li className="pt-4 mt-4 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoggingOut ? (
                <div className="w-5 h-5 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
              ) : (
                <LogOut className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm font-semibold">
                {isLoggingOut ? 'Logging Out...' : 'Log Out'}
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
