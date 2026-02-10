import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service';

interface NotificationRow {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  read_at: Date | null;
  created_at: Date;
}

@Injectable()
export class NotificationsService {
  constructor(private readonly db: DatabaseService) {}

  async list(userId: string) {
    const result = await this.db.query<NotificationRow>(
      `SELECT id, type, payload, read_at, created_at
       FROM notifications
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [userId]
    );

    return result.rows.map((row: NotificationRow) => ({
      id: row.id,
      type: row.type,
      payload: row.payload,
      readAt: row.read_at,
      createdAt: row.created_at
    }));
  }

  async markRead(userId: string, notificationId: string) {
    await this.db.query(
      `UPDATE notifications
       SET read_at = now()
       WHERE id = $1 AND user_id = $2`,
      [notificationId, userId]
    );
    return { ok: true };
  }
}
