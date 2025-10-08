# Noyan Furniture - Homepage Redesign

## 🎨 Overview

A complete homepage redesign for Noyan Furniture e-commerce platform, built with modern web technologies and following atomic design principles. The homepage is responsive, SEO-optimized, fast-loading, and provides an exceptional user experience.

## 📁 Project Structure

```
apps/web/
├── components/
│   ├── atoms/                    # Basic building blocks
│   │   ├── Logo.tsx             # Brand logo component
│   │   ├── IconButton.tsx       # Reusable icon button
│   │   └── SearchInput.tsx      # Search input field
│   │
│   ├── molecules/               # Combinations of atoms
│   │   ├── CategoryCard.tsx     # Single category card
│   │   ├── CategoryMenu.tsx     # Dropdown category menu
│   │   └── ProductCard.tsx      # Product display card
│   │
│   ├── organisms/               # Complex UI sections
│   │   ├── Header.tsx           # Enhanced header with search & menu
│   │   ├── HeroBanner.tsx       # Hero slider with multiple slides
│   │   ├── CategoryGrid.tsx     # Category cards grid
│   │   ├── FeaturedProducts.tsx # Horizontal scrollable product section
│   │   ├── CampaignBanners.tsx  # Campaign/promotional banners
│   │   ├── BrandSlider.tsx      # Infinite brand logo slider
│   │   ├── TrustBadges.tsx      # Trust indicators section
│   │   ├── BlogSection.tsx      # Blog posts preview
│   │   ├── Newsletter.tsx       # Newsletter subscription
│   │   └── Footer.tsx           # Enhanced footer with links
│   │
│   └── ui/                      # Existing UI components
│       ├── button.tsx
│       ├── container.tsx
│       └── ...
│
└── app/
    ├── page.tsx                 # Main homepage (server component)
    └── page-client-new.tsx      # Client-side homepage logic
```

## 🏗️ Architecture

### Atomic Design Principles

1. **Atoms**: Basic, indivisible UI elements (Logo, IconButton, SearchInput)
2. **Molecules**: Simple combinations of atoms (CategoryCard, ProductCard, CategoryMenu)
3. **Organisms**: Complex UI sections (Header, HeroBanner, FeaturedProducts, etc.)
4. **Templates**: Page layouts combining organisms
5. **Pages**: Specific instances with real content

### Component Hierarchy

```
HomePage (page.tsx)
└── HomePageClient (page-client-new.tsx)
    ├── EnhancedHeader
    │   ├── Logo
    │   ├── SearchInput
    │   ├── IconButton (x5)
    │   └── CategoryMenu
    ├── HeroBanner (3-5 slides)
    ├── CategoryGrid (8 categories)
    ├── FeaturedProducts (Best Sellers)
    │   └── ProductCard (x8)
    ├── CampaignBanners (3 banners)
    ├── FeaturedProducts (New Arrivals)
    ├── FeaturedProducts (Home Decoration)
    ├── TrustBadges (4 badges)
    ├── FeaturedProducts (Designer Collection)
    ├── BrandSlider (8+ brands)
    ├── FeaturedProducts (Storage)
    ├── BlogSection (3 posts)
    ├── Newsletter
    └── EnhancedFooter
```

## 🎯 Features Implemented

### Header
- ✅ Logo with hover effect
- ✅ Full-width search bar (desktop) / expandable (mobile)
- ✅ Category dropdown menu with subcategories
- ✅ Favorites icon with badge
- ✅ Shopping cart with item count
- ✅ User account link
- ✅ Theme toggle (dark/light mode)
- ✅ Mobile hamburger menu
- ✅ Sticky header with shadow

### Hero Banner/Slider
- ✅ 3-5 rotating slides with auto-play
- ✅ Custom content per slide (title, subtitle, CTAs)
- ✅ Navigation arrows (prev/next)
- ✅ Dot indicators
- ✅ Pause on hover
- ✅ Smooth transitions
- ✅ Responsive design

### Category Cards
- ✅ 8 main categories with icons
- ✅ Product count per category
- ✅ Hover effects with scale & border
- ✅ Icon animations
- ✅ Responsive grid (2/4 columns)

### Featured Products
- ✅ Multiple sections: Best Sellers, New Arrivals, Recommended
- ✅ Horizontal scroll with navigation arrows
- ✅ Product cards with:
  - Image with hover zoom
  - Title and price
  - Discount badges
  - Category labels
  - Favorite button (on hover)
- ✅ "View All" button
- ✅ Loading states

### Campaign Banners
- ✅ 2-3 promotional banners
- ✅ Custom background gradients
- ✅ Clickable with hover effects
- ✅ Decorative icons
- ✅ Responsive grid

### Category Showcases
- ✅ Home Decoration section
- ✅ Designer Collection section
- ✅ Storage & Organization section
- ✅ 4-6 products per showcase
- ✅ Same product card component reused

### Brands/Designers
- ✅ Infinite horizontal scroll
- ✅ Auto-scroll with pause on hover
- ✅ 8+ brand logos
- ✅ Hover effects

### Trust Badges
- ✅ Free Shipping
- ✅ Secure Payment
- ✅ Easy Returns
- ✅ 24/7 Support
- ✅ Icon animations on hover
- ✅ Gradient backgrounds

### Blog Section
- ✅ Latest 3 blog posts
- ✅ Post cards with image, title, excerpt
- ✅ Category badges
- ✅ Read time and date
- ✅ "View All" button
- ✅ Hover animations

### Newsletter
- ✅ Email input with validation
- ✅ Subscribe button
- ✅ Loading and success states
- ✅ Gradient background
- ✅ Privacy note

### Footer
- ✅ Company info and logo
- ✅ Contact information (address, phone, email)
- ✅ Social media links (4 platforms)
- ✅ Sitemap with 4 columns:
  - Shop links
  - Company links
  - Customer Service links
  - Resources links
- ✅ Payment method icons
- ✅ Copyright and legal links
- ✅ Responsive layout

## 🚀 Performance Optimizations

### Code Splitting
- ✅ Server Components for static content
- ✅ Client Components only where needed
- ✅ Dynamic imports for heavy components
- ✅ React Query for data fetching

### Image Optimization
- ✅ Next.js Image component with automatic optimization
- ✅ Lazy loading with `loading="lazy"`
- ✅ Responsive images with `sizes` attribute
- ✅ WebP format with fallbacks
- ✅ Content visibility for off-screen images

### CSS Optimization
- ✅ Tailwind CSS for minimal bundle size
- ✅ PurgeCSS to remove unused styles
- ✅ GPU-accelerated animations
- ✅ `will-change` for transform properties
- ✅ `contain` property for layout optimization

### JavaScript Optimization
- ✅ Tree shaking with ES modules
- ✅ Code splitting by route
- ✅ Memoization with React.memo where needed
- ✅ Debounced scroll handlers
- ✅ Intersection Observer for lazy loading

### SEO Optimization
- ✅ Semantic HTML5 elements
- ✅ Proper heading hierarchy (h1, h2, h3)
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD) ready
- ✅ Alt text for all images
- ✅ ARIA labels for accessibility
- ✅ Canonical URLs
- ✅ Sitemap generation

### Accessibility
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus indicators
- ✅ Color contrast ratios
- ✅ Skip to content link
- ✅ Semantic HTML

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Responsive Features
- ✅ Mobile-first approach
- ✅ Collapsible mobile menu
- ✅ Stacked layouts on mobile
- ✅ Touch-friendly tap targets (min 44x44px)
- ✅ Horizontal scroll on mobile for products
- ✅ Optimized font sizes per breakpoint
- ✅ Responsive images
- ✅ Grid adaptations (1/2/4 columns)

## 🎨 Design System

### Colors
- **Deep Navy**: Primary brand color (#1A237E)
- **Brand Gold**: Accent color (#FFD700)
- **Neutral Gray**: Supporting colors
- **White/Black**: Base colors
- Dark mode support with inverted scheme

### Typography
- **Heading Font**: Poppins (bold, modern)
- **Body Font**: Open Sans (readable, clean)
- **Font Sizes**: Responsive scale (14px - 72px)
- **Line Heights**: Optimized for readability

### Spacing
- Consistent spacing scale (4px, 8px, 16px, 24px, 32px...)
- Container max-width: 1400px
- Section padding: 64px - 80px (desktop), 48px (mobile)

### Animations
- Hover effects: scale, translate, color
- Transition duration: 300ms (fast), 500ms (medium)
- Easing: ease-in-out, cubic-bezier
- Auto-scroll with pause on hover

## 🛠️ Technologies Used

- **Framework**: Next.js 14.2.0 (App Router)
- **React**: 18.2.0
- **TypeScript**: 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React 0.356.0
- **Data Fetching**: TanStack Query 5.28.0
- **Theme**: next-themes 0.2.1
- **UI Components**: Radix UI
- **SEO**: next-seo 6.5.0

## 📦 Installation & Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Type check
pnpm type-check

# Lint
pnpm lint
```

## 🔄 Data Integration

The homepage fetches real data from the Furniture API:

```typescript
// Best Sellers
fetchFurnitureProducts({ limit: 8, featured: true })

// New Arrivals
fetchFurnitureProducts({ limit: 8, sort: 'newest' })

// Recommended
fetchFurnitureProducts({ limit: 8 })
```

Products are transformed using `transformFurnitureProduct()` helper.

## 🎯 Future Enhancements

- [ ] Add wishlist functionality
- [ ] Implement product quick view
- [ ] Add recently viewed products
- [ ] Implement A/B testing for hero slides
- [ ] Add personalized recommendations
- [ ] Implement skeleton loading states
- [ ] Add product comparison feature
- [ ] Implement live chat widget
- [ ] Add virtual try-on for AR-compatible devices
- [ ] Implement progressive web app (PWA)

## 📊 Performance Metrics

Target scores:
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🤝 Contributing

1. Follow atomic design principles
2. Use TypeScript for all components
3. Maintain responsive design patterns
4. Test on multiple devices and browsers
5. Ensure accessibility standards
6. Optimize images and assets
7. Write semantic HTML
8. Add proper documentation

## 📝 Notes

- All components are modular and reusable
- Dark mode is fully supported
- Animations are GPU-accelerated
- Images use Next.js optimization
- SEO meta tags are comprehensive
- Code is type-safe with TypeScript
- Components follow single responsibility principle

## 🎓 Learning Resources

- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Web Vitals](https://web.dev/vitals/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Built with ❤️ by the Noyan Furniture Team**
