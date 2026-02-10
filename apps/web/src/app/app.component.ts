import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './core/state/auth.store';
import { HeaderComponent } from './shared/ui/header.component';
import { SidebarComponent } from './shared/ui/sidebar.component';

@Component({
  selector: 'nexora-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="min-h-screen text-[color:var(--text-1)]">
      <!-- Ambient Background -->
      <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[color:var(--accent-2)] opacity-20 blur-3xl float-slow"></div>
        <div class="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-[color:var(--accent-1)] opacity-15 blur-3xl drift-slow"></div>
        <div class="absolute bottom-10 left-1/2 h-64 w-64 rounded-full bg-[color:var(--accent-3)] opacity-10 blur-3xl float-slow"></div>
      </div>

      <!-- Main Layout -->
      <div class="flex h-screen">
        <nexora-sidebar
          [isOpen]="sidebarOpen()"
          (toggleClose)="sidebarOpen.set(false)"
        ></nexora-sidebar>

        <div class="flex-1 flex flex-col overflow-hidden">
          <nexora-header
            [userLabel]="userLabel()"
            [themeMode]="themeMode()"
            (toggleTheme)="cycleTheme()"
            (toggleSidebar)="toggleSidebar()"
          ></nexora-header>

          <main class="flex-1 overflow-y-auto px-6 py-8">
            <div class="max-w-7xl mx-auto">
              <router-outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  private auth = inject(AuthStore);
  themeMode = signal<'system' | 'dark' | 'light'>('system');
  sidebarOpen = signal(true);

  userLabel = computed(() => this.auth.user()?.displayName ?? 'Guest User');

  constructor() {
    this.hydrateTheme();
    effect(() => {
      this.applyTheme(this.themeMode());
    });
  }

  cycleTheme(): void {
    const next = this.themeMode() === 'system'
      ? 'dark'
      : this.themeMode() === 'dark'
        ? 'light'
        : 'system';
    this.themeMode.set(next);
    localStorage.setItem('nexora.theme', next);
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  private hydrateTheme(): void {
    const stored = localStorage.getItem('nexora.theme') as 'system' | 'dark' | 'light' | null;
    if (stored) {
      this.themeMode.set(stored);
    }
  }

  private applyTheme(mode: 'system' | 'dark' | 'light'): void {
    const root = document.documentElement;
    const resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    root.setAttribute('data-theme', resolved);
  }
}
