import { PrismaClient } from '@prisma/client';
import { users, roles, permissions } from './data';

const prisma = new PrismaClient();

async function truncateTable(tablename: string) {
  try {
    const tablenames = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    if (
      tablename === '_prisma_migrations' ||
      tablenames.findIndex((table) => table.tablename === tablename) < 0
    ) {
      return;
    }

    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
    );

    return 'success';
  } catch (error) {
    console.log({ error });
    return;
  }
}

async function main() {
  console.log(`Start seeding ...`);

  //seeding users
  const usersTruncated = await truncateTable(`User`);
  if (usersTruncated) {
    for (const user of users) {
      await prisma.user.create({
        data: user,
      });
    }
  }

  //seeding roles
  const roleTruncated = await truncateTable(`Role`);
  if (roleTruncated) {
    for (const role of roles) {
      await prisma.role.create({
        data: role,
      });
    }
  }

  //seeding permissions
  const permissionTruncated = await truncateTable(`Permission`);
  if (permissionTruncated) {
    for (const permission of permissions) {
      await prisma.permission.create({
        data: permission,
      });
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
