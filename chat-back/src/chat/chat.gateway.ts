import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Message } from 'src/schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(client: Socket, payload: { roomId: string }) {
    await client.join(payload.roomId);
    const messages = await this.chatService.getMessagesFromRoom(payload.roomId);
    client.emit('chat-history', messages);
    console.log(`Client ${client.id} joined room ${payload.roomId}`);
  }

  @SubscribeMessage('new-message')
  async handleMessage(client: Socket, payload: CreateMessageDto) {
    const saved: Message = await this.chatService.saveMessage(payload);

    this.server.to(payload.roomId).emit('new-message', saved);
  }
}
