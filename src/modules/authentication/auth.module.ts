import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './estrategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AccountsModule } from '../accounts/accounts.module';
import { AccountsService } from '../accounts/accounts.service';
import { LoggerService } from '../logger/logger.service';
import { AccountsRepository } from '../accounts/accounts.repository';
import { DatabaseService } from '../database/database.service';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    AccountsModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AccountsService,
    LoggerService,
    AccountsRepository,
    DatabaseService,
  ],
})
export class AuthModule {}
