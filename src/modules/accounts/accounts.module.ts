import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from '../database/database.module';
import { AccountsRepository } from './accounts.repository';
import { LoggerService } from '../logger/logger.service';
import { DatabaseService } from '../database/database.service';
import { LoginAccountInput } from './dtos/accounts.dto';
import { AuthService } from '../authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../authentication/estrategies/jwt.strategy';

@Module({
  imports: [LoggerModule, DatabaseModule],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    AccountsRepository,
    LoggerService,
    DatabaseService,
    LoginAccountInput,
    AuthService,
    JwtService,
    JwtStrategy,
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
