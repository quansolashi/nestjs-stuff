import { Injectable } from '@nestjs/common';
import { Permission, Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PolicyService {
  constructor(private prismaService: PrismaService) {}

  async roles(): Promise<Role[]> {
    const roles = await this.prismaService.role.findMany({});

    return roles;
  }

  async permissions(): Promise<Permission[]> {
    const permissions = await this.prismaService.permission.findMany({});

    return permissions;
  }

  async rolesByUser(user: User): Promise<string[]> {
    const userRoles = await this.prismaService.role.findMany({
      where: {
        users: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    const roles = userRoles.map((role) => role.slug);
    return roles;
  }

  async permissionsByUser(user: User): Promise<string[]> {
    const userPermissions = await this.prismaService.permission.findMany({
      where: {
        users: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    const permissions = userPermissions.map((permission) => permission.slug);
    return permissions;
  }

  async permissionByUserThroughRoles(user: User): Promise<string[]> {
    const userRoles = await this.prismaService.role.findMany({
      where: {
        users: {
          some: {
            userId: user.id,
          },
        },
      },
    });
    const roleIds = userRoles.map((role) => role.id);

    const userPermissions = await this.prismaService.permission.findMany({
      where: {
        roles: {
          some: {
            roleId: {
              in: roleIds,
            },
          },
        },
      },
    });

    const permissions = userPermissions.map((permission) => permission.slug);
    return permissions;
  }

  async matchRoles(roles: string[], user: User): Promise<boolean> {
    const userRoles = await this.rolesByUser(user);

    return userRoles.some((role) => roles.includes(role));
  }

  async matchPermissions(permissions: string[], user: User): Promise<boolean> {
    const userPermissions = await this.permissionsByUser(user);
    const userPermissionsThroughRoles = await this.permissionByUserThroughRoles(
      user,
    );

    return (
      userPermissions.some((permission) => permissions.includes(permission)) ||
      userPermissionsThroughRoles.some((permission) =>
        permissions.includes(permission),
      )
    );
  }
}
