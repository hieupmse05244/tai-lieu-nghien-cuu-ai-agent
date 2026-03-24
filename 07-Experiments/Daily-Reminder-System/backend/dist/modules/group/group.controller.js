"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupController = void 0;
const group_validator_1 = require("./group.validator");
const errors_1 = require("../../utils/errors");
class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async createGroup(req, res, next) {
        try {
            const validatedData = (0, group_validator_1.validateCreateGroup)(req.body);
            const createGroupDTO = {
                name: validatedData.name,
                description: validatedData.description,
                adminId: req.user?.id
            };
            if (!createGroupDTO.adminId)
                throw new errors_1.AppError('Unauthorized', 401, 'UNAUTHORIZED');
            const group = await this.groupService.createGroup(createGroupDTO);
            res.status(201).json({ success: true, data: group });
        }
        catch (error) {
            next(error);
        }
    }
    async linkTelegram(req, res, next) {
        try {
            const validatedData = (0, group_validator_1.validateLinkTelegram)(req.body);
            const linkTelegramDTO = {
                groupId: req.params.id,
                telegramChatId: validatedData.telegramChatId,
                userId: req.user?.id
            };
            if (!linkTelegramDTO.userId)
                throw new errors_1.AppError('Unauthorized', 401, 'UNAUTHORIZED');
            const group = await this.groupService.linkTelegram(linkTelegramDTO);
            res.status(200).json({ success: true, data: group });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.GroupController = GroupController;
