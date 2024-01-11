import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameCategoriesInput {
  /**
   * Campo utilizado para salvar o ID da premiaçãoCategoria
   * @example "3dc78b06-8e97-4b61-b1d4-3c7e595d1b9f"
   */
  @IsString()
  @IsNotEmpty()
  awardCategoryId: string;

  /**
   * Campo utilizado para salvar o ID do jogo
   * @example "b3fce966-452b-45e9-9dc9-34b8e8617029"
   */
  @IsString()
  @IsNotEmpty()
  gameId: string;
}

export class UpdateGameCategoriesInput {
  /**
   * Campo utilizado para salvar o ID da premiaçãoCategoria
   * @example "3dc78b06-8e97-4b61-b1d4-3c7e595d1b9f"
   */
  @IsString()
  @IsOptional()
  awardCategoryId?: string;

  /**
   * Campo utilizado para salvar o ID do jogo
   * @example "b3fce966-452b-45e9-9dc9-34b8e8617029"
   */
  @IsString()
  @IsOptional()
  gameId?: string;
}
