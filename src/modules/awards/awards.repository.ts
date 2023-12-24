import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AwardEntity, AwardProps } from './awards.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AwardsRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly db: DatabaseService,
  ) {}

  async list() {
    try {
      const awards = await this.db.award.findMany();

      return awards.map(
        (award) => new AwardEntity(award as unknown as AwardProps),
      );
    } catch (error) {
      this.logger.error(error, 'AwardsRepository > list > exception');
      throw error;
    }
  }

  async get(id: string) {
    try {
      const output = await this.db.award.findUnique({
        where: {
          id,
        },
      });

      if (!output) {
        return undefined;
      }

      return new AwardEntity(output as unknown as AwardProps);
    } catch (error) {
      this.logger.error(error, 'AwardsRepository > get > exception');
      throw error;
    }
  }

  async create(entity: AwardEntity) {
    try {
      await this.db.award.create({
        data: entity.toJSON(),
      });
    } catch (error) {
      this.logger.error(error, 'AwardsRepository > create > exception');
      throw error;
    }
  }

  async update(entity: AwardEntity) {
    try {
      await this.db.award.update({
        data: entity.toJSON(),
        where: {
          id: entity.id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'AwardsRepository > update > exception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.db.award.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'AwardsRepository > delete > exception');
      throw error;
    }
  }
}
