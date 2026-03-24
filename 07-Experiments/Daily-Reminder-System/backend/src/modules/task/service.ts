import { TaskRepository } from './repository';
import { UserRepository } from '../user/user.repository';
import { AppError } from '../../utils/errors';
import { TaskDocument } from './model';

export class TaskService {
  static async rotateTask(taskId: string, adminId: string): Promise<TaskDocument> {
    const task = await TaskRepository.findById(taskId);
    if (!task) throw new AppError('Task not found', 404, 'TASK_NOT_FOUND');

    const isAdmin = await UserRepository.isUserAdmin(adminId, task.groupId.toString());
    if (!isAdmin) throw new AppError('Unauthorized access', 403, 'FORBIDDEN');

    const totalAssignees = task.assignees.length;
    let nextIndex = (task.rotationIndex + 1) % totalAssignees;
    const unavailableSet = new Set(task.unavailableMembers?.map(id => id.toString()) || []);

    let attempts = 0;
    while (unavailableSet.has(task.assignees[nextIndex].toString()) && attempts < totalAssignees) {
      nextIndex = (nextIndex + 1) % totalAssignees;
      attempts++;
    }

    task.rotationIndex = nextIndex;
    await TaskRepository.save(task);
    return task;
  }
}