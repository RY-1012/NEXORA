"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const reactions_controller_1 = require("./reactions.controller");
const reactions_service_1 = require("./reactions.service");
let ReactionsModule = class ReactionsModule {
};
exports.ReactionsModule = ReactionsModule;
exports.ReactionsModule = ReactionsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [reactions_controller_1.ReactionsController],
        providers: [reactions_service_1.ReactionsService]
    })
], ReactionsModule);
//# sourceMappingURL=reactions.module.js.map