import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';
import { GameCategoriesService } from './game-categories.service';
import {
  CreateGameCategoriesInput,
  UpdateGameCategoriesInput,
} from './dtos/game-categories.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('game-categories')
@Controller('game-categories')
export class GameCategoriesController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: GameCategoriesService,
  ) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  async create(@Body() body: CreateGameCategoriesInput) {
    this.logger.info({}, 'controller > gameCategories > create');

    await this.service.create(body);

    this.logger.info({}, 'controller > gameCategories > create > success');
  }

  @Patch('/:gameCategoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() body: UpdateGameCategoriesInput,
    @Param('gameCategoryId') gameCategoryId: string,
  ) {
    this.logger.info({}, 'controller > gameCategories > update');

    await this.service.update(gameCategoryId, body);

    this.logger.info({}, 'controller > gameCategories > update');
  }

  @Delete('/:gameCategoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('gameCategoryId') gameCategoryId: string) {
    await this.service.delete(gameCategoryId);
  }
}
