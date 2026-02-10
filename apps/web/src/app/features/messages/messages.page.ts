import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ThreadsApi, ThreadItem, MessageItem } from '../../core/api/threads.api';
import { ButtonComponent } from '../../shared/ui/button.component';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside class="glass-panel rounded-2xl p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">Threads</h2>
          <button class="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-[color:var(--text-2)]">New</button>
        </div>
        <div class="space-y-2">
          <button
            *ngFor="let thread of threads()"
            (click)="selectThread(thread.id)"
            class="w-full rounded-xl px-3 py-3 text-left transition-colors"
            [ngClass]="{
              'bg-[color:var(--bg-2)]': thread.id === activeThreadId(),
              'hover:bg-[color:var(--bg-2)]': thread.id !== activeThreadId()
            }"
          >
            <div class="text-sm font-semibold">{{ formatThreadTitle(thread) }}</div>
            <div class="text-xs text-[color:var(--text-3)]">{{ thread.createdAt | date: 'short' }}</div>
          </button>
        </div>
      </aside>

      <section class="glass-panel flex h-[70vh] flex-col rounded-2xl">
        <div class="border-b border-[color:var(--border)] px-6 py-4">
          <h2 class="text-lg font-semibold">Conversation</h2>
          <p class="text-xs text-[color:var(--text-3)]">Real-time chat powered by WebSockets.</p>
        </div>

        <div class="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          <div *ngIf="messages().length === 0" class="text-sm text-[color:var(--text-3)]">
            Select a thread to start.
          </div>
          <div *ngFor="let message of messages()" class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-4">
            <div class="text-xs text-[color:var(--text-3)]">{{ message.sender.displayName }}</div>
            <div class="mt-2 text-sm text-[color:var(--text-1)]">{{ message.body }}</div>
            <div class="mt-2 text-xs text-[color:var(--text-3)]">{{ message.createdAt | date: 'shortTime' }}</div>
          </div>
        </div>

        <div class="border-t border-[color:var(--border)] px-6 py-4">
          <div class="flex gap-3">
            <input
              [value]="draft()"
              (input)="draft.set($any($event.target).value)"
              placeholder="Write a message..."
              class="flex-1 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] px-4 py-2 text-[color:var(--text-1)]"
            />
            <nex-button (click)="sendMessage()" [disabled]="!draft().trim()">Send</nex-button>
          </div>
        </div>
      </section>
    </div>
  `
})
export class MessagesPage {
  private readonly threadsApi = inject(ThreadsApi);

  threads = signal<ThreadItem[]>([]);
  activeThreadId = signal<string | null>(null);
  messages = signal<MessageItem[]>([]);
  draft = signal('');

  constructor() {
    this.loadThreads();
  }

  loadThreads(): void {
    this.threadsApi.listThreads().subscribe({
      next: (threads) => {
        this.threads.set(threads);
        if (!this.activeThreadId() && threads.length) {
          this.selectThread(threads[0].id);
        }
      }
    });
  }

  selectThread(id: string): void {
    this.activeThreadId.set(id);
    this.threadsApi.listMessages(id).subscribe({
      next: (messages) => this.messages.set(messages)
    });
  }

  sendMessage(): void {
    const threadId = this.activeThreadId();
    const body = this.draft().trim();
    if (!threadId || !body) {
      return;
    }
    this.threadsApi.sendMessage(threadId, body).subscribe({
      next: () => {
        this.draft.set('');
        this.selectThread(threadId);
      }
    });
  }

  formatThreadTitle(thread: ThreadItem): string {
    return thread.title ?? (thread.isGroup ? 'Group chat' : 'Direct chat');
  }
}
