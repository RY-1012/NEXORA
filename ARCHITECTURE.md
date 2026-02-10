# Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser / Client                      │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP/HTTPS
                             │ WebSocket
┌────────────────────────────▼────────────────────────────────┐
│                  Angular Standalone Frontend                │
├─────────────────────────────────────────────────────────────┤
│ • Signals for state management                              │
│ • Lazy-loaded feature routes with route guards              │
│ • HTTP interceptors (auth, error handling)                  │
│ • PWA-ready with service worker                             │
│ • Tailwind CSS responsive UI                                │
│ • i18n support with ngx-translate                           │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ REST API calls
                             │ WebSocket upgrade
┌────────────────────────────▼────────────────────────────────┐
│                 NestJS Backend (Node.js)                    │
├─────────────────────────────────────────────────────────────┤
│ • Modular architecture (Auth, Users, Posts, Realtime)       │
│ • JWT authentication + refresh tokens                       │
│ • RBAC with @Roles guard                                    │
│ • Global validation pipes (class-validator)                 │
│ • Interceptors for audit logging + error handling           │
│ • WebSocket gateway for realtime features                   │
│ • Rate limiting with @nestjs/throttler                      │
└───────┬────────────┬────────────┬──────────────────────────┘
        │            │            │
        │ SQL        │ Cache      │ Files
        ▼            ▼            ▼
   PostgreSQL     Redis       MinIO/Local
   (users, posts, (sessions)  (media)
    follows,
    messages)
```

## Data Flow

### User Authentication
1. Client POST `/auth/login` with credentials
2. Backend validates credentials, signs JWT
3. Response includes `accessToken` (15 min) + `refreshToken` (14 days)
4. Client stores tokens in memory / localStorage
5. HTTP interceptor appends `Authorization: Bearer <token>` to requests

### Creating Posts
1. Client emits POST `/posts` with content
2. NestJS validates DTO (shape, length)
3. Audit interceptor logs action (user, timestamp, method)
4. Service creates record in `posts` table
5. Response sent back
6. *Future: broadcast to followers via WebSocket*

### Realtime Chat
1. Client connects via WebSocket: `wss://localhost:3000/realtime`
2. Sends auth token, server validates
3. Emits `presence:join` → broadcast to all users
4. When typing: emit `typing: { threadId, typing: true }`
5. Others receive broadcast
6. On message send: store in DB, emit read receipt
7. On close: emit `presence:leave`

## Folder Structure

```
NEXORA/
├── README.md                    # Overview
├── QUICKSTART.md               # Get running in 5 minutes
├── LOCAL_SETUP.md              # Detailed local setup
├── API_REFERENCE.md            # API docs
├── ARCHITECTURE.md             # This file
├── package.json                # Monorepo root
├── tsconfig.json               # TS config base
├── .gitignore
├── .prettierrc
│
├── apps/
│   ├── web/                    # Angular Standalone Frontend
│   │   ├── src/
│   │   │   ├── main.ts         # bootstrapApplication entry
│   │   │   ├── index.html
│   │   │   ├── styles.css      # Tailwind entry
│   │   │   ├── manifest.webmanifest
│   │   │   └── app/
│   │   │       ├── app.config.ts       # ApplicationConfig
│   │   │       ├── app.routes.ts       # Main routing
│   │   │       ├── app.component.ts    # Root component
│   │   │       ├── core/
│   │   │       │   ├── guards/
│   │   │       │   │   └── auth.guard.ts
│   │   │       │   ├── interceptors/
│   │   │       │   │   └── auth.interceptor.ts
│   │   │       │   └── state/
│   │   │       │       └── auth.store.ts
│   │   │       ├── features/
│   │   │       │   ├── auth/
│   │   │       │   │   ├── auth.routes.ts
│   │   │       │   │   └── login.page.ts
│   │   │       │   ├── feed/
│   │   │       │   │   ├── feed.routes.ts
│   │   │       │   │   └── feed.page.ts
│   │   │       │   └── [profile, messages, settings...]
│   │   │       └── shared/
│   │   │           └── ui/
│   │   │               └── button.component.ts
│   │   ├── angular.json
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.spec.json
│   │   ├── package.json
│   │   └── .env.example
│   │
│   └── api/                    # NestJS Backend
│       ├── src/
│       │   ├── main.ts         # NestFactory.create + app.listen
│       │   ├── app.module.ts   # Root module (imports all modules)
│       │   ├── config/
│       │   │   └── configuration.ts
│       │   ├── core/
│       │   │   └── core.module.ts
│       │   ├── common/
│       │   │   ├── decorators/
│       │   │   │   └── roles.decorator.ts
│       │   │   ├── guards/
│       │   │   │   └── roles.guard.ts
│       │   │   └── interceptors/
│       │   │       └── audit.interceptor.ts
│       │   ├── auth/
│       │   │   ├── auth.module.ts
│       │   │   ├── auth.controller.ts
│       │   │   ├── auth.service.ts
│       │   │   └── dto/
│       │   │       ├── login.dto.ts
│       │   │       └── refresh.dto.ts
│       │   ├── users/
│       │   │   ├── users.module.ts
│       │   │   ├── users.controller.ts
│       │   │   └── users.service.ts
│       │   ├── posts/
│       │   │   ├── posts.module.ts
│       │   │   ├── posts.controller.ts
│       │   │   └── posts.service.ts
│       │   ├── realtime/
│       │   │   ├── realtime.module.ts
│       │   │   └── realtime.gateway.ts
│       │   └── [comments, follows, messages, notifications...]
│       ├── tsconfig.json
│       ├── tsconfig.build.json
│       ├── jest.config.js
│       ├── package.json
│       └── .env.example
│
├── infra/
│   ├── db/
│   │   └── schema.sql       # PostgreSQL schema (baseline)
│   └── docker-compose.yml   # Replaced with setup instructions
│
└── docs/
    └── [additional docs]
```

## Data Model (PostgreSQL)

### Core Tables

#### users
```sql
id (UUID) PK
email (TEXT) UNIQUE NOT NULL
password_hash (TEXT) NOT NULL
roles (TEXT[]) DEFAULT {user}
created_at (TIMESTAMPTZ)
```

#### profiles
```sql
user_id (UUID) PK FK → users.id
display_name (TEXT)
bio (TEXT)
avatar_url (TEXT)
updated_at (TIMESTAMPTZ)
```

#### follows
```sql
follower_id (UUID) FK → users.id
following_id (UUID) FK → users.id
created_at (TIMESTAMPTZ)
PRIMARY KEY (follower_id, following_id)
```

#### posts
```sql
id (UUID) PK
author_id (UUID) FK → users.id
content (TEXT)
media (JSONB) - array of {url, type, size}
created_at (TIMESTAMPTZ)
```

#### comments
```sql
id (UUID) PK
post_id (UUID) FK → posts.id
author_id (UUID) FK → users.id
content (TEXT)
created_at (TIMESTAMPTZ)
```

#### reactions
```sql
id (UUID) PK
target_type (TEXT) - 'post' | 'comment'
target_id (UUID)
user_id (UUID) FK → users.id
type (TEXT) - 'like' | 'love' | 'haha'
created_at (TIMESTAMPTZ)
```

#### messages
```sql
id (UUID) PK
thread_id (UUID) FK → threads.id
sender_id (UUID) FK → users.id
body (TEXT)
created_at (TIMESTAMPTZ)
```

#### notifications
```sql
id (UUID) PK
user_id (UUID) FK → users.id
type (TEXT) - 'follow' | 'like' | 'comment' | 'message'
payload (JSONB) - { actor_id, post_id, message_preview }
read_at (TIMESTAMPTZ)
created_at (TIMESTAMPTZ)
```

## Authentication Flow

1. **Login**
   - User sends email + password
   - Server hashes password and compares
   - If match: generates JWT pair
   - Returns: `{ accessToken, refreshToken, user }`

2. **Access Token Usage**
   - Client stores in memory
   - Interceptor adds `Authorization: Bearer <token>` to every request
   - Token valid for 15 minutes

3. **Token Refresh**
   - Before expiry, client sends refreshToken to `/auth/refresh`
   - Server validates refresh token
   - Returns new access token
   - Continue with new token

4. **Protected Routes**
   - Route guards check `authStore.token()` signal
   - If missing, redirect to login
   - WebSocket events validated at connection

## Realtime Architecture

- **Transport**: Socket.IO (fallback to HTTP long-poll)
- **Namespace**: `/realtime` - separate from main server
- **Auth**: Token sent in initial connection, validated once
- **Events**:
  - `presence:join` - broadcast user online
  - `typing` - notify thread members of typing
  - `read` - confirm message read
  - `notification` - server→client push (new follow, like, message)

## Scalability Notes (Within Free Limits)

### Current Limits
- PostgreSQL: Local dev = single-threaded, ~100 concurrent connections
- Redis: Free tier = 256MB, suitable for session caching
- Frontend: Signals avoid change detection thrashing
- Backend: NestJS single process, handles 1K-5K concurrent WebSocket connections

### When to Scale (Future)
- Add read replicas for PostgreSQL (Render free tier)
- Implement message queue (Bull + Redis) for background jobs
- Add CDN for assets (Vercel, Cloudflare free)
- Horizontal scaling behind load balancer

## Security Considerations

- **Passwords**: Bcrypt hashing with salt (cost: 10+)
- **JWTs**: HS256 with strong secret
- **CORS**: Frontend origin whitelisted
- **Rate Limiting**: @nestjs/throttler guards endpoints
- **Validation**: class-validator ensures DTO shape
- **Audit Logging**: Every request logged (user, method, route, duration)
- **HTTPS in Production**: Self-signed for local, FREE cert (Let's Encrypt) for production

## Testing Strategy

- **Unit**: Jest for services (no DB)
- **Integration**: Jest with test DB (PostgreSQL)
- **E2E**: Playwright for UI flows
- **API**: Manual requests or REST client extension

## Deployment (Free Tiers)

### Frontend
- Vercel: Auto-deploy from GitHub, free tier = unlimited bandwidth
- Netlify: Similar, free plus forms
- GitHub Pages: Static only

### Backend
- Render: Free tier = 0.5 vCPU, 512MB RAM, sleeps after inactivity
- Railway: $5/month starting
- Fly.io: Generous free tier, $0.15/GB outbound
- Replit: Quick demo, limited resources

### Database
- Render: PostgreSQL free tier = 256MB, purged after 30 days inactivity
- Supabase: 500MB PostgreSQL, 1GB storage (free tier)
- Neon: Serverless PostgreSQL (free tier)

## Free-Only Constraint Compliance

✅ No Docker (local services via native installers)
✅ No paid SDKs (NestJS, Angular, Socket.IO all OSS)
✅ No cloud lock-in (portable schema, can self-host)
✅ No proprietary database (PostgreSQL community)
✅ AI via rule-based + open models only
✅ File storage via filesystem or MinIO (self-hosted)
✅ Notifications via free SMTP / Cloud Messaging

---

## Next Steps

1. Implement real JWT signing with bcrypt password hashing
2. Wire Angular login form to API auth endpoint
3. Add database connection pool (pg library)
4. Implement Socket.IO client in frontend
5. Add basic feed fetching and post creation
