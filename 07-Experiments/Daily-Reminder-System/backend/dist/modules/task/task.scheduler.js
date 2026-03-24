"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskScheduler = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const repository_1 = require("./repository");
const notification_service_1 = require("../notification/notification.service");
const service_1 = require("./service");
class TaskScheduler {
    static start() {
        console.log('🗓️  Task Scheduler started (Every minute)');
        node_cron_1.default.schedule('* * * * *', async () => {
            try {
                const activeTasks = await repository_1.TaskRepository.getActiveTasks();
                const now = new Date();
                const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                for (const task of activeTasks) {
                    if (task.recurrence && task.recurrence.time === currentTime) {
                        console.log(`🔔 Triggering task: ${task.title}`);
                        await notification_service_1.notificationService.dispatchNotificationsForTask(task);
                        // rotateTask expects (taskId: string, adminId: string)
                        await service_1.TaskService.rotateTask(task._id.toString(), task.groupId.toString());
                    }
                }
            }
            catch (error) {
                console.error('[Scheduler Error]', error);
            }
        });
    }
}
exports.TaskScheduler = TaskScheduler;
