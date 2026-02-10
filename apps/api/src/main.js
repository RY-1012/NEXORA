"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const audit_interceptor_1 = require("./common/interceptors/audit.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env['CORS_ORIGIN'] || 'http://localhost:4200',
        credentials: true
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    app.useGlobalInterceptors(new audit_interceptor_1.AuditInterceptor());
    const port = process.env['PORT'] || 3000;
    await app.listen(port);
    console.log(`✅ API Server running on http://localhost:${port}/api/v1`);
}
bootstrap().catch((err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map