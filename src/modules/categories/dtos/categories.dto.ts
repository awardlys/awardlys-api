import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryInput {
  /**
   * Campo utilizado para definir o nome da categoria.
   * @example "Jogos de sobrevivência em mundo aberto."
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Campo utilizado para descrição da categoria.
   * @example "Descrição da categoria."
   */
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateCategoryInput {
  /**
   * Campo utilizado para definir o nome da categoria.
   * @example "Jogos de sobrevivência em mundo aberto."
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * Campo utilizado para descrição da categoria.
   * @example "Descrição da categoria."
   */
  @IsString()
  @IsOptional()
  description?: string;
}
