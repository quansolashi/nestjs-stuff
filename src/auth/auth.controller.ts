import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RefreshTokenAuthGuard } from './guards/refresh-token.guard';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(RefreshTokenAuthGuard)
  @Get('refreshToken')
  async refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
