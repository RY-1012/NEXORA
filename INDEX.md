# NEXORA Documentation Index

Quick reference for all documentation files and their purposes.

## 🚀 Getting Started (Start Here!)

| File | Purpose |
|------|---------|
| [STARTUP.md](STARTUP.md) | **Complete 8-step guide** to get NEXORA running for the first time |
| [QUICKSTART.md](QUICKSTART.md) | 5-minute TL;DR version |
| [setup-windows.bat](setup-windows.bat) | Automated setup script for Windows |
| [setup-unix.sh](setup-unix.sh) | Automated setup script for macOS/Linux |
| [verify.sh](verify.sh) | Check if everything is installed correctly |

**Start with:** [STARTUP.md](STARTUP.md) ⬅️ **THIS ONE FIRST**

---

## 📘 Core Documentation

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview & tech stack |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, data models, API flows |
| [API_REFERENCE.md](API_REFERENCE.md) | REST endpoint contracts & WebSocket events |
| [LOCAL_SETUP.md](LOCAL_SETUP.md) | Detailed setup for Windows/Mac/Linux |

**Most important:** [ARCHITECTURE.md](ARCHITECTURE.md) for understanding the system.

---

## 🔧 Troubleshooting & Reference

| File | Purpose | When to Use |
|------|---------|-----------|
| [ERRORS.md](ERRORS.md) | Common errors & solutions | When something breaks |
| [LOCAL_SETUP.md](LOCAL_SETUP.md) | Detailed service setup | Installing PostgreSQL, Redis, MinIO manually |
| [DATABASE_SETUP_TRACKER.md](DATABASE_SETUP_TRACKER.md) | Track database installations | When setting up databases |
| [clean.sh](clean.sh) | Clean all compiled files | Before reinstalling everything |

---

## 📁 Folder Structure

```
NEXORA/
├── docs/ files (these .md files)
├── apps/
│   ├── api/     ← NestJS Backend (Node.js)
│   └── web/     ← Angular Frontend
├── infra/
│   └── db/
│       └── schema.sql  ← Database initialization
└── .github/
    └── workflows/
        └── ci.yml      ← GitHub Actions CI
```

---

## 🎯 Quick Commands

### First Time Setup
```bash
# 1. Run setup (Windows)
.\setup-windows.bat

# 2. Or (macOS/Linux)
bash setup-unix.sh

# 3. Verify everything
bash verify.sh
```

### Run the Application
```bash
# Terminal 1 - Backend
cd apps/api
npm run start:dev

# Terminal 2 - Frontend
cd apps/web
npm run start

# Browser
http://localhost:4200
```

### Clean & Reinstall
```bash
bash clean.sh
bash setup-unix.sh
```

---

## 📖 Documentation by Topic

### Backend (NestJS)
- **Setup**: [STARTUP.md](STARTUP.md#step-4-start-backend)
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md#backend-architecture-nestjs)
- **API Contract**: [API_REFERENCE.md](API_REFERENCE.md#api-routes--contract-reference)
- **Errors**: [ERRORS.md](ERRORS.md#backend-startup-errors)

### Frontend (Angular)
- **Setup**: [STARTUP.md](STARTUP.md#step-5-start-frontend)
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md#frontend-architecture-angular-standalone)
- **Errors**: [ERRORS.md](ERRORS.md#frontend-startup-errors)

### Database
- **Setup**: [STARTUP.md](STARTUP.md#step-2-install-postgresql-locally)
- **Schema**: [infra/db/schema.sql](infra/db/schema.sql)
- **Models**: [ARCHITECTURE.md](ARCHITECTURE.md#data-model-postgresql)
- **Troubleshooting**: [DATABASE_SETUP_TRACKER.md](DATABASE_SETUP_TRACKER.md)

### Realtime Features
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md#realtime-architecture)
- **WebSocket Events**: [API_REFERENCE.md](API_REFERENCE.md#websocket-events-realtime)

### DevOps & Deployment
- **Local Services**: [LOCAL_SETUP.md](LOCAL_SETUP.md)
- **CI/CD**: [.github/workflows/ci.yml](.github/workflows/ci.yml)
- **Deployment**: [ARCHITECTURE.md](ARCHITECTURE.md#deployment-free-tiers)

---

## 🔍 Find Answer By Problem

### "How do I...?"

| Question | Answer |
|----------|--------|
| Get started? | [STARTUP.md](STARTUP.md) |
| Understand the code? | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Call an API endpoint? | [API_REFERENCE.md](API_REFERENCE.md) |
| Fix an error? | [ERRORS.md](ERRORS.md) |
| Use realtime chat? | [ARCHITECTURE.md](ARCHITECTURE.md#realtime-architecture) |
| Deploy to production? | [ARCHITECTURE.md](ARCHITECTURE.md#deployment-free-tiers) |
| Add a new endpoint? | [ARCHITECTURE.md](ARCHITECTURE.md#backend-architecture-nestjs) |
| Style a component? | [QUICKSTART.md](QUICKSTART.md) + Tailwind docs |
| Add authentication? | [ARCHITECTURE.md](ARCHITECTURE.md#authentication-flow) |

---

## 🎓 Learning Path

**Week 1: Understand the System**
1. Read [README.md](README.md) overview
2. Read [ARCHITECTURE.md](ARCHITECTURE.md) system design
3. Follow [STARTUP.md](STARTUP.md) to get running
4. Explore [API_REFERENCE.md](API_REFERENCE.md)

**Week 2: Modify Existing Code**
1. Add fields to database schema
2. Create new API endpoints
3. Build new Angular pages
4. Connect them together

**Week 3: Add Features**
1. Authentication with bcrypt passwords
2. Real database queries (not mock data)
3. Frontend API integration
4. Realtime chat features

---

## 💡 Pro Tips

- **Keep multiple terminals open**: One for backend logs, one for frontend logs
- **Use `verify.sh`**: Run this before starting to catch setup issues
- **Read the code comments**: Understand the patterns used
- **Check terminal output**: Error messages are very helpful
- **Use browser DevTools**: Check network requests to debug API issues

---

## 🆘 Still Stuck?

1. **Check [ERRORS.md](ERRORS.md)** - most common issues there
2. **Run `verify.sh`** - ensures everything installed correctly
3. **Check [STARTUP.md](STARTUP.md#troubleshooting)** - has troubleshooting section
4. **Read terminal logs carefully** - they often tell you exactly what's wrong
5. **Review [ARCHITECTURE.md](ARCHITECTURE.md)** - understand how pieces fit together

---

## 📋 Files Checklist

After running setup, you should have:

- [x] `apps/api/node_modules/` ← backend deps
- [x] `apps/web/node_modules/` ← frontend deps
- [x] `apps/api/.env.local` ← backend config
- [x] `apps/web/.env.local` ← frontend config
- [x] PostgreSQL database `nexora` created
- [x] `nest-cli.json` ← NestJS config
- [x] `.eslintrc.json` files ← code quality

---

## 🚀 Next Steps After First Run

1. ✅ Get it running (follow [STARTUP.md](STARTUP.md))
2. ✅ Understand architecture ([ARCHITECTURE.md](ARCHITECTURE.md))
3. 🔲 Implement real JWT authentication
4. 🔲 Connect frontend login to backend
5. 🔲 Add database queries (not mock data)
6. 🔲 Build post creation feature
7. 🔲 Add realtime chat
8. 🔲 Deploy to free tier (Render/Vercel)

---

**Last Updated**: February 6, 2026
**Status**: ✅ Project scaffolding complete, ready for development
