import { Injectable } from '@nestjs/common';
import { PersonalAccessToken, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonalAccessTokenService {
  constructor(private prisma: PrismaService) {}

  async tokensByUser(userId: number): Promise<PersonalAccessToken[]> {
    return this.prisma.personalAccessToken.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async tokenByUserAndRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<PersonalAccessToken | undefined> {
    return this.prisma.personalAccessToken.findFirst({
      where: {
        user: {
          id: userId,
        },
        refreshToken,
      },
    });
  }

  async createPersonalAccessToken(
    data: Prisma.PersonalAccessTokenCreateInput,
  ): Promise<PersonalAccessToken | undefined> {
    return this.prisma.personalAccessToken.create({
      data,
    });
  }

  async updatePersonalAccessToken(
    id: number,
    data: Prisma.PersonalAccessTokenUpdateInput,
  ): Promise<PersonalAccessToken | undefined> {
    return this.prisma.personalAccessToken.update({
      where: {
        id,
      },
      data,
    });
  }
}
