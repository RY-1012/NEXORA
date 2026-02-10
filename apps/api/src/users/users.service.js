"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async getMe(userId) {
        const result = await this.db.query(`SELECT u.id, u.email, p.display_name, p.bio, p.avatar_url
       FROM users u
       JOIN profiles p ON p.user_id = u.id
       WHERE u.id = $1`, [userId]);
        const row = result.rows[0];
        if (!row) {
            return null;
        }
        return {
            id: row.id,
            displayName: row.display_name,
            email: row.email,
            bio: row.bio,
            avatarUrl: row.avatar_url
        };
    }
    async getById(id) {
        const result = await this.db.query(`SELECT u.id, u.email, p.display_name, p.bio, p.avatar_url
       FROM users u
       JOIN profiles p ON p.user_id = u.id
       WHERE u.id = $1`, [id]);
        const row = result.rows[0];
        if (!row) {
            return null;
        }
        return {
            id: row.id,
            displayName: row.display_name,
            bio: row.bio,
            avatarUrl: row.avatar_url
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map