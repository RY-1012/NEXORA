#!/bin/bash

# NEXORA Quick Setup Script for macOS/Linux

echo ""
echo "========================================"
echo "  NEXORA - Local Development Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "   Download and install from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js detected:"
node --version

# Clean and install backend
echo ""
echo "[1/4] Installing Backend Dependencies..."
cd apps/api
if [ -d node_modules ]; then
    echo "    Cleaning old node_modules..."
    rm -rf node_modules
fi
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend install failed"
    exit 1
fi
echo "✅ Backend dependencies installed"
cd ../..

# Clean and install frontend
echo ""
echo "[2/4] Installing Frontend Dependencies..."
cd apps/web
if [ -d node_modules ]; then
    echo "    Cleaning old node_modules..."
    rm -rf node_modules
fi
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend install failed"
    exit 1
fi
echo "✅ Frontend dependencies installed"
cd ../..

# Check environment files
echo ""
echo "[3/4] Checking Environment Files..."
if [ ! -f "apps/api/.env.local" ]; then
    echo "⚠️  Missing .env.local in apps/api"
else
    echo "✅ Backend .env.local found"
fi

if [ ! -f "apps/web/.env.local" ]; then
    echo "⚠️  Missing .env.local in apps/web"
else
    echo "✅ Frontend .env.local found"
fi

# Summary
echo ""
echo "[4/4] Setup Complete!"
echo "========================================"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Install PostgreSQL locally:"
echo "   macOS: brew install postgresql@16"
echo "   Linux: sudo apt-get install postgresql"
echo ""
echo "2. Create database and load schema:"
echo "   psql -U postgres -c \"CREATE DATABASE nexora;\""
echo "   psql -U postgres -d nexora -f infra/db/schema.sql"
echo ""
echo "3. Start the backend:"
echo "   cd apps/api"
echo "   npm run start:dev"
echo ""
echo "4. Start the frontend (in another terminal):"
echo "   cd apps/web"
echo "   npm run start"
echo ""
echo "5. Open browser: http://localhost:4200"
echo ""
echo "========================================"
echo ""
