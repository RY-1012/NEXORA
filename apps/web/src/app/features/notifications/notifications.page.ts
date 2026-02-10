import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NotificationsApi, NotificationItem } from '../../core/api/notifications.api';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-panel rounded-2xl p-6">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Notifications</h2>
          <p class="text-sm text-[color:var(--text-3)]">Stay in sync with your network.</p>
        </div>
        <button class="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--text-2)]" (click)="refresh()">Refresh</button>
      </div>

      <div *ngIf="items().length === 0" class="text-sm text-[color:var(--text-3)]">
        No notifications yet.
      </div>

      <div class="space-y-3">
        <div
          *ngFor="let item of items()"
          class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-4"
        >
          <div class="flex items-start justify-between">
            <div>
              <div class="text-sm font-semibold">{{ formatType(item.type) }}</div>
              <div class="mt-1 text-xs text-[color:var(--text-3)]">{{ item.createdAt | date: 'medium' }}</div>
            </div>
            <button
              *ngIf="!item.readAt"
              (click)="markRead(item.id)"
              class="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text-2)]"
            >
              Mark read
            </button>
          </div>
          <pre class="mt-3 whitespace-pre-wrap text-xs text-[color:var(--text-2)]">{{ item.payload | json }}</pre>
        </div>
      </div>
    </div>
  `
})
export class NotificationsPage {
  private readonly api = inject(NotificationsApi);
  items = signal<NotificationItem[]>([]);

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.api.list().subscribe({
      next: (items) => this.items.set(items)
    });
  }

  markRead(id: string): void {
    this.api.markRead(id).subscribe({
      next: () => this.refresh()
    });
  }

  formatType(type: string): string {
    return type.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  }
}
