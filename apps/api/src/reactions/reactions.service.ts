import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service';

@Injectable()
export class ReactionsService {
  constructor(private readonly db: DatabaseService) {}

  async addPostReaction(postId: string, userId: string, type: string) {
    await this.db.query(
      `INSERT INTO reactions (target_type, target_id, user_id, type)
       VALUES ('post', $1, $2, $3)
       ON CONFLICT (target_type, target_id, user_id)
       DO UPDATE SET type = EXCLUDED.type, created_at = now()`,
      [postId, userId, type]
    );
    return { ok: true };
  }

  async removePostReaction(postId: string, userId: string) {
    await this.db.query(
      `DELETE FROM reactions
       WHERE target_type = 'post' AND target_id = $1 AND user_id = $2`,
      [postId, userId]
    );
    return { ok: true };
  }
}
