"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(db, jwtService, configService) {
        this.db = db;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(email, password) {
        if (!email || !password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        let user = await this.findUserByEmail(email);
        if (!user) {
            user = await this.createUser(email, password);
        }
        else {
            const ok = await (0, bcrypt_1.compare)(password, user.password_hash);
            if (!ok) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
        }
        const accessToken = this.signAccessToken(user);
        const refreshToken = await this.issueRefreshToken(user.id);
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                displayName: user.display_name,
                email: user.email,
                roles: user.roles
            }
        };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Missing refresh token');
        }
        const tokenHash = this.hashToken(refreshToken);
        const result = await this.db.query(`SELECT user_id
       FROM refresh_tokens
       WHERE token_hash = $1
         AND revoked_at IS NULL
         AND expires_at > now()`, [tokenHash]);
        if (!result.rowCount) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const user = await this.findUserById(result.rows[0].user_id);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        return {
            accessToken: this.signAccessToken(user)
        };
    }
    signAccessToken(user) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            roles: user.roles
        });
    }
    async findUserByEmail(email) {
        const result = await this.db.query(`SELECT u.id, u.email, u.password_hash, u.roles, p.display_name
       FROM users u
       JOIN profiles p ON p.user_id = u.id
       WHERE u.email = $1`, [email]);
        return result.rows[0] ?? null;
    }
    async findUserById(id) {
        const result = await this.db.query(`SELECT u.id, u.email, u.password_hash, u.roles, p.display_name
       FROM users u
       JOIN profiles p ON p.user_id = u.id
       WHERE u.id = $1`, [id]);
        return result.rows[0] ?? null;
    }
    async createUser(email, password) {
        const passwordHash = await (0, bcrypt_1.hash)(password, 10);
        const displayName = email.split('@')[0];
        const userResult = await this.db.query(`INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, roles`, [email, passwordHash]);
        const userId = userResult.rows[0].id;
        await this.db.query(`INSERT INTO profiles (user_id, display_name)
       VALUES ($1, $2)`, [userId, displayName]);
        return {
            id: userId,
            email,
            password_hash: passwordHash,
            roles: userResult.rows[0].roles,
            display_name: displayName
        };
    }
    async issueRefreshToken(userId) {
        const refreshToken = (0, crypto_1.randomBytes)(48).toString('hex');
        const tokenHash = this.hashToken(refreshToken);
        const ttlSeconds = this.configService.get('jwt.refreshTtl') ?? 1209600;
        const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
        await this.db.query(`INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)`, [userId, tokenHash, expiresAt]);
        return refreshToken;
    }
    hashToken(token) {
        return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map