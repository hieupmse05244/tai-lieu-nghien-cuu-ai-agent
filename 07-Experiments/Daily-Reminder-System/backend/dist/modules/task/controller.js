"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const service_1 = require("./service");
const errors_1 = require("../../utils/errors");
class TaskController {
    static async rotateTask(req, res) {
        try {
            const { taskId } = req.params;
            const adminId = req.user?.id;
            if (!adminId)
                throw new errors_1.AppError('Unauthenticated', 401, 'UNAUTHENTICATED');
            const updatedTask = await service_1.TaskService.rotateTask(taskId, adminId);
            return res.status(200).json({ success: true, data: updatedTask });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
                code: error.code || 'INTERNAL_ERROR'
            });
        }
    }
}
exports.TaskController = TaskController;
