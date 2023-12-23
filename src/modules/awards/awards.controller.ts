import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { CreateAwardInput } from './dtos/awards.dto';
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

    this.logger.info({}, 'controller > awards > create : success');
  }

  @Delete(':awardId')
  async delete(@Param('awardId') awardId: string) {
    await this.service.delete(awardId);
  }
}
