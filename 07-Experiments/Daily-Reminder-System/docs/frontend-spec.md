# Frontend Technical Specification: DRS Dashboard v3.3

## 1. Overview
Hệ thống Frontend cung cấp khả năng quản lý trực quan cho Daily Reminder System, bao gồm:
- Xem danh sách Group và Task.
- Thay đổi trạng thái vắng mặt (`unavailableMembers`).
- Kích hoạt xoay vòng nhiệm vụ thủ công.
- Theo dõi lịch sử thông báo.

## 2. Tech Stack
- **Framework**: Vite + React (TS).
- **Styling**: Tailwind CSS + CSS Variables (Themeable).
- **Icons**: Lucide React.
- **API Client**: Axios + React Query.

## 3. Directory Structure
```
frontend/
├── src/
│   ├── api/          # API definitions & Axios config
│   ├── components/   # UI Library (Button, Input, Card, etc.)
│   ├── hooks/        # Custom React Hooks
│   ├── layouts/      # Dashboard vs Auth Layouts
│   ├── pages/        # Route components (Dashboard, Tasks, Auth)
│   ├── store/        # Zustand stores
│   ├── types/        # TypeScript interfaces (Shared with BE)
│   └── utils/        # Formatters, Helpers
├── public/           # Static assets
└── Dockerfile        # Production Build (Nginx)
```

## 4. Key Features
- **Real-time Updates**: Sử dụng React Query polling hoặc WebSockets (nếu cần) để cập nhật trạng thái xoay vòng.
- **Glassmorphism UI**: Thiết kế giao diện hiện đại với hiệu ứng mờ nhám, tối giản nhưng cao cấp.
- **RBAC UI**: Ẩn/Hiện nút quản trị dựa trên Role của User.
```markdown
*Trạng thái hiện tại: Đang trong giai đoạn PLANNING.*
```
