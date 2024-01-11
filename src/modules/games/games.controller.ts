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
import { GamesService } from './games.service';
import { CreateGameInput, UpdateGameInput } from './dtos/games.dto';
import { LoggerService } from '../logger/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: GamesService,
  ) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  async create(@Body() body: CreateGameInput) {
    this.logger.info({}, 'controller > games > create');

    await this.service.create(body);

    this.logger.info({}, 'controller > games > create > success');
  }

  @Patch('/:gameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() body: UpdateGameInput, @Param('gameId') gameId: string) {
    this.logger.info({}, 'controller > games > update');

    await this.service.update(gameId, body);

    this.logger.info({}, 'controller > games > update');
  }

  @Delete('/:gameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('gameId') gameId: string) {
    await this.service.delete(gameId);
  }
}
