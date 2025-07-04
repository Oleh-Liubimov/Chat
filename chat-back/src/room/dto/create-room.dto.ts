import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['public', 'private'])
  type?: 'public' | 'private';

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  members?: string[];
}
