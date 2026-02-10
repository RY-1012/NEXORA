"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let CommentsService = class CommentsService {
    constructor(db) {
        this.db = db;
    }
    async listByPost(postId) {
        const result = await this.db.query(`SELECT c.id,
              c.content,
              c.created_at,
              c.author_id,
              p.display_name,
              p.avatar_url
       FROM comments c
       JOIN profiles p ON p.user_id = c.author_id
       WHERE c.post_id = $1
       ORDER BY c.created_at ASC`, [postId]);
        return result.rows.map((row) => ({
            id: row.id,
            content: row.content,
            createdAt: row.created_at,
            author: {
                id: row.author_id,
                displayName: row.display_name,
                avatarUrl: row.avatar_url
            }
        }));
    }
    async create(postId, authorId, content) {
        const result = await this.db.query(`INSERT INTO comments (post_id, author_id, content)
       VALUES ($1, $2, $3)
       RETURNING id, content, created_at, author_id`, [postId, authorId, content]);
        const row = result.rows[0];
        return {
            id: row.id,
            content: row.content,
            createdAt: row.created_at,
            authorId: row.author_id
        };
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CommentsService);
//# sourceMappingURL=comments.service.js.map