import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';
import { Room } from 'src/schemas/room.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Room.name) private roomModel: Model<Room>,
  ) {}

  async saveMessage(dto: CreateMessageDto) {
    const room = await this.roomModel.findById(dto.roomId);

    if (!room) {
      throw new NotFoundException('Room is not found');
    }

    const newMessage = new this.messageModel({
      ...dto,
    });
    return newMessage.save();
  }

  async getAllMessages() {
    return this.messageModel.find().sort({ createdAt: 1 }).exec();
  }

  async getMessagesFromRoom(roomId: string) {
    return this.messageModel.find({ roomId }).sort({ createdAt: 1 }).exec();
  }
}
