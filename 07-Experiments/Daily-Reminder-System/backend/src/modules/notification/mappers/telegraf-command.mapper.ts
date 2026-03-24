export const mapToNotificationMessage = (task) => {
  const assignee = task.assignees[task.rotationIndex];
  return `Task '${task.title}' is currently assigned to ${assignee}. Follow up as per the schedule.`;
};
