import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid gap-6 lg:grid-cols-3">
      <section class="glass-panel rounded-2xl p-6 lg:col-span-2">
        <h2 class="text-2xl font-semibold">Explore</h2>
        <p class="mt-2 text-sm text-[color:var(--text-3)]">Discover new creators, rooms, and ideas curated for you.</p>

        <div class="mt-6 space-y-4">
          <div *ngFor="let item of discoveries" class="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-4">
            <div class="text-sm text-[color:var(--text-3)]">{{ item.category }}</div>
            <div class="mt-1 text-lg font-semibold">{{ item.title }}</div>
            <p class="mt-2 text-sm text-[color:var(--text-2)]">{{ item.description }}</p>
          </div>
        </div>
      </section>

      <aside class="glass-panel rounded-2xl p-6">
        <h3 class="text-lg font-semibold">Trending Rooms</h3>
        <div class="mt-4 space-y-3">
          <div *ngFor="let room of rooms" class="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-1)] p-3">
            <div class="text-sm font-semibold">{{ room.title }}</div>
            <div class="text-xs text-[color:var(--text-3)]">{{ room.listeners }} listening</div>
          </div>
        </div>
      </aside>
    </div>
  `
})
export class ExplorePage {
  discoveries = [
    {
      category: 'Community Spotlight',
      title: 'Open Source Daily',
      description: 'Daily build logs, shipping stories, and the best repos to watch.'
    },
    {
      category: 'Launchpad',
      title: 'Designing with Intent',
      description: 'A curated timeline of bold UI systems and motion experiments.'
    },
    {
      category: 'Live Now',
      title: 'Realtime NestJS',
      description: 'Join engineers building Socket.IO features in public.'
    }
  ];

  rooms = [
    { title: 'Angular Signals Clinic', listeners: 142 },
    { title: 'Backend Builders', listeners: 87 },
    { title: 'Product Founders', listeners: 65 }
  ];
}
