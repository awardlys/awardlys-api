import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAwardCategoriesInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  awardId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateAwardCategoriesInput {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  awardId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categoryId?: string;
}
