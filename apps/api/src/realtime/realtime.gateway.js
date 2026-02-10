"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
let RealtimeGateway = class RealtimeGateway {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    handleConnection(socket) {
        const token = this.getToken(socket);
        if (!token) {
            socket.disconnect();
            return;
        }
        try {
            const payload = this.jwtService.verify(token);
            socket.data.userId = payload.sub;
            this.server.emit('presence:update', { id: payload.sub, status: 'online' });
        }
        catch {
            socket.disconnect();
        }
    }
    handleDisconnect(socket) {
        if (socket.data.userId) {
            this.server.emit('presence:update', { id: socket.data.userId, status: 'offline' });
        }
    }
    handleJoin(socket) {
        if (socket.data.userId) {
            socket.broadcast.emit('presence:update', { id: socket.data.userId, status: 'online' });
            return { ok: true };
        }
        return { ok: false };
    }
    handleTyping(body) {
        return { ok: true, ...body };
    }
    handleRead(body) {
        return { ok: true, ...body };
    }
    getToken(socket) {
        const authToken = socket.handshake.auth?.['token'];
        if (authToken) {
            return authToken;
        }
        const header = socket.handshake.headers.authorization;
        if (header?.startsWith('Bearer ')) {
            return header.substring('Bearer '.length);
        }
        return null;
    }
};
exports.RealtimeGateway = RealtimeGateway;
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)()
], RealtimeGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('presence:join'),
    tslib_1.__param(0, (0, websockets_1.ConnectedSocket)())
], RealtimeGateway.prototype, "handleJoin", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    tslib_1.__param(0, (0, websockets_1.MessageBody)())
], RealtimeGateway.prototype, "handleTyping", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('read'),
    tslib_1.__param(0, (0, websockets_1.MessageBody)())
], RealtimeGateway.prototype, "handleRead", null);
exports.RealtimeGateway = RealtimeGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, namespace: '/realtime' })
], RealtimeGateway);
//# sourceMappingURL=realtime.gateway.js.map