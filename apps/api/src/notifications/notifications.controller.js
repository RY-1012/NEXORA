"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    list(req) {
        return this.notificationsService.list(req.user?.id ?? '');
    }
    markRead(id, req) {
        return this.notificationsService.markRead(req.user?.id ?? '', id);
    }
};
exports.NotificationsController = NotificationsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)())
], NotificationsController.prototype, "list", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Req)())
], NotificationsController.prototype, "markRead", null);
exports.NotificationsController = NotificationsController = tslib_1.__decorate([
    (0, common_1.Controller)('notifications')
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map