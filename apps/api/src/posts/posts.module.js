"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const posts_controller_1 = require("./posts.controller");
const posts_service_1 = require("./posts.service");
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService],
        exports: [posts_service_1.PostsService]
    })
], PostsModule);
//# sourceMappingURL=posts.module.js.map