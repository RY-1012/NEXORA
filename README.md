# NEXORA (Open-Source, Zero-Cost Social Platform MVP)

A free-only, open-source-first blueprint and partial implementation of a modern social media platform. Optimized for learning, portfolio showcases, final-year projects, and MVP demos. **Not for paid production without further hardening.**


## 🏗️ Tech Stack

- **Frontend**: Angular 17+ standalone (zero NgModules), signals, Tailwind CSS, PWA-ready
- **Backend**: NestJS (TypeScript), REST APIs, JWT + refresh tokens, RBAC, WebSocket
- **Database**: PostgreSQL (free, self-hosted) + optional Redis, MinIO
- **Realtime**: Socket.IO for chat, typing, read receipts, presence
- **DevOps**: Local dev + free deployment (Render/Fly/Railway/Vercel)

## 📁 Quick Navigation

- **Getting Started**: Start with [QUICKSTART.md](QUICKSTART.md) (5 minutes)
- **Detailed Setup**: See [LOCAL_SETUP.md](LOCAL_SETUP.md) for every OS
- **Architecture**: Deep dive in [ARCHITECTURE.md](ARCHITECTURE.md)
- **API Docs**: Endpoints & contracts in [API_REFERENCE.md](API_REFERENCE.md)
- **DB Setup**: Track database installs in [DATABASE_SETUP_TRACKER.md](DATABASE_SETUP_TRACKER.md)

## 📂 Monorepo Structure
```
apps/
  web/           # Angular 17+ standalone frontend
  api/           # NestJS backend (Node.js)
infra/
  db/
    schema.sql   # PostgreSQL schema (run once)
.github/
  workflows/
    ci.yml       # GitHub Actions CI pipeline
```

## Frontend Architecture (Angular Standalone)
- bootstrapApplication + ApplicationConfig
- Routing: provideRouter + lazy feature routes
- State: signals (`signal`, `computed`, `effect`), lightweight stores
- HTTP: provideHttpClient + interceptors
- Theming: CSS variables + Tailwind, prefers-color-scheme
- PWA: manifest + service worker ready
- i18n: Angular i18n or ngx-translate (open-source)
- Accessibility: semantic HTML, ARIA labels, keyboard navigation

### Frontend Feature Slices
- auth: login, refresh flow, guarded routes
- feed: timeline + posting
- profile: user profile, followers/following
- messages: realtime chat, read receipts
- notifications: in-app + push
- settings: privacy, theme, i18n

## Backend Architecture (NestJS)
- REST APIs with DTO validation
- JWT access + refresh tokens
- RBAC: `@Roles()` + guard
- Rate limiting: `@nestjs/throttler`
- Audit logging: interceptor
- Realtime: WebSocket gateway (Socket.IO)

### Core Domains
- users, profiles
- posts, comments, reactions
- follows (followers/following)
- messages, threads
- notifications
- moderation/reports

## Data Model (PostgreSQL Baseline)
Key tables and relations (see infra/db/schema.sql):
- users (id, email, password_hash, roles)
- profiles (user_id, display_name, bio, avatar_url)
- follows (follower_id, following_id)
- posts (id, author_id, content, media)
- comments (id, post_id, author_id)
- reactions (target_type, target_id, user_id)
- messages (thread_id, sender_id, body)
- notifications (user_id, type, payload)

## API Contracts (REST)
Base URL: /api/v1

### Auth
- POST /auth/login
  - body: { email, password }
  - response: { accessToken, refreshToken, user }
- POST /auth/refresh
  - body: { refreshToken }
  - response: { accessToken }

### Users
- GET /users/me
- PATCH /users/me
- GET /users/:id

### Posts
- GET /posts
- POST /posts
- GET /posts/:id
- POST /posts/:id/comments
- POST /posts/:id/reactions

### Notifications
- GET /notifications
- PATCH /notifications/:id/read

## Realtime Flows (WebSockets)
- connect: client sends auth token
- presence: server broadcasts online status
- typing: client emits typing to thread
- read receipts: client emits read events
- notifications: server pushes new events

## Free-Only Media Handling
- Local filesystem for dev
- MinIO (S3-compatible, open-source) for object storage
- Image/video validation: MIME + size + dimensions
- Compression: sharp (Node.js, open-source)

## AI Features (Open-Source Only)
- Rule-based moderation: keyword + regex filters
- Toxicity detection: optional local inference with open-source models
- Recommendations: basic collaborative + recent activity weighting

## DevOps (Zero-Cost, Docker-Free)
- Local service setup (PostgreSQL, Redis, MinIO): download + run independently
- Nginx for reverse proxy (optional)
- GitHub Actions free-tier CI
- Optional free-tier deploys: Render/Fly/Railway/Vercel (limits apply)
- **No Docker required; all services connect via local ports**

## Roadmap (MVP -> Demo)
1. Auth + profiles + basic feed
2. Realtime chat + notifications
3. Media upload + compression
4. Moderation + reporting
5. PWA + i18n
6. Observability + audit exports

## Notes
- This project is intended for learning and demo usage, not large-scale paid production.
- All tools listed are free and open-source or have free tiers that can be used at zero cost.
