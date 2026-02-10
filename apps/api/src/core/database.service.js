"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let DatabaseService = class DatabaseService {
    constructor(configService) {
        this.configService = configService;
        const connectionString = this.configService.get('database.url');
        this.pool = new pg_1.Pool({ connectionString });
    }
    query(text, params) {
        return this.pool.query(text, params);
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map