import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GamePlatform } from '../games.entity';

export class CreateGameInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(GamePlatform)
  @IsNotEmpty()
  platform: keyof typeof GamePlatform;

  @IsString()
  @IsNotEmpty()
  image_url: string;
}

export class UpdateGameInput {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(GamePlatform)
  @IsOptional()
  platform?: keyof typeof GamePlatform;

  @IsString()
  @IsOptional()
  image_url?: string;
}
