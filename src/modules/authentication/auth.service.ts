import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAccountInput } from '../accounts/dtos/accounts.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { AccountsService } from '../accounts/accounts.service';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async login(loginAccount: LoginAccountInput): Promise<any> {
    const account = await this.accountsService.findByUsername(
      loginAccount.username,
    );

    if (!account) {
      throw new UnauthorizedException('User or Password is invalid');
    }

    const validatePassword = await bcrypt.compare(
      loginAccount.passwordHash,
      account.passwordHash,
    );

    if (!validatePassword) {
      throw new UnauthorizedException('User or Password is invalid');
    }

    return await this.tokenGenerate(account);
  }

  async tokenGenerate(payload: LoginAccountInput) {
    return {
      access_token: this.jwtService.sign(
        { username: payload.username },
        {
          secret: 'process.env.JWT_SECRET',
          expiresIn: '50s',
        },
      ),
    };
  }
}
