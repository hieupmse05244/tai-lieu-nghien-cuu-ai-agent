# Tiêu chuẩn lập trình Frontend

Tài liệu này quy định các chuẩn mực kỹ thuật và quy trình triển khai cho thành phần Frontend trong hệ sinh thái Agent Factory.

## 1. Nền tảng công nghệ
- **Framework**: React với ngôn ngữ TypeScript.
- **Công cụ xây dựng**: Vite (phiên bản ổn định).
- **Quản lý trạng thái**: Ưu tiên sử dụng React Context hoặc các thư viện quản lý trạng thái phù hợp theo quy mô tác vụ.

## 2. Cấu trúc thư mục Frontend
Thư mục `frontend/src/` yêu cầu cấu trúc như sau:
- `components/`: Các thành phần giao diện nhỏ lẻ, có khả năng tái sử dụng.
- `pages/`: Các thành phần đại diện cho từng trang ứng dụng.
- `services/`: Các lớp xử lý giao tiếp dữ liệu với API.
- `hooks/`: Các logic xử lý trạng thái tùy chỉnh.
- `utils/`: Các hàm tiện ích dùng chung.
- `types/`: Các định nghĩa kiểu dữ liệu.

## 3. Quy chuẩn thực thi dành cho tác nhân
- **Phong cách lập trình**: Sử dụng functional components và hooks.
- **Tính phản hồi (Responsive)**: Giao diện phải tương thích với nhiều kích thước màn hình phổ biến.
- **Xác thực dữ liệu**: Thực hiện kiểm tra tính hợp lệ của dữ liệu đầu vào ngay tại giao diện người dùng.
- **Xử lý trạng thái tải (Loading/Error)**: Luôn khởi tạo các trạng thái thông báo cho người dùng khi đang chờ phản hồi từ hệ thống.

---
> [!IMPORTANT]
> Giao diện người dùng cần đạt được tính trực quan, nhất quán về phong cách và đảm bảo hiệu năng truy cập tối ưu.
