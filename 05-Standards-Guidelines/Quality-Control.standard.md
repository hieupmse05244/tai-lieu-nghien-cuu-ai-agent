# Tiêu chuẩn kiểm soát chất lượng (Quality Control Standard)

Tài liệu này định nghĩa các quy tắc và quy trình đánh giá mã nguồn trong hệ thống Agent Factory.

## 1. Hệ thống đánh giá (Scoring Matrix)

Mã nguồn thực thi được đánh giá dựa trên thang điểm 10. Mức điểm tối thiểu để được chấp nhận là 8/10.

| Tiêu chí | Trọng số | Mô tả |
| :--- | :--- | :--- |
| **Tính đúng đắn (Correctness)** | 40% | Giải quyết đúng yêu cầu và logic của tác vụ. |
| **Tuân thủ thiết kế (Contract Compliance)** | 30% | Đúng cấu trúc dữ liệu, các điểm cuối API và kiểu dữ liệu đã thiết lập. |
| **Chất lượng mã nguồn (Code Quality)** | 20% | Mã nguồn sạch, dễ hiểu và tuân thủ quy ước đặt tên. |
| **Bảo mật và hiệu năng (Security & Perf)** | 10% | Không lộ thông tin nhạy cảm và xử lý lỗi hiệu quả. |

## 2. Quy trình kiểm soát chất lượng

1.  **Giai đoạn 1: Kiểm tra sơ bộ (Tác nhân review)**:
    - Đối soát mã nguồn với hợp đồng kỹ thuật (Contract).
    - Đưa ra điểm số dự kiến và nhận xét chi tiết.
2.  **Giai đoạn 2: Kiểm tra kỹ thuật**:
    - Thực hiện kiểm tra cú pháp và định dạng mã nguồn.
    - Thực hiện kiểm thử đơn vị để xác nhận logic trong thực tế.
3.  **Giai đoạn 3: Điều chỉnh tự động**:
    - Trường hợp kết quả đánh giá không đạt yêu cầu, dữ liệu sẽ được phản hồi lại cho phía thực thi để điều chỉnh (giới hạn số lần thử lại).

## 3. Các rào cản kỹ thuật

- **Các hành vi không được phép**: Sử dụng giá trị cố định cho các khóa bảo mật, sử dụng các hàm thực thi mã không an toàn, bỏ qua các bước xử lý lỗi hoặc sử dụng tên biến không rõ ràng.
- **Yêu cầu bắt buộc**: Triển khai xử lý lỗi đầy đủ, ghi nhật ký các sự kiện quan trọng và tuân thủ định dạng thời gian tiêu chuẩn.

---
> [!IMPORTANT]
> Tác nhân kiểm soát chất lượng có trách nhiệm đảm bảo tính an toàn và ổn định của hệ thống trước khi các thay đổi được áp dụng chính thức.
