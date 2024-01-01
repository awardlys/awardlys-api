import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { AwardsRepository } from './awards.repository';
import { CreateAwardInput, UpdateAwardInput } from './dtos/awards.dto';
import { AwardEntity } from './awards.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AwardsService {
  constructor(
    private readonly logger: LoggerService,
    private readonly repository: AwardsRepository,
  ) {}

  async get(id: string) {
    try {
      this.logger.info({}, 'services > awards > get > params');

      const output = await this.repository.get(id);

      this.logger.info({}, 'services > awards > get > success');

      return output;
    } catch (error) {
      this.logger.error(error, 'services > awards > get > exeception');
      throw error;
    }
  }

  async list() {
    try {
      this.logger.info({}, 'services > awards > list > params');

      const output = await this.repository.list();

      this.logger.info({}, 'services > awards > list > success');

      return {
        awards: output,
      };
    } catch (error) {
      this.logger.error(error, 'services > awards > list > exeception');
      throw error;
    }
  }

  async create(input: CreateAwardInput) {
    try {
      this.logger.info(input, 'services > awards > create > params');

      const id = randomUUID();

      const entity = new AwardEntity({
        id,
        status: 'draft',
        ...input,
      });

      await this.repository.create(entity);

      this.logger.info({}, 'services > awards > create > success');
    } catch (error) {
      this.logger.error(error, 'services > awards > create > exeception');
      throw error;
    }
  }

  async update(id: string, input: UpdateAwardInput) {
    try {
      this.logger.info({ id, ...input }, 'services > awards > update > params');

      const entity = await this.repository.get(id);

      this.logger.info(entity, 'entity');

      if (!entity) {
        throw new NotFoundException('Award not found');
      }

      Object.assign(entity, input);

      await this.repository.update(entity);

      this.logger.info({}, 'services > awards > update > success');
    } catch (error) {
      this.logger.error(error, 'services > awards > update > exeception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      this.logger.info({ id }, 'services > awards > delete > params');

      await this.repository.delete(id);

      this.logger.info({}, 'services > awards > delete > success');
    } catch (error) {
      this.logger.error(error, 'services > awards > delete > exeception');
      throw error;
    }
  }
}
