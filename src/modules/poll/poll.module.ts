import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from '../database/database.module';
import { PollService } from './poll.service';
import { PollRepository } from './poll.repository';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import { PollController } from './poll.controller';

@Module({
  imports: [LoggerModule, DatabaseModule],
  providers: [PollService, PollRepository, LoggerService, DatabaseService],
  controllers: [PollController],
})
export class PollModule {}
