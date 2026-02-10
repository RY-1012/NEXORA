import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthStore } from '../../core/state/auth.store';

@Component({
  selector: 'nexora-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Mobile Overlay -->
    <div 
      *ngIf="isOpen"
      (click)="toggleClose.emit()"
      class="fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="fixed z-40 flex h-screen w-72 flex-col border-r border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur-xl transition-transform lg:relative lg:translate-x-0"
      [class.translate-x-0]="isOpen"
      [class.-translate-x-full]="!isOpen"
    >
      <!-- Logo Section -->
      <div class="border-b border-[color:var(--border)] p-6">
        <div class="flex items-center gap-3 text-lg font-bold tracking-wide">
          <div class="rounded-xl bg-[color:var(--accent-1)] p-2 text-[color:var(--bg-0)]">
            <span>✦</span>
          </div>
          <span>NEXORA</span>
        </div>
        <p class="mt-2 text-xs uppercase tracking-[0.3em] text-[color:var(--text-3)]">Live feed</p>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        <a
          routerLink="/"
          routerLinkActive="bg-[color:var(--bg-2)] text-[color:var(--text-1)]"
          [routerLinkActiveOptions]="{ exact: true }"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]"
        >
          <span class="h-2 w-2 rounded-full bg-[color:var(--accent-1)]"></span>
          <span>Home</span>
        </a>

        <a
          routerLink="/feed"
          routerLinkActive="bg-[color:var(--bg-2)] text-[color:var(--text-1)]"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]"
        >
          <span class="h-2 w-2 rounded-full bg-[color:var(--accent-2)]"></span>
          <span>Feed</span>
        </a>

        <a
          routerLink="/messages"
          routerLinkActive="bg-[color:var(--bg-2)] text-[color:var(--text-1)]"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]"
        >
          <span class="h-2 w-2 rounded-full bg-[color:var(--accent-3)]"></span>
          <span>Messages</span>
          <span class="ml-auto rounded-full bg-[color:var(--accent-1)] px-2 py-0.5 text-xs font-semibold text-[color:var(--bg-0)]">3</span>
        </a>

        <a
          routerLink="/notifications"
          routerLinkActive="bg-[color:var(--bg-2)] text-[color:var(--text-1)]"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]"
        >
          <span class="h-2 w-2 rounded-full bg-[color:var(--accent-1)]"></span>
          <span>Notifications</span>
        </a>

        <div class="my-4 border-t border-[color:var(--border)]"></div>

        <a
          routerLink="/explore"
          routerLinkActive="bg-[color:var(--bg-2)] text-[color:var(--text-1)]"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]"
        >
          <span class="h-2 w-2 rounded-full bg-[color:var(--accent-2)]"></span>
          <span>Explore</span>
        </a>

        <a
          routerLink="/profile"
          routerLinkActive="bg-[color:var(--bg-2)] text-[color:var(--text-1)]"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]"
        >
          <span class="h-2 w-2 rounded-full bg-[color:var(--accent-3)]"></span>
          <span>Profile</span>
        </a>

        <a
          routerLink="/settings"
          routerLinkActive="bg-[color:var(--bg-2)] text-[color:var(--text-1)]"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]"
        >
          <span class="h-2 w-2 rounded-full bg-[color:var(--accent-1)]"></span>
          <span>Settings</span>
        </a>
      </nav>

      <!-- Footer -->
      <div class="space-y-2 border-t border-[color:var(--border)] p-4">
        <button class="w-full rounded-xl bg-[color:var(--accent-1)] px-4 py-2 font-semibold text-[color:var(--bg-0)] transition-transform hover:-translate-y-0.5">
          Create Post
        </button>
        <button
          (click)="logout()"
          class="w-full rounded-xl border border-[color:var(--border)] px-4 py-2 font-semibold text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]"
        >
          Sign out
        </button>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  @Input() isOpen: boolean = true;
  @Output() toggleClose = new EventEmitter<void>();

  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
