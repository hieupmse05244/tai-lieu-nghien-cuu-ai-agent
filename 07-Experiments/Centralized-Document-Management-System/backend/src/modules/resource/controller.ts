import { Request, Response } from 'express';
import { ResourceService } from './service';
import { getPresignedUrl } from '../../utils/s3';
import { ResourceType } from '@prisma/client';
import prisma from '../../utils/prisma';

const resourceService = new ResourceService();

export class ResourceController {
  async createFolder(req: Request, res: Response) {
    try {
      const { name, parentId } = req.body;
      const ownerId = (req as any).user?.id || 'temp-user-id'; // To be replaced with actual auth
      
      const folder = await resourceService.createResource({
        name,
        type: ResourceType.FOLDER,
        parentId,
        ownerId
      });
      
      res.status(201).json(folder);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async listResources(req: Request, res: Response) {
    try {
      const parentId = req.query.parentId as string | undefined;
      const userId = (req as any).user?.id || 'temp-user-id';
      
      const resources = await resourceService.getResourcesByParent(parentId || null, userId);
      res.json(resources);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUploadUrl(req: Request, res: Response) {
    try {
      const { fileName, contentType } = req.body;
      const key = `uploads/${Date.now()}-${fileName}`;
      
      const url = await getPresignedUrl(key, 'put', contentType);
      res.json({ uploadUrl: url, key });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async confirmUpload(req: Request, res: Response) {
    try {
      const { name, parentId, key } = req.body;
      const ownerId = (req as any).user?.id || 'temp-user-id';
      
      const file = await resourceService.createResource({
        name,
        type: ResourceType.FILE,
        parentId,
        ownerId,
        uri: key // Use the S3 Key as URI
      });
      
      res.status(201).json(file);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteResource(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user?.id || 'temp-user-id';
      
      await resourceService.deleteResource(id, userId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async searchResources(req: Request, res: Response) {
    try {
      const { q } = req.query;
      const userId = (req as any).user?.id || 'temp-user-id';
      
      const resources = await prisma.resource.findMany({
        where: {
          name: { contains: q as string, mode: 'insensitive' },
          OR: [
            { ownerId: userId },
            { permissions: { some: { userId } } }
          ]
        },
        limit: 10
      });
      res.json(resources);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
