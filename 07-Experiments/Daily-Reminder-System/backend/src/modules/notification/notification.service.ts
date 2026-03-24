import { messageRepository } from './notification.repository';
import { GroupRepository } from '../group/group.repository';
import { TaskRepository } from '../task/repository';
import { mapToNotificationMessage } from './mappers/telegraf-command.mapper';

class NotificationService {
  private groupRepo: GroupRepository;
  private taskRepo: TaskRepository;

  constructor(groupRepo: GroupRepository, taskRepo: TaskRepository) {
    this.groupRepo = groupRepo;
    this.taskRepo = taskRepo;
  }

  async dispatchNotifications(): Promise<void> {
    const tasks = await TaskRepository.getActiveTasks();
    for (const task of tasks) {
      await this.dispatchNotificationsForTask(task);
    }
  }

  async dispatchNotificationsForTask(task: any): Promise<void> {
    const groupRepo = new GroupRepository();
    const group = await groupRepo.findGroupById(task.groupId.toString());
    
    if (!group || !group.telegramChatId) {
      console.warn(`[Notification] No chat ID for task: ${task.id}`);
      return;
    }

    const message = mapToNotificationMessage(task);
    await messageRepository.sendMessage(group.telegramChatId, message);
    console.log(`[Notification] Sent to ${group.telegramChatId}`);
  }
}

export const notificationService = new NotificationService(new GroupRepository(), new TaskRepository());
