import { Request, Response } from 'express';
import prisma from '../../utils/prisma';

export class UserController {
  async searchUsers(req: Request, res: Response) {
    const { query } = req.query;
    const users = await prisma.user.findMany({
      where: {
        email: { contains: query as string, mode: 'insensitive' }
      },
      select: { id: true, email: true }
    });
    res.json(users);
  }

  async listGroups(req: Request, res: Response) {
    const groups = await prisma.group.findMany();
    res.json(groups);
  }
}
