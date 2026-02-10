#!/bin/bash
# Verification script to check if NEXORA setup is complete

echo ""
echo "=========================================="
echo "  NEXORA Setup Verification"
echo "=========================================="
echo ""

errors=0

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js not found"
    errors=$((errors+1))
fi

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm not found"
    errors=$((errors+1))
fi

# Check PostgreSQL
echo "Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    if psql -U postgres -c "SELECT count(*) FROM pg_tables" -d nexora &> /dev/null; then
        echo "✅ PostgreSQL: Connected"
    else
        echo "⚠️  PostgreSQL: Installed but cannot connect to 'nexora' database"
        echo "   Run: psql -U postgres -c \"CREATE DATABASE nexora;\""
        echo "   Then: psql -U postgres -d nexora -f infra/db/schema.sql"
        errors=$((errors+1))
    fi
else
    echo "⚠️  PostgreSQL: Not found (required to run backend)"
    echo "   Install from: https://www.postgresql.org/download/"
fi

# Check backend dependencies
echo "Checking backend dependencies..."
if [ -d "apps/api/node_modules" ]; then
    echo "✅ Backend node_modules installed"
else
    echo "⚠️  Backend node_modules missing"
    echo "   Run: cd apps/api && npm install"
    errors=$((errors+1))
fi

# Check frontend dependencies
echo "Checking frontend dependencies..."
if [ -d "apps/web/node_modules" ]; then
    echo "✅ Frontend node_modules installed"
else
    echo "⚠️  Frontend node_modules missing"
    echo "   Run: cd apps/web && npm install"
    errors=$((errors+1))
fi

# Check .env files
echo "Checking configuration files..."
if [ -f "apps/api/.env.local" ]; then
    echo "✅ Backend .env.local exists"
else
    echo "⚠️  Backend .env.local missing"
    echo "   Run: cd apps/api && cp .env.example .env.local"
    errors=$((errors+1))
fi

if [ -f "apps/web/.env.local" ]; then
    echo "✅ Frontend .env.local exists"
else
    echo "⚠️  Frontend .env.local missing"
    echo "   Run: cd apps/web && cp .env.example .env.local"
    errors=$((errors+1))
fi

# Summary
echo ""
echo "=========================================="
if [ $errors -eq 0 ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "Ready to start:"
    echo "  1. Backend: cd apps/api && npm run start:dev"
    echo "  2. Frontend: cd apps/web && npm run start"
    echo "  3. Open: http://localhost:4200"
else
    echo "⚠️  $errors issue(s) found - see above"
    echo ""
    echo "Run setup script:"
    echo "  bash setup-unix.sh  (or setup-windows.bat)"
fi
echo "=========================================="
echo ""
