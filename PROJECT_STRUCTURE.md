# Noyan Furniture - Project Structure

Complete file structure of the Noyan Furniture e-commerce monorepo.

## Root Files
```
.
├── .editorconfig              # Editor configuration
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── LICENSE                    # MIT License
├── Makefile                   # Make commands for common tasks
├── README.md                  # Project documentation
├── CONTRIBUTING.md            # Contribution guidelines
├── PROJECT_STRUCTURE.md       # This file
├── package.json               # Root package.json (workspace)
└── pnpm-workspace.yaml        # pnpm workspace configuration
```

## Frontend (apps/web) - Next.js 14
```
apps/web/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (legal)/
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── c/[slug]/page.tsx      # Category pages
│   ├── p/[slug]/page.tsx      # Product pages
│   ├── search/page.tsx
│   ├── layout.tsx
│   ├── page.tsx               # Home page
│   └── globals.css
├── components/
│   ├── theme-provider.tsx
│   └── ui/
│       ├── breadcrumbs.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── container.tsx
│       ├── footer.tsx
│       ├── header.tsx
│       ├── label.tsx
│       ├── price-badge.tsx
│       └── product-card.tsx
├── lib/
│   ├── apiClient.ts           # API client wrapper
│   ├── auth.ts                # Auth utilities
│   ├── env.ts                 # Environment validation
│   ├── query-provider.tsx     # React Query provider
│   ├── seo.ts                 # SEO utilities
│   └── utils.ts               # Common utilities
├── tests/
│   ├── button.test.tsx
│   └── product-card.test.tsx
├── .eslintrc.cjs
├── .prettierrc
├── .env.example
├── jest.config.js
├── jest.setup.js
├── next.config.mjs
├── next-sitemap.config.js
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Backend (apps/api) - Django 5
```
apps/api/
├── config/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py            # Django settings
│   ├── urls.py                # URL routing
│   └── wsgi.py
├── apps/
│   ├── core/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py          # Base models
│   │   ├── migrations/
│   │   └── management/
│   │       └── commands/
│   │           └── seed_data.py
│   ├── users/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py          # Custom User model
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── migrations/
│   ├── catalog/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py          # Category, Brand, Product, Media
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── migrations/
│   ├── orders/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py          # CartItem, Order
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   └── migrations/
│   ├── payments/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   └── models.py          # Stub
│   └── shipping/
│       ├── __init__.py
│       ├── apps.py
│       └── models.py          # Stub
├── tests/
│   ├── __init__.py
│   ├── test_users.py
│   └── test_catalog.py
├── .env.example
├── conftest.py                # Pytest fixtures
├── manage.py
├── pytest.ini
├── requirements.txt
├── requirements-dev.txt
└── ruff.toml
```

## Infrastructure (infra/)
```
infra/
├── docker/
│   ├── api.Dockerfile         # Django production image
│   └── web.Dockerfile         # Next.js production image
└── docker-compose.yml         # Local development compose
```

## GitHub Actions (.github/)
```
.github/
└── workflows/
    ├── ci.yml                 # CI pipeline (tests, lint)
    └── docker-publish.yml     # Docker image publishing
```

## Shared Packages (packages/)
```
packages/
└── config/
    ├── eslint-config/
    │   ├── index.js
    │   └── package.json
    ├── prettier-config/
    │   ├── index.js
    │   └── package.json
    └── tsconfig-base/
        ├── base.json
        ├── nextjs.json
        └── package.json
```

## Scripts
```
scripts/
└── setup.sh                   # Development setup script
```

## Key Features Implemented

### Frontend ✅
- [x] Next.js 14 with App Router
- [x] TypeScript strict mode
- [x] TailwindCSS + shadcn/ui
- [x] React Query for data fetching
- [x] JWT authentication utilities
- [x] Dark/light theme support
- [x] SEO utilities
- [x] Jest + RTL tests
- [x] ESLint + Prettier

### Backend ✅
- [x] Django 5 + DRF
- [x] JWT authentication (simplejwt)
- [x] Custom User model
- [x] Catalog (Category, Brand, Product, Media)
- [x] Orders (CartItem, Order stubs)
- [x] Payment & Shipping stubs
- [x] OpenAPI/Swagger docs
- [x] Argon2 password hashing
- [x] PostgreSQL + Redis
- [x] Pytest tests
- [x] Ruff linting
- [x] Management command for seeding

### Infrastructure ✅
- [x] Multi-stage Docker builds
- [x] Docker Compose for local dev
- [x] GitHub Actions CI
- [x] GitHub Actions Docker publish
- [x] Health checks
- [x] Non-root containers

## Quick Start

1. **Setup**: `make setup` or `./scripts/setup.sh`
2. **Start**: `make dev`
3. **Seed**: `make seed`

## Available Services

- **Web**: http://localhost:3000
- **API**: http://localhost:8000
- **Swagger**: http://localhost:8000/api/docs/
- **Admin**: http://localhost:8000/admin/

## Database Models

### Users
- `User` (email, password, first_name, last_name, email_verified)

### Catalog
- `Category` (name, slug, parent, description) - Living Room, Bedroom, Dining Room, Office
- `Brand` (name, slug, description, logo_url) - Noyan Home, Noyan Pro, Noyan Premium
- `Product` (title, slug, sku, description, price, currency, stock, brand, category, attributes) - Furniture items
- `Media` (product, url, alt_text, width, height, order)

### Orders
- `CartItem` (user, product, quantity)
- `Order` (user, order_number, status, total_amount, currency)

## API Endpoints

### Authentication
- `POST /api/v1/auth/register/`
- `POST /api/v1/auth/login/`
- `POST /api/v1/auth/logout/`
- `GET /api/v1/auth/me/`
- `POST /api/v1/auth/token/refresh/`

### Catalog
- `GET /api/v1/categories/`
- `GET /api/v1/categories/{slug}/`
- `GET /api/v1/brands/`
- `GET /api/v1/brands/{slug}/`
- `GET /api/v1/products/`
- `GET /api/v1/products/{slug}/`

### Orders
- `GET /api/v1/cart/`
- `POST /api/v1/cart/items/`
- `GET /api/v1/orders/`

## Next Steps for Production

1. Set up proper secrets management
2. Configure CDN for static assets
3. Implement image optimization
4. Add monitoring (Sentry, etc.)
5. Set up CI/CD deployment pipeline
6. Configure database backups
7. Implement rate limiting
8. Add comprehensive logging
9. Set up SSL certificates
10. Implement search (Elasticsearch)
