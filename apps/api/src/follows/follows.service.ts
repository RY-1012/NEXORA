import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service';

@Injectable()
export class FollowsService {
  constructor(private readonly db: DatabaseService) {}

  async follow(targetId: string, followerId: string) {
    await this.db.query(
      `INSERT INTO follows (follower_id, following_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [followerId, targetId]
    );
    return { ok: true };
  }

  async unfollow(targetId: string, followerId: string) {
    await this.db.query(
      `DELETE FROM follows
       WHERE follower_id = $1 AND following_id = $2`,
      [followerId, targetId]
    );
    return { ok: true };
  }
}
