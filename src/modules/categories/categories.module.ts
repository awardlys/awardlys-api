import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import { LoggerModule } from '../logger/logger.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [LoggerModule, DatabaseModule],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    LoggerService,
    DatabaseService,
  ],
})
export class CategoriesModule {}
