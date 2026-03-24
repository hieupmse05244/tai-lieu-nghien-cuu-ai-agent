// Importing necessary repositories and DTOs
import { GroupRepository } from './group.repository';
import { CreateGroupDTO, LinkTelegramDTO } from './group.dto';
import { AppError } from '../../middlewares/error-handler';

export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  async createGroup(dto: CreateGroupDTO) {
    return await this.groupRepository.create(dto);
  }

  async linkTelegram(dto: LinkTelegramDTO) {
    const group = await this.groupRepository.findById(dto.groupId);
    if (!group) {
      throw new AppError('Group not found', 'GROUP_NOT_FOUND', 404);
    }
    if (group.adminId.toString() !== dto.userId) {
      throw new AppError('Unauthorized operation', 'UNAUTHORIZED', 403);
    }
    return await this.groupRepository.updateTelegramChatId(dto.groupId, dto.telegramChatId);
  }
}
