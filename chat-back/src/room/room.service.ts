import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room } from 'src/schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async createRoom(dto: CreateRoomDto, userId: string) {
    const createdRoom = new this.roomModel({
      ...dto,
      createdBy: new Types.ObjectId(userId),
      members: [new Types.ObjectId(userId)],
    });

    return createdRoom.save();
  }

  async findAll() {
    return this.roomModel.find().populate('members createdBy');
  }

  async findById(id: string) {
    return this.roomModel.findById(id).populate('members createdBy');
  }
}
