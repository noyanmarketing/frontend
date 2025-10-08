# Component Architecture Map

## Visual Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                          HOMEPAGE                                │
│                     (page-client-new.tsx)                        │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
  ┌─────────┐          ┌──────────┐           ┌──────────┐
  │  ATOMS  │          │MOLECULES │           │ORGANISMS │
  └─────────┘          └──────────┘           └──────────┘

```

## Detailed Component Tree

```
HomePage
│
├── EnhancedHeader (Organism)
│   ├── DiscountBanner (UI Component)
│   ├── Container (UI Component)
│   ├── Logo (Atom)
│   ├── SearchInput (Atom)
│   ├── IconButton (Atom) × 5
│   │   ├── Search
│   │   ├── Heart (Favorites)
│   │   ├── User
│   │   ├── ShoppingCart
│   │   └── Menu
│   ├── ThemeToggle (UI Component)
│   └── CategoryMenu (Molecule)
│       └── [Dropdown with categories & subcategories]
│
├── Main Content
│   │
│   ├── HeroBanner (Organism)
│   │   ├── Container
│   │   ├── Slide Content × 3
│   │   │   ├── Badge
│   │   │   ├── Title
│   │   │   ├── Subtitle
│   │   │   ├── Description
│   │   │   ├── Button (CTA) × 2
│   │   │   └── Trust Indicators × 3
│   │   ├── Navigation Arrows (prev/next)
│   │   └── Dot Indicators × 3
│   │
│   ├── CategoryGrid (Organism)
│   │   ├── Container
│   │   ├── Section Header
│   │   └── CategoryCard (Molecule) × 8
│   │       ├── Icon (emoji)
│   │       ├── Name
│   │       └── Product Count
│   │
│   ├── FeaturedProducts: Best Sellers (Organism)
│   │   ├── Container
│   │   ├── Section Header with Badge
│   │   ├── Navigation Arrows
│   │   ├── Horizontal Scroll Container
│   │   │   └── ProductCard (Molecule) × 8
│   │   │       ├── Image (Next.js Image)
│   │   │       ├── Badge (optional)
│   │   │       ├── Discount Badge (optional)
│   │   │       ├── Favorite Button (Heart)
│   │   │       ├── Title
│   │   │       ├── Price
│   │   │       └── Original Price (strikethrough)
│   │   └── View All Button
│   │
│   ├── CampaignBanners (Organism)
│   │   ├── Container
│   │   └── Banner × 3
│   │       ├── Gradient Background
│   │       ├── Title
│   │       ├── Subtitle
│   │       ├── CTA Button
│   │       └── Decorative Icon
│   │
│   ├── FeaturedProducts: New Arrivals (Organism)
│   │   └── [Same structure as Best Sellers]
│   │
│   ├── FeaturedProducts: Home Decoration (Organism)
│   │   └── [Same structure as Best Sellers]
│   │
│   ├── TrustBadges (Organism)
│   │   ├── Container
│   │   └── Badge × 4
│   │       ├── Icon (Lucide)
│   │       ├── Title
│   │       └── Description
│   │
│   ├── FeaturedProducts: Designer Collection (Organism)
│   │   └── [Same structure as Best Sellers]
│   │
│   ├── BrandSlider (Organism)
│   │   ├── Container
│   │   ├── Section Header
│   │   └── Infinite Scroll Container
│   │       └── Brand Card × 8 (duplicated)
│   │           ├── Logo (emoji)
│   │           └── Name
│   │
│   ├── FeaturedProducts: Storage & Organization (Organism)
│   │   └── [Same structure as Best Sellers]
│   │
│   ├── BlogSection (Organism)
│   │   ├── Container
│   │   ├── Section Header
│   │   ├── Blog Post Card × 3
│   │   │   ├── Image Placeholder
│   │   │   ├── Category Badge
│   │   │   ├── Title
│   │   │   ├── Excerpt
│   │   │   ├── Date
│   │   │   └── Read Time
│   │   └── View All Button
│   │
│   └── Newsletter (Organism)
│       ├── Container
│       ├── Icon (Mail)
│       ├── Heading
│       ├── Description
│       ├── Form
│       │   ├── Email Input
│       │   └── Subscribe Button
│       ├── Status Messages
│       └── Privacy Note
│
└── EnhancedFooter (Organism)
    ├── Container
    ├── Main Footer Content
    │   ├── Brand Column
    │   │   ├── Logo (Atom)
    │   │   ├── Description
    │   │   ├── Contact Info × 3
    │   │   │   ├── Address (MapPin)
    │   │   │   ├── Phone
    │   │   │   └── Email
    │   │   └── Social Links × 4
    │   │       ├── Instagram
    │   │       ├── Facebook
    │   │       ├── Twitter
    │   │       └── YouTube
    │   ├── Shop Links Column × 6
    │   ├── Company Links Column × 5
    │   ├── Customer Service Links Column × 6
    │   └── Resources Links Column × 5
    │
    └── Bottom Footer
        ├── Copyright & Legal Links
        └── Payment Methods × 6
```

## Component File Paths

### Atoms
```
components/atoms/
├── Logo.tsx                 # Brand logo with link
├── IconButton.tsx           # Reusable icon button with badge
└── SearchInput.tsx          # Search input field
```

### Molecules
```
components/molecules/
├── CategoryCard.tsx         # Single category display card
├── CategoryMenu.tsx         # Dropdown navigation menu
└── ProductCard.tsx          # Product display card with image
```

### Organisms
```
components/organisms/
├── Header.tsx               # Main header with navigation
├── HeroBanner.tsx           # Hero slider with multiple slides
├── CategoryGrid.tsx         # Grid of category cards
├── FeaturedProducts.tsx     # Horizontal scrollable products
├── CampaignBanners.tsx      # Promotional banner section
├── BrandSlider.tsx          # Infinite brand logo carousel
├── TrustBadges.tsx          # Trust indicator section
├── BlogSection.tsx          # Blog posts preview
├── Newsletter.tsx           # Newsletter subscription form
└── Footer.tsx               # Main footer with links
```

## Component Responsibilities

### Atoms Layer
**Purpose**: Basic, indivisible UI elements

| Component | Props | Responsibility |
|-----------|-------|----------------|
| Logo | `className?: string` | Display brand logo with link to home |
| IconButton | `icon, label, onClick?, badge?, className?` | Reusable button with icon and optional badge |
| SearchInput | `onSearch?, placeholder?, className?` | Search input with submit handler |

### Molecules Layer
**Purpose**: Simple combinations of atoms

| Component | Props | Responsibility |
|-----------|-------|----------------|
| CategoryCard | `name, icon, href, count?` | Display single category with hover effects |
| CategoryMenu | None | Dropdown menu with categories and subcategories |
| ProductCard | `id, title, price, originalPrice?, image, slug, badge?, discount?` | Display product with image, price, and badges |

### Organisms Layer
**Purpose**: Complex UI sections

| Component | Props | Responsibility |
|-----------|-------|----------------|
| EnhancedHeader | None | Complete header with search, cart, menu |
| HeroBanner | None | Auto-rotating hero slider with CTAs |
| CategoryGrid | None | Grid of clickable category cards |
| FeaturedProducts | `title, subtitle?, products, viewAllLink?, badge?` | Horizontal scrollable product section |
| CampaignBanners | None | Grid of promotional banners |
| BrandSlider | None | Infinite scrolling brand logos |
| TrustBadges | None | Grid of trust indicators |
| BlogSection | None | Blog posts preview with cards |
| Newsletter | None | Email subscription form with validation |
| EnhancedFooter | None | Complete footer with links and info |

## Data Flow

```
API (furniture-api.ts)
        ↓
   React Query
        ↓
  HomePageClient (page-client-new.tsx)
        ↓
    FeaturedProducts (Organism)
        ↓
    ProductCard (Molecule)
```

### API Integration Points

1. **Best Sellers**: `fetchFurnitureProducts({ limit: 8, featured: true })`
2. **New Arrivals**: `fetchFurnitureProducts({ limit: 8, sort: 'newest' })`
3. **Recommended**: `fetchFurnitureProducts({ limit: 8 })`

### Data Transformation

```typescript
API Response → transformFurnitureProduct() → Component Props
```

## State Management

### Client State (useState)
- Header: `mobileMenuOpen`, `searchOpen`
- HeroBanner: `currentSlide`, `isAutoPlaying`
- Newsletter: `email`, `status`
- CategoryMenu: `activeCategory`

### Server State (React Query)
- Best Sellers: `['furniture-best-sellers']`
- New Arrivals: `['furniture-new-arrivals']`
- Recommended: `['furniture-recommended']`

## Styling Architecture

### Tailwind Utilities
```css
/* Color Palette */
- Deep Navy: deep-navy-{50-900}
- Brand Gold: brand-gold-{50-900}
- Neutral Gray: neutral-gray-{50-900}

/* Custom Utilities */
- .scrollbar-hide: Hide scrollbar
- .snap-x: Horizontal snap scroll
- .animate-fade-in: Fade in animation
- .animate-slide-up: Slide up animation
- .transform-gpu: GPU acceleration
- .optimize-repaint: Layout optimization
```

### Responsive Breakpoints
```
sm:  640px   (Tablet portrait)
md:  768px   (Tablet landscape)
lg:  1024px  (Desktop)
xl:  1280px  (Large desktop)
2xl: 1536px  (Extra large)
```

## Performance Optimizations

### Code Splitting
- Server Components for static content
- Client Components only where needed (`'use client'`)
- Dynamic imports ready for heavy components

### Image Optimization
- Next.js Image component with automatic optimization
- Lazy loading with `loading="lazy"`
- WebP format with fallbacks

### CSS Optimization
- Tailwind purge for minimal bundle
- GPU-accelerated animations
- CSS containment for reflow optimization

### JavaScript Optimization
- React.memo for expensive components
- useCallback for event handlers
- Debounced scroll handlers

## Accessibility Features

- ✅ Semantic HTML5 elements
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Color contrast WCAG AA compliant
- ✅ Screen reader friendly
- ✅ Alt text for all images

## SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Sitemap ready
- ✅ Structured data ready

---

**Use this map as a reference for understanding the component architecture and relationships.**
