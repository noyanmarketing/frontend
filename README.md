# Noyan Furniture - E-Commerce Platform

A modern furniture e-commerce platform built with Next.js 14 and Django 5. Featuring timeless furniture designs for modern living.

## Tech Stack

### Frontend (apps/web)
- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: TailwindCSS, shadcn/ui, Radix UI
- **Data Fetching**: React Query
- **Validation**: Zod
- **SEO**: next-sitemap, next-seo

### Backend (apps/api)
- **Framework**: Django 5 + Django REST Framework
- **Authentication**: djangorestframework-simplejwt
- **Database**: PostgreSQL 16
- **Password Hashing**: argon2-cffi
- **API Docs**: drf-spectacular (OpenAPI/Swagger)
- **Caching**: Redis

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Package Manager**: pnpm (frontend)

## Quick Start

> **📖 See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions**

### Prerequisites
- Docker Desktop (recommended)
- Node.js 20+ & pnpm (for local dev)

### Get Running in 2 Minutes

1. **Setup environment files**
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   cp apps/api/.env.example apps/api/.env
   ```

2. **Start with Docker**
   ```bash
   docker compose -f infra/docker-compose.yml up --build
   ```

3. **Access the applications**
   - **Web**: http://localhost:3000
   - **API**: http://localhost:8000
   - **Swagger**: http://localhost:8000/api/docs/
   - **Admin**: http://localhost:8000/admin/

Database is automatically seeded with furniture products including sofas, dining tables, office chairs, and bedroom furniture!

### Development without Docker

#### Frontend (apps/web)
```bash
cd apps/web
pnpm install
pnpm dev
```

#### Backend (apps/api)
```bash
cd apps/api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Project Structure

```
.
├── apps/
│   ├── web/              # Next.js 14 frontend
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities & API client
│   │   └── tests/        # Jest + RTL tests
│   └── api/              # Django 5 backend
│       ├── config/       # Django settings
│       ├── apps/         # Django apps
│       │   ├── users/    # Custom user model
│       │   ├── catalog/  # Furniture products, categories, brands
│       │   ├── orders/   # Cart & orders
│       │   ├── payments/ # Payment integration stubs
│       │   └── shipping/ # Shipping stubs
│       └── tests/        # Pytest tests
├── infra/
│   ├── docker/           # Dockerfiles
│   ├── docker-compose.yml
│   └── github/           # GitHub Actions workflows
├── packages/
│   └── config/           # Shared configs (eslint, prettier, tsconfig)
└── README.md
```

## Available Scripts

### Frontend (apps/web)
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Jest tests
- `pnpm type-check` - TypeScript type checking

### Backend (apps/api)
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Run migrations
- `python manage.py test` - Run Django tests
- `pytest` - Run pytest tests
- `ruff check .` - Run linter
- `python manage.py seed_data` - Seed sample data

## Testing

### Frontend
```bash
cd apps/web
pnpm test
```

### Backend
```bash
cd apps/api
pytest
```

## Docker

### Build images
```bash
docker compose -f infra/docker-compose.yml build
```

### View logs
```bash
docker compose -f infra/docker-compose.yml logs -f web
docker compose -f infra/docker-compose.yml logs -f api
```

### Run migrations
```bash
docker compose -f infra/docker-compose.yml exec api python manage.py migrate
```

### Create superuser
```bash
docker compose -f infra/docker-compose.yml exec api python manage.py createsuperuser
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register/` - User registration
- `POST /api/v1/auth/login/` - User login (returns JWT)
- `POST /api/v1/auth/logout/` - User logout
- `POST /api/v1/auth/token/refresh/` - Refresh JWT token

### Catalog
- `GET /api/v1/categories/` - List categories
- `GET /api/v1/categories/{slug}/` - Category detail
- `GET /api/v1/brands/` - List brands
- `GET /api/v1/brands/{slug}/` - Brand detail
- `GET /api/v1/products/` - List products (supports filtering)
- `GET /api/v1/products/{slug}/` - Product detail

### Orders
- `GET /api/v1/cart/` - View cart
- `POST /api/v1/cart/items/` - Add to cart
- `GET /api/v1/orders/` - List user orders

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://noyan:noyan@db:5432/noyan
REDIS_URL=redis://redis:6379/0
CORS_ALLOWED_ORIGINS=http://localhost:3000
JWT_SECRET=your-jwt-secret
```

## CI/CD

### GitHub Actions Workflows
- **CI** (`.github/workflows/ci.yml`) - Runs on PRs, tests both web and api
- **Docker Publish** (`.github/workflows/docker-publish.yml`) - Publishes to GHCR on tags

### Publishing Docker Images
```bash
git tag v1.0.0
git push origin v1.0.0
```
Images: `ghcr.io/<org>/noyan-web` and `ghcr.io/<org>/noyan-api`

## Acceptance Checklist

> **See [ACCEPTANCE_CHECKLIST.md](ACCEPTANCE_CHECKLIST.md) for complete verification**

- [ ] `docker compose -f infra/docker-compose.yml up --build` starts services
- [ ] `GET /api/v1/products/` returns JSON
- [ ] Home page renders at http://localhost:3000
- [ ] `pnpm test` (web) passes
- [ ] `pytest` (api) passes
- [ ] `/api/docs/` shows Swagger UI with endpoints
- [ ] `pnpm lint` (web) passes
- [ ] `ruff check .` (api) passes

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass and linting is clean
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.
