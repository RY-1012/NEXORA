import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service';

interface CommentRow {
  id: string;
  content: string;
  created_at: Date;
  author_id: string;
  display_name: string;
  avatar_url: string | null;
}

@Injectable()
export class CommentsService {
  constructor(private readonly db: DatabaseService) {}

  async listByPost(postId: string) {
    const result = await this.db.query<CommentRow>(
      `SELECT c.id,
              c.content,
              c.created_at,
              c.author_id,
              p.display_name,
              p.avatar_url
       FROM comments c
       JOIN profiles p ON p.user_id = c.author_id
       WHERE c.post_id = $1
       ORDER BY c.created_at ASC`,
      [postId]
    );

    return result.rows.map((row: CommentRow) => ({
      id: row.id,
      content: row.content,
      createdAt: row.created_at,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        avatarUrl: row.avatar_url
      }
    }));
  }

  async create(postId: string, authorId: string, content: string) {
    const result = await this.db.query<CommentRow>(
      `INSERT INTO comments (post_id, author_id, content)
       VALUES ($1, $2, $3)
       RETURNING id, content, created_at, author_id`,
      [postId, authorId, content]
    );

    const row = result.rows[0];
    return {
      id: row.id,
      content: row.content,
      createdAt: row.created_at,
      authorId: row.author_id
    };
  }
}
