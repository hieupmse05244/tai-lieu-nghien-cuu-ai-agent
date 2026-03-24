"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const repository_1 = require("./repository");
const user_repository_1 = require("../user/user.repository");
const errors_1 = require("../../utils/errors");
class TaskService {
    static async rotateTask(taskId, adminId) {
        const task = await repository_1.TaskRepository.findById(taskId);
        if (!task)
            throw new errors_1.AppError('Task not found', 404, 'TASK_NOT_FOUND');
        const isAdmin = await user_repository_1.UserRepository.isUserAdmin(adminId, task.groupId.toString());
        if (!isAdmin)
            throw new errors_1.AppError('Unauthorized access', 403, 'FORBIDDEN');
        const totalAssignees = task.assignees.length;
        let nextIndex = (task.rotationIndex + 1) % totalAssignees;
        const unavailableSet = new Set(task.unavailableMembers?.map(id => id.toString()) || []);
        let attempts = 0;
        while (unavailableSet.has(task.assignees[nextIndex].toString()) && attempts < totalAssignees) {
            nextIndex = (nextIndex + 1) % totalAssignees;
            attempts++;
        }
        task.rotationIndex = nextIndex;
        await repository_1.TaskRepository.save(task);
        return task;
    }
}
exports.TaskService = TaskService;
