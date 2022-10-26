import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonalAccessTokenService } from './personal-access-token.service';

@Module({
  imports: [],
  providers: [PersonalAccessTokenService, PrismaService],
  exports: [PersonalAccessTokenService],
})
export class PersonalAccessTokenModule {}
