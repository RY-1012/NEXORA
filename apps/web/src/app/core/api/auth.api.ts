import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from './api-client';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    displayName: string;
    email: string;
    roles: string[];
  };
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
  constructor(private readonly api: ApiClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/login', { email, password });
  }

  refresh(refreshToken: string): Observable<{ accessToken: string }> {
    return this.api.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
  }
}
