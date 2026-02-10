import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from './api-client';

export interface ThreadItem {
  id: string;
  title?: string | null;
  isGroup: boolean;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  body: string;
  createdAt: string;
  sender: {
    id: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}

@Injectable({ providedIn: 'root' })
export class ThreadsApi {
  constructor(private readonly api: ApiClient) {}

  listThreads(): Observable<ThreadItem[]> {
    return this.api.get<ThreadItem[]>('/threads');
  }

  createThread(participantIds: string[], title?: string, isGroup?: boolean): Observable<ThreadItem> {
    return this.api.post<ThreadItem>('/threads', { participantIds, title, isGroup });
  }

  listMessages(threadId: string): Observable<MessageItem[]> {
    return this.api.get<MessageItem[]>(`/threads/${threadId}/messages`);
  }

  sendMessage(threadId: string, body: string): Observable<{ id: string }>{
    return this.api.post(`/threads/${threadId}/messages`, { body });
  }
}
