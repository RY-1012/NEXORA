import { Injectable, computed, effect, signal } from '@angular/core';

export interface AuthUser {
  id: string;
  displayName: string;
  email: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly storageKey = 'nexora.session';

  readonly token = signal<string | null>(null);
  readonly refreshToken = signal<string | null>(null);
  readonly user = signal<AuthUser | null>(null);
  readonly isAuthenticated = computed(() => !!this.token());

  constructor() {
    this.hydrate();
    effect(() => {
      if (typeof localStorage === 'undefined') {
        return;
      }
      const session = {
        token: this.token(),
        refreshToken: this.refreshToken(),
        user: this.user()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(session));
    });
  }

  setSession(token: string, refreshToken: string, user: AuthUser): void {
    this.token.set(token);
    this.refreshToken.set(refreshToken);
    this.user.set(user);
  }

  clear(): void {
    this.token.set(null);
    this.refreshToken.set(null);
    this.user.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  private hydrate(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as {
        token?: string | null;
        refreshToken?: string | null;
        user?: AuthUser | null;
      };
      if (parsed.token && parsed.user) {
        this.token.set(parsed.token);
        this.refreshToken.set(parsed.refreshToken ?? null);
        this.user.set(parsed.user);
      }
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }
}
