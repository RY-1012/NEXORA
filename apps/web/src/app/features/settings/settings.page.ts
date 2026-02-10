import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section class="glass-panel rounded-2xl p-6">
        <h2 class="text-2xl font-semibold">Settings</h2>
        <p class="mt-2 text-sm text-[color:var(--text-3)]">Tune your workspace for focus.</p>

        <div class="mt-6 space-y-6">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]">Theme</p>
            <div class="mt-3 flex flex-wrap gap-3">
              <button
                *ngFor="let mode of themeModes"
                (click)="setTheme(mode)"
                class="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs uppercase tracking-[0.3em]"
                [ngClass]="{
                  'bg-[color:var(--bg-2)] text-[color:var(--text-1)]': mode === themeMode(),
                  'text-[color:var(--text-3)]': mode !== themeMode()
                }"
              >
                {{ mode }}
              </button>
            </div>
          </div>

          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]">Notifications</p>
            <div class="mt-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-4 text-sm text-[color:var(--text-2)]">
              Alerts are routed through the in-app panel and can be wired to email or push later.
            </div>
          </div>
        </div>
      </section>

      <aside class="glass-panel rounded-2xl p-6">
        <h3 class="text-lg font-semibold">Security</h3>
        <div class="mt-4 space-y-3 text-sm text-[color:var(--text-2)]">
          <div class="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-3">JWT access tokens (15 min)</div>
          <div class="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-3">Refresh tokens (14 days)</div>
          <div class="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-3">Role-based access control</div>
        </div>
      </aside>
    </div>
  `
})
export class SettingsPage {
  themeModes: Array<'system' | 'dark' | 'light'> = ['system', 'dark', 'light'];
  themeMode = signal<'system' | 'dark' | 'light'>(this.getStoredTheme());

  setTheme(mode: 'system' | 'dark' | 'light'): void {
    this.themeMode.set(mode);
    localStorage.setItem('nexora.theme', mode);
    const resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    document.documentElement.setAttribute('data-theme', resolved);
  }

  private getStoredTheme(): 'system' | 'dark' | 'light' {
    const stored = localStorage.getItem('nexora.theme');
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored;
    }
    return 'system';
  }
}
