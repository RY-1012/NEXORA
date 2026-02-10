"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    list() {
        return this.postsService.list();
    }
    byId(id) {
        return this.postsService.byId(id);
    }
    create(req, body) {
        return this.postsService.create(req.user?.id ?? '', body.content);
    }
};
exports.PostsController = PostsController;
tslib_1.__decorate([
    (0, common_1.Get)()
], PostsController.prototype, "list", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id'))
], PostsController.prototype, "byId", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Body)())
], PostsController.prototype, "create", null);
exports.PostsController = PostsController = tslib_1.__decorate([
    (0, common_1.Controller)('posts')
], PostsController);
//# sourceMappingURL=posts.controller.js.map