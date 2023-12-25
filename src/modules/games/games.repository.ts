import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { GameEntity, GameProps } from './games.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class GamesRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly db: DatabaseService,
  ) {}

  async list() {
    try {
      const games = await this.db.game.findMany();

      return games.map((game) => new GameEntity(game as unknown as GameProps));
    } catch (error) {
      this.logger.error(error, 'GamesRepository > list > exception');
      throw error;
    }
  }

  async get(id: string) {
    try {
      const output = await this.db.game.findUnique({
        where: {
          id,
        },
      });

      if (!output) {
        return undefined;
      }

      return new GameEntity(output as unknown as GameProps);
    } catch (error) {
      this.logger.error(error, 'GamesRepository > get > exception');
      throw error;
    }
  }

  async create(entity: GameEntity) {
    try {
      await this.db.game.create({
        data: entity.toJSON(),
      });
    } catch (error) {
      this.logger.error(error, 'GamesRepository > create > exception');
      throw error;
    }
  }

  async update(entity: GameEntity) {
    try {
      await this.db.game.update({
        data: entity.toJSON(),
        where: {
          id: entity.id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'GamesRepository > update > exception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.db.game.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'GamesRepository > delete > exception');
      throw error;
    }
  }
}
