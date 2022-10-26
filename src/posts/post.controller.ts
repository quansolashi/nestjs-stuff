import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { HttpExceptionFilter } from 'src/shared/exceptions/http-exception.filter';
import PostsService from './post.service';

@Controller('posts')
export default class PostController {
  constructor(private postsService: PostsService) {}

  @Get()
  async allPosts(): Promise<PostModel[]> {
    return this.postsService.posts();
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  async createPost(
    @Body() postData: { title: string; content: string; authorEmail: string },
  ): Promise<PostModel> {
    try {
      const { title, content, authorEmail } = postData;
      const post = await this.postsService.createPost({
        title,
        content,
        author: {
          connect: {
            email: authorEmail,
          },
        },
      });
      return post;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
