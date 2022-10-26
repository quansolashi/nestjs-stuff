import { Module } from '@nestjs/common';
import { PolicyService } from 'src/auth/policies/policy.service';
import { PrismaService } from 'src/prisma/prisma.service';
import UserController from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PolicyService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
