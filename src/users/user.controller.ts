import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { IPaginationResult } from 'src/common/pagination/offset/interfaces';
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

  // @Post()
  // async createUser(
  //   @Body() userData: { name?: string; email: string },
  // ): Promise<User> {
  //   return this.userService.createUser(userData);
  // }
}
