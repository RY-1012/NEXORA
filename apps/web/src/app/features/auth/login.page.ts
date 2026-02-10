import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthApi } from '../../core/api/auth.api';
import { AuthStore } from '../../core/state/auth.store';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen px-4 py-16">
      <div class="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="space-y-6">
          <div class="inline-flex items-center gap-3 rounded-full border border-[color:var(--border)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]">
            Social OS
          </div>
          <h1 class="text-4xl font-semibold leading-tight text-[color:var(--text-1)]">
            The calm, connected place
            <span class="text-[color:var(--accent-2)]"> for builders</span>.
          </h1>
          <p class="text-[color:var(--text-2)]">
            Welcome back. Authenticate once and move between your feed, live rooms, and deep chats without the noise.
          </p>
          <div class="grid grid-cols-2 gap-4">
            <div class="glass-panel rounded-2xl p-4">
              <p class="text-sm text-[color:var(--text-3)]">Active rooms</p>
              <p class="text-2xl font-semibold">18</p>
            </div>
            <div class="glass-panel rounded-2xl p-4">
              <p class="text-sm text-[color:var(--text-3)]">New invites</p>
              <p class="text-2xl font-semibold">3</p>
            </div>
          </div>
        </section>

        <section class="glass-panel rounded-3xl p-8">
          <div class="space-y-6">
            <div class="space-y-2">
              <h2 class="text-2xl font-semibold">Sign in</h2>
              <p class="text-sm text-[color:var(--text-3)]">Use any email and password to create a dev account.</p>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  (input)="email.set($any($event.target).value)"
                  [value]="email()"
                  class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] px-4 py-3 text-[color:var(--text-1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-2)]"
                />
                <p *ngIf="emailError()" class="text-xs text-red-400">{{ emailError() }}</p>
              </div>

              <div class="space-y-2">
                <label class="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]">Password</label>
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  (input)="password.set($any($event.target).value)"
                  [value]="password()"
                  class="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] px-4 py-3 text-[color:var(--text-1)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-2)]"
                />
                <p *ngIf="passwordError()" class="text-xs text-red-400">{{ passwordError() }}</p>
              </div>

              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center gap-2 text-[color:var(--text-3)]">
                  <input
                    type="checkbox"
                    (change)="rememberMe.set($any($event.target).checked)"
                    [checked]="rememberMe()"
                    class="h-4 w-4 rounded border-[color:var(--border)] bg-[color:var(--bg-1)]"
                  />
                  Remember me
                </label>
                <a class="text-[color:var(--accent-2)]" href="#">Need help?</a>
              </div>
            </div>

            <button
              (click)="submit()"
              [disabled]="isLoading()"
              class="w-full rounded-2xl bg-[color:var(--accent-1)] px-4 py-3 font-semibold text-[color:var(--bg-0)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              <span *ngIf="!isLoading()">Enter NEXORA</span>
              <span *ngIf="isLoading()">Signing in...</span>
            </button>

            <div *ngIf="statusMessage()" class="rounded-2xl border border-[color:var(--border)] p-3 text-sm" [ngClass]="{
              'text-[color:var(--accent-3)]': statusType() === 'success',
              'text-red-400': statusType() === 'error'
            }">
              {{ statusMessage() }}
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: []
})
export class LoginPage {
  private authApi = inject(AuthApi);
  private authStore = inject(AuthStore);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  isLoading = signal(false);
  statusMessage = signal('');
  statusType = signal<'success' | 'error'>('success');
  emailError = signal('');
  passwordError = signal('');

  constructor() {
    effect(() => {
      // Reset errors on input change
      const _ = this.email();
      this.emailError.set('');
    });

    effect(() => {
      const _ = this.password();
      this.passwordError.set('');
    });
  }

  submit(): void {
    // Validation
    const email = this.email().trim();
    const password = this.password().trim();

    if (!email) {
      this.emailError.set('Email is required');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.emailError.set('Please enter a valid email');
      return;
    }

    if (!password) {
      this.passwordError.set('Password is required');
      return;
    }

    if (password.length < 6) {
      this.passwordError.set('Password must be at least 6 characters');
      return;
    }

    this.isLoading.set(true);
    this.statusMessage.set('');

    this.authApi.login(email, password).subscribe({
      next: (response) => {
        this.authStore.setSession(response.accessToken, response.refreshToken, response.user);
        this.isLoading.set(false);
        this.statusType.set('success');
        this.statusMessage.set('Signed in. Redirecting to your feed...');
        this.router.navigateByUrl('/feed');
      },
      error: () => {
        this.isLoading.set(false);
        this.statusType.set('error');
        this.statusMessage.set('Unable to sign in. Check your credentials.');
      }
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

