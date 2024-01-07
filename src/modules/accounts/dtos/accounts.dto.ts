import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccountInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;
}

export class UpdateAccountsInput {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  passwordHash?: string;
}

export class LoginAccountInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;
}
