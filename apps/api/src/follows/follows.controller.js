"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let FollowsController = class FollowsController {
    constructor(followsService) {
        this.followsService = followsService;
    }
    follow(id, req) {
        return this.followsService.follow(id, req.user?.id ?? '');
    }
    unfollow(id, req) {
        return this.followsService.unfollow(id, req.user?.id ?? '');
    }
};
exports.FollowsController = FollowsController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Req)())
], FollowsController.prototype, "follow", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Req)())
], FollowsController.prototype, "unfollow", null);
exports.FollowsController = FollowsController = tslib_1.__decorate([
    (0, common_1.Controller)('users/:id/follow')
], FollowsController);
//# sourceMappingURL=follows.controller.js.map