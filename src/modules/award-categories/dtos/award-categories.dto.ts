import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAwardCategoriesInput {
  /**
   * Campo utilizado para salvar o ID da premiação.
   * @example "60e00169-4bdb-4b0a-856e-f31e202299d4"
   */
  @IsString()
  @IsNotEmpty()
  awardId: string;

  /**
   * Campo utilizado para salvar o ID da categoria
   * @example "d1c9f3e8-a975-4120-a2e0-551e014efa1f"
   */
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateAwardCategoriesInput {
  /**
   * Campo utilizado para salvar o ID da premiação.
   * @example "60e00169-4bdb-4b0a-856e-f31e202299d4"
   */
  @IsString()
  @IsOptional()
  awardId?: string;

  /**
   * Campo utilizado para salvar o ID da categoria
   * @example "d1c9f3e8-a975-4120-a2e0-551e014efa1f"
   */
  @IsString()
  @IsOptional()
  categoryId?: string;
}
