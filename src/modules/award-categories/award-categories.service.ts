import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { AwardCategoriesRepository } from './award-categories.repository';
import {
  CreateAwardCategoriesInput,
  UpdateAwardCategoriesInput,
} from './dtos/award-categories.dto';
import { randomUUID } from 'crypto';
import { AwardCategoryEntity } from './award-categories.entity';

@Injectable()
export class AwardCategoriesService {
  constructor(
    private readonly logger: LoggerService,
    private readonly repository: AwardCategoriesRepository,
  ) {}

  async list() {
    try {
      this.logger.info({}, 'services > awardCategories > list > params');

      const output = await this.repository.list();

      this.logger.info({}, 'services > awardCategories > list > success');

      return {
        awardCategories: output,
      };
    } catch (error) {
      this.logger.error(
        error,
        'services > awardCategories > list > exeception',
      );
      throw error;
    }
  }

  async create(input: CreateAwardCategoriesInput) {
    try {
      this.logger.info(input, 'services > awardCategories > create > params');

      const id = randomUUID();

      const entity = new AwardCategoryEntity({
        id,
        ...input,
      });

      await this.repository.create(entity);

      this.logger.info({}, 'services > awardCategories > create > success');
    } catch (error) {
      this.logger.error(
        error,
        'services > awardCategories > create > exeception',
      );
      throw error;
    }
  }

  async update(id: string, input: UpdateAwardCategoriesInput) {
    try {
      this.logger.info(
        { id, ...input },
        'services > awardCategories > update > params',
      );

      const entity = await this.repository.get(id);

      this.logger.info(entity, 'entity');

      if (!entity) {
        throw new NotFoundException('awardCategory not found');
      }

      Object.assign(entity, input);

      await this.repository.update(entity);

      this.logger.info({}, 'services > awardCategories > update > success');
    } catch (error) {
      this.logger.error(
        error,
        'services > awardCategories > update > exeception',
      );
      throw error;
    }
  }

  async delete(id: string) {
    try {
      this.logger.info({ id }, 'services > awardCategories > delete > params');

      await this.repository.delete(id);

      this.logger.info({}, 'services > awardCategories > delete > success');
    } catch (error) {
      this.logger.error(
        error,
        'services > awardCategories > delete > exeception',
      );
      throw error;
    }
  }
}
