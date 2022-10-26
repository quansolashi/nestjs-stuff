import { Test } from '@nestjs/testing';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import PostController from './post.controller';
import PostsService from './post.service';

describe('PostController', () => {
  let postController: PostController;
  let postService: PostsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostsService, PrismaService],
    }).compile();

    postService = moduleRef.get<PostsService>(PostsService);
    postController = moduleRef.get<PostController>(PostController);
  });

  describe('allPosts', () => {
    it('return all posts', async () => {
      const posts: Post[] = [
        {
          id: 1,
          title: 'post',
          content: 'post',
          authorId: 1,
        },
      ];
      jest
        .spyOn(postService, 'posts')
        .mockImplementation(() => Promise.resolve(posts));

      expect(await postController.allPosts()).toBe(posts);
    });
  });

  describe('createPost', () => {
    it('create a new post and return a post', async () => {
      const newPost = {
        id: 1,
        title: 'post',
        content: 'post',
        authorId: 1,
      };
      jest
        .spyOn(postService, 'createPost')
        .mockImplementation(() => Promise.resolve(newPost));

      // expect(await postController.createPost(newPost)).toBe(newPost)
    });
  });
});
