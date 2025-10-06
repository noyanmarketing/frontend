"use client";

import Link from "next/link";
import { ShoppingCart, User, ChevronDown } from "lucide-react";
import { useState } from "react";

// Şimdilik statik veri, API hazır olduğunda burası değişecek
const categories = [
  {
    id: 1,
    name: "Oturma Odası",
    subcategories: [
      { id: 11, name: "Koltuklar" },
      { id: 12, name: "Kanepeler" },
      { id: 13, name: "Sehpalar" },
      { id: 14, name: "TV Üniteleri" },
    ]
  },
  {
    id: 2,
    name: "Yatak Odası",
    subcategories: [
      { id: 21, name: "Yataklar" },
      { id: 22, name: "Şifonyer" },
      { id: 23, name: "Gardıroplar" },
      { id: 24, name: "Komodinler" },
    ]
  },
  {
    id: 3,
    name: "Yemek Odası",
    subcategories: [
      { id: 31, name: "Yemek Masaları" },
      { id: 32, name: "Sandalyeler" },
      { id: 33, name: "Vitrinler" },
      { id: 34, name: "Bufeler" },
    ]
  }
];

export default function Navbar() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Sol */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Noyan Marketing
            </Link>
          </div>

          {/* Search - Orta */}
          <div className="flex-1 max-w-md mx-4">
            <input
              type="search"
              className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ara..."
            />
          </div>

          {/* Actions - Sağ */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/login"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              <User size={20} />
              <span className="hidden sm:inline">Giriş Yap</span>
            </Link>

            <Link
              href="/register"
              className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium hidden sm:inline"
            >
              Kayıt Ol
            </Link>

            <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-8 py-4 relative">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  {category.name}
                  <ChevronDown size={16} className={`transition-transform ${activeCategory === category.id ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {activeCategory === category.id && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] py-2 z-50">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${category.id}/${sub.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

// API hazır olduğunda şöyle kullanılacak:
/*
async function getCategories() {
  const res = await fetch('https://your-api.com/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

// Server Component olarak kullanım:
export default async function Navbar() {
  const categories = await getCategories();
  
  // Client Component'e aktarma
  return <NavbarClient categories={categories} />;
}

// Veya direkt Client Component'te fetch:
useEffect(() => {
  fetch('https://your-api.com/categories')
    .then(res => res.json())
    .then(data => setCategories(data));
}, []);
*/