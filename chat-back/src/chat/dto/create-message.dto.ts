import { Transform } from 'class-transformer';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  username: string;

  @IsString()
  messageContent: string;

  @IsMongoId()
  roomId: string;

  @IsBoolean()
  @Transform((value) => value ?? false)
  isSystemMessage: boolean;
}
