# Tiêu chuẩn lập trình Backend (v3.1)

Tài liệu này quy định các tiêu chuẩn kỹ thuật và quy trình thực hiện dành cho các tác nhân trong hệ sinh thái Agent Factory.

## 1. Kiến trúc dựa trên module (v3.0)
Mỗi module tại `src/modules/{domain}/*` yêu cầu bao gồm các lớp chức năng sau:
- `controller.ts`: Xử lý giao diện lập trình (API).
- `service.ts`: Xử lý logic nghiệp vụ và kiểm tra quyền truy cập.
- `repository.ts`: Thực hiện truy xuất cơ sở dữ liệu.
- `dto.ts`: Định nghĩa định dạng dữ liệu và lọc dữ liệu nhạy cảm.
- `validator.ts`: Xác thực dữ liệu đầu vào.
- `model.ts`: Định nghĩa mô hình dữ liệu.

## 2. Hạ tầng và bảo mật
Các dự án backend yêu cầu sử dụng các thành phần hạ tầng sau:

### 2.1. Lớp trung gian bảo mật (Middlewares)
- **Helmet**: Kích hoạt cho tất cả các điểm cuối (endpoints).
- **CORS**: Chỉ chấp nhận các miền trong danh sách cho phép (định nghĩa tại .env).
- **Rate Limit**: Áp dụng để hạn chế tần suất yêu cầu.
- **Error Handler**: Sử dụng cơ chế xử lý lỗi tập trung, không tiết lộ cấu hình hệ thống cho phía máy khách.

### 2.2. Xác thực và xử lý dữ liệu
- **JWT**: Sử dụng cơ chế xác thực dựa trên mã thông báo với thời gian hết hạn cụ thể.
- **RBAC**: Kiểm soát quyền truy cập đối với các yêu cầu nhạy cảm.
- **Sanitization**: Làm sạch tất cả dữ liệu đầu vào tại lớp xác thực.
- **Strict Typing**: Yêu cầu sử dụng kiểu dữ liệu định sẵn, không sử dụng kiểu dữ liệu không xác định (any).

### 2.3. Môi trường và nhật ký (Logging)
- **Xác thực môi trường**: Kiểm tra các biến môi trường ngay khi khởi động hệ thống.
- **Nhật ký cấu trúc**: Sử dụng các thư viện ghi nhật ký có cấu trúc, tuyệt đối không ghi lại các thông tin nhạy cảm.

## 3. Quy tắc thực thi dành cho tác nhân
1. **Phạm vi tác động**: Khi triển khai module, tác nhân chỉ thao tác trong phạm vi thư mục được chỉ định.
2. **Tích hợp bảo mật**: Đảm bảo các điểm cuối được kết nối đúng với các lớp trung gian bảo mật toàn cục.
3. **Tự rà soát**: Thực hiện kiểm tra lại dựa trên các quy tắc này trước khi hoàn tất tác vụ.
