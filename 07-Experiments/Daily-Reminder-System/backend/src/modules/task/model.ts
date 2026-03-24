import { Schema, model, Document, Types } from 'mongoose';

export interface Task {
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

export type TaskDocument = Task & Document;

const taskSchema = new Schema<Task>({
  groupId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignees: [{ type: Schema.Types.ObjectId, required: true }],
  rotationIndex: { type: Number, default: 0 },
  unavailableMembers: [{ type: Schema.Types.ObjectId }],
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

export const TaskModel = model<TaskDocument>('Task', taskSchema);
