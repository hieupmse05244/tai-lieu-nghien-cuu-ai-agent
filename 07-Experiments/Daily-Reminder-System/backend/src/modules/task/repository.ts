import { TaskModel, TaskDocument } from './model';

export class TaskRepository {
  static async findById(id: string): Promise<TaskDocument | null> {
    return TaskModel.findById(id);
  }

  static async save(task: TaskDocument): Promise<TaskDocument> {
    return task.save();
  }

  static async getActiveTasks(): Promise<TaskDocument[]> {
    return TaskModel.find({ status: 'active' });
  }
}