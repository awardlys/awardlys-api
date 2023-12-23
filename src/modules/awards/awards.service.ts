import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { AwardsRepository } from './awards.repository';
import { CreateAwardInput } from './dtos/awards.dto';
import { AwardEntity } from './awards.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AwardsService {
  constructor(
    private readonly logger: LoggerService,
    private readonly repository: AwardsRepository,
  ) {}

  async list() {
    try {
      this.logger.info({ fullName: 'daniel' }, 'list > params');

      const output = await this.repository.list();

      this.logger.info({}, 'list > success');

      return {
        awards: output,
      };
    } catch (error) {
      this.logger.error(error, 'list > exeception');
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
      this.logger.error(error, 'create > exeception');
    }
  }

  async delete(id: string) {
    try {
      this.logger.info({ id }, 'services > awards > delete > params');

      await this.repository.delete(id);

      this.logger.info({}, 'services > awards > create > success');
    } catch (error) {
      this.logger.error(error, 'delete > exeception');
    }
  }
}
