import { Injectable } from '@nestjs/common';
import { AccountEntity, AccountProps } from './accounts.entity';
import { DatabaseService } from '../database/database.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AccountsRepository {
  constructor(
    private readonly logger: LoggerService,
    private readonly db: DatabaseService,
  ) {}

  async list() {
    try {
      const accounts = await this.db.account.findMany();

      return accounts.map(
        (account) => new AccountEntity(account as unknown as AccountProps),
      );
    } catch (error) {
      this.logger.error(error, 'AccountsRepository > list > exception');
      throw error;
    }
  }

  async findByUsername(username: string) {
    try {
      const account = await this.db.account.findUnique({
        where: { username },
      });
      console.log(
        '================================================ ' + account,
      );
      return account;
    } catch (error) {
      this.logger.error(
        error,
        'AccountsRepository > findUsernameExists > exception',
      );
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.db.account.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      this.logger.error(
        error,
        'AccountsRepository > findEmailExists > exception',
      );
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const output = await this.db.account.findUnique({
        where: {
          id,
        },
      });

      if (!output) {
        return undefined;
      }

      return new AccountEntity(output as unknown as AccountProps);
    } catch (error) {
      this.logger.error(error, 'AccountsRepository > get > exception');
      throw error;
    }
  }

  async create(entity: AccountEntity) {
    try {
      await this.db.account.create({
        data: entity.toJSON(),
      });
    } catch (error) {
      this.logger.error(error, 'AccountsRepository > create > exception');
      throw error;
    }
  }

  async update(entity: AccountEntity) {
    try {
      this.db.account.update({
        data: entity.toJSON(),
        where: {
          id: entity.id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'AccountsRepository > update > exception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.db.account.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error, 'AccountsRepository > delete > exception');
      throw error;
    }
  }
}
