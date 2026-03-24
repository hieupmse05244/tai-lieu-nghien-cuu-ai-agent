"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const error_handler_1 = require("../../middlewares/error-handler");
class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async createGroup(dto) {
        return await this.groupRepository.create(dto);
    }
    async linkTelegram(dto) {
        const group = await this.groupRepository.findById(dto.groupId);
        if (!group) {
            throw new error_handler_1.AppError('Group not found', 'GROUP_NOT_FOUND', 404);
        }
        if (group.adminId.toString() !== dto.userId) {
            throw new error_handler_1.AppError('Unauthorized operation', 'UNAUTHORIZED', 403);
        }
        return await this.groupRepository.updateTelegramChatId(dto.groupId, dto.telegramChatId);
    }
}
exports.GroupService = GroupService;
