import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import { GamesRepository } from './games.repository';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [LoggerModule, DatabaseModule],
  providers: [GamesService, GamesRepository, LoggerService, DatabaseService],
  controllers: [GamesController],
})
export class GamesModule {}
