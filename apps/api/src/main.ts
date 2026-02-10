import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env['CORS_ORIGIN'] || 'http://localhost:4200',
    credentials: true
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.useGlobalInterceptors(new AuditInterceptor());

  const port = process.env['PORT'] || 3000;
  await app.listen(port);
  console.log(`✅ API Server running on http://localhost:${port}/api/v1`);
}

bootstrap().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
