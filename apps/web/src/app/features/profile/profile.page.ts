import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '../../core/state/auth.store';
import { UsersApi, UserProfile } from '../../core/api/users.api';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section class="glass-panel rounded-2xl p-6">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--accent-2)] text-2xl text-[color:var(--bg-0)]">
            {{ initials(profile()?.displayName ?? 'Nex') }}
          </div>
          <div>
            <h2 class="text-2xl font-semibold">{{ profile()?.displayName ?? 'Nexora User' }}</h2>
            <p class="text-sm text-[color:var(--text-3)]">{{ profile()?.email ?? 'demo@nexora.dev' }}</p>
          </div>
        </div>

        <div class="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-4">
          <p class="text-sm text-[color:var(--text-2)]">
            {{ profile()?.bio ?? 'Building in public with a new social OS.' }}
          </p>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-4">
          <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-4">
            <div class="text-xs text-[color:var(--text-3)]">Followers</div>
            <div class="text-xl font-semibold">1.4k</div>
          </div>
          <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-4">
            <div class="text-xs text-[color:var(--text-3)]">Following</div>
            <div class="text-xl font-semibold">280</div>
          </div>
          <div class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-4">
            <div class="text-xs text-[color:var(--text-3)]">Posts</div>
            <div class="text-xl font-semibold">52</div>
          </div>
        </div>
      </section>

      <aside class="glass-panel rounded-2xl p-6">
        <h3 class="text-lg font-semibold">Highlights</h3>
        <ul class="mt-4 space-y-3 text-sm text-[color:var(--text-2)]">
          <li>Open-source-first builder</li>
          <li>Realtime systems enthusiast</li>
          <li>Design-led product thinking</li>
        </ul>
      </aside>
    </div>
  `
})
export class ProfilePage {
  private readonly usersApi = inject(UsersApi);
  private readonly auth = inject(AuthStore);

  profile = signal<UserProfile | null>(null);

  constructor() {
    this.usersApi.getMe().subscribe({
      next: (profile) => this.profile.set(profile),
      error: () => this.profile.set(this.auth.user())
    });
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
