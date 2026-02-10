"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let NotificationsService = class NotificationsService {
    constructor(db) {
        this.db = db;
    }
    async list(userId) {
        const result = await this.db.query(`SELECT id, type, payload, read_at, created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`, [userId]);
        return result.rows.map((row) => ({
            id: row.id,
            type: row.type,
            payload: row.payload,
            readAt: row.read_at,
            createdAt: row.created_at
        }));
    }
    async markRead(userId, notificationId) {
        await this.db.query(`UPDATE notifications
       SET read_at = now()
       WHERE id = $1 AND user_id = $2`, [notificationId, userId]);
        return { ok: true };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map