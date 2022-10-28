import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { IPaginationResult } from 'src/common/pagination/offset/interfaces';
import { createPaginator } from 'src/common/pagination/offset/pagination';
import { PaginationOptions } from 'src/common/pagination/offset/types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async users(query?: PaginationOptions): Promise<IPaginationResult<User>> {
    const paginate = createPaginator({ perPage: 20 });
    const users = await paginate<User, Prisma.UserFindUniqueArgs>(
      this.prisma.user,
      undefined,
      query,
    );

    return users;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
