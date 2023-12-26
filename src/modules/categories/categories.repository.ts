import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import { CategoryEntity, CategoryProps } from './categories.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly db: DatabaseService,
  ) {}

  async list() {
    try {
      const categories = await this.db.category.findMany();

      return categories.map(
        (category) => new CategoryEntity(category as unknown as CategoryProps),
      );
    } catch (error) {
      this.logger.error(error, 'CategoriesRepository > list > exception');
      throw error;
    }
  }

  async get(id: string) {
    try {
      const output = await this.db.category.findUnique({
        where: {
          id,
        },
      });

      if (!output) {
        return undefined;
      }

      return new CategoryEntity(output as unknown as CategoryProps);
    } catch (error) {
      this.logger.error(error, 'CategoriesRepository > get > exception');
      throw error;
    }
  }

  async create(entity: CategoryEntity) {
    try {
      await this.db.category.create({
        data: entity.toJSON(),
      });
    } catch (error) {
      this.logger.error(error, 'CategoriesRepository > create > exception');
      throw error;
    }
  }

  async update(entity: CategoryEntity) {
    try {
      await this.db.category.update({
        data: entity.toJSON(),
        where: {
          id: entity.id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'CategoriesRepository > update > exception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.db.category.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'CategoriesRepository > delete > exception');
      throw error;
    }
  }
}
