import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { LoggerService } from '../logger/logger.service';
import {
  CreateAccountInput,
  LoginAccountInput,
  UpdateAccountsInput,
} from './dtos/accounts.dto';
import { AuthService } from '../authentication/auth.service';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly logger: LoggerService,
    private readonly service: AccountsService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  login(@Body() body: LoginAccountInput) {
    this.logger.info({}, 'controller > accounts > login');
    return this.authService.login(body);
  }

  @Get()
  list() {
    this.logger.info({}, 'controller > accounts > list');
    return this.service.list();
  }

  @Get('/:accountId')
  async get(@Param('accountId') accountId: string) {
    this.logger.info({}, 'controller > accounts > get');
    return this.service.findById(accountId);
  }

  @Post()
  async create(@Body() body: CreateAccountInput) {
    this.logger.info({}, 'controller > account > create');

    await this.service.create(body);

    this.logger.info({}, 'controller ? accounts > create > success');
  }

  @Patch('/:accountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Body() body: UpdateAccountsInput,
    @Param('accountId') accountId: string,
  ) {
    this.logger.info({}, 'controller > accounts > update');

    await this.service.update(accountId, body);

    this.logger.info({}, 'controller > accounts > update');
  }

  @Delete('/:accountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('accountId') accountId: string) {
    await this.service.delete(accountId);
  }
}
