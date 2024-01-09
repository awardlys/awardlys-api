import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAccountInput {
  /**
   * - Campo utilizado para definir o nome de usuário da conta.
   * @example "Howard Wolowitz"
   */
  @IsString()
  @IsNotEmpty()
  username: string;

  /**
   * - Campo utilizado para definir o email da conta.
   * - Deve conter um valor único em formato de e-mail válido.
   * - Campo utilizado para login no sistema.
   * @example "wolowizard@email.com"
   */
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * - Campo utilizado para definir a senha da conta.
   * - Deve conter o mínimo de 6 caracteres entre letras, números ou caracteres especiais.
   * - Campo utilizado para login no sistema.
   * @example "senha segura"
   */
  @IsString()
  @IsNotEmpty()
  passwordHash: string;
}

export class UpdateAccountsInput {
  /**
   * - Campo utilizado para definir o nome de usuário da conta.
   * @example "Howard Wolowitz"
   */
  @IsString()
  @IsOptional()
  username?: string;

  /**
   * - Campo utilizado para definir o email da conta.
   * - Deve conter um valor único em formato de e-mail válido.
   * - Campo utilizado para login no sistema.
   * @example "wolowizard@email.com"
   */
  @IsString()
  @IsOptional()
  email?: string;

  /**
   * - Campo utilizado para definir a senha da conta.
   * - Deve conter o mínimo de 6 caracteres entre letras, números ou caracteres especiais.
   * - Campo utilizado para login no sistema.
   * @example "senha segura"
   */
  @IsString()
  @IsOptional()
  passwordHash?: string;
}

export class LoginAccountInput {
  /**
   * - Campo utilizado para receber o email da conta.
   * - Deve conter um valor único em formato de e-mail válido.
   * - Campo utilizado para login no sistema.
   * @example "wolowizard@email.com"
   */
  @IsString()
  @IsNotEmpty()
  username: string;

  /**
   * - Campo utilizado para receber a senha da conta.
   * - Deve conter o mínimo de 6 caracteres entre letras, números ou caracteres especiais.
   * - Campo utilizado para login no sistema.
   * @example "senha segura"
   */
  @IsString()
  @IsNotEmpty()
  passwordHash: string;
}
