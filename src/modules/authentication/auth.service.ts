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

  async login(loginAccount: LoginAccountInput) {
    const account = await this.accountsService.findByEmail(loginAccount.email);

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

    return this.tokenGenerate(account);
  }

  async tokenGenerate(payload: LoginAccountInput) {
    delete payload.passwordHash;

    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      ),
      account: payload,
    };
  }
}
