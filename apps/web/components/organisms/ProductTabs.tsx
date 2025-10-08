'use client';

import { useState } from 'react';

import { ProductRating } from '../molecules/ProductRating';

interface Review {
  rating: number;
  author: string;
  date: string;
  comment: string;
}

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
  reviews?: Review[];
  shipping?: string;
  returns?: string;
}

export function ProductTabs({
  description,
  specifications,
  reviews = [],
  shipping = 'Free shipping on orders over $500. Standard delivery: 5-7 business days.',
  returns = '30-day return policy. Items must be in original condition.',
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: `Reviews (${reviews.length})` },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];

  return (
    <div className="border-t border-neutral-gray-200 dark:border-neutral-gray-700 pt-12">
      {/* Tab Navigation */}
      <div className="border-b border-neutral-gray-200 dark:border-neutral-gray-700">
        <div className="flex gap-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === 'description' && (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-neutral-gray-700 dark:text-neutral-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(specifications).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-3 px-4 bg-neutral-gray-50 dark:bg-neutral-gray-800 rounded-lg"
              >
                <span className="font-semibold text-deep-navy dark:text-white capitalize">
                  {key.replace(/_/g, ' ')}:
                </span>
                <span className="text-neutral-gray-600 dark:text-neutral-gray-400">
                  {typeof value === 'object' ? JSON.stringify(value) : value}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-gray-500 dark:text-neutral-gray-400 mb-4">
                  No reviews yet. Be the first to review this product!
                </p>
                <button className="px-6 py-2 bg-deep-navy hover:bg-deep-navy-800 text-white rounded-lg font-semibold transition-colors">
                  Write a Review
                </button>
              </div>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-neutral-gray-200 dark:border-neutral-gray-700 pb-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <ProductRating
                        rating={review.rating}
                        reviewCount={0}
                        showReviewLink={false}
                      />
                      <p className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 mt-1">
                        {review.author} • {review.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-gray-700 dark:text-neutral-gray-300">
                    {review.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-3">
                Shipping Information
              </h3>
              <p className="text-neutral-gray-700 dark:text-neutral-gray-300">
                {shipping}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-deep-navy dark:text-white mb-3">
                Returns & Exchanges
              </h3>
              <p className="text-neutral-gray-700 dark:text-neutral-gray-300">
                {returns}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
