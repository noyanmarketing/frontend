.PHONY: help setup dev up down logs clean test lint

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-15s %s\n", $$1, $$2}'

setup: ## Setup environment files
	@echo "Setting up environment files..."
	@cp -n apps/web/.env.example apps/web/.env.local || true
	@cp -n apps/api/.env.example apps/api/.env || true
	@echo "Environment files created! Please update them with your values."

dev: ## Start development services
	cd infra && docker compose up --build

up: ## Start services in background
	cd infra && docker compose up -d

down: ## Stop services
	cd infra && docker compose down

logs: ## Follow service logs
	cd infra && docker compose logs -f

clean: ## Clean up containers, volumes, and build artifacts
	cd infra && docker compose down -v
	rm -rf apps/web/.next apps/web/node_modules
	rm -rf apps/api/__pycache__ apps/api/**/__pycache__

test: ## Run tests
	@echo "Running web tests..."
	cd apps/web && pnpm test
	@echo "Running API tests..."
	cd apps/api && pytest

lint: ## Run linters
	@echo "Linting web..."
	cd apps/web && pnpm lint
	@echo "Linting API..."
	cd apps/api && ruff check .

seed: ## Seed database with sample data
	cd infra && docker compose exec api python manage.py seed_data

migrate: ## Run Django migrations
	cd infra && docker compose exec api python manage.py migrate

shell: ## Open Django shell
	cd infra && docker compose exec api python manage.py shell

psql: ## Open PostgreSQL shell
	cd infra && docker compose exec db psql -U noyan -d noyan
