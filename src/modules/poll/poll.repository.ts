import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import { PollEntity, PollProps } from './poll.entity';

@Injectable()
export class PollRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly db: DatabaseService,
  ) {}

  async list() {
    try {
      const polls = await this.db.poll.findMany();

      return polls.map((poll) => new PollEntity(poll as unknown as PollProps));
    } catch (error) {
      this.logger.error(error, 'PollsRepository > list > exception');
      throw error;
    }
  }

  async get(id: string) {
    try {
      const output = await this.db.poll.findUnique({
        where: {
          id,
        },
      });

      if (!output) {
        return undefined;
      }

      return new PollEntity(output as unknown as PollProps);
    } catch (error) {
      this.logger.error(error, 'PollsRepository > get > exception');
      throw error;
    }
  }

  async create(entity: PollEntity) {
    try {
      await this.db.poll.create({
        data: entity.toJSON(),
      });
    } catch (error) {
      this.logger.error(error, 'PollsRepository > create > exception');
      throw error;
    }
  }

  async update(entity: PollEntity) {
    try {
      await this.db.poll.update({
        data: entity.toJSON(),
        where: {
          id: entity.id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'PollsRepository > update > exception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.db.poll.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'PollsRepository > delete > exception');
      throw error;
    }
  }
}
