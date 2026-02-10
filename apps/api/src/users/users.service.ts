import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service';

interface UserRow {
  id: string;
  email: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
}

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getMe(userId: string) {
    const result = await this.db.query<UserRow>(
      `SELECT u.id, u.email, p.display_name, p.bio, p.avatar_url
       FROM users u
       JOIN profiles p ON p.user_id = u.id
       WHERE u.id = $1`,
      [userId]
    );
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

  async getById(id: string) {
    const result = await this.db.query<UserRow>(
      `SELECT u.id, u.email, p.display_name, p.bio, p.avatar_url
       FROM users u
       JOIN profiles p ON p.user_id = u.id
       WHERE u.id = $1`,
      [id]
    );
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
}
