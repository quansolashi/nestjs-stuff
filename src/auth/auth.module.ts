import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PersonalAccessTokenModule } from 'src/personal-access-tokens/personal-access-token.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/users/user.module';
import AuthController from './auth.controller';
import { AuthService } from './auth.service';
import { PolicyModule } from './policies/policy.module';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    PersonalAccessTokenModule,
    JwtModule.register({}),
    PolicyModule,
    PrismaModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
