import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { GamesRepository } from './games.repository';
import { CreateGameInput, UpdateGameInput } from './dtos/games.dto';
import { GameEntity } from './games.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class GamesService {
  constructor(
    private readonly logger: LoggerService,
    private readonly repository: GamesRepository,
  ) {}

  async list() {
    try {
      this.logger.info({}, 'services > games > list > params');

      const output = await this.repository.list();

      this.logger.info({}, 'services > games > list > success');

      return {
        games: output,
      };
    } catch (error) {
      this.logger.error(error, 'services > games > list > exeception');
      throw error;
    }
  }

  async create(input: CreateGameInput) {
    try {
      this.logger.info(input, 'services > games > create > params');

      const id = randomUUID();

      const entity = new GameEntity({
        id,
        ...input,
      });

      await this.repository.create(entity);

      this.logger.info({}, 'services > games > create > success');
    } catch (error) {
      this.logger.error(error, 'services > games > create > exeception');
      throw error;
    }
  }

  async update(id: string, input: UpdateGameInput) {
    try {
      this.logger.info({ id, ...input }, 'services > games > update > params');

      const entity = await this.repository.get(id);

      this.logger.info(entity, 'entity');

      if (!entity) {
        throw new NotFoundException('Game not found');
      }

      Object.assign(entity, input);

      await this.repository.update(entity);

      this.logger.info({}, 'services > games > update > success');
    } catch (error) {
      this.logger.error(error, 'services > games > update > exeception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      this.logger.info({ id }, 'services > games > delete > params');

      await this.repository.delete(id);

      this.logger.info({}, 'services > games > delete > success');
    } catch (error) {
      this.logger.error(error, 'services > games > delete > exeception');
      throw error;
    }
  }
}
