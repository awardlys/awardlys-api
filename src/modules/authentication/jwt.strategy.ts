import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAccountInput } from '../accounts/dtos/accounts.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'process.env.JWT_SECRET',
    });
  }

  async validate(payload: LoginAccountInput) {
    const account = await this.authService.login(payload);
    if (!account) {
      throw new UnauthorizedException('User or Password is invalid');
    }

    return account;
  }
}
