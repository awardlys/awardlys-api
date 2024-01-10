import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAwardCategoriesInput {
  /**
   * Campo utilizado para salvar o ID da premiação.
   * @example "exemplo"
   */
  @IsString()
  @IsNotEmpty()
  awardId: string;

  /**
   * Campo 2
   * @example "exemplo"
   */
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

export class UpdateAwardCategoriesInput {
  /**
   * Campo 1
   * @example "exemplo"
   */
  @IsString()
  @IsOptional()
  awardId?: string;

  /**
   * Campo 2
   * @example "exemplo"
   */
  @IsString()
  @IsOptional()
  categoryId?: string;
}
