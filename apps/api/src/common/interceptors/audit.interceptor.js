"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let AuditInterceptor = class AuditInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const start = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            const duration = Date.now() - start;
            const method = request.method;
            const url = request.originalUrl;
            const userId = request.user?.id ?? 'anonymous';
            console.log(`[audit] ${method} ${url} user=${userId} ${duration}ms`);
        }));
    }
};
exports.AuditInterceptor = AuditInterceptor;
exports.AuditInterceptor = AuditInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AuditInterceptor);
//# sourceMappingURL=audit.interceptor.js.map