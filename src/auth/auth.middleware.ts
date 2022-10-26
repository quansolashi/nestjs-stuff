import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let user = null;

    const authHeader = req.headers.authorization as string;
    if (!authHeader) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const authToken = authHeader.split('Bearer ')[1];
    if (!authToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    try {
      const decodedToken = await this.authService.verifyToken(authToken);
      const email = decodedToken.email;
      user = await this.userService.findUserByEmail(email);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    if (user) {
      req.user = user;
    }

    next();
  }
}
