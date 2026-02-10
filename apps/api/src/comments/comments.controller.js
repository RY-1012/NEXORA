"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    list(postId) {
        return this.commentsService.listByPost(postId);
    }
    create(postId, req, body) {
        return this.commentsService.create(postId, req.user?.id ?? '', body.content);
    }
};
exports.CommentsController = CommentsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Param)('postId'))
], CommentsController.prototype, "list", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('postId')),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)())
], CommentsController.prototype, "create", null);
exports.CommentsController = CommentsController = tslib_1.__decorate([
    (0, common_1.Controller)('posts/:postId/comments')
], CommentsController);
//# sourceMappingURL=comments.controller.js.map