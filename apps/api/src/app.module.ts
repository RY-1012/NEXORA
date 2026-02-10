import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RealtimeModule } from './realtime/realtime.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
import { FollowsModule } from './follows/follows.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    CoreModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    ReactionsModule,
    FollowsModule,
    NotificationsModule,
    ThreadsModule,
    RealtimeModule
  ]
})
export class AppModule {}
