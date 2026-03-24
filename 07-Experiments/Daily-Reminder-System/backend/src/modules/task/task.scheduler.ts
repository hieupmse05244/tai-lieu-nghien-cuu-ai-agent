import cron from 'node-cron';
import { TaskRepository } from './repository';
import { notificationService } from '../notification/notification.service';
import { TaskService } from './service';

export class TaskScheduler {
  static start() {
    console.log('🗓️  Task Scheduler started (Every minute)');
    
    cron.schedule('* * * * *', async () => {
      try {
        const activeTasks: any[] = await TaskRepository.getActiveTasks();
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        for (const task of activeTasks) {
          if (task.recurrence && task.recurrence.time === currentTime) {
            console.log(`🔔 Triggering task: ${task.title}`);
            
            await notificationService.dispatchNotificationsForTask(task);
            
            // rotateTask expects (taskId: string, adminId: string)
            await TaskService.rotateTask(task._id.toString(), task.groupId.toString());
          }
        }
      } catch (error) {
        console.error('[Scheduler Error]', error);
      }
    });
  }
}
