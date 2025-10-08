import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  showReviewLink?: boolean;
  onReviewClick?: () => void;
}

export function ProductRating({
  rating,
  reviewCount,
  showReviewLink = true,
  onReviewClick,
}: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-brand-gold text-brand-gold'
                : 'fill-neutral-gray-300 dark:fill-neutral-gray-700 text-neutral-gray-300 dark:text-neutral-gray-700'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-deep-navy dark:text-white">
        {rating.toFixed(1)}
      </span>
      {showReviewLink && (
        <button
          onClick={onReviewClick}
          className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-brand-gold transition-colors underline"
        >
          ({reviewCount} reviews)
        </button>
      )}
    </div>
  );
}
