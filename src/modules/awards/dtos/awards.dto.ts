import { IsNotEmpty, IsString } from 'class-validator';

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
