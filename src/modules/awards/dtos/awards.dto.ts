import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAwardInput {
  /**
   * Campo utilizado para definir título da premiação.
   * @example "Melhor jogo do ano sobrevivência."
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Campo utilizado para definir um subtítulo para premiação.
   * @example "Subtítulo da premiação."
   */
  @IsString()
  @IsNotEmpty()
  subTitle: string;

  /**
   * Campo utilizado para descrição da premiação.
   * @example "Premiação para definir o melhor jogo do ano sobrevivência."
   */
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateAwardInput {
  /**
   * Campo utilizado para definir título da premiação.
   * @example "Melhor jogo do ano sobrevivência."
   */
  @IsString()
  @IsOptional()
  title?: string;

  /**
   * Campo utilizado para definir um subtítulo para premiação.
   * @example "Subtítulo da premiação."
   */
  @IsString()
  @IsOptional()
  subTitle?: string;

  /**
   * Campo utilizado para descrição da premiação.
   * @example "Premiação para definir o melhor jogo do ano sobrevivência."
   */
  @IsString()
  @IsOptional()
  description?: string;
}
