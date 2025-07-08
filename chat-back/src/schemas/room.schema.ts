import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Room extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  roomAvatarUrl?: string;

  @Prop({ enum: ['public', 'private'], default: 'private' })
  type: 'public' | 'private';

  @Prop({ type: [{ type: Types.ObjectId, ref: () => User }] })
  members: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: () => User })
  createdBy: Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
