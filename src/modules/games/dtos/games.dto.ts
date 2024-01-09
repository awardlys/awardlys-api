import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GamePlatform } from '../games.entity';

export class CreateGameInput {
  /**
   * Campo utilizado para definir o título do jogo.
   * @example Minecraft
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Campo utilizado para descrição do jogo.
   * @example "Jogo multiplataforma de sobrevivência em mundo aberto."
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Campo do tipo enum utilizado para definir qual plataforma/plataformas são compatíveis com o jogo.
   * - Estrutura:
   *  - 0 - Windows,
   *  - 1 - Mac,
   *  - 2 - Linux.
   * @example 2
   */
  @IsEnum(GamePlatform)
  @IsNotEmpty()
  platform: keyof typeof GamePlatform;

  /**
   * Campo utlizado para URL da imagem do jogo.
   * @example https://url_da_imagem
   */
  @IsString()
  @IsNotEmpty()
  image_url: string;
}

export class UpdateGameInput {
  /**
   * Campo utilizado para definir o título do jogo.
   * @example Minecraft.
   */
  @IsString()
  @IsOptional()
  title?: string;

  /**
   * Campo utilizado para descrição do jogo.
   * @example "Jogo multiplataforma de sobrevivência em mundo aberto."
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * Campo do tipo enum utilizado para definir qual plataforma/plataformas são compatíveis com o jogo.
   * - Estrutura:
   *  - 0 - Windows,
   *  - 1 - Mac,
   *  - 2 - Linux.
   * @example 2
   */
  @IsEnum(GamePlatform)
  @IsOptional()
  platform?: keyof typeof GamePlatform;

  /**
   * Campo utlizado para URL da imagem do jogo.
   * @example https://url_da_imagem
   */
  @IsString()
  @IsOptional()
  image_url?: string;
}
