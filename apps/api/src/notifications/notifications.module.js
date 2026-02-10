"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const notifications_controller_1 = require("./notifications.controller");
const notifications_service_1 = require("./notifications.service");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_service_1.NotificationsService]
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map