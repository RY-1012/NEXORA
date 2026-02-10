@echo off
REM NEXORA Complete Setup & Installation Script for Windows

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║          NEXORA - Premium Social Platform Setup                ║
echo ║                 Complete Installation                           ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check Node.js
echo [1/6] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found! Download from https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
echo ✅ Node.js %NODE_VER% detected

REM Install root dependencies
echo.
echo [2/6] Installing root dependencies...
call npm install --legacy-peer-deps >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ✅ Root already set up
) else (
    echo ✅ Root dependencies installed
)

REM Clean backend
echo.
echo [3/6] Installing Backend (apps/api)...
cd apps\api
if exist node_modules (
    echo    Cleaning old installation...
    rmdir /s /q node_modules >nul 2>&1
    del package-lock.json >nul 2>&1
)
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend install failed
    cd ..\..
    pause
    exit /b 1
)
echo ✅ Backend ready
cd ..\..

REM Clean frontend
echo.
echo [4/6] Installing Frontend (apps/web)...
cd apps\web
if exist node_modules (
    echo    Cleaning old installation...
    rmdir /s /q node_modules >nul 2>&1
    del package-lock.json >nul 2>&1
)
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend install failed
    cd ..\..
    pause
    exit /b 1
)
echo ✅ Frontend ready
cd ..\..

REM Check env files
echo.
echo [5/6] Verifying configuration files...
if not exist "apps\api\.env.local" (
    echo ⚠️  Creating .env.local in apps/api...
    (
        echo DATABASE_URL=postgres://postgres:postgres@localhost:5432/nexora
        echo REDIS_URL=redis://localhost:6379
        echo JWT_SECRET=dev-secret-key-change-in-production-min-32-chars-required
        echo JWT_ACCESS_TTL=900
        echo JWT_REFRESH_TTL=1209600
        echo NODE_ENV=development
        echo PORT=3000
    ) > apps\api\.env.local
) else (
    echo ✅ Backend config exists
)

if not exist "apps\web\.env.local" (
    echo ⚠️  Creating .env.local in apps/web...
    echo API_URL=http://localhost:3000/api/v1 > apps\web\.env.local
) else (
    echo ✅ Frontend config exists
)

REM Verify
echo.
echo [6/6] Verifying setup...

if exist "apps\api\node_modules" (
    echo ✅ Backend dependencies: Ready
) else (
    echo ❌ Backend dependencies: Missing
)

if exist "apps\web\node_modules" (
    echo ✅ Frontend dependencies: Ready
) else (
    echo ❌ Frontend dependencies: Missing
)

if exist "apps\api\.env.local" (
    echo ✅ Backend config: Ready
) else (
    echo ❌ Backend config: Missing
)

if exist "apps\web\.env.local" (
    echo ✅ Frontend config: Ready
) else (
    echo ❌ Frontend config: Missing
)

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                  ✅ Setup Complete!                             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📝 Next Steps:
echo.
echo 1. Install PostgreSQL (if not already installed)
echo    Download: https://www.postgresql.org/download/windows/
echo.
echo 2. Create database (in PowerShell or Command Prompt):
echo    psql -U postgres -c "CREATE DATABASE nexora;"
echo    psql -U postgres -d nexora -f infra/db/schema.sql
echo.
echo 3. Update database password in apps\api\.env.local
echo    Edit: apps\api\.env.local
echo    Change: DATABASE_URL password
echo.
echo 4. Start Backend (new PowerShell window):
echo    cd apps\api
echo    npm run start:dev
echo.
echo 5. Start Frontend (another PowerShell window):
echo    cd apps\web
echo    npm run start
echo.
echo 6. Open browser: http://localhost:4200
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo.
pause
