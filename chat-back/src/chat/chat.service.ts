import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async saveMessage(
    username: string,
    messageContent: string,
    isSystemMessage = false,
  ) {
    const newMessage = new this.messageModel({
      username,
      messageContent,
      isSystemMessage,
    });
    return newMessage.save();
  }

  async getAllMessages() {
    return this.messageModel.find().sort({ createdAt: 1 }).exec();
  }
}
