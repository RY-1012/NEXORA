import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { DatabaseService } from '../core/database.service';

interface DbUserRow {
  id: string;
  email: string;
  password_hash: string;
  roles: string[];
  display_name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let user = await this.findUserByEmail(email);
    if (!user) {
      user = await this.createUser(email, password);
    } else {
      const ok = await compare(password, user.password_hash);
      if (!ok) {
        throw new UnauthorizedException('Invalid credentials');
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

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }

    const tokenHash = this.hashToken(refreshToken);
    const result = await this.db.query<{ user_id: string }>(
      `SELECT user_id
       FROM refresh_tokens
       WHERE token_hash = $1
         AND revoked_at IS NULL
         AND expires_at > now()`,
      [tokenHash]
    );

    if (!result.rowCount) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.findUserById(result.rows[0].user_id);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      accessToken: this.signAccessToken(user)
    };
  }

  private signAccessToken(user: DbUserRow): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles
    });
  }

  private async findUserByEmail(email: string): Promise<DbUserRow | null> {
    const result = await this.db.query<DbUserRow>(
      `SELECT u.id, u.email, u.password_hash, u.roles, p.display_name
       FROM users u
       JOIN profiles p ON p.user_id = u.id
       WHERE u.email = $1`,
      [email]
    );
    return result.rows[0] ?? null;
  }

  private async findUserById(id: string): Promise<DbUserRow | null> {
    const result = await this.db.query<DbUserRow>(
      `SELECT u.id, u.email, u.password_hash, u.roles, p.display_name
       FROM users u
       JOIN profiles p ON p.user_id = u.id
       WHERE u.id = $1`,
      [id]
    );
    return result.rows[0] ?? null;
  }

  private async createUser(email: string, password: string): Promise<DbUserRow> {
    const passwordHash = await hash(password, 10);
    const displayName = email.split('@')[0];
    const userResult = await this.db.query<{ id: string; roles: string[] }>(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, roles`,
      [email, passwordHash]
    );

    const userId = userResult.rows[0].id;
    await this.db.query(
      `INSERT INTO profiles (user_id, display_name)
       VALUES ($1, $2)`,
      [userId, displayName]
    );

    return {
      id: userId,
      email,
      password_hash: passwordHash,
      roles: userResult.rows[0].roles,
      display_name: displayName
    };
  }

  private async issueRefreshToken(userId: string): Promise<string> {
    const refreshToken = randomBytes(48).toString('hex');
    const tokenHash = this.hashToken(refreshToken);
    const ttlSeconds = Number(process.env['JWT_REFRESH_TTL'] ?? 1209600);
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    await this.db.query(
      `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)`,
      [userId, tokenHash, expiresAt]
    );

    return refreshToken;
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
