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
import { AwardsService } from './awards.service';
import { CreateAwardInput, UpdateAwardInput } from './dtos/awards.dto';
import { LoggerService } from '../logger/logger.service';

@Controller('awards')
export class AwardsController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: AwardsService,
  ) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  async create(@Body() body: CreateAwardInput) {
    this.logger.info({}, 'controller > awards > create');

    await this.service.create(body);

    this.logger.info({}, 'controller > awards > create > success');
  }

  @Patch('/:awardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() body: UpdateAwardInput,
    @Param('awardId') awardId: string,
  ) {
    this.logger.info({}, 'controller > awards > update');

    await this.service.update(awardId, body);

    this.logger.info({}, 'controller > awards > update');
  }

  @Delete(':awardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('awardId') awardId: string) {
    await this.service.delete(awardId);
  }
}
