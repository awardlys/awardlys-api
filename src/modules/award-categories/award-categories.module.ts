import { Module } from '@nestjs/common';
import { AwardCategoriesController } from './award-categories.controller';
import { AwardCategoriesService } from './award-categories.service';
import { AwardCategoriesRepository } from './award-categories.repository';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [LoggerModule, DatabaseModule],
  providers: [
    AwardCategoriesService,
    AwardCategoriesRepository,
    LoggerService,
    DatabaseService,
  ],
  controllers: [AwardCategoriesController],
})
export class AwardCategoriesModule {}
