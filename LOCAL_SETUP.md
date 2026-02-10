# Local Development Setup (No Docker)

Follow this guide to set up NEXORA locally on your machine.

## Prerequisites
- Node.js 18+ (https://nodejs.org)
- npm or pnpm
- PostgreSQL 16+ (https://www.postgresql.org/download/)
- Optional: Redis, MinIO, MailHog

## Step 1: PostgreSQL Setup

### Windows
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run installer, note the password you set for `postgres` user
3. Default port is `5432`
4. After install, open **pgAdmin** (comes with PostgreSQL) or use command line:

```powershell
# Connect to default DB
psql -U postgres

# Inside psql, create new DB:
CREATE DATABASE nexora;

# Then exit and load schema:
\q
psql -U postgres -d nexora -f infra/db/schema.sql
```

### macOS
```bash
# Using Homebrew
brew install postgresql@16
brew services start postgresql@16

# Create DB
psql postgres
CREATE DATABASE nexora;
\q

psql -U postgres -d nexora -f infra/db/schema.sql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Create DB as postgres user
sudo -u postgres psql
CREATE DATABASE nexora;
\q

sudo -u postgres psql -d nexora -f infra/db/schema.sql
```

### Verify PostgreSQL Connection
```powershell
# Test connection
psql -U postgres -d nexora -c "SELECT version();"
```

If you get a connection, save these details:
- Host: `localhost`
- Port: `5432`
- Database: `nexora`
- User: `postgres`
- Password: `[your_set_password]`

## Step 2: (Optional) Redis Setup

### Windows
1. Download from https://github.com/microsoftarchive/redis/releases (download the `.msi` installer)
2. Install and run
3. Default port: `6379`

Or use WSL2:
```powershell
# In WSL2 terminal
wsl
sudo apt-get install redis-server
sudo service redis-server start
```

### macOS
```bash
brew install redis
brew services start redis
```

### Linux
```bash
sudo apt-get install redis-server
sudo service redis-server start
```

Verify: `redis-cli ping` should return `PONG`

## Step 3: (Optional) MinIO Setup

### Windows
1. Download from https://min.io/download#/windows
2. Create a local directory for storage: `D:\minio-data`
3. Run:
```powershell
minio.exe server D:\minio-data --console-address ":9001"
```

### macOS/Linux
```bash
brew install minio/stable/minio
minio server /path/to/minio-data --console-address ":9001"
```

- Default user: `minioadmin`
- Default password: `minioadmin`
- API: http://localhost:9000
- Console: http://localhost:9001

## Step 4: (Optional) MailHog Setup

### Windows
1. Download from https://github.com/mailhog/MailHog/releases
2. Run: `MailHog.exe`
3. SMTP: localhost:1025
4. Web UI: http://localhost:8025

### macOS
```bash
brew install mailhog
mailhog
```

### Linux
```bash
# Download binary
wget https://github.com/mailhog/MailHog/releases/download/v1.0.1/MailHog_linux_amd64
chmod +x MailHog_linux_amd64
./MailHog_linux_amd64
```

## Step 5: Backend Setup

```powershell
cd apps/api

# Install dependencies
npm install  # or pnpm install

# Create .env.local file
echo "
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/nexora
REDIS_URL=redis://localhost:6379
JWT_SECRET=local-dev-secret-change-in-production
JWT_ACCESS_TTL=900
JWT_REFRESH_TTL=1209600
" > .env.local

# Start backend (runs on http://localhost:3000)
npm run start:dev
```

## Step 6: Frontend Setup

```powershell
cd apps/web

# Install dependencies
npm install  # or pnpm install

# Start dev server (runs on http://localhost:4200)
npm run start
```

## Step 7: Test Everything

1. Open http://localhost:4200
2. Navigate to `/auth/login`
3. Try clicking buttons
4. Open http://localhost:3000/api/v1/users/me (should show user object)

## Environment Variables

### Backend (.env.local in apps/api/)
```
# Database
DATABASE_URL=postgres://postgres:PASSWORD@localhost:5432/nexora

# Redis (optional)
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-here
JWT_ACCESS_TTL=900
JWT_REFRESH_TTL=1209600

# MinIO (optional)
MINIO_ENDPOINT=localhost:9000
MINIO_BUCKET=nexora-media
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin

# SMTP / MailHog (optional)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_FROM=noreply@nexora.dev

# App
NODE_ENV=development
PORT=3000
```

### Frontend (.env.local in apps/web/)
```
API_URL=http://localhost:3000/api/v1
```

## Troubleshooting

### PostgreSQL connection refused on Windows
- Check Services: Press Win+R, type `services.msc`
- Look for "postgresql-x64-16" (or similar)
- If stopped, right-click → Start

### Redis connection refused
- Windows: Check if Redis port is in use: `netstat -ano | findstr :6379`
- macOS/Linux: `lsof -i :6379`

### Port already in use
- Backend default: 3000
- Frontend default: 4200
- You can change these in `package.json` or `.env` files

### Database not created
```powershell
# Verify DB exists
psql -U postgres -l

# If nexora not listed, create it
psql -U postgres -c "CREATE DATABASE nexora;"

# Load schema
psql -U postgres -d nexora -f infra/db/schema.sql
```

## Next Steps
- Update API_URL in frontend if running on different ports
- Implement real authentication with password hashing
- Connect frontend login to backend `/auth/login` endpoint
- Test realtime Socket.IO connection
