'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchInputProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  onSearch,
  placeholder = 'Search for furniture...',
  className = ''
}: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-gray-300 dark:border-neutral-gray-700 bg-white dark:bg-neutral-gray-800 text-deep-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-gray-400" />
    </form>
  );
}
