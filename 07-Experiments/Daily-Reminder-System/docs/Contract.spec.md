# Contract Giao tiếp: Daily Reminder System (DRS) v3.3

Tài liệu này tập trung vào **Schema** và **API Logic**. Các tiêu chuẩn an ninh hạ tầng áp dụng theo `Backend.standard.md v3.1`.

## 1. Data Schema

### 1.1. User (Identity)
```typescript
interface User {
  id: ObjectId;
  username: string;
  passwordHash: string;
  email: string;
  createdAt: Date;
}
```

### 1.2. Group (Ownership)
```typescript
interface Group {
  id: ObjectId;
  name: string;
  description: string;
  adminId: ObjectId; // Owner
  members: ObjectId[]; 
  telegramChatId?: string;
}
```

### 1.3. Task (Rotation Logic)
```typescript
interface Task {
  id: ObjectId;
  groupId: ObjectId;
  title: string;
  description: string;
  assignees: ObjectId[]; // Danh sách xoay vòng
  rotationIndex: number; // Người đang phụ trách hiện tại
  unavailableMembers?: ObjectId[]; // Danh sách tạm vắng
  recurrence: {
    type: 'daily' | 'weekly' | 'custom';
    daysOfWeek?: number[];
    time: string; // "08:30" (UTC+7)
  };
  status: 'active' | 'paused';
}
```

## 2. API Contract

### 2.1. Authentication
- `POST /api/v1/auth/register` (Public)
- `POST /api/v1/auth/login` (Public)

### 2.2. Group Management (JWT + Admin Check)
- `POST /api/v1/groups`
- `GET /api/v1/groups/:id`
- `PATCH /api/v1/groups/:id/link-telegram`

### 2.3. Task Management (JWT + Admin Check)
- `POST /api/v1/tasks`
- `PATCH /api/v1/tasks/:id/availability`: Cập nhật `unavailableMembers`.
- `POST /api/v1/tasks/:id/reroll`: Tráo đổi thứ tự `assignees`.

## 3. Business Constraints (Nghiệp vụ cốt lõi)

1. **Múi giờ**: Luôn sử dụng **UTC+7** cho mọi logic lập lịch.
2. **Rotation Logic**: Người trực = `assignees[rotationIndex]`. Nếu người đó vắng mặt, lấy người kế tiếp.
3. **Catch-up**: Server khởi động phải check và gửi bù thông báo nhỡ trong quá khứ.
4. **RBAC**: Mọi Endpoint (trừ Auth/Health) phải kiểm soát quyền Admin dựa trên `adminId` của Group hoặc `id` của User.