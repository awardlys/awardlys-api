import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAwardInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subTitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateAwardInput {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subTitle?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
