import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from '../database/database.module';
import { GameCategoriesService } from './game-categories.service';
import { GameCategoriesRepository } from './game-categories.repository';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import { GameCategoriesController } from './game-categories.controller';

@Module({
  imports: [LoggerModule, DatabaseModule],
  providers: [
    GameCategoriesService,
    GameCategoriesRepository,
    LoggerService,
    DatabaseService,
  ],
  controllers: [GameCategoriesController],
})
export class GameCategoriesModule {}
