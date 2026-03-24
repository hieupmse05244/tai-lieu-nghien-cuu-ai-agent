# Coding Standards & Agent Execution Specification (v3.1)

Tài liệu này là bộ khung chuẩn pháp lý cho mọi Agent trong hệ sinh thái Agent Factory.

## 1. Kiến trúc Module-based (v3.0)
- `src/modules/{domain}/*`: Phải chứa đầy đủ 6 layer:
  - `controller.ts`: Giao tiếp API.
  - `service.ts`: Logic nghiệp vụ (Phải có RBAC check).
  - `repository.ts`: Truy xuất DB.
  - `dto.ts`: Định dạng dữ liệu (Filter sensitive data).
  - `validator.ts`: Validate input (Sử dụng Zod/Joi).
  - `model.ts`: DB Schema.

## 2. Infrastructure & Security (Merged from Contract)
Mọi dự án Backend mặc định đã có và PHẢI sử dụng các thành phần hạ tầng sau (triển khai ở Phase 0):

### 2.1. Middlewares Bảo mật (Bắt buộc)
- **Helmet**: Phải được kích hoạt cho mọi endpoint.
- **CORS**: Chỉ chấp nhận whitelist domain (định nghĩa trong `.env`).
- **Rate Limit**: Phải áp dụng cho mọi API để chống DoS.
- **Error Handler**: Sử dụng `AppError` tập trung, tuyệt đối không lộ stack trace hoặc cấu hình hệ thống ra client.

### 2.2. Authentication & Data Handling
- **JWT**: Sử dụng `JWT_SECRET` và token expiration (1h mặc định).
- **RBAC**: Mọi Endpoint nhạy cảm phải đi qua middleware kiểm tra quyền Admin/Ownership.
- **Sanitization**: TẤT CẢ đầu vào phải được làm sạch tại tầng Validator trước khi vào Service.
- **Strict Typing**: Zero `any`. Sử dụng `interface/type` cho mọi object trung gian.

### 2.3. Environment & Logging
- **Fail-fast**: Validate toàn bộ `.env` (Zod) ngay khi khởi động.
- **Structured Logging**: Sử dụng Winston/Pino. Tuyệt đối KHÔNG log dữ liệu nhạy cảm (JWT Secret, Password).

## 3. Agent Execution Rules
1. **In-Scope Assessment**: Khi triển khai Module, Agent chỉ được ghi đè/tạo tệp trong phạm vi `src/modules/{domain}/`.
2. **Integration Focus**: Đảm bảo Controller kết nối đúng với các Middleware bảo mật toàn cục nêu tại Mục 2.
3. **Check-list**: Tự kiểm lỗi (Self-check) dựa trên bảng quy tắc này trước khi output.
