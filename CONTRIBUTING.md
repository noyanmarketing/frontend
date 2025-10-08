# Contributing to Noyan

Thank you for your interest in contributing to Noyan!

## Development Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ & pnpm
- Python 3.12+
- Git

### Quick Start

1. Clone the repository
```bash
git clone <repository-url>
cd noyan
```

2. Set up environment files
```bash
make setup
# or manually:
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

3. Start development services
```bash
make dev
# or: cd infra && docker compose up --build
```

## Development Workflow

### Frontend (Next.js)

```bash
cd apps/web

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Run linter
pnpm lint

# Type check
pnpm type-check
```

### Backend (Django)

```bash
cd apps/api

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements-dev.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run tests
pytest

# Run linter
ruff check .
```

## Code Style

### Frontend
- Follow ESLint and Prettier configurations
- Use TypeScript strict mode
- Write meaningful component and function names
- Add JSDoc comments for complex logic

### Backend
- Follow PEP 8 style guide
- Use type hints where applicable
- Write docstrings for classes and functions
- Use ruff for linting

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for good test coverage

### Frontend Tests
```bash
cd apps/web
pnpm test
```

### Backend Tests
```bash
cd apps/api
pytest --cov=apps
```

## Pull Request Process

1. Create a feature branch from `develop`
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit
```bash
git add .
git commit -m "feat: description of your changes"
```

3. Push to your fork
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request to `develop` branch

### Commit Message Format

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Project Structure

```
noyan/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Django backend
├── infra/            # Docker and infrastructure
├── packages/         # Shared configs
└── docs/             # Documentation
```

## Need Help?

- Check existing issues
- Read the documentation
- Ask in discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
