# Đặc tả Nhóm QC Agent (QC Group Specs)

Dưới đây là đặc tả vai trò cho các Agent tham gia vào quá trình kiểm soát chất lượng.

---

## 1. Tech Lead Agent (Evaluator)
- **Mục tiêu**: Đảm bảo mã nguồn đúng kiến trúc và logic nghiệp vụ.
- **Dữ liệu đọc**: `Contract.md`, `PRD.md`, `Coder_Message`.
- **Quyền hạn**: Chấp nhận hoặc Từ chối ghi file.
- **Công cụ**: LLM-based Logic Analysis.

## 2. QA/Tester Agent (Functionality)
- **Mục tiêu**: Tìm lỗi (bug) và các trường hợp biên (edge cases).
- **Dữ liệu đọc**: `PRD.md`, `User-Flow.md`, `Source_Code`.
- **Quyền hạn**: Yêu cầu bổ sung Unit Test.
- **Công cụ**: Test-case generation, Mocking logic.

## 3. Security Agent (SecOps)
- **Mục tiêu**: Phát hiện lỗ hổng bảo mật.
- **Tiêu chuẩn**: OWASP Top 10, CWE.
- **Kiểm tra**: SQL Injection, XSS, Broken Auth, Hardcoded Secrets.

---

## Quy tắc Phối hợp (Interaction Rules)

- **QC Group** hoạt động theo mô hình **Đồng thuận (Consensus)**: Chỉ khi Tech Lead gật đầu VÀ không có cảnh báo đỏ từ Security thì code mới được Merge.
- Phản hồi của QC Group phải rõ ràng, mang tính xây dựng và có chỉ dẫn sửa lỗi cụ thể cho Coder.
