import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { DatabaseModule } from './database.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    DatabaseModule
  ],
  exports: [DatabaseModule]
})
export class CoreModule {}
