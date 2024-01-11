import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { GameCategoriesRepository } from './game-categories.repository';
import {
  CreateGameCategoriesInput,
  UpdateGameCategoriesInput,
} from './dtos/game-categories.dto';
import { randomUUID } from 'crypto';
import { GameCategoryEntity } from './game-categories.entity';

@Injectable()
export class GameCategoriesService {
  constructor(
    private readonly logger: LoggerService,
    private readonly repository: GameCategoriesRepository,
  ) {}

  async list() {
    try {
      this.logger.info({}, 'services > gameCategories > list > params');

      const output = await this.repository.list();

      this.logger.info({}, 'services > gameCategories > list > success');

      return {
        gameCategories: output,
      };
    } catch (error) {
      this.logger.error(error, 'services > gameCategories > list > exeception');
      throw error;
    }
  }

  async create(input: CreateGameCategoriesInput) {
    try {
      this.logger.info(input, 'services > gameCategories > create > params');

      const id = randomUUID();

      const entity = new GameCategoryEntity({
        id,
        ...input,
      });

      await this.repository.create(entity);

      this.logger.info({}, 'services > gameCategories > create > success');
    } catch (error) {
      this.logger.error(
        error,
        'services > gameCategories > create > exeception',
      );
      throw error;
    }
  }

  async update(id: string, input: UpdateGameCategoriesInput) {
    try {
      this.logger.info(
        { id, ...input },
        'services > gameCategories > update > params',
      );

      const entity = await this.repository.get(id);

      this.logger.info(entity, 'entity');

      if (!entity) {
        throw new NotFoundException('gameCategory not found');
      }

      Object.assign(entity, input);

      await this.repository.update(entity);

      this.logger.info({}, 'services > gameCategories > update > success');
    } catch (error) {
      this.logger.error(
        error,
        'services > gameCategories > update > exeception',
      );
      throw error;
    }
  }

  async delete(id: string) {
    try {
      this.logger.info({ id }, 'services > gameCategories > delete > params');

      await this.repository.delete(id);

      this.logger.info({}, 'services > gameCategories > delete > success');
    } catch (error) {
      this.logger.error(
        error,
        'services > gameCategories > delete > exeception',
      );
      throw error;
    }
  }
}
