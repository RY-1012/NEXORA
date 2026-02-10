import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from './api-client';

export interface PostAuthor {
  id: string;
  displayName: string;
  avatarUrl?: string | null;
}

export interface PostItem {
  id: string;
  content: string;
  createdAt: string;
  author: PostAuthor;
  comments: number;
  reactions: number;
}

export interface CommentItem {
  id: string;
  content: string;
  createdAt: string;
  author: PostAuthor;
}

@Injectable({ providedIn: 'root' })
export class PostsApi {
  constructor(private readonly api: ApiClient) {}

  list(): Observable<PostItem[]> {
    return this.api.get<PostItem[]>('/posts');
  }

  create(content: string): Observable<{ id: string; content: string; createdAt: string; authorId: string }> {
    return this.api.post('/posts', { content });
  }

  listComments(postId: string): Observable<CommentItem[]> {
    return this.api.get<CommentItem[]>(`/posts/${postId}/comments`);
  }

  createComment(postId: string, content: string): Observable<{ id: string }>{
    return this.api.post(`/posts/${postId}/comments`, { content });
  }

  addReaction(postId: string, type: 'like' | 'love' | 'haha'): Observable<{ ok: boolean }> {
    return this.api.post(`/posts/${postId}/reactions`, { type });
  }

  removeReaction(postId: string): Observable<{ ok: boolean }> {
    return this.api.delete(`/posts/${postId}/reactions`);
  }
}
