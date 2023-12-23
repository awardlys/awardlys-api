import { Module } from '@nestjs/common';
import { AwardsController } from './awards.controller';
import { AwardsService } from './awards.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { AwardsRepository } from './awards.repository';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [LoggerModule, DatabaseModule],
  controllers: [AwardsController],
  providers: [AwardsService, AwardsRepository, LoggerService, DatabaseService],
})
export class AwardsModule {}
