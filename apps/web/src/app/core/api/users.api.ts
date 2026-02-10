import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from './api-client';

export interface UserProfile {
  id: string;
  displayName: string;
  email?: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

@Injectable({ providedIn: 'root' })
export class UsersApi {
  constructor(private readonly api: ApiClient) {}

  getMe(): Observable<UserProfile> {
    return this.api.get<UserProfile>('/users/me');
  }
}
