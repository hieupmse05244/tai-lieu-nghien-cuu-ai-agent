"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const notification_repository_1 = require("./notification.repository");
const group_repository_1 = require("../group/group.repository");
const repository_1 = require("../task/repository");
const telegraf_command_mapper_1 = require("./mappers/telegraf-command.mapper");
class NotificationService {
    constructor(groupRepo, taskRepo) {
        this.groupRepo = groupRepo;
        this.taskRepo = taskRepo;
    }
    async dispatchNotifications() {
        const tasks = await repository_1.TaskRepository.getActiveTasks();
        for (const task of tasks) {
            await this.dispatchNotificationsForTask(task);
        }
    }
    async dispatchNotificationsForTask(task) {
        const groupRepo = new group_repository_1.GroupRepository();
        const group = await groupRepo.findGroupById(task.groupId.toString());
        if (!group || !group.telegramChatId) {
            console.warn(`[Notification] No chat ID for task: ${task.id}`);
            return;
        }
        const message = (0, telegraf_command_mapper_1.mapToNotificationMessage)(task);
        await notification_repository_1.messageRepository.sendMessage(group.telegramChatId, message);
        console.log(`[Notification] Sent to ${group.telegramChatId}`);
    }
}
exports.notificationService = new NotificationService(new group_repository_1.GroupRepository(), new repository_1.TaskRepository());
