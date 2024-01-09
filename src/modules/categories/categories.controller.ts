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
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from './dtos/categories.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: CategoriesService,
  ) {}

  @Get()
  list() {
    this.logger.info({}, 'controller > categories > list');
    return this.service.list();
  }

  @Post()
  async create(@Body() body: CreateCategoryInput) {
    this.logger.info({}, 'controller > categories > create');

    await this.service.create(body);

    this.logger.info({}, 'controller > categories > create > success');
  }

  @Patch('/:categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() body: UpdateCategoryInput,
    @Param('categoryId') categoryId: string,
  ) {
    this.logger.info({}, 'controller > categories > update');

    await this.service.update(categoryId, body);

    this.logger.info({}, 'controller > categories > update');
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('categoryId') categoryId: string) {
    await this.service.delete(categoryId);
  }
}
