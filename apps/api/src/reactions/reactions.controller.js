"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ReactionsController = class ReactionsController {
    constructor(reactionsService) {
        this.reactionsService = reactionsService;
    }
    create(postId, req, body) {
        return this.reactionsService.addPostReaction(postId, req.user?.id ?? '', body.type);
    }
    remove(postId, req) {
        return this.reactionsService.removePostReaction(postId, req.user?.id ?? '');
    }
};
exports.ReactionsController = ReactionsController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('postId')),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)())
], ReactionsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('postId')),
    tslib_1.__param(1, (0, common_1.Req)())
], ReactionsController.prototype, "remove", null);
exports.ReactionsController = ReactionsController = tslib_1.__decorate([
    (0, common_1.Controller)('posts/:postId/reactions')
], ReactionsController);
//# sourceMappingURL=reactions.controller.js.map