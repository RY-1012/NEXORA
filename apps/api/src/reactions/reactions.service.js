"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ReactionsService = class ReactionsService {
    constructor(db) {
        this.db = db;
    }
    async addPostReaction(postId, userId, type) {
        await this.db.query(`INSERT INTO reactions (target_type, target_id, user_id, type)
       VALUES ('post', $1, $2, $3)
       ON CONFLICT (target_type, target_id, user_id)
       DO UPDATE SET type = EXCLUDED.type, created_at = now()`, [postId, userId, type]);
        return { ok: true };
    }
    async removePostReaction(postId, userId) {
        await this.db.query(`DELETE FROM reactions
       WHERE target_type = 'post' AND target_id = $1 AND user_id = $2`, [postId, userId]);
        return { ok: true };
    }
};
exports.ReactionsService = ReactionsService;
exports.ReactionsService = ReactionsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ReactionsService);
//# sourceMappingURL=reactions.service.js.map