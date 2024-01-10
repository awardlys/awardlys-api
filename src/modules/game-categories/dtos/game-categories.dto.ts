import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameCategoriesInput {
  /**
   * DESCRIÇÃO!
   * @example EXEMPLO
   */
  @IsString()
  @IsNotEmpty()
  awardCategoryId: string;

  /**
   * DESCRIÇÃO!
   * @example EXEMPLO
   */
  @IsString()
  @IsNotEmpty()
  gameId: string;
}

export class UpdateGameCategoriesInput {
  /**
   * DESCRIÇÃO!
   * @example EXEMPLO
   */
  @IsString()
  @IsOptional()
  awardCategoryId?: string;

  /**
   * DESCRIÇÃO!
   * @example EXEMPLO
   */
  @IsString()
  @IsOptional()
  gameId?: string;
}
