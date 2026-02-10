#!/bin/bash
# Quick cleanup script

echo "🧹 Cleaning NEXORA project..."

# Clean backend
cd apps/api
rm -rf dist
rm -rf node_modules
cd ../..

# Clean frontend
cd apps/web
rm -rf dist
rm -rf node_modules
cd ../..

# Clean compiled JS from src
cd apps/api/src
find . -name "*.js" -o -name "*.js.map" | xargs rm -f
cd ../../..

echo "✅ Cleanup complete!"
echo ""
echo "Now run: bash setup-unix.sh (or setup-windows.bat on Windows)"
