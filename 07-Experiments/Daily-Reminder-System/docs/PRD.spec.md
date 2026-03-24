# PRD: Daily Reminder System (DRS) - Bản Cập nhật

## 1. Mục tiêu sản phẩm (Product Goals)
Xây dựng một hệ thống tinh gọn giúp các nhóm làm việc tự động hóa việc nhắc nhở và lập lịch công việc hàng ngày qua Telegram, tích hợp bảo mật JWT và cơ chế xoay vòng thông minh.

## 2. Đối tượng người dùng (User Personas)
- **Team Lead (Trưởng nhóm)**: Quản lý nhóm, cấu hình lịch trình, trộn lại (Re-roll) danh sách nhân sự trực.
- **Team Member (Thành viên)**: Nhận thông báo, cập nhật trạng thái "Sẵn sàng" (Availability).

## 3. Danh sách tính năng (Functional Requirements)

### 3.1. Quản lý Tài khoản & Bảo mật (Mới)
- Đăng ký và Đăng nhập bằng JWT.
- Chỉ người dùng có Token hợp lệ mới được truy cập các tính năng quản lý nhóm.

### 3.2. Quản lý Nhóm & Liên kết Bot
- Tạo nhóm và liên kết với Telegram Group ID thông qua Bot (cần cơ chế xác nhận quyền chat).
- Thêm thành viên vào nhóm dựa trên ID hệ thống.

### 3.3. Xoay vòng Nhân sự Thông minh (Rotation Logic)
- **Thứ tự Random**: Danh sách nhân sự mặc định được xáo trộn ngẫu nhiên.
- **Hàng đợi Phụ (Availability Queue)**:
    - Nếu thành viên đánh dấu "Tạm nghỉ", họ được chuyển vào nhánh phụ.
    - Hệ thống tự động bỏ qua người này và giao task cho người kế tiếp.
    - Khi "Quay lại", họ ngay lập tức trở lại danh sách xoay vòng.
- **Xử lý Rời nhóm**: Xóa vĩnh viễn khỏi danh sách xoay vòng.

### 3.4. Hệ thống Lập lịch & Thông báo (Scheduling)
- Múi giờ: **UTC+7** (Indochina Time).
- **Catch-up logic**: Nếu server offline và bỏ lỡ giờ thông báo, hệ thống phải thực hiện gửi bù ngay khi online trở lại.

## 4. Yêu cầu Phi chức năng
- **Bảo mật**: Sử dụng Bcrypt để hash mật khẩu và JWT để authenticate.
- **Tự chữa lành**: Tự động thử lại tối đa 3 lần nếu API Telegram bị lỗi.

---
> [!IMPORTANT]
> **Priority Number One**: Đảm bảo thông báo được gửi đúng người theo thứ tự xoay vòng hiện tại, kể cả khi có biến động về nhân sự vắng mặt.
