import mongoose, { Schema, Document } from 'mongoose';

export interface GroupDocument extends Document {
  name: string;
  description: string;
  adminId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  telegramChatId?: string;
  createdAt: Date;
}

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  adminId: { type: mongoose.Types.ObjectId, required: true },
  members: [{ type: mongoose.Types.ObjectId }],
  telegramChatId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Group = mongoose.model<GroupDocument>('Group', GroupSchema);
