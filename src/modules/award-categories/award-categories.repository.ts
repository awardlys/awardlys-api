import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import {
  AwardCategoriyProps,
  AwardCategoryEntity,
} from './award-categories.entity';

@Injectable()
export class AwardCategoriesRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly db: DatabaseService,
  ) {}

  async list() {
    try {
      const awardCategories = await this.db.awardCategory.findMany();

      return awardCategories.map(
        (awardCategory) =>
          new AwardCategoryEntity(
            awardCategory as unknown as AwardCategoriyProps,
          ),
      );
    } catch (error) {
      this.logger.error(error, 'AwardCategoriesRepository > list > exception');
      throw error;
    }
  }

  async get(id: string) {
    try {
      const output = await this.db.awardCategory.findUnique({
        where: {
          id,
        },
      });

      if (!output) {
        return undefined;
      }

      return new AwardCategoryEntity(output as unknown as AwardCategoriyProps);
    } catch (error) {
      this.logger.error(error, 'AwardCategoriesRepository > get > exception');
      throw error;
    }
  }

  async create(entity: AwardCategoryEntity) {
    try {
      await this.db.awardCategory.create({
        data: entity.toJSON(),
      });
    } catch (error) {
      this.logger.error(
        error,
        'AwardCategoriesRepository > create > exception',
      );
      throw error;
    }
  }

  async update(entity: AwardCategoryEntity) {
    try {
      await this.db.awardCategory.update({
        data: entity.toJSON(),
        where: {
          id: entity.id,
        },
      });
    } catch (error) {
      this.logger.error(
        error,
        'AwardCategoriesRepository > update > exception',
      );
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.db.awardCategory.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(
        error,
        'AwardCategoriesRepository > delete > exception',
      );
      throw error;
    }
  }
}
