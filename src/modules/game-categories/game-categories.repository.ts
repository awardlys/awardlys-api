import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import {
  GameCategoryEntity,
  GameCategoryProps,
} from './game-categories.entity';

@Injectable()
export class GameCategoriesRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly db: DatabaseService,
  ) {}

  async list() {
    try {
      const gameCategories = await this.db.gameCategory.findMany();

      return gameCategories.map(
        (gameCategorie) =>
          new GameCategoryEntity(gameCategorie as unknown as GameCategoryProps),
      );
    } catch (error) {
      this.logger.error(error, 'GameCategoriesRepository > list > exception');
      throw error;
    }
  }

  async get(id: string) {
    try {
      const output = await this.db.gameCategory.findUnique({
        where: {
          id,
        },
      });

      if (!output) {
        return undefined;
      }

      return new GameCategoryEntity(output as unknown as GameCategoryProps);
    } catch (error) {
      this.logger.error(error, 'GameCategoriesRepository > get > exception');
      throw error;
    }
  }

  async create(entity: GameCategoryEntity) {
    try {
      await this.db.gameCategory.create({
        data: entity.toJSON(),
      });
    } catch (error) {
      this.logger.error(error, 'GameCategoriesRepository > create > exception');
      throw error;
    }
  }

  async update(entity: GameCategoryEntity) {
    try {
      await this.db.gameCategory.update({
        data: entity.toJSON(),
        where: {
          id: entity.id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'GameCategoriesRepository > update > exception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.db.gameCategory.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'GameCategoriesRepository > delete > exception');
      throw error;
    }
  }
}
