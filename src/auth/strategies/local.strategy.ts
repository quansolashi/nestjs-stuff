import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PersonalAccessTokenService } from 'src/personal-access-tokens/personal-access-token.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService,
    private personalAccessTokenService: PersonalAccessTokenService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    const tokens = await this.authService.generateJwtTokens(user);

    await this.personalAccessTokenService.createPersonalAccessToken({
      refreshToken: tokens.refreshToken,
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    return {
      ...user,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }
}
