import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { CategoriesRepository } from './categories.repository';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from './dtos/categories.dto';
import { randomUUID } from 'crypto';
import { CategoryEntity } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly logger: LoggerService,
    private readonly repository: CategoriesRepository,
  ) {}

  async list() {
    try {
      this.logger.info({}, 'services > categories > list > params');

      const output = await this.repository.list();

      this.logger.info({}, 'services > categories > list > success');

      return {
        categories: output,
      };
    } catch (error) {
      this.logger.error(error, 'services > categories > list > exception');
      throw error;
    }
  }

  async create(input: CreateCategoryInput) {
    try {
      this.logger.info(input, 'services > categories > create > params');

      const id = randomUUID();

      const entity = new CategoryEntity({
        id,
        ...input,
      });

      await this.repository.create(entity);

      this.logger.info({}, 'serices > categories > create > success');
    } catch (error) {
      this.logger.error(error, 'services > categories create > exception');
      throw error;
    }
  }

  async update(id: string, input: UpdateCategoryInput) {
    try {
      this.logger.info(
        { id, ...input },
        'services > categories > update > params',
      );

      const entity = await this.repository.get(id);

      this.logger.info(entity, 'entity');

      if (!entity) {
        throw new NotFoundException('Category not found');
      }

      Object.assign(entity, input);

      await this.repository.update(entity);

      this.logger.info({}, 'services > categories > update > success');
    } catch (error) {
      this.logger.error(error, 'services > categories > update > exception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      this.logger.info({ id }, 'services > categories > delete > params');

      await this.repository.delete(id);

      this.logger.info({}, 'services > categories > delete > success');
    } catch (error) {
      this.logger.error(error, 'services > categories > delete > exception');
      throw error;
    }
  }
}
