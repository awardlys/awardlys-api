import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameCategoriesInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  awardCategoryId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gameId: string;
}

export class UpdateGameCategoriesInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  awardCategoryId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  gameId?: string;
}
