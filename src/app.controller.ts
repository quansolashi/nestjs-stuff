import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AccessTokenAuthGuard } from './auth/guards/access-token.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { RefreshTokenAuthGuard } from './auth/guards/refresh-token.guard';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  // @UseGuards(RefreshTokenAuthGuard)
  // @Get('auth/refreshToken')
  // async refreshToken(@Request() req) {
  //   return req.user;
  // }

  @UseGuards(AccessTokenAuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
