import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePollInput {
  /**
   * Campo utilizado para salvar o ID da conta de usuário
   * @example "c4d8f133-3ed7-44ff-8693-5deb978263d9"
   */
  @IsString()
  @IsNotEmpty()
  accountId: string;

  /**
   * Campo utilizado para salvar o ID da categoria do jogo
   * @example "9a951f4b-b759-43bc-9369-dd9916501b03"
   */
  @IsString()
  @IsNotEmpty()
  gameCategoryId: string;
}

export class UpdatePollInput {
  /**
   * Campo utilizado para salvar o ID da conta de usuário
   * @example "c4d8f133-3ed7-44ff-8693-5deb978263d9"
   */
  @IsString()
  @IsOptional()
  accountId?: string;

  /**
   * Campo utilizado para salvar o ID da categoria do jogo
   * @example "9a951f4b-b759-43bc-9369-dd9916501b03"
   */
  @IsString()
  @IsOptional()
  gameCategoryId?: string;
}
