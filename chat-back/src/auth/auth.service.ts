import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private JwtService: JwtService,
  ) {}
  async login(dto: CreateUserDto) {
    let user = await this.userService.findUserByUsername(dto.username);

    if (!user) {
      user = await this.userService.createUser(dto);
    }

    const payload = { username: user.username, sub: user._id };

    return {
      accessToken: this.JwtService.sign(payload, { expiresIn: '1d' }),
      user,
    };
  }
}
