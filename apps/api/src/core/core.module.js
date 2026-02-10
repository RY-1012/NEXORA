"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("../config/configuration");
const database_module_1 = require("./database.module");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.configuration]
            }),
            database_module_1.DatabaseModule
        ],
        exports: [database_module_1.DatabaseModule]
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map