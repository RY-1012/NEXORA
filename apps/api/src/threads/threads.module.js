"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const threads_controller_1 = require("./threads.controller");
const threads_service_1 = require("./threads.service");
let ThreadsModule = class ThreadsModule {
};
exports.ThreadsModule = ThreadsModule;
exports.ThreadsModule = ThreadsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [threads_controller_1.ThreadsController],
        providers: [threads_service_1.ThreadsService]
    })
], ThreadsModule);
//# sourceMappingURL=threads.module.js.map