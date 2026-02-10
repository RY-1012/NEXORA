# Service Connection Checklist

Check off each service as you set it up. Tell me when you're ready for the next one!

## ✅ Completed
- [x] PostgreSQL schema created in `infra/db/schema.sql`
- [x] Backend ready to connect to local DB

## 📋 Todo - Tell Me When Ready

- [ ] **PostgreSQL** installed locally
  - Windows installer from: https://www.postgresql.org/download/windows/
  - After install, run: `psql -U postgres -d nexora -f infra/db/schema.sql`
  - **Tell me**: Port? Password? Any errors?

- [ ] **Redis** installed (optional for MVP)
  - Windows: https://github.com/microsoftarchive/redis/releases
  - macOS: `brew install redis`
  - **Tell me**: When ready, I'll add caching config

- [ ] **MinIO** installed (optional for file uploads)
  - Download: https://min.io/download#/windows
  - Create data directory: `D:\minio-data`
  - **Tell me**: When running, I'll wire up file upload endpoints

- [ ] **MailHog** installed (optional for email testing)
  - Download: https://github.com/mailhog/MailHog/releases
  - **Tell me**: When running, I'll add email features

## Connection Details Needed

When you install PostgreSQL, please provide:
1. ✅ Port (usually 5432)
2. ✅ Master password (set during install)
3. ✅ Installation path (verify it's in PATH)

Example:
```
PostgreSQL port: 5432
Password: mySecurePass123
Location: C:\Program Files\PostgreSQL\16
Status: ✓ Database nexora created
Status: ✓ Schema loaded
```

Then I'll update `.env.local` automatically.

## One-by-One Setup

**Current status**: Backend scaffolding complete, waiting for PostgreSQL.

**Work in this order:**
1. Install PostgreSQL → run schema → test connection
2. (Optional) Redis → I'll add cache layer
3. (Optional) MinIO → I'll add file upload
4. (Optional) MailHog → I'll add email notifications

**No Docker needed** - all services run natively.
