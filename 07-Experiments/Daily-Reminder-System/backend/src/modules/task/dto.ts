import { Types } from 'mongoose';

export interface TaskDTO {
  id: Types.ObjectId;
  groupId: Types.ObjectId;
  title: string;
  description: string;
  assignees: Types.ObjectId[];
  rotationIndex: number;
  unavailableMembers?: Types.ObjectId[];
  recurrence: {
    type: 'daily' | 'weekly' | 'custom';
    daysOfWeek?: number[];
    time: string;
  };
  status: 'active' | 'paused';
}
