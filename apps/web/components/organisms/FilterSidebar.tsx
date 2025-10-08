'use client';

import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';

import { PriceRangeFilter } from '../molecules/PriceRangeFilter';

export interface FilterState {
  categories: string[];
  priceRange: { min: number; max: number };
  colors?: string[];
  materials?: string[];
  brands?: string[];
  inStock?: boolean;
  onSale?: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearAll: () => void;
  availableCategories?: string[];
  availableColors?: string[];
  availableMaterials?: string[];
  availableBrands?: string[];
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearAll,
  availableCategories = ['lamp', 'chair', 'table', 'desk', 'shelf', 'bed', 'cabinet', 'sofa'],
  availableColors = ['natural', 'light', 'medium', 'dark'],
  availableMaterials = ['oak', 'walnut', 'cherry', 'maple', 'mahogany', 'bamboo', 'pine'],
  availableBrands = ['oak', 'walnut', 'cherry', 'maple', 'mahogany'],
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'categories',
    'price',
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ categories: newCategories });
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors?.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...(filters.colors || []), color];
    onFilterChange({ colors: newColors });
  };

  const toggleMaterial = (material: string) => {
    const newMaterials = filters.materials?.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...(filters.materials || []), material];
    onFilterChange({ materials: newMaterials });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands?.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...(filters.brands || []), brand];
    onFilterChange({ brands: newBrands });
  };

  const activeFiltersCount =
    filters.categories.length +
    (filters.colors?.length || 0) +
    (filters.materials?.length || 0) +
    (filters.brands?.length || 0) +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0);

  return (
    <div className="bg-white dark:bg-deep-navy-800 rounded-2xl border-2 border-neutral-gray-200 dark:border-neutral-gray-700 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-bold text-deep-navy dark:text-white">
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-brand-gold text-deep-navy rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-neutral-gray-600 dark:text-neutral-gray-400 hover:text-deep-navy dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div className="border-b border-neutral-gray-200 dark:border-neutral-gray-700 pb-6">
          <button
            onClick={() => toggleSection('categories')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="font-semibold text-deep-navy dark:text-white">
              Categories
            </h3>
            {expandedSections.includes('categories') ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.includes('categories') && (
            <div className="space-y-2">
              {availableCategories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-brand-gold"
                  />
                  <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 group-hover:text-deep-navy dark:group-hover:text-white capitalize">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border-b border-neutral-gray-200 dark:border-neutral-gray-700 pb-6">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="font-semibold text-deep-navy dark:text-white">
              Price Range
            </h3>
            {expandedSections.includes('price') ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.includes('price') && (
            <PriceRangeFilter
              min={0}
              max={5000}
              currentMin={filters.priceRange.min}
              currentMax={filters.priceRange.max}
              onApply={(min, max) => onFilterChange({ priceRange: { min, max } })}
            />
          )}
        </div>

        {/* Colors */}
        <div className="border-b border-neutral-gray-200 dark:border-neutral-gray-700 pb-6">
          <button
            onClick={() => toggleSection('colors')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="font-semibold text-deep-navy dark:text-white">
              Colors
            </h3>
            {expandedSections.includes('colors') ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.includes('colors') && (
            <div className="space-y-2">
              {availableColors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.colors?.includes(color)}
                    onChange={() => toggleColor(color)}
                    className="w-4 h-4 rounded border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-brand-gold"
                  />
                  <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 group-hover:text-deep-navy dark:group-hover:text-white">
                    {color}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Materials */}
        <div className="border-b border-neutral-gray-200 dark:border-neutral-gray-700 pb-6">
          <button
            onClick={() => toggleSection('materials')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="font-semibold text-deep-navy dark:text-white">
              Materials
            </h3>
            {expandedSections.includes('materials') ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.includes('materials') && (
            <div className="space-y-2">
              {availableMaterials.map((material) => (
                <label
                  key={material}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.materials?.includes(material)}
                    onChange={() => toggleMaterial(material)}
                    className="w-4 h-4 rounded border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-brand-gold"
                  />
                  <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 group-hover:text-deep-navy dark:group-hover:text-white">
                    {material}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brands */}
        <div className="border-b border-neutral-gray-200 dark:border-neutral-gray-700 pb-6">
          <button
            onClick={() => toggleSection('brands')}
            className="w-full flex items-center justify-between mb-4"
          >
            <h3 className="font-semibold text-deep-navy dark:text-white">
              Brands
            </h3>
            {expandedSections.includes('brands') ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSections.includes('brands') && (
            <div className="space-y-2">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands?.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-brand-gold"
                  />
                  <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 group-hover:text-deep-navy dark:group-hover:text-white">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-semibold text-deep-navy dark:text-white mb-4">
            Availability
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => onFilterChange({ inStock: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 group-hover:text-deep-navy dark:group-hover:text-white">
                In Stock Only
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.onSale}
                onChange={(e) => onFilterChange({ onSale: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-gray-300 dark:border-neutral-gray-600 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-sm text-neutral-gray-700 dark:text-neutral-gray-300 group-hover:text-deep-navy dark:group-hover:text-white">
                On Sale
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
