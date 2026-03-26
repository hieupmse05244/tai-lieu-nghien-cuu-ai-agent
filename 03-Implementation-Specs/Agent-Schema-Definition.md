# Đặc tả hệ thống: Định nghĩa cấu trúc tác nhân (Agent Schema)

Trong hệ thống Agent Factory, các tác nhân được định nghĩa thông qua các tệp cấu hình có cấu trúc. Tài liệu này mô tả cấu trúc chuẩn (Schema) để khởi tạo hoặc điều chỉnh các thành phần của một tác nhân.

## 1. Cấu trúc Schema tổng quát

Mỗi tác nhân bao gồm 5 nhóm thuộc tính cơ bản sau:

### 1.1. Định danh và phong cách (Identity & Persona)
- `id`: Định danh duy nhất của tác nhân.
- `role`: Vai trò chuyên môn xác định.
- `persona`: Đặc điểm phong cách làm việc (ví dụ: thực dụng, chú trọng chi tiết).

### 1.2. Năng lực và công cụ (Capabilities & Tools)
- `capabilities`: Danh sách các kỹ năng chuyên môn được gán cho tác nhân.
- `tools`: Các công cụ kỹ thuật mà tác nhân được quyền truy cập và sử dụng.

### 1.3. Ràng buộc và quy tắc (Constraints & Rules)
- `rules`: Các nguyên tắc bắt buộc phải tuân thủ trong quá trình thực thi.
- `guidelines`: Các gợi ý về phong cách hoặc quy chuẩn ưu tiên.

### 1.4. Bộ nhớ và phạm vi (Memory & Scope)
- `memory_access`: Các lớp bộ nhớ mà tác nhân có quyền tương tác (Working, Episodic, Semantic).
- `workspace_scope`: Phạm vi thư mục hoặc tệp tin mà tác nhân được phép thao tác.

### 1.5. Chỉ số đánh giá (Evaluation)
- `metrics`: Các tiêu chí định lượng dùng để đo lường hiệu quả hoạt động của tác nhân.

## 2. Ví dụ cấu hình tham khảo (agent_spec.yaml)

```yaml
id: drs-backend-coder
role: tác nhân thực thi backend
persona: 
  tone: chính xác, chặt chẽ
  experience: chuyên gia lập trình nền tảng node.js
capabilities:
  - api_implementation
  - database_migration
  - test_driven_development
tools:
  - multi_replace_file_content
  - run_command
rules:
  - follow_coding_standards_05
  - must_write_unit_tests
  - strictly_follow_contract_07
workspace_scope:
  - 07-experiments/daily-reminder-system/backend/
evaluation:
  metrics: [functional_correctness, code_quality, contract_compliance]
```

## 3. Cơ chế điều chỉnh cấu hình

Hệ thống có thể thực hiện điều chỉnh cấu hình của tác nhân (mutation) dựa trên dữ liệu phân tích từ quá trình thực thi:
- Việc bổ sung các quy tắc mới có thể được thực hiện nếu phát hiện các mẫu lỗi lặp lại trong lịch sử hoạt động.
- Mọi thay đổi về định nghĩa tác nhân cần được lưu vết phiên bản để đảm bảo khả năng truy xuất nguồn gốc.

---
> [!IMPORTANT]
> Các tệp định nghĩa tác nhân là cơ sở vận hành quan trọng của hệ thống. Việc thay đổi cấu hình cần được thực hiện dựa trên dữ liệu thực tế và có sự giám sát.
