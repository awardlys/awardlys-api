import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePollInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gameCategoryId: string;
}

export class UpdatePollInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  accountId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  gameCategoryId?: string;
}
