import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload';
import { Room } from 'src/schemas/room.schema';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-room')
  async createRoom(
    @Body() dto: CreateRoomDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const userId: string = req.user.sub;
    return this.roomService.createRoom(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    return this.roomService.findById(id);
  }
}
