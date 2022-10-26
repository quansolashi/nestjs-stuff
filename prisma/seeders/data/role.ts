import { Prisma } from '@prisma/client';

export const roles: Prisma.RoleCreateInput[] = [
  {
    name: 'admin',
    slug: 'admin',
  },
  {
    name: 'general',
    slug: 'general',
  },
];
