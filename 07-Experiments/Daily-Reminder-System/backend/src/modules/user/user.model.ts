import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  passwordHash: string;
  email: string;
  role: 'admin' | 'user';
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

export const UserModel = model<User>('User', userSchema);
