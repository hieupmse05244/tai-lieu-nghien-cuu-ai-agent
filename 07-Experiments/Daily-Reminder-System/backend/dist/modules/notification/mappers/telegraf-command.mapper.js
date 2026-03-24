"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToNotificationMessage = void 0;
const mapToNotificationMessage = (task) => {
    const assignee = task.assignees[task.rotationIndex];
    return `Task '${task.title}' is currently assigned to ${assignee}. Follow up as per the schedule.`;
};
exports.mapToNotificationMessage = mapToNotificationMessage;
