import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { PollRepository } from './poll.repository';
import { CreatePollInput, UpdatePollInput } from './dtos/poll.dto';
import { randomUUID } from 'crypto';
import { PollEntity } from './poll.entity';

@Injectable()
export class PollService {
  constructor(
    private readonly logger: LoggerService,
    private readonly repository: PollRepository,
  ) {}

  async list() {
    try {
      this.logger.info({}, 'services > polls > list > params');

      const output = await this.repository.list();

      this.logger.info({}, 'services > polls > list > success');

      return {
        polls: output,
      };
    } catch (error) {
      this.logger.error(error, 'services > polls > list > exeception');
      throw error;
    }
  }

  async create(input: CreatePollInput) {
    try {
      this.logger.info(input, 'services > polls > create > params');

      const id = randomUUID();

      const pollDate = new Date();

      const entity = new PollEntity({
        id,
        pollDate,
        ...input,
      });

      await this.repository.create(entity);

      this.logger.info({}, 'services > polls > create > success');
    } catch (error) {
      this.logger.error(error, 'services > polls > create > exeception');
      throw error;
    }
  }

  async update(id: string, input: UpdatePollInput) {
    try {
      this.logger.info({ id, ...input }, 'services > polls > update > params');

      const entity = await this.repository.get(id);

      this.logger.info(entity, 'entity');

      if (!entity) {
        throw new NotFoundException('Poll not found');
      }

      Object.assign(entity, input);

      await this.repository.update(entity);

      this.logger.info({}, 'services > polls > update > success');
    } catch (error) {
      this.logger.error(error, 'services > polls > update > exeception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      this.logger.info({ id }, 'services > polls > delete > params');

      await this.repository.delete(id);

      this.logger.info({}, 'services > polls > delete > success');
    } catch (error) {
      this.logger.error(error, 'services > polls > delete > exeception');
      throw error;
    }
  }
}
