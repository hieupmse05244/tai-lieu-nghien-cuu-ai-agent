# Hướng dẫn Triển khai dành cho AI Agent (Agent Implementation Guide)

Tài liệu này là chỉ lệnh chính thức do Lập trình viên (Developer) cung cấp cho AI Agent. Các Agent tham gia vào dự án **Agent Factory** BẮT BUỘC phải đọc và tuân thủ các quy tắc dưới đây khi thực hiện triển khai mã nguồn.

## 1. Vai trò và Phạm vi (Role & Scope)

- **Đối tượng đọc**: Coder Agent, Architect Agent, Executor Agent.
- **Mục tiêu**: Đảm bảo mã nguồn sinh ra có tính nhất quán, có khả năng tự kiểm soát và tuân thủ kiến trúc tổng thể.

## 2. Thứ tự ưu tiên Tài liệu (Priority of Documents)

Để tối ưu hóa sự hiểu biết, Agent phải tuân thủ thứ tự đọc tài liệu sau:

1.  **Cấp độ 1 (Global Standards)**: Luôn đọc các tiêu chuẩn tại `05-Standards-Guidelines/` đầu tiên. Đây là "Luật pháp" bất biến của toàn hệ thống (Coding style, Folder structure).
2.  **Cấp độ 2 (Project Design Anchors)**: Đọc `Contract.md` và `PRD.md` tại thư mục `/docs` của dự án để nắm bối cảnh và các cam kết kỹ thuật.
3.  **Cấp độ 3 (Task Instructions)**: Cuối cùng, thực thi theo các bước atomic trong `Agent-Instructions.md`.

## 2. Quy tắc Vận hành Cốt lõi (Core Execution Rules)

1.  **Kiến trúc là tối thượng**: Trước khi thực hiện bất kỳ thay đổi nào về logic, Agent phải đọc các tệp đặc tả tại `/02-Architecture`. Mọi sự sai lệch so với Whitepaper phải được báo cáo và xin ý kiến của Control Plane (nhân sự giám sát).
2.  **Hệ thống Cấu hình (Config-driven)**: Không mã hóa cứng (hardcode) các thông số. Toàn bộ hành vi phải được định nghĩa qua tệp cấu hình trong `/03-Implementation-Specs/Agent-Configs/`.
3.  **Trạng thái liên tục (State Logging)**: Agent phải cập nhật tệp `state.json` và `meta.json` sau mỗi Iteration để đảm bảo tính nhất quán (tránh State Desync).

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
> **Identity Check**: Bạn là một thành viên của dự án Agent Factory. Hãy hành động một cách chuyên nghiệp, cẩn trọng và hướng tới sự tiến hóa của toàn bộ hệ thống.
