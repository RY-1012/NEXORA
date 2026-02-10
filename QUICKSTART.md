# NEXORA - Local Dev Quick Start

## TL;DR - Get Running in 5 Minutes

### 1️⃣ PostgreSQL Setup (One-time)
```powershell
# Install PostgreSQL from https://www.postgresql.org/download/windows/
# During install, set password as "postgres123" or your choice

# After install, create the database:
psql -U postgres -c "CREATE DATABASE nexora;"
psql -U postgres -d nexora -f infra/db/schema.sql

# Verify:
psql -U postgres -d nexora -c "SELECT COUNT(*) FROM users;"
```

### 2️⃣ Backend
```powershell
cd apps/api
cp .env.example .env.local
# Edit .env.local and update DATABASE_URL with your postgres password
npm install
npm run start:dev
```
Backend runs on **http://localhost:3000**

### 3️⃣ Frontend
```powershell
# New terminal window
cd apps/web
npm install
npm run start
```
Frontend runs on **http://localhost:4200**

### 4️⃣ Test
- Open http://localhost:4200 in browser
- You should see the landing page with "NEXORA" header
- Click "Theme" to toggle dark mode
- Go to `/auth/login` to see login page
- Try calling API manually: `curl http://localhost:3000/api/v1/posts`

---

## Database Connection Guide

### Tell Me When You Set Up PostgreSQL
When you've installed PostgreSQL locally, tell me:
1. ✅ Installation location (default: C:\Program Files\PostgreSQL\16)
2. ✅ Port number (default: 5432)
3. ✅ Master password (you set during install)
4. ✅ Database name: `nexora`

I'll update the backend configuration file for you.

### Schema Already Provided
The SQL schema is in [infra/db/schema.sql](infra/db/schema.sql) - it creates all tables:
- users, profiles, follows
- posts, comments, reactions
- threads, messages
- notifications

Run it once: `psql -U postgres -d nexora -f infra/db/schema.sql`

---

## Optional Services (Skip for MVP)

### Redis (Caching/Sessions)
- Install: https://github.com/microsoftarchive/redis/releases
- Start: Double-click the executable
- Configure: Add `REDIS_URL=redis://localhost:6379` to `.env.local`

### MinIO (File Storage)
- Install: https://min.io/download#/windows
- Start: `minio.exe server D:\minio-data --console-address ":9001"`
- Configure: Add MinIO vars to `.env.local`

### MailHog (Email Testing)
- Install: https://github.com/mailhog/MailHog/releases
- Start: Double-click the executable
- Web UI: http://localhost:8025

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `psql: command not found` | PostgreSQL not in PATH; use full path or reinstall |
| Connection refused on 5432 | PostgreSQL not running; check Services (Win+R → services.msc) |
| Port 3000 already in use | Change PORT in `.env.local` or kill process: `netstat -ano \| findstr :3000` |
| Frontend can't reach API | Check `API_URL` in `.env.local`, should be `http://localhost:3000/api/v1` |

---

## When Ready to Add Databases One-by-One

1. **PostgreSQL**: Already set up above ✅
2. **Redis**: Just tell me when installed, I'll update config
3. **MinIO**: Just tell me when installed, I'll add file upload endpoints
4. **Notification Service**: We can add later (Firebase or free SMTP)

See [LOCAL_SETUP.md](LOCAL_SETUP.md) for detailed full guide.
