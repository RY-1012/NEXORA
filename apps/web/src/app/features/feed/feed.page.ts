import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonVariant } from '../../shared/ui/button.component';
import { PostsApi, PostItem } from '../../core/api/posts.api';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Main Feed Column -->
      <div class="space-y-4 lg:col-span-2">
        <!-- Compose Post -->
        <div class="glass-panel rounded-2xl p-6">
          <div class="flex gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent-2)] text-[color:var(--bg-0)]">
              👤
            </div>
            <div class="flex-1">
              <textarea
                [value]="composer()"
                (input)="composer.set($any($event.target).value)"
                placeholder="Share a thought, drop a link, or start a conversation."
                class="w-full resize-none rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] px-4 py-3 text-[color:var(--text-1)] placeholder:text-[color:var(--text-3)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-2)]"
                rows="3"
              ></textarea>
              <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3 text-xs text-[color:var(--text-3)]">
                  <span class="rounded-full border border-[color:var(--border)] px-3 py-1">#open-source</span>
                  <span class="rounded-full border border-[color:var(--border)] px-3 py-1">#nexora</span>
                </div>
                <div class="flex gap-2">
                  <nex-button [variant]="ButtonVariant.OUTLINE" (click)="composer.set('')">Clear</nex-button>
                  <nex-button (click)="createPost()" [disabled]="loading()">Publish</nex-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts Feed -->
        <div class="space-y-4">
          <div 
            *ngFor="let post of posts(); let i = index"
            class="glass-panel group rounded-2xl p-6 transition-all duration-300 hover:border-[color:var(--accent-2)]"
          >
            <!-- Post Header -->
            <div class="mb-4 flex items-start justify-between">
              <div class="flex gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent-1)] text-[color:var(--bg-0)] font-semibold">
                  {{ initials(post.author.displayName) }}
                </div>
                <div>
                  <div class="font-semibold text-[color:var(--text-1)]">{{ post.author.displayName }}</div>
                  <div class="text-xs text-[color:var(--text-3)]">{{ post.createdAt | date: 'medium' }}</div>
                </div>
              </div>
              <button class="rounded-full px-3 py-1 text-xs text-[color:var(--text-3)] transition-colors hover:bg-[color:var(--bg-2)]">more</button>
            </div>

            <!-- Post Content -->
            <div class="mb-4">
              <p class="leading-relaxed text-[color:var(--text-2)]">{{ post.content }}</p>
            </div>

            <!-- Post Stats -->
            <div class="mb-3 flex gap-4 border-y border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--text-3)]">
              <span>{{ post.reactions }} reactions</span>
              <span>{{ post.comments }} comments</span>
            </div>

            <!-- Post Actions -->
            <div class="flex justify-around">
              <button 
                (click)="toggleLike(i)"
                class="flex-1 rounded-lg py-2 text-sm text-[color:var(--text-3)] transition-colors hover:bg-[color:var(--bg-2)] hover:text-[color:var(--accent-1)]"
                [ngClass]="{ 'text-[color:var(--accent-1)]': post.liked }"
              >
                <span class="mr-2">●</span>
                React
              </button>
              <button class="flex-1 rounded-lg py-2 text-sm text-[color:var(--text-3)] transition-colors hover:bg-[color:var(--bg-2)] hover:text-[color:var(--accent-2)]">
                Reply
              </button>
              <button class="flex-1 rounded-lg py-2 text-sm text-[color:var(--text-3)] transition-colors hover:bg-[color:var(--bg-2)] hover:text-[color:var(--accent-3)]">
                Share
              </button>
            </div>
          </div>
        </div>

        <!-- Load More -->
        <div class="py-6 text-center">
          <nex-button [variant]="ButtonVariant.OUTLINE">Load More Posts</nex-button>
        </div>
      </div>

      <!-- Sidebar Column -->
      <div class="space-y-4">
        <!-- Trending -->
        <div class="glass-panel rounded-2xl p-6">
          <h3 class="mb-4 text-lg font-semibold">Trending Now</h3>
          <div class="space-y-4">
            <div *ngFor="let trend of trends" class="rounded-xl p-3 transition-colors hover:bg-[color:var(--bg-2)]">
              <div class="font-semibold text-[color:var(--accent-2)]">{{ trend.label }}</div>
              <div class="text-xs text-[color:var(--text-3)]">{{ trend.count }} posts</div>
            </div>
          </div>
        </div>

        <!-- Suggested Users -->
        <div class="glass-panel rounded-2xl p-6">
          <h3 class="mb-4 text-lg font-semibold">Suggested Users</h3>
          <div class="space-y-4">
            <div *ngFor="let user of suggestions" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent-3)] text-[color:var(--bg-0)]">
                  {{ initials(user.name) }}
                </div>
                <div>
                  <div class="text-sm font-semibold">{{ user.name }}</div>
                  <div class="text-xs text-[color:var(--text-3)]">{{ user.handle }}</div>
                </div>
              </div>
              <button class="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-semibold text-[color:var(--text-2)] transition-colors hover:bg-[color:var(--bg-2)]">Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FeedPage {
  private postsApi = inject(PostsApi);
  ButtonVariant = ButtonVariant;
  composer = signal('');
  loading = signal(false);
  
  private postsSignal = signal<(PostItem & { liked: boolean })[]>([]);
  posts = computed(() => this.postsSignal());

  trends = [
    { label: '#opensource', count: 18321 },
    { label: '#angular', count: 12104 },
    { label: '#buildinpublic', count: 6412 },
    { label: '#nexora', count: 3890 }
  ];

  suggestions = [
    { name: 'Sierra Lane', handle: '@sierra' },
    { name: 'Open Labs', handle: '@openlabs' },
    { name: 'Frontend Guild', handle: '@fe-guild' }
  ];

  constructor() {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading.set(true);
    this.postsApi.list().subscribe({
      next: (items) => {
        this.postsSignal.set(items.map((post) => ({ ...post, liked: false })));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  createPost(): void {
    const content = this.composer().trim();
    if (!content) {
      return;
    }
    this.loading.set(true);
    this.postsApi.create(content).subscribe({
      next: () => {
        this.composer.set('');
        this.loadPosts();
      },
      error: () => this.loading.set(false)
    });
  }

  toggleLike(index: number): void {
    const posts = [...this.postsSignal()];
    const post = posts[index];
    if (!post) {
      return;
    }
    post.liked = !post.liked;
    this.postsSignal.set(posts);
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
