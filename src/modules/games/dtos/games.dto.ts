import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GamePlatform } from '../games.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGameInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: GamePlatform })
  @IsEnum(GamePlatform)
  @IsNotEmpty()
  platform: keyof typeof GamePlatform;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image_url: string;
}

export class UpdateGameInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: GamePlatform })
  @IsEnum(GamePlatform)
  @IsOptional()
  @IsNotEmpty()
  platform?: keyof typeof GamePlatform;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  image_url?: string;
}
