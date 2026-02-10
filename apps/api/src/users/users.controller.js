"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    me(req) {
        return this.usersService.getMe(req.user?.id ?? '');
    }
    byId(id) {
        return this.usersService.getById(id);
    }
};
exports.UsersController = UsersController;
tslib_1.__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)())
], UsersController.prototype, "me", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id'))
], UsersController.prototype, "byId", null);
exports.UsersController = UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('users')
], UsersController);
//# sourceMappingURL=users.controller.js.map