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

  handleConnection(client: Socket) {
    console.log(`Client ${client.id} connected`);
  }

  @SubscribeMessage('newComment')
  async handleComment(client: Socket, comment: any) {
    this.server.emit('newComment', comment);
  }
}
