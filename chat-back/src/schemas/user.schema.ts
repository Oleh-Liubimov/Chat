import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  userId: string;

  @Prop()
  status: 'online' | 'offline';

  @Prop()
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
