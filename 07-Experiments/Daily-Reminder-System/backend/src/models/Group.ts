import { ObjectId } from 'mongodb';

/**
 * Mô hình dữ liệu cho Group
 */
export interface Group {
  id: ObjectId; // ID của nhóm
  name: string; // Tên nhóm
  description: string; // Mô tả về nhóm
  adminId: ObjectId; // ID của admin nhóm
  members: ObjectId[]; // Danh sách thành viên của nhóm
  telegramChatId?: string; // ID của nhóm Telegram liên kết (optional)
  createdAt: Date; // Ngày tạo nhóm
}
