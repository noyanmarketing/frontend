# Quick Start Guide

Get Noyan Furniture e-commerce platform running in 3 minutes.

## Prerequisites
- Docker Desktop installed and running
- Node.js 20+ (for local development)
- pnpm installed: `npm install -g pnpm`

## Option 1: Docker (Recommended)

### Step 1: Setup Environment Files
```bash
# Copy environment templates
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

### Step 2: Start with Docker
```bash
# From project root
docker compose -f infra/docker-compose.yml up --build
```

**That's it!** Wait for services to start (~2-3 minutes first time)

### Step 3: Access Applications
- **Web**: http://localhost:3000
- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs/
- **Admin**: http://localhost:8000/admin/

### Step 4: Create Admin User (Optional)
```bash
docker compose -f infra/docker-compose.yml exec api python manage.py createsuperuser
```

## Option 2: Local Development (Without Docker)

### Step 1: Setup Environment
```bash
# Install frontend dependencies
pnpm install

# Create Python virtual environment
cd apps/api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Setup Database
```bash
# You need PostgreSQL running locally
# Or use SQLite by updating apps/api/.env:
# DATABASE_URL=sqlite:///db.sqlite3

cd apps/api
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
```

### Step 3: Start Services
```bash
# Terminal 1: Backend
cd apps/api
python manage.py runserver

# Terminal 2: Frontend
cd apps/web
pnpm dev
```

## Verify Installation

### 1. Check API is running
```bash
curl http://localhost:8000/api/v1/products/
```
Expected: JSON response with products

### 2. Check Web is running
```bash
curl http://localhost:3000
```
Expected: HTML response

### 3. Run Tests
```bash
# Frontend tests
cd apps/web
pnpm test

# Backend tests
cd apps/api
source venv/bin/activate
pytest
```

## Common Issues

### Port already in use
```bash
# Stop services
docker compose -f infra/docker-compose.yml down

# Or kill specific ports
lsof -ti:3000 | xargs kill
lsof -ti:8000 | xargs kill
```

### Database migration issues
```bash
docker compose -f infra/docker-compose.yml exec api python manage.py migrate --run-syncdb
```

### Clear everything and restart
```bash
docker compose -f infra/docker-compose.yml down -v
docker compose -f infra/docker-compose.yml up --build
```

## Sample Data

The database is automatically seeded with:
- 4 categories (Living Room, Bedroom, Dining Room, Office)
- 3 brands (Noyan Home, Noyan Pro, Noyan Premium)
- Furniture products (sofas, dining tables, office chairs, beds)

To reseed:
```bash
docker compose -f infra/docker-compose.yml exec api python manage.py seed_data
```

## Next Steps

1. **Explore the API**: Visit http://localhost:8000/api/docs/
2. **Browse Products**: Visit http://localhost:3000
3. **Create Account**: http://localhost:3000/register
4. **Review Code**: Start with `apps/web/app/page.tsx` and `apps/api/apps/catalog/models.py`

## Development Workflow

```bash
# Start development
docker compose -f infra/docker-compose.yml up

# View logs
docker compose -f infra/docker-compose.yml logs -f web
docker compose -f infra/docker-compose.yml logs -f api

# Stop services
docker compose -f infra/docker-compose.yml down

# Restart a single service
docker compose -f infra/docker-compose.yml restart web
docker compose -f infra/docker-compose.yml restart api
```

## Useful Commands

```bash
# Django shell
docker compose -f infra/docker-compose.yml exec api python manage.py shell

# Database shell
docker compose -f infra/docker-compose.yml exec db psql -U noyan -d noyan

# Run Django commands
docker compose -f infra/docker-compose.yml exec api python manage.py <command>

# Install new npm package
cd apps/web
pnpm add <package-name>

# Install new Python package
cd apps/api
pip install <package-name>
pip freeze > requirements.txt
```

## Troubleshooting

### Docker build fails
```bash
# Clean Docker cache
docker system prune -a
docker compose -f infra/docker-compose.yml build --no-cache
```

### pnpm issues
```bash
# Clear pnpm cache
pnpm store prune
rm -rf node_modules apps/*/node_modules
pnpm install
```

### Database connection issues
Check that PostgreSQL container is running:
```bash
docker compose -f infra/docker-compose.yml ps
docker compose -f infra/docker-compose.yml logs db
```

## Getting Help

1. Check logs: `docker compose -f infra/docker-compose.yml logs`
2. Check [README.md](README.md) for detailed documentation
3. Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
4. Review [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for architecture details

Happy coding! 🚀
