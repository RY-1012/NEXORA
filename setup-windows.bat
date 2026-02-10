@echo off
REM NEXORA Quick Setup Script for Windows

echo.
echo ========================================
echo  NEXORA - Local Development Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed!
    echo    Download and install from: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

REM Clean and install backend
echo.
echo [1/4] Installing Backend Dependencies...
cd apps\api
if exist node_modules (
    echo    Cleaning old node_modules...
    rmdir /s /q node_modules
)
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend install failed
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
cd ..\..

REM Clean and install frontend
echo.
echo [2/4] Installing Frontend Dependencies...
cd apps\web
if exist node_modules (
    echo    Cleaning old node_modules...
    rmdir /s /q node_modules
)
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend install failed
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd ..\..

REM Check environment files
echo.
echo [3/4] Checking Environment Files...
if not exist "apps\api\.env.local" (
    echo ⚠️  Missing .env.local in apps/api - creating default...
) else (
    echo ✅ Backend .env.local found
)

if not exist "apps\web\.env.local" (
    echo ⚠️  Missing .env.local in apps/web - creating default...
) else (
    echo ✅ Frontend .env.local found
)

REM Summary
echo.
echo [4/4] Setup Complete!
echo ========================================
echo.
echo 📝 Next Steps:
echo.
echo 1. Install PostgreSQL locally:
echo    https://www.postgresql.org/download/windows/
echo.
echo 2. Create database and load schema:
echo    psql -U postgres -c "CREATE DATABASE nexora;"
echo    psql -U postgres -d nexora -f infra/db/schema.sql
echo.
echo 3. Start the backend (in PowerShell):
echo    cd apps/api
echo    npm run start:dev
echo.
echo 4. Start the frontend (in another PowerShell):
echo    cd apps/web
echo    npm run start
echo.
echo 5. Open browser: http://localhost:4200
echo.
echo ========================================
echo.
pause
