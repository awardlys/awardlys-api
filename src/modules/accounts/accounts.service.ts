import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountInput, UpdateAccountsInput } from './dtos/accounts.dto';
import { randomUUID } from 'crypto';
import { AccountEntity } from './accounts.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(
    private readonly logger: LoggerService,
    private readonly repository: AccountsRepository,
  ) {}

  async findById(id: string) {
    try {
      this.logger.info({}, 'service > accounts > findById > params');

      const entity = await this.repository.findById(id);

      this.logger.info(entity, 'entity');

      if (!entity) {
        throw new NotFoundException('Account not found');
      }

      return entity;
    } catch (error) {
      this.logger.error(error, 'services > accounts > findById > exception');
      throw error;
    }
  }

  async findByUsername(username: string) {
    try {
      this.logger.info({}, 'services > accounts > findByUsername > params');

      const account = await this.repository.findByUsername(username);

      this.logger.info(account, 'account');

      if (!account) {
        throw new NotFoundException('Account Not Found');
      }

      return account;
    } catch (error) {
      this.logger.error(
        error,
        'services > accounts > findByUsername > exception',
      );
      throw error;
    }
  }

  async list() {
    try {
      this.logger.info({}, 'services > accounts > list > params');

      const output = await this.repository.list();

      this.logger.info({}, 'services > accounts > list > success');

      return {
        accounts: output,
      };
    } catch (error) {
      this.logger.error(error, 'services > accounts > list > exception');
      throw error;
    }
  }

  async create(input: CreateAccountInput) {
    try {
      this.logger.info(input, 'services > accounts > create > params');

      const usernameExists = await this.repository.findByUsername(
        input.username,
      );
      const emailExists = await this.repository.findByEmail(input.email);

      if (usernameExists) {
        throw new ConflictException('Username already exists');
      } else if (emailExists) {
        throw new ConflictException('Email already exists');
      }

      const id = randomUUID();

      const passwordHash = await bcrypt.hash(input.passwordHash, 10);

      const entity = new AccountEntity({
        ...input,
        id,
        passwordHash,
      });

      await this.repository.create(entity);

      this.logger.info({}, 'services > accounts > create > success');

      return entity;
    } catch (error) {
      this.logger.error(error, 'services > accounts > create > exception');
      throw error;
    }
  }

  async update(id: string, input: UpdateAccountsInput) {
    try {
      this.logger.info(
        { id, ...input },
        'services > accounts > update > params',
      );

      const entity = await this.repository.findById(id);

      this.logger.info(entity, 'entity');

      if (!entity) {
        throw new NotFoundException('Account not found');
      }

      Object.assign(entity, input);

      await this.repository.update(entity);

      this.logger.info({}, 'services > accounts > update > success');
    } catch (error) {
      this.logger.error(error, 'services > accounts > update > exception');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      this.logger.info({ id }, 'services > accounts > delete > params');

      await this.repository.delete(id);

      this.logger.info({}, 'services > accounts > delete > success');
    } catch (error) {
      this.logger.error(error, 'services > accounts > delete > exception');
      throw error;
    }
  }
}
