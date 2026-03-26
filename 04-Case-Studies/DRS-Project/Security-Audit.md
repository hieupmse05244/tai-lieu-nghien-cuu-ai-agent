# Báo cáo phân tích lỗi và lỗ hổng: Dự án DRS

Báo cáo này liệt kê các vấn đề kỹ thuật và rủi ro bảo mật được phát hiện trong quá trình rà soát mã nguồn dự án Daily Reminder System (DRS).

## 1. Lỗ hổng bảo mật

### 1.1. Ghi tệp ngoài phạm vi cho phép (Arbitrary File Write)
- **Vấn đề**: Trong công cụ runner, kết quả thực thi được ghi trực tiếp vào đường dẫn tệp mà không qua kiểm tra tính hợp lệ.
- **Rủi ro**: Tác nhân có thể thực hiện ghi đè lên các tệp hệ thống nhạy cảm nếu có sự sai lệch trong chỉ lệnh hoặc bị tấn công can thiệp.
- **Khắc phục**: Sử dụng danh sách thư mục được phép và thực hiện chuẩn hóa đường dẫn trước khi ghi.

### 1.2. Hạn chế trong xác thực tác vụ bot (Auth Bypass)
- **Vấn đề**: Một số lệnh vận hành trong mã nguồn bot sử dụng định danh cố định để thực hiện các tác vụ quản trị.
- **Rủi ro**: Người dùng không có thẩm quyền có thể kích hoạt các lệnh quản trị nếu biết được tên lệnh.
- **Khắc phục**: Tích hợp kiểm tra quyền hạn dựa trên định danh người dùng đã được đăng ký trong hệ thống.

## 2. Lỗi logic và vận hành

### 2.1. Vấn đề đồng bộ trong logic xoay vòng (Race Condition)
- **Vấn đề**: Các thao tác đọc và ghi trạng thái xoay vòng nhân sự không đảm bảo tính nguyên tử.
- **Rủi ro**: Khi có nhiều yêu cầu đồng thời, trạng thái xoay vòng có thể bị sai lệch.
- **Khắc phục**: Sử dụng các toán tử cập nhật nguyên tử hoặc cơ chế khóa phù hợp.

### 2.2. Logic xử lý bù thông báo chưa hoàn thiện
- **Vấn đề**: Đặc tả yêu cầu việc gửi bù thông báo sau sự cố nhưng mã nguồn hiện tại chưa triển khai module này.
- **Rủi ro**: Có thể bỏ lỡ các thông báo quan trọng trong trường hợp hệ thống mất kết nối tạm thời.

## 3. Hạn chế về thiết kế

### 3.1. Tính nhất quán của trạng thái tác nhân
- **Vấn đề**: Tệp trạng thái của runner được cập nhật liên tục mà không có cơ chế sao lưu hoặc khóa bảo vệ.
- **Rủi ro**: Rủi ro mất dữ liệu trạng thái nếu hệ thống gặp sự cố trong quá trình ghi tệp.

### 3.2. Hệ thống nhật ký kiểm soát (Audit Log)
- **Vấn đề**: Nhật ký hiện tại tập trung vào phản hồi của mô hình ngôn ngữ, chưa bao quát được các thay đổi thực tế trên cơ sở dữ liệu.
- **Rủi ro**: Khó khăn trong việc truy vết các thay đổi dữ liệu không mong muốn do tác nhân thực hiện.

## 4. Khuyến nghị khắc phục
1. **Runner Security**: Bổ sung lớp kiểm soát đầu ra trước khi thực thi lệnh hoặc ghi tệp.
2. **Database Integrity**: Chuyển đổi các tác vụ cập nhật sang dạng nguyên tử.
3. **Auth Bot**: Xác thực định danh người dùng Telegram với dữ liệu trong hệ thống backend.

---
> [!WARNING]
> Các vấn đề này cần được xử lý trước khi triển khai hệ thống vào môi trường thử nghiệm thực tế.
