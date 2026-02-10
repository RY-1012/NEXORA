import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/feed/feed.routes').then((m) => m.FEED_ROUTES)
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./features/feed/feed.routes').then((m) => m.FEED_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES)
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./features/messages/messages.routes').then((m) => m.MESSAGES_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./features/notifications/notifications.routes').then(
        (m) => m.NOTIFICATIONS_ROUTES
      ),
    canActivate: [authGuard]
  },
  {
    path: 'explore',
    loadChildren: () =>
      import('./features/explore/explore.routes').then((m) => m.EXPLORE_ROUTES)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings/settings.routes').then((m) => m.SETTINGS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
