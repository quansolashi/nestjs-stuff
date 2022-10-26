import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hashCheck } from 'src/common/utils/hash';
import { PersonalAccessTokenService } from 'src/personal-access-tokens/personal-access-token.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private personalAccessTokenService: PersonalAccessTokenService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      const checkPassword = await hashCheck(password, user.password);
      if (checkPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async generateJwtTokens(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_AT_SECRET_KEY,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_RF_SECRET_KEY,
        expiresIn: '7h',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyPayload(payload: { email: string; sub: number }) {
    const user = await this.userService.findUserByEmail(payload.email);
    if (user) {
      return user;
    }

    return null;
  }

  async verifyToken(token: string) {
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.JWT_AT_SECRET_KEY,
    });
    return decodedToken;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findUserById(userId);
    const userToken =
      await this.personalAccessTokenService.tokenByUserAndRefreshToken(
        user.id,
        refreshToken,
      );

    if (!user || !userToken?.refreshToken) {
      throw new ForbiddenException('access denied');
    }

    const tokens = await this.generateJwtTokens(user);
    await this.personalAccessTokenService.updatePersonalAccessToken(
      userToken.id,
      {
        refreshToken: tokens.refreshToken,
      },
    );

    return tokens;
  }
}
