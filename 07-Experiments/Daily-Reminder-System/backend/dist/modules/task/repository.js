"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const model_1 = require("./model");
class TaskRepository {
    static async findById(id) {
        return model_1.TaskModel.findById(id);
    }
    static async save(task) {
        return task.save();
    }
    static async getActiveTasks() {
        return model_1.TaskModel.find({ status: 'active' });
    }
}
exports.TaskRepository = TaskRepository;
