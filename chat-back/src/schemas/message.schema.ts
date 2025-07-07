import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Room } from './room.schema';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  messageContent: string;

  @Prop({ default: false })
  isSystemMessage: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: () => Room }], required: true })
  roomId: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
