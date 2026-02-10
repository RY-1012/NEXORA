import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from './api-client';

export interface NotificationItem {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  readAt?: string | null;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationsApi {
  constructor(private readonly api: ApiClient) {}

  list(): Observable<NotificationItem[]> {
    return this.api.get<NotificationItem[]>('/notifications');
  }

  markRead(id: string): Observable<{ ok: boolean }> {
    return this.api.patch(`/notifications/${id}/read`, {});
  }
}
