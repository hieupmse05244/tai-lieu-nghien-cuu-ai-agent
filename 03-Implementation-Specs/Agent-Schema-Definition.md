# Đặc tả triển khai: Agent Schema Definition (Định nghĩa Agent)

Trong Agent Factory, các Agent không được mã hóa cứng (hardcoded) mà được định nghĩa thông qua các tệp cấu hình (YAML/JSON). Tài liệu này định nghĩa cấu trúc chuẩn (Schema) để tạo mới hoặc điều chỉnh một Agent.

## 1. Cấu trúc Schema Tổng quát

Mỗi Agent phải có đầy đủ 5 nhóm thuộc tính sau:

### 1.1. Identity (Định danh & Persona)
- `id`: Định danh duy nhất (Slug).
- `role`: Vai trò chính (ví dụ: Senior Backend Engineer).
- `persona`: Tính cách và phong cách làm việc (Pragmatic, detail-oriented, v.v.).

### 1.2. Capabilities & Tools (Năng lực & Công cụ)
- `capabilities`: Danh sách các kỹ năng (Skills) của Agent (ví dụ: api_design, testing).
- `tools`: Danh sách các công cụ mà Agent được phép truy cập (ví dụ: code_generator, file_system_v2).

### 1.3. Constraints & Rules (Ràng buộc & Quy tắc)
- `rules`: Các nguyên tắc bắt buộc phải tuân thủ (ví dụ: Clean Architecture, Unit test required).
- `guidelines`: Các gợi ý hoặc phong cách ưu tiên (ví dụ: Use camelCase).

### 1.4. Memory & Scope (Bộ nhớ & Phạm vi)
- `memory_access`: Các tầng bộ nhớ mà Agent có thể đọc/ghi (Working, Episodic, Semantic).
- `workspace_scope`: Thư mục hoặc file mà Agent có quyền chỉnh sửa.

### 1.5. Evaluation (Đánh giá)
- `metrics`: Các chỉ số KPI mà Agent sẽ bịEvaluator chấm điểm.

## 2. Ví dụ tệp Cấu hình (agent_spec.yaml)

```yaml
id: drs-backend-coder
role: Backend Implementation Agent
persona: 
  tone: precise, strict
  experience: Expert in Node.js
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
  - 07-Experiments/Daily-Reminder-System/backend/
evaluation:
  metrics: [functional_correctness, code_quality, contract_compliance]
```

## 3. Quy trình Tự tiến hóa Cấu hình (Config Mutation)

Control Plane có thể yêu cầu **Evolution Agent** tự động chỉnh sửa `agent_spec.yaml` (Mutation) nếu điểm số Evaluator bền bỉ ở mức thấp.
- Ví dụ: Thêm `rule: avoid_recursive_logic` vào `rules` nếu phát hiện Agent hay viết code gây Infinite Loop.

---
> [!IMPORTANT]
> **Immutability Notice**: Các tệp định nghĩa Agent trong thư mục `03-Implementation-Specs/Agent-Configs/` là mỏ neo vận hành. Bất kỳ sự thay đổi tự động nào của AI cũng phải được ghi lại lịch sử phiên bản (Versioning).
