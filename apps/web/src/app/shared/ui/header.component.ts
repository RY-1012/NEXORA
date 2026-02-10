import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nexora-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--surface-strong)] backdrop-blur-xl">
      <div class="flex items-center justify-between px-6 py-4">
        <!-- Left: Menu Button -->
        <button
          (click)="toggleSidebar.emit()"
          class="p-2 rounded-lg transition-colors lg:hidden hover:bg-[color:var(--bg-2)]"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- Center: Logo -->
        <div class="flex items-center gap-3 font-bold text-xl tracking-wide">
          <div class="p-2 rounded-xl bg-[color:var(--accent-1)] text-[color:var(--bg-0)] shadow-lg">
            <span>✦</span>
          </div>
          <span class="text-[color:var(--text-1)]">NEXORA</span>
        </div>

        <!-- Right: User & Theme -->
        <div class="flex items-center gap-4">
          <div class="hidden sm:block text-right">
            <div class="text-sm font-medium">{{ userLabel }}</div>
            <div class="text-xs text-[color:var(--text-3)]">Online</div>
          </div>

          <button
            (click)="toggleTheme.emit()"
            class="flex items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[color:var(--text-3)] hover:text-[color:var(--text-1)]"
            aria-label="Toggle theme"
          >
            <span class="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent-2)]"></span>
            {{ themeMode }}
          </button>

          <!-- Notification Bell -->
          <button class="relative rounded-lg p-2 transition-colors hover:bg-[color:var(--bg-2)]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-[color:var(--accent-1)]"></span>
          </button>

          <!-- Profile Avatar -->
          <button class="rounded-lg p-2 transition-colors hover:bg-[color:var(--bg-2)]">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--accent-2)] text-sm font-bold text-[color:var(--bg-0)]">
              👤
            </div>
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  @Input() userLabel: string = 'Guest';
  @Input() themeMode: 'system' | 'dark' | 'light' = 'system';
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();
}
