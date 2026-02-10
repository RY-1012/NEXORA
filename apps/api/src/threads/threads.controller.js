"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ThreadsController = class ThreadsController {
    constructor(threadsService) {
        this.threadsService = threadsService;
    }
    list(req) {
        return this.threadsService.listThreads(req.user?.id ?? '');
    }
    create(req, body) {
        return this.threadsService.createThread(req.user?.id ?? '', body.participantIds, body.title, body.isGroup ?? false);
    }
    listMessages(id) {
        return this.threadsService.listMessages(id);
    }
    sendMessage(id, req, body) {
        return this.threadsService.sendMessage(id, req.user?.id ?? '', body.body);
    }
};
exports.ThreadsController = ThreadsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Req)())
], ThreadsController.prototype, "list", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Body)())
], ThreadsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id/messages'),
    tslib_1.__param(0, (0, common_1.Param)('id'))
], ThreadsController.prototype, "listMessages", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/messages'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)())
], ThreadsController.prototype, "sendMessage", null);
exports.ThreadsController = ThreadsController = tslib_1.__decorate([
    (0, common_1.Controller)('threads'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)
], ThreadsController);
//# sourceMappingURL=threads.controller.js.map