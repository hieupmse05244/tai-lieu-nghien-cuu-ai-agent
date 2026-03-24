# Frontend Development Standard (DRS v3.7)

Bộ quy chuẩn này áp dụng cho mọi Agent và Developer khi làm việc với tầng Giao diện của Daily Reminder System.

## 1. Stack Kỹ thuật
- **Framework**: React 18+ (Vite).
- **Styling**: Tailwind CSS (v3/v4).
- **Icons**: Lucide React.
- **State Management**: Zustand (Global) / React Query (Server state).
- **API Client**: Axios.

## 2. Quy chuẩn Code (Coding Standards)
- **Component**: Ưu tiên Functional Components và Hooks.
- **Atomic Design**: 
  - `atoms`: Các thẻ cơ bản (Button, Input).
  - `molecules`: Nhóm các thẻ (FormField, NavItem).
  - `organisms`: Các khối chức năng (Sidebar, Table).
  - `pages`: Giao diện hoàn chỉnh.
- **Naming**: PascalCase cho Component, camelCase cho Props/Variables.

## 3. Quy chuẩn UI/UX
- **Design System**: Sử dụng bảng màu `slate-950` là nền, `blue-600` là màu nhấn.
- **Responsive**: Phải hiển thị tốt trên Mobile (sm), Tablet (md), và Desktop (lg).
- **Interactions**: Sử dụng `transition-all`, `active:scale-95`, `backdrop-blur` cho các tương tác chạm/hover.

## 4. Kiểm thử & Đảm bảo chất lượng (QA)
- **Visual Testing**: Sử dụng Playwright để chụp ảnh màn hình và so sánh.
- **Linting**: Tuân thủ ESLint và Prettier (đặc biệt là Tailwind class ordering).

---
**Duy trì tính nhất quán là chìa khóa của sự chuyên nghiệp.**
