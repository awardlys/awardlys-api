import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwardsModule } from './modules/awards/awards.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { APP_PIPE } from '@nestjs/core';
import { GamesModule } from './modules/games/games.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './modules/authentication/auth.module';
import { AwardCategoriesModule } from './modules/award-categories/award-categories.module';
dotenv.config();

@Module({
  imports: [
    AwardsModule,
    DatabaseModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'debug',
        redact: ['request.headers.authorization'],
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            levelFirst: false,
          },
        },
      },
    }),
    GamesModule,
    CategoriesModule,
    AccountsModule,
    AuthModule,
    AwardCategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
