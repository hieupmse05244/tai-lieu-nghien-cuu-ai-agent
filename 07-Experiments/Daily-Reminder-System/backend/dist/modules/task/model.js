"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    groupId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignees: [{ type: mongoose_1.Schema.Types.ObjectId, required: true }],
    rotationIndex: { type: Number, default: 0 },
    unavailableMembers: [{ type: mongoose_1.Schema.Types.ObjectId }],
    recurrence: {
        type: {
            type: String,
            enum: ['daily', 'weekly', 'custom'],
            required: true
        },
        daysOfWeek: [Number],
        time: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ['active', 'paused'],
        default: 'active'
    }
});
exports.TaskModel = (0, mongoose_1.model)('Task', taskSchema);
