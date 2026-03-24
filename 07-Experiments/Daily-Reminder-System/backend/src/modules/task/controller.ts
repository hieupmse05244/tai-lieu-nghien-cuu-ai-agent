import { Request, Response } from 'express';
import { TaskService } from './service';
import { AppError } from '../../utils/errors';

export class TaskController {
  static async rotateTask(req: any, res: Response): Promise<Response> {
    try {
      const { taskId } = req.params;
      const adminId = req.user?.id;
      
      if (!adminId) throw new AppError('Unauthenticated', 401, 'UNAUTHENTICATED');

      const updatedTask = await TaskService.rotateTask(taskId, adminId);
      return res.status(200).json({ success: true, data: updatedTask });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ 
        success: false, 
        message: error.message,
        code: error.code || 'INTERNAL_ERROR'
      });
    }
  }
}