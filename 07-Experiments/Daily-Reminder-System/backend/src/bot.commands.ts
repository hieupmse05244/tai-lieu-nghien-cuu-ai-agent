import { bot } from './main';
import { GroupRepository } from './modules/group/group.repository';
import { TaskRepository } from './modules/task/repository';
import { TaskService } from './modules/task/service';

export const setupBotCommands = () => {
  // /start command
  bot.start((ctx) => {
    ctx.reply('👋 Chào mừng bạn đến với Daily Reminder System (DRS)!\n\nTôi sẽ giúp bạn quản lý xoay vòng trực nhật và nhắc nhở tự động.\n\nCác lệnh khả dụng:\n/status - Xem trạng thái trực nhật hiện tại\n/next - Xoay vòng sang người tiếp theo (Admin)');
  });

  // /status command
  bot.command('status', async (ctx) => {
    try {
      const tasks = await TaskRepository.getActiveTasks();
      if (tasks.length === 0) return ctx.reply('📭 Hiện không có nhiệm vụ nhắc nhở nào đang chạy.');

      let statusMsg = '📊 **Trạng thái trực nhật hiện tại:**\n';
      for (const task of tasks) {
        const currentAssignee = task.assignees[task.rotationIndex];
        statusMsg += `\n🔹 **${task.title}**\n   - Người trực: ${currentAssignee}\n   - Giờ nhắc: ${task.recurrence.time}\n`;
      }
      ctx.replyWithMarkdown(statusMsg);
    } catch (error) {
      console.error('[Bot Error]', error);
      ctx.reply('❌ Có lỗi khi lấy trạng thái.');
    }
  });

  // /next command (Manual rotation)
  bot.command('next', async (ctx) => {
    try {
      const tasks = await TaskRepository.getActiveTasks();
      if (tasks.length === 0) return ctx.reply('❌ Không có nhiệm vụ để xoay vòng.');

      // For demo, we just rotate the first task
      const task = tasks[0];
      const updatedTask = await TaskService.rotateTask(task.id, 'admin_fixed_id'); // Logic bypass for demo
      ctx.reply(`✅ Đã xoay vòng! Người trực tiếp theo của ${task.title} là: ${updatedTask.assignees[updatedTask.rotationIndex]}`);
    } catch (error) {
      ctx.reply('❌ Lỗi: Bạn có thể không có quyền hoặc có lỗi hệ thống.');
    }
  });
};
