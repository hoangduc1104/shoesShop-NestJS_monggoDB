import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  // handleConnection(client: Socket) {
  //   console.log(`Client ${client.id} connected`);
  // }

  users: Map<string, string> = new Map(); // Sử dụng Map để lưu thông tin người dùng và trạng thái typing

  handleConnection(socket: Socket) {
    this.users.set(socket.id, '');

    this.server.emit('users', [...this.users.values()]);
  }

  handleDisconnect(socket: Socket) {
    this.users.delete(socket.id);

    this.server.emit('users', [...this.users.values()]);
  }

  @SubscribeMessage('newComment')
  async handleComment(client: Socket, comment: any) {
    this.server.emit('newComment', comment);
  }

  @SubscribeMessage('typing')
  handleTyping(socket: Socket, username: string) {
    this.users.set(socket.id, username);

    this.server.emit('typing', username);
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(socket: Socket) {
    const username = this.users.get(socket.id);

    this.users.set(socket.id, '');

    this.server.emit('stopTyping', username);
  }
}
