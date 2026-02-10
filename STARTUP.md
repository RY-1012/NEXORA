# Complete Setup & First Run Guide

Follow these steps to get NEXORA running smoothly.

## Prerequisites Check

Before starting, make sure you have:
- [ ] Node.js 18+ installed (https://nodejs.org)
- [ ] npm or pnpm available in terminal
- [ ] Windows PowerShell, macOS Terminal, or Linux bash

## Step 1: Run Setup Script (5 minutes)

### Windows
```powershell
cd c:\Users\Kavin Nadar\Desktop\NEXORA
.\setup-windows.bat
```

### macOS/Linux
```bash
cd ~/Desktop/NEXORA
bash setup-unix.sh
```

**What it does:**
- Cleans old `node_modules`
- Installs backend dependencies
- Installs frontend dependencies
- Creates `.env.local` files
- Checks PostgreSQL connection (if installed)

## Step 2: Install PostgreSQL Locally

PostgreSQL must be installed on your machine before the backend can start.

### Windows
1. Download installer: https://www.postgresql.org/download/windows/
2. Run installer, use default port `5432`
3. Set master password (remember it!)
4. Complete installation
5. Open Command Prompt and create database:
   ```cmd
   psql -U postgres
   CREATE DATABASE nexora;
   \q
   psql -U postgres -d nexora -f infra/db/schema.sql
   ```

### macOS
```bash
# Using Homebrew
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb nexora
psql -d nexora -f infra/db/schema.sql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Create database
sudo -u postgres psql
CREATE DATABASE nexora;
\q

sudo -u postgres psql -d nexora -f infra/db/schema.sql
```

### Verify PostgreSQL is Running
```bash
psql -U postgres -c "SELECT count(*) FROM pg_tables" -d nexora
# Should return: count 
#               -------
#                   12
```

If this fails, PostgreSQL is not running or not installed.

## Step 3: Update Backend Configuration

The backend needs to know where PostgreSQL is.

### Windows PowerShell
```powershell
# Edit apps/api/.env.local
notepad apps/api/.env.local
```

Update the DATABASE_URL to match your setup:
```
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/nexora
```

Replace `YOUR_PASSWORD` with the password you set during PostgreSQL installation.

### macOS/Linux
```bash
nano apps/api/.env.local
```

Same as above.

## Step 4: Start Backend

Open a **new terminal/PowerShell window**:

```bash
cd apps/api
npm run start:dev
```

**Expected output:**
```
✅ API Server running on http://localhost:3000/api/v1
```

If you see this, proceed to Step 5. Otherwise, check [ERRORS.md](ERRORS.md).

## Step 5: Start Frontend

Open a **different terminal/PowerShell window**:

```bash
cd apps/web
npm run start
```

**Expected output:**
```
✔ Compiled successfully.
Application bundle generated successfully. 42.23 MB

Initial Chunk Files | Names | Size
vendor.js | vendor | 25.45 MB
main.js | main | 8.45 MB
polyfills.js | polyfills | 5.34 MB

Application is served at http://localhost:4200/
```

## Step 6: Test in Browser

1. Open: http://localhost:4200
2. You should see:
   - ✅ "NEXORA" header at top
   - ✅ "Guest" user label
   - ✅ "Theme" button
   - ✅ "Your Feed" section below

## Step 7: Test Backend API

Open a **third terminal/PowerShell** and run:

```bash
# Windows
curl http://localhost:3000/api/v1/users/me

# macOS/Linux
curl http://localhost:3000/api/v1/users/me
```

**Expected response:**
```json
{
  "id": "user-1",
  "displayName": "Nexora User",
  "email": "demo@nexora.dev"
}
```

## Step 8: Test Frontend-Backend Connection

1. Go to http://localhost:4200/auth/login
2. Enter any email: `test@example.com`
3. Enter any password: `password123`
4. Click "Sign in"
5. You should see: `Attempted login for test@example.com`

## ✅ You're All Set!

Both frontend and backend are running. Now you can:
- [ ] Explore the feed at http://localhost:4200
- [ ] Check backend logs in the API terminal
- [ ] Watch frontend compile logs in the web terminal
- [ ] Start building features!

## 🛠️ Quick Commands Reference

### Restart Backend
```bash
cd apps/api
npm run start:dev
```

### Restart Frontend
```bash
cd apps/web
npm run start
```

### Connect to PostgreSQL
```bash
psql -U postgres -d nexora
```

### Clean Everything and Start Over
```bash
bash clean.sh  # macOS/Linux
# (or manually delete node_modules in both apps)
bash setup-unix.sh
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Find process on port 3000 or 4200
lsof -i :3000
lsof -i :4200

# Kill it (macOS/Linux)
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### PostgreSQL connection refused
1. Check if running: `psql -U postgres`
2. Check port: `netstat -an | grep 5432`
3. Restart: `sudo service postgresql restart` (Linux)

### npm install fails
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Angular/NestJS version conflicts
```bash
cd apps/api
npm install --legacy-peer-deps

cd ../web
npm install --legacy-peer-deps
```

### See [ERRORS.md](ERRORS.md) for more solutions

## 📱 Common Next Steps

1. **Add real database queries** in auth service
2. **Implement JWT token signing** with bcrypt passwords
3. **Connect frontend login to backend API**
4. **Add post creation form** with database persistence
5. **Set up realtime features** with Socket.IO

---

**Stuck?** Check these in order:
1. [ERRORS.md](ERRORS.md) - Common error solutions
2. [ARCHITECTURE.md](ARCHITECTURE.md) - System overview
3. [API_REFERENCE.md](API_REFERENCE.md) - Available endpoints
4. Terminal logs - read error messages carefully!
