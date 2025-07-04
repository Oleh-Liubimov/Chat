import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      username: createUserDto.username,
    });

    if (user) {
      throw new ConflictException('Username already taken');
    }

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        set: updateUserDto,
      },
      {
        new: true,
      },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  deleteUser(id: number) {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
