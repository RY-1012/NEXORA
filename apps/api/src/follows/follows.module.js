"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const follows_controller_1 = require("./follows.controller");
const follows_service_1 = require("./follows.service");
let FollowsModule = class FollowsModule {
};
exports.FollowsModule = FollowsModule;
exports.FollowsModule = FollowsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [follows_controller_1.FollowsController],
        providers: [follows_service_1.FollowsService]
    })
], FollowsModule);
//# sourceMappingURL=follows.module.js.map