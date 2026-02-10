"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../decorators/roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const required = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!required?.length) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const roles = request.user?.roles ?? [];
        return required.some((role) => roles.includes(role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map