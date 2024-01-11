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
import { AwardCategoriesService } from './award-categories.service';
import {
  CreateAwardCategoriesInput,
  UpdateAwardCategoriesInput,
} from './dtos/award-categories.dto';

//@UseGuards(JwtAuthGuard)
@ApiTags('awardCategories')
@Controller('award-categories')
export class AwardCategoriesController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: AwardCategoriesService,
  ) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  async create(@Body() body: CreateAwardCategoriesInput) {
    this.logger.info({}, 'controller > awardCategories > create');

    await this.service.create(body);

    this.logger.info({}, 'controller > awardCategories > create > success');
  }

  @Patch('/:awardCategoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() body: UpdateAwardCategoriesInput,
    @Param('awardCategoryId') awardCategoryId: string,
  ) {
    this.logger.info({}, 'controller > awardCategories > update');

    await this.service.update(awardCategoryId, body);

    this.logger.info({}, 'controller > awardCategories > update');
  }

  @Delete(':awardCategoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('awardCategoryId') awardCategoryId: string) {
    await this.service.delete(awardCategoryId);
  }
}
