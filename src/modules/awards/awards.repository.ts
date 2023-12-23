import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AwardEntity } from './awards.entity';

@Injectable()
export class AwardsRepository {
  constructor(private readonly db: DatabaseService) {}

  async list() {
    throw new Error('Culpa de Daniel');
    return this.db.award.findMany();
  }

  async create(entity: AwardEntity) {
    await this.db.award.create({
      data: entity.toJSON(),
    });
  }

  async update(entity: AwardEntity) {
    await this.db.award.update({
      data: entity.toJSON(),
      where: {
        id: entity.id,
      },
    });
  }

  async delete(id: string) {
    await this.db.award.delete({
      where: {
        id,
      },
    });
  }
}
