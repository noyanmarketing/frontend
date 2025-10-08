#!/bin/bash

set -e

echo "🚀 Setting up Noyan development environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

# Create environment files
echo "📝 Creating environment files..."
if [ ! -f apps/web/.env.local ]; then
    cp apps/web/.env.example apps/web/.env.local
    echo "✅ Created apps/web/.env.local"
else
    echo "⚠️  apps/web/.env.local already exists"
fi

if [ ! -f apps/api/.env ]; then
    cp apps/api/.env.example apps/api/.env
    echo "✅ Created apps/api/.env"
else
    echo "⚠️  apps/api/.env already exists"
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd apps/web
pnpm install
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Review and update environment files if needed:"
echo "     - apps/web/.env.local"
echo "     - apps/api/.env"
echo ""
echo "  2. Start the development environment:"
echo "     make dev"
echo "     # or: cd infra && docker compose up --build"
echo ""
echo "  3. Access the applications:"
echo "     - Web: http://localhost:3000"
echo "     - API: http://localhost:8000"
echo "     - API Docs: http://localhost:8000/api/docs/"
echo ""
echo "  4. Seed sample data (after services are running):"
echo "     make seed"
echo ""
echo "Happy coding! 🎉"
