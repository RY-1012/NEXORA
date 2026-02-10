"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ThreadsService = class ThreadsService {
    constructor(db) {
        this.db = db;
    }
    async listThreads(userId) {
        const result = await this.db.query(`SELECT t.id, t.title, t.is_group, t.created_at
       FROM threads t
       JOIN thread_members tm ON tm.thread_id = t.id
       WHERE tm.user_id = $1
       ORDER BY t.created_at DESC`, [userId]);
        return result.rows.map((row) => ({
            id: row.id,
            title: row.title,
            isGroup: row.is_group,
            createdAt: row.created_at
        }));
    }
    async createThread(userId, participantIds, title, isGroup = false) {
        const uniqueParticipants = Array.from(new Set([userId, ...participantIds]));
        const threadResult = await this.db.query(`INSERT INTO threads (title, is_group)
       VALUES ($1, $2)
       RETURNING id, title, is_group, created_at`, [title ?? null, isGroup]);
        const thread = threadResult.rows[0];
        for (const participantId of uniqueParticipants) {
            await this.db.query(`INSERT INTO thread_members (thread_id, user_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`, [thread.id, participantId]);
        }
        return {
            id: thread.id,
            title: thread.title,
            isGroup: thread.is_group,
            createdAt: thread.created_at
        };
    }
    async listMessages(threadId) {
        const result = await this.db.query(`SELECT m.id,
              m.body,
              m.created_at,
              m.sender_id,
              p.display_name,
              p.avatar_url
       FROM messages m
       JOIN profiles p ON p.user_id = m.sender_id
       WHERE m.thread_id = $1
       ORDER BY m.created_at ASC`, [threadId]);
        return result.rows.map((row) => ({
            id: row.id,
            body: row.body,
            createdAt: row.created_at,
            sender: {
                id: row.sender_id,
                displayName: row.display_name,
                avatarUrl: row.avatar_url
            }
        }));
    }
    async sendMessage(threadId, senderId, body) {
        const result = await this.db.query(`INSERT INTO messages (thread_id, sender_id, body)
       VALUES ($1, $2, $3)
       RETURNING id, body, created_at, sender_id`, [threadId, senderId, body]);
        const message = result.rows[0];
        return {
            id: message.id,
            body: message.body,
            createdAt: message.created_at,
            senderId: message.sender_id
        };
    }
};
exports.ThreadsService = ThreadsService;
exports.ThreadsService = ThreadsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ThreadsService);
//# sourceMappingURL=threads.service.js.map