import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service';

interface ThreadRow {
  id: string;
  title: string | null;
  is_group: boolean;
  created_at: Date;
}

interface MessageRow {
  id: string;
  body: string;
  created_at: Date;
  sender_id: string;
  display_name: string;
  avatar_url: string | null;
}

@Injectable()
export class ThreadsService {
  constructor(private readonly db: DatabaseService) {}

  async listThreads(userId: string) {
    const result = await this.db.query<ThreadRow>(
      `SELECT t.id, t.title, t.is_group, t.created_at
       FROM threads t
       JOIN thread_members tm ON tm.thread_id = t.id
       WHERE tm.user_id = $1
       ORDER BY t.created_at DESC`,
      [userId]
    );

    return result.rows.map((row: ThreadRow) => ({
      id: row.id,
      title: row.title,
      isGroup: row.is_group,
      createdAt: row.created_at
    }));
  }

  async createThread(userId: string, participantIds: string[], title?: string, isGroup = false) {
    const uniqueParticipants = Array.from(new Set([userId, ...participantIds]));
    const threadResult = await this.db.query<ThreadRow>(
      `INSERT INTO threads (title, is_group)
       VALUES ($1, $2)
       RETURNING id, title, is_group, created_at`,
      [title ?? null, isGroup]
    );

    const thread = threadResult.rows[0];
    for (const participantId of uniqueParticipants) {
      await this.db.query(
        `INSERT INTO thread_members (thread_id, user_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [thread.id, participantId]
      );
    }

    return {
      id: thread.id,
      title: thread.title,
      isGroup: thread.is_group,
      createdAt: thread.created_at
    };
  }

  async listMessages(threadId: string) {
    const result = await this.db.query<MessageRow>(
      `SELECT m.id,
              m.body,
              m.created_at,
              m.sender_id,
              p.display_name,
              p.avatar_url
       FROM messages m
       JOIN profiles p ON p.user_id = m.sender_id
       WHERE m.thread_id = $1
       ORDER BY m.created_at ASC`,
      [threadId]
    );

    return result.rows.map((row: MessageRow) => ({
      id: row.id,
      body: row.body,
      createdAt: row.created_at,
      sender: {
        id: row.sender_id,
        displayName: row.display_name,
        avatarUrl: row.avatar_url
      }
    }));
  }

  async sendMessage(threadId: string, senderId: string, body: string) {
    const result = await this.db.query<MessageRow>(
      `INSERT INTO messages (thread_id, sender_id, body)
       VALUES ($1, $2, $3)
       RETURNING id, body, created_at, sender_id`,
      [threadId, senderId, body]
    );

    const message = result.rows[0];
    return {
      id: message.id,
      body: message.body,
      createdAt: message.created_at,
      senderId: message.sender_id
    };
  }
}
