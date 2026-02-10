import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppRuntimeConfig } from '../config/runtime-config';

@Injectable({ providedIn: 'root' })
export class ApiClient {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly config: AppRuntimeConfig
  ) {}

  get<T>(path: string, options?: object): Observable<T> {
    return this.http.get<T>(this.buildUrl(path), options);
  }

  post<T>(path: string, body?: unknown, options?: object): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body ?? {}, options);
  }

  patch<T>(path: string, body?: unknown, options?: object): Observable<T> {
    return this.http.patch<T>(this.buildUrl(path), body ?? {}, options);
  }

  delete<T>(path: string, options?: object): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path), options);
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${this.config.apiUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}
