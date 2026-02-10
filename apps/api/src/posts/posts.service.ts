import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service';

interface PostRow {
  id: string;
  content: string;
  created_at: Date;
  author_id: string;
  display_name: string;
  avatar_url: string | null;
  comments: string | number | null;
  reactions: string | number | null;
}

@Injectable()
export class PostsService {
  constructor(private readonly db: DatabaseService) {}

  async list() {
    const result = await this.db.query<PostRow>(
      `SELECT p.id,
              p.content,
              p.created_at,
              p.author_id,
              pr.display_name,
              pr.avatar_url,
              COALESCE(c.count, 0) AS comments,
              COALESCE(r.count, 0) AS reactions
       FROM posts p
       JOIN profiles pr ON pr.user_id = p.author_id
       LEFT JOIN (
         SELECT post_id, COUNT(*)::int AS count
         FROM comments
         GROUP BY post_id
       ) c ON c.post_id = p.id
       LEFT JOIN (
         SELECT target_id, COUNT(*)::int AS count
         FROM reactions
         WHERE target_type = 'post'
         GROUP BY target_id
       ) r ON r.target_id = p.id
       ORDER BY p.created_at DESC
       LIMIT 50`
    );

    return result.rows.map((row: PostRow) => ({
      id: row.id,
      content: row.content,
      createdAt: row.created_at,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        avatarUrl: row.avatar_url
      },
      comments: Number(row.comments ?? 0),
      reactions: Number(row.reactions ?? 0)
    }));
  }

  async byId(id: string) {
    const result = await this.db.query<PostRow>(
      `SELECT p.id,
              p.content,
              p.created_at,
              p.author_id,
              pr.display_name,
              pr.avatar_url,
              COALESCE(c.count, 0) AS comments,
              COALESCE(r.count, 0) AS reactions
       FROM posts p
       JOIN profiles pr ON pr.user_id = p.author_id
       LEFT JOIN (
         SELECT post_id, COUNT(*)::int AS count
         FROM comments
         GROUP BY post_id
       ) c ON c.post_id = p.id
       LEFT JOIN (
         SELECT target_id, COUNT(*)::int AS count
         FROM reactions
         WHERE target_type = 'post'
         GROUP BY target_id
       ) r ON r.target_id = p.id
       WHERE p.id = $1`,
      [id]
    );

    const row = result.rows[0];
    if (!row) {
      return null;
    }
    return {
      id: row.id,
      content: row.content,
      createdAt: row.created_at,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        avatarUrl: row.avatar_url
      },
      comments: Number(row.comments ?? 0),
      reactions: Number(row.reactions ?? 0)
    };
  }

  async create(authorId: string, content: string) {
    const result = await this.db.query<PostRow>(
      `INSERT INTO posts (author_id, content)
       VALUES ($1, $2)
       RETURNING id, content, created_at, author_id`,
      [authorId, content]
    );

    const post = result.rows[0];
    return {
      id: post.id,
      content: post.content,
      createdAt: post.created_at,
      authorId: post.author_id
    };
  }
}
