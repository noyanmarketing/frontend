interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={`
        animate-pulse bg-neutral-gray-200 dark:bg-neutral-gray-700
        ${variantClasses[variant]}
        ${className}
      `}
    />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-24" variant="text" />
          <Skeleton className="h-8 w-16" variant="text" />
        </div>
        <Skeleton className="w-12 h-12" variant="rectangular" />
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" variant="text" />
          <Skeleton className="h-4 w-24" variant="text" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-16 h-16" variant="rectangular" />
        <Skeleton className="w-16 h-16" variant="rectangular" />
        <Skeleton className="w-16 h-16" variant="rectangular" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" variant="text" />
          <Skeleton className="h-5 w-16" variant="text" />
        </div>
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 overflow-hidden">
      <Skeleton className="aspect-square w-full" variant="rectangular" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" variant="text" />
        <Skeleton className="h-5 w-1/2" variant="text" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function EnhancedOrderCardSkeleton() {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-32" variant="text" />
            <Skeleton className="h-4 w-24" variant="text" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Products */}
      <div className="p-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="flex items-center gap-3">
          <Skeleton className="w-20 h-20" variant="rectangular" />
          <Skeleton className="w-20 h-20" variant="rectangular" />
          <Skeleton className="w-20 h-20" variant="rectangular" />
        </div>
        <Skeleton className="h-4 w-full mt-3" variant="text" />
      </div>

      {/* Footer */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" variant="text" />
            <Skeleton className="h-6 w-16" variant="text" />
          </div>
          <Skeleton className="h-4 w-16" variant="text" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function AddressCardSkeleton() {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border-2 border-neutral-gray-200 dark:border-neutral-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="w-5 h-5" variant="rectangular" />
            <Skeleton className="h-5 w-24" variant="text" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-32" variant="text" />
      </div>

      {/* Address Details */}
      <div className="p-6 space-y-3">
        <div className="flex items-start gap-2">
          <Skeleton className="w-4 h-4 mt-0.5" variant="rectangular" />
          <Skeleton className="h-4 w-40" variant="text" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="w-4 h-4 mt-0.5" variant="rectangular" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-3/4" variant="text" />
            <Skeleton className="h-4 w-1/2" variant="text" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-0 flex gap-3">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border-2 border-neutral-gray-200 dark:border-neutral-gray-700 p-4 md:p-6">
      <div className="flex gap-4">
        {/* Checkbox */}
        <div className="flex items-start pt-2">
          <Skeleton className="w-5 h-5" variant="rectangular" />
        </div>

        {/* Product Image */}
        <Skeleton className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0" variant="rectangular" />

        {/* Product Info */}
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" variant="text" />
            <Skeleton className="h-4 w-1/2" variant="text" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-3 w-24" variant="text" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
            <div className="space-y-1">
              <Skeleton className="h-3 w-16" variant="text" />
              <Skeleton className="h-6 w-20" variant="text" />
            </div>
            <Skeleton className="h-10 w-28" variant="rectangular" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-12" variant="text" />
              <Skeleton className="h-6 w-24" variant="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WishlistCardSkeleton() {
  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-xl border border-neutral-gray-200 dark:border-neutral-gray-700 overflow-hidden">
      {/* Image */}
      <Skeleton className="aspect-square w-full" variant="rectangular" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" variant="text" />
        <Skeleton className="h-6 w-1/2" variant="text" />
        <Skeleton className="h-4 w-20" variant="text" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}
