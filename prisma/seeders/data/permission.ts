import { Prisma } from '@prisma/client';

export const permissions: Prisma.PermissionCreateInput[] = [
  {
    name: 'User manage',
    slug: 'user-manage',
  },
  {
    name: 'User CRUD',
    slug: 'user-crud',
  },
  {
    name: 'Post manage',
    slug: 'post-manage',
  },
  {
    name: 'Post CRUD',
    slug: 'post-crud',
  },
];
