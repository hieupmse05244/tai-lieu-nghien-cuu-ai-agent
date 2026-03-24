import { ObjectId } from 'mongodb';

/**
 * Mô hình dữ liệu cho Task
 */
export interface Task {
  id: ObjectId; // ID của task
  groupId: ObjectId; // ID của nhóm mà task thuộc về
  title: string; // Tiêu đề task
  description: string; // Mô tả chi tiết task
  assignees: ObjectId[]; // Danh sách ID của người được giao task
  rotationIndex: number; // Chỉ số của người hiện tại phụ trách task
  unavailableMembers?: ObjectId[]; // Danh sách ID của thành viên tạm thời vắng mặt
  recurrence: {
    type: 'daily' | 'weekly' | 'custom'; // Loại định kỳ
    daysOfWeek?: number[]; // Ngày trong tuần
    time: string; // Thời gian gửi thông báo (24h format - UTC)
  };
  status: 'active' | 'paused'; // Trạng thái của task
}
