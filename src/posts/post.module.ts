import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import PostController from './post.controller';
import PostsService from './post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
