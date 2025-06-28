import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected ${client.id}`);
    const messages = await this.chatService.getAllMessages();
    client.emit('chat-history', messages);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('new-message')
  async handleMessage(
    client: Socket,
    payload: { username: string; messageContent: string },
  ) {
    const saved = await this.chatService.saveMessage(
      payload.username,
      payload.messageContent,
    );

    this.server.emit('new-message', saved);
  }
}
