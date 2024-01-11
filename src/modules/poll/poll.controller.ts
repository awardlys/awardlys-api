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
import { PollService } from './poll.service';
import { CreatePollInput, UpdatePollInput } from './dtos/poll.dto';

//@UseGuards(JwtAuthGuard)
@ApiTags('poll')
@Controller('poll')
export class PollController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: PollService,
  ) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  async create(@Body() body: CreatePollInput) {
    this.logger.info({}, 'controller > polls > create');

    await this.service.create(body);

    this.logger.info({}, 'controller > polls > create > success');
  }

  @Patch('/:pollId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() body: UpdatePollInput, @Param('pollId') pollId: string) {
    this.logger.info({}, 'controller > polls > update');

    await this.service.update(pollId, body);

    this.logger.info({}, 'controller > polls > update');
  }

  @Delete('/:pollId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('pollId') pollId: string) {
    await this.service.delete(pollId);
  }
}
