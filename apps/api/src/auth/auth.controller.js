"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(body) {
        return this.authService.login(body.email, body.password);
    }
    refresh(body) {
        return this.authService.refresh(body.refreshToken);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)())
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Post)('refresh'),
    tslib_1.__param(0, (0, common_1.Body)())
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth')
], AuthController);
//# sourceMappingURL=auth.controller.js.map