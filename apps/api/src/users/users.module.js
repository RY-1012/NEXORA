"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map