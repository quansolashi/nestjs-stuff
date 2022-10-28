import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { IPaginationResult } from 'src/common/pagination/offset/interfaces';
import { ZodGuard } from 'src/common/request/guard';
import { CreateUserRequest } from 'src/common/request/user/create-user.request';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Controller('users')
export default class UserController {
  constructor(private userService: UserService) {}

  @Roles('admin', 'general')
  @UseGuards(RolesGuard)
  @Get()
  async users(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ): Promise<IPaginationResult<User>> {
    return this.userService.users({ page, perPage });
  }

  @UseGuards(new ZodGuard(CreateUserRequest, 'body'))
  @Post()
  async createUser(
    @Body() userInput: { name: string; email: string; password: string },
  ): Promise<User> {
    try {
      const password = await bcrypt.hash(userInput.password, 10);
      const user = { ...userInput, password };

      const result = await this.userService.createUser(user);

      return result;
    } catch (error) {
      throw error;
    }
    return userInput as User;
  }
}
