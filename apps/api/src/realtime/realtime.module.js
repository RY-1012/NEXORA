"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const realtime_gateway_1 = require("./realtime.gateway");
let RealtimeModule = class RealtimeModule {
};
exports.RealtimeModule = RealtimeModule;
exports.RealtimeModule = RealtimeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        providers: [realtime_gateway_1.RealtimeGateway],
        exports: [realtime_gateway_1.RealtimeGateway]
    })
], RealtimeModule);
//# sourceMappingURL=realtime.module.js.map