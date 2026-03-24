import { Request, Response, NextFunction } from 'express';
import { GroupService } from './group.service';
import { validateCreateGroup, validateLinkTelegram } from './group.validator';
import { CreateGroupDTO, LinkTelegramDTO } from './group.dto';
import { AppError } from '../../utils/errors';

export class GroupController {
  private groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
  }

  async createGroup(req: any, res: Response, next: NextFunction) {
    try {
      const validatedData = validateCreateGroup(req.body);
      const createGroupDTO: CreateGroupDTO = {
        name: validatedData.name,
        description: validatedData.description,
        adminId: req.user?.id
      };
      if (!createGroupDTO.adminId) throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');

      const group = await this.groupService.createGroup(createGroupDTO);
      res.status(201).json({ success: true, data: group });
    } catch (error) {
      next(error);
    }
  }

  async linkTelegram(req: any, res: Response, next: NextFunction) {
    try {
      const validatedData = validateLinkTelegram(req.body);
      const linkTelegramDTO: LinkTelegramDTO = {
        groupId: req.params.id,
        telegramChatId: validatedData.telegramChatId,
        userId: req.user?.id
      };
      if (!linkTelegramDTO.userId) throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');

      const group = await this.groupService.linkTelegram(linkTelegramDTO);
      res.status(200).json({ success: true, data: group });
    } catch (error) {
      next(error);
    }
  }
}
