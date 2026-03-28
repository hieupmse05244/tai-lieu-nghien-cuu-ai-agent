import { ResourceType, PermissionLevel } from '@prisma/client';
import prisma from '../../utils/prisma';

export class ResourceService {
  async createResource(data: {
    name: string;
    type: ResourceType;
    parentId?: string;
    ownerId: string;
    uri?: string;
  }) {
    // 1. If parentId exists, check WRITING permission on parent
    if (data.parentId) {
      const parentPermission = await prisma.permission.findFirst({
        where: {
          resourceId: data.parentId,
          userId: data.ownerId,
          level: PermissionLevel.WRITE
        }
      });
      // Skip if folder owner is creating something inside
      const parent = await prisma.resource.findUnique({ where: { id: data.parentId } });
      if (!parentPermission && parent?.ownerId !== data.ownerId) {
        throw new Error('No write permission on parent directory');
      }
    }

    // 2. Create resource
    return await prisma.resource.create({
      data: {
        name: data.name,
        type: data.type,
        parentId: data.parentId,
        ownerId: data.ownerId,
        uri: data.uri,
        inheritanceEnabled: true
      }
    });
  }

  async getResourcesByParent(parentId: string | null, userId: string) {
    // Basic implementation: List resources where user is owner or has permissions
    // Future: Recursive inheritance check
    return await prisma.resource.findMany({
      where: {
        parentId,
        OR: [
          { ownerId: userId },
          { permissions: { some: { userId } } }
        ]
      },
      orderBy: { type: 'asc' } // Folders first? (Actually ResourceType is enum)
    });
  }

  async deleteResource(id: string, userId: string) {
    const resource = await prisma.resource.findUnique({ where: { id } });
    if (!resource) throw new Error('Resource not found');
    if (resource.ownerId !== userId) {
      throw new Error('Only owner can delete resource');
    }

    return await prisma.resource.delete({ where: { id } });
  }

  async hasPermission(resourceId: string, userId: string, level: PermissionLevel): Promise<boolean> {
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      include: { permissions: true }
    });

    if (!resource) return false;

    // 1. Owner has full permission
    if (resource.ownerId === userId) return true;

    // 2. Direct permission check (User or Group)
    const userGroups = await prisma.userGroup.findMany({ where: { userId } });
    const groupIds = userGroups.map((ug: any) => ug.groupId);

    const hasDirect = resource.permissions.some((p: any) => 
      (p.userId === userId || (p.groupId && groupIds.includes(p.groupId))) &&
      (p.level === level || p.level === PermissionLevel.WRITE) // WRITE implies READ
    );

    if (hasDirect) return true;

    // 3. Inheritance check
    if (resource.inheritanceEnabled && resource.parentId) {
      return this.hasPermission(resource.parentId, userId, level);
    }

    return false;
  }
}
