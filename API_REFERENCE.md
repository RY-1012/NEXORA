# API Routes & Contract Reference

## Auth Endpoints

### POST /api/v1/auth/login
Login and get tokens.
```json
{
  "email": "user@example.com",
  "password": "secure-pass"
}
```
Response (200):
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "displayName": "John Doe",
    "email": "user@example.com",
    "roles": ["user"]
  }
}
```

### POST /api/v1/auth/refresh
Refresh access token.
```json
{
  "refreshToken": "eyJhbGc..."
}
```
Response (200):
```json
{
  "accessToken": "new-access-token"
}
```

## Users Endpoints

### GET /api/v1/users/me
Get current user profile. **Requires Auth**
Response (200):
```json
{
  "id": "uuid",
  "displayName": "John Doe",
  "email": "user@example.com"
}
```

### GET /api/v1/users/:id
Get user by ID.
Response (200):
```json
{
  "id": "uuid",
  "displayName": "John Doe",
  "bio": "Bio text..."
}
```

## Posts Endpoints

### GET /api/v1/posts
List all posts.
Response (200):
```json
[
  {
    "id": "post-uuid",
    "author": "John Doe",
    "content": "Post content...",
    "createdAt": "2026-02-06T10:00:00Z"
  }
]
```

### POST /api/v1/posts
Create new post. **Requires Auth**
```json
{
  "content": "My new post content"
}
```

### GET /api/v1/posts/:id

Connect to `ws://localhost:3000/realtime` with auth token.

### Listening
- `presence:update` → User online/offline
- `typing` → User typing event
- `read` → Message marked as read

### Emitting
- `presence:join` → Announce join
- `typing` → { threadId, typing: boolean }
- `read` → { threadId, messageId }

## Future Endpoints (Coming Soon)

- Comments: POST/GET `/posts/:id/comments`
- Reactions: POST/DELETE `/posts/:id/reactions`
- Messages: GET/POST `/threads/:id/messages`
- Notifications: GET/PATCH `/notifications`
- Follow: POST/DELETE `/users/:id/follow`
