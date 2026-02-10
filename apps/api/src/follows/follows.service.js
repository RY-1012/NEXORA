"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let FollowsService = class FollowsService {
    constructor(db) {
        this.db = db;
    }
    async follow(targetId, followerId) {
        await this.db.query(`INSERT INTO follows (follower_id, following_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`, [followerId, targetId]);
        return { ok: true };
    }
    async unfollow(targetId, followerId) {
        await this.db.query(`DELETE FROM follows
       WHERE follower_id = $1 AND following_id = $2`, [followerId, targetId]);
        return { ok: true };
    }
};
exports.FollowsService = FollowsService;
exports.FollowsService = FollowsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], FollowsService);
//# sourceMappingURL=follows.service.js.map