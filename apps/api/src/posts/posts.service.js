"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let PostsService = class PostsService {
    constructor(db) {
        this.db = db;
    }
    async list() {
        const result = await this.db.query(`SELECT p.id,
              p.content,
              p.created_at,
              p.author_id,
              pr.display_name,
              pr.avatar_url,
              COALESCE(c.count, 0) AS comments,
              COALESCE(r.count, 0) AS reactions
       FROM posts p
       JOIN profiles pr ON pr.user_id = p.author_id
       LEFT JOIN (
         SELECT post_id, COUNT(*)::int AS count
         FROM comments
         GROUP BY post_id
       ) c ON c.post_id = p.id
       LEFT JOIN (
         SELECT target_id, COUNT(*)::int AS count
         FROM reactions
         WHERE target_type = 'post'
         GROUP BY target_id
       ) r ON r.target_id = p.id
       ORDER BY p.created_at DESC
       LIMIT 50`);
        return result.rows.map((row) => ({
            id: row.id,
            content: row.content,
            createdAt: row.created_at,
            author: {
                id: row.author_id,
                displayName: row.display_name,
                avatarUrl: row.avatar_url
            },
            comments: Number(row.comments ?? 0),
            reactions: Number(row.reactions ?? 0)
        }));
    }
    async byId(id) {
        const result = await this.db.query(`SELECT p.id,
              p.content,
              p.created_at,
              p.author_id,
              pr.display_name,
              pr.avatar_url,
              COALESCE(c.count, 0) AS comments,
              COALESCE(r.count, 0) AS reactions
       FROM posts p
       JOIN profiles pr ON pr.user_id = p.author_id
       LEFT JOIN (
         SELECT post_id, COUNT(*)::int AS count
         FROM comments
         GROUP BY post_id
       ) c ON c.post_id = p.id
       LEFT JOIN (
         SELECT target_id, COUNT(*)::int AS count
         FROM reactions
         WHERE target_type = 'post'
         GROUP BY target_id
       ) r ON r.target_id = p.id
       WHERE p.id = $1`, [id]);
        const row = result.rows[0];
        if (!row) {
            return null;
        }
        return {
            id: row.id,
            content: row.content,
            createdAt: row.created_at,
            author: {
                id: row.author_id,
                displayName: row.display_name,
                avatarUrl: row.avatar_url
            },
            comments: Number(row.comments ?? 0),
            reactions: Number(row.reactions ?? 0)
        };
    }
    async create(authorId, content) {
        const result = await this.db.query(`INSERT INTO posts (author_id, content)
       VALUES ($1, $2)
       RETURNING id, content, created_at, author_id`, [authorId, content]);
        const post = result.rows[0];
        return {
            id: post.id,
            content: post.content,
            createdAt: post.created_at,
            authorId: post.author_id
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map