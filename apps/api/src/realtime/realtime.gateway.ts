import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { JwtPayload } from '../auth/jwt.strategy';

@WebSocketGateway({ cors: true, namespace: '/realtime' })
export class RealtimeGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly jwtService: JwtService) {}

  handleConnection(socket: Socket) {
    const token = this.getToken(socket);
    if (!token) {
      socket.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      socket.data.userId = payload.sub;
      this.server.emit('presence:update', { id: payload.sub, status: 'online' });
    } catch {
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    if (socket.data.userId) {
      this.server.emit('presence:update', { id: socket.data.userId, status: 'offline' });
    }
  }

  @SubscribeMessage('presence:join')
  handleJoin(@ConnectedSocket() socket: Socket) {
    if (socket.data.userId) {
      socket.broadcast.emit('presence:update', { id: socket.data.userId, status: 'online' });
      return { ok: true };
    }
    return { ok: false };
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() body: { threadId: string; typing: boolean }) {
    return { ok: true, ...body };
  }

  @SubscribeMessage('read')
  handleRead(@MessageBody() body: { threadId: string; messageId: string }) {
    return { ok: true, ...body };
  }

  private getToken(socket: Socket): string | null {
    const authToken = socket.handshake.auth?.['token'] as string | undefined;
    if (authToken) {
      return authToken;
    }
    const header = socket.handshake.headers.authorization;
    if (header?.startsWith('Bearer ')) {
      return header.substring('Bearer '.length);
    }
    return null;
  }
}
