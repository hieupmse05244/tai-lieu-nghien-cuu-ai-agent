Tài liệu này là chỉ lệnh chính thức do lập trình viên cung cấp cho tác nhân trí tuệ nhân tạo. Các tác nhân tham gia vào dự án Agent Factory yêu cầu phải đọc và tuân thủ các quy tắc dưới đây khi thực hiện triển khai mã nguồn.

## 1. Vai trò và Phạm vi (Role & Scope)

- **Đối tượng đọc**: Coder Agent, Architect Agent, Executor Agent.
- **Mục tiêu**: Đảm bảo mã nguồn sinh ra có tính nhất quán, có khả năng tự kiểm soát và tuân thủ kiến trúc tổng thể.

## 2. Thứ tự ưu tiên Tài liệu (Priority of Documents)

Để tối ưu hóa sự hiểu biết, Agent phải tuân thủ thứ tự đọc tài liệu sau:

1.  **Cấp độ 1 (Tiêu chuẩn hệ thống)**: Tham chiếu các tiêu chuẩn tại `05-Standards-Guidelines/`. Đây là quy định bắt buộc của toàn hệ thống (phong cách lập trình, cấu trúc thư mục).
2.  **Cấp độ 2 (Đặc tả dự án)**: Tham chiếu `Contract.md` và `PRD.md` tại thư mục `/docs` của dự án để nắm bối cảnh và các cam kết kỹ thuật.
3.  **Cấp độ 3 (Hướng dẫn tác vụ)**: Thực thi theo các bước được chia nhỏ trong `Agent-Instructions.md`.

## 2. Quy tắc Vận hành Cốt lõi (Core Execution Rules)

1.  **Tính nhất quán của kiến trúc**: Trước khi thực hiện thay đổi về logic, tác nhân phải tham chiếu các tệp đặc tả tại `/02-Architecture`. Mọi sai lệch cần được báo cáo cho Control Plane.
2.  **Cấu trúc dựa trên cấu hình (Config-driven)**: Không sử dụng các giá trị cố định (hardcode). Toàn bộ hành vi phải được định nghĩa qua các tệp cấu hình trong `/03-Implementation-Specs/Agent-Configs/`.
3.  **Duy trì trạng thái (State Logging)**: Tác nhân cập nhật tệp `state.json` và `meta.json` sau mỗi chu kỳ để đảm bảo tính đồng bộ dữ liệu.

## 3. Tiêu chuẩn Mã nguồn & Chất lượng (Code Quality Standards)

- **Ngôn ngữ**: Tuân thủ lựa chọn (Node.js/Python) đã quy định trong PRD.
- **Clean Code**: Áp dụng các tiêu chuẩn Clean Architecture. Ưu tiên tính modul hóa và tái sử dụng.
- **Kiểm thử (Testing)**: Mọi tính năng mới hoặc bản vá lỗi phải đi kèm với ít nhất một bộ Unit Test hoặc Integration Test. Không chấp nhận code không có kiểm thử tự động.
- **Tài liệu hóa**: Mỗi hàm/lớp phức tạp phải được ghi chú (JSDoc hoặc Docstrings) rõ ràng để các Agent khác có thể hiểu ngữ cảnh.

## 4. Quy trình Thực thi (Implementation Workflow)

Hệ thống vận hành theo chu kỳ khép kín để đảm bảo tính chính xác:

1.  **Phân tích Điểm mờ (Ambiguity Analysis)**: User đưa ý tưởng -> Ambiguity Agent đặt câu hỏi làm rõ -> Hoàn thiện Spec (AGENT-READY).
2.  **Lập kế hoạch (Planning)**: Đề xuất các bước thực hiện dưới dạng danh sách công việc (Task list).
3.  **Thực thi (Execution)**: 
    - **Backend**: Viết logic xử lý, controller và service.
    - **Frontend**: Khởi tạo bằng Vite (nếu chưa có), xây dựng component theo cấu trúc chuẩn.
4.  **Xác thực (Validation)**: Chạy test và linter qua Evaluator.
5.  **Báo cáo (Report)**: Gửi báo cáo kết quả kèm điểm số chất lượng.

## 5. Chỉ dẫn Kỹ thuật & Môi trường

- **Lưu trữ mã nguồn (Code Storage)**: 
    - Đối với các dự án Thực nghiệm, mã nguồn phải được lưu trữ tại `07-Experiments/<tên-dự-án>/backend/` hoặc `frontend/`. 
    - Không được phép tạo thư mục mã nguồn tại thư mục gốc (root) của workspace tài liệu này.
- **Dependencies**: Sử dụng `npm` (Node.js) hoặc `pip` (Python). Tuyệt đối không tự ý cài đặt các thư viện lạ hoặc không rõ nguồn gốc.
- **Cổng dịch vụ (Ports)**: Tuân thủ cấu hình cổng đã định nghĩa (ví dụ: Backend 3000, Frontend 3001).
- **Git**: Thực hiện commit nhỏ, rõ ràng. Sử dụng HTTPS + Token khi push mã nguồn.

## 6. Xử lý Lỗi & Leo thang (Error Handling & Escalation)

- Nếu gặp lỗi lặp lại quá 3 lần (Loop), Agent phải dừng lại, phân tích nguyên nhân tại `Failure Memory` và yêu cầu con người (Manual Override) can thiệp.
- Không được phép tự ý xóa các tệp tin quan trọng hoặc ghi đè lên các tệp cấu hình lõi của hệ thống nếu không có chỉ thị đặc biệt.

---
> [!IMPORTANT]
> Tác nhân là một thành phần của dự án Agent Factory, cần hành động chuyên nghiệp, cẩn trọng và hướng tới sự ổn định của hệ thống.
