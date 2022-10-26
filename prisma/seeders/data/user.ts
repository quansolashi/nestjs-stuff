import { Prisma } from '@prisma/client';

export const users: Prisma.UserCreateInput[] = [
  {
    email: 'quannv@solashi.com',
    password: '$2b$10$uRfP8poIHZLWqo1zY2HVbOgKQrij2vwBvrcfsqRkmRCXzFLTlnxry', //123456
    name: 'quannv',
    posts: {
      create: [
        {
          title: 'Post 1',
          content: 'Post 1',
        },
      ],
    },
  },
  {
    email: 'test@gmail.com',
    password: '$2b$10$uRfP8poIHZLWqo1zY2HVbOgKQrij2vwBvrcfsqRkmRCXzFLTlnxry', //123456
    name: 'test user',
    posts: {
      create: [
        {
          title: 'Post 2',
          content: 'Post 2',
        },
      ],
    },
  },
];
