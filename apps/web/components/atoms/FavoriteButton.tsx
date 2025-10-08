'use client';

import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

import { apiClient } from '@/lib/api-client';

interface FavoriteButtonProps {
  productId: string;
  initialIsFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({
  productId,
  initialIsFavorite = false,
  onToggle,
  className = '',
  size = 'md',
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Check authentication status and favorite status on mount
  useEffect(() => {
    const checkAuthAndFavoriteStatus = async () => {
      try {
        await apiClient.me();
        setIsAuthenticated(true);

        // Check if product is already favorited
        try {
          const { is_favorite } = await apiClient.isFavorite(productId);
          setIsFavorite(is_favorite);
        } catch (error) {
          // If check fails, assume not favorited
          setIsFavorite(false);
        }
      } catch {
        setIsAuthenticated(false);
        setIsFavorite(false);
      } finally {
        setIsCheckingStatus(false);
      }
    };
    checkAuthAndFavoriteStatus();
  }, [productId]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login?redirect=/wishlist';
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isFavorite) {
        await apiClient.removeFromFavorites(productId);
        setIsFavorite(false);
        onToggle?.(false);
      } else {
        await apiClient.addToFavorites(productId);
        setIsFavorite(true);
        onToggle?.(true);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      // Revert on error
      setIsFavorite(!isFavorite);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking favorite status
  if (isCheckingStatus) {
    return (
      <button
        disabled
        className={`
          ${sizeClasses[size]}
          rounded-full bg-white/90 dark:bg-deep-navy-900/90 backdrop-blur-sm
          flex items-center justify-center
          opacity-50 cursor-not-allowed
          ${className}
        `}
      >
        <Heart className={`${iconSizes[size]} text-neutral-gray-400 animate-pulse`} />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        ${sizeClasses[size]}
        rounded-full bg-white/90 dark:bg-deep-navy-900/90 backdrop-blur-sm
        flex items-center justify-center
        transition-all duration-200 hover:scale-110
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isFavorite ? 'hover:bg-red-50 dark:hover:bg-red-900/20' : 'hover:bg-neutral-gray-100 dark:hover:bg-neutral-gray-800'}
        ${className}
      `}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`
          ${iconSizes[size]}
          transition-all duration-200
          ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-neutral-gray-600 dark:text-neutral-gray-400'}
          ${isLoading ? 'animate-pulse' : ''}
        `}
      />
    </button>
  );
}
