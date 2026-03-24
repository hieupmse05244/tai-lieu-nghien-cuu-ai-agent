# Đặc tả triển khai: Evaluator Scoring Engine (Bộ chấm điểm)

Evaluator là thành phần then chốt để chuyển đổi hệ thống từ **Success/Fail (Nhị phân)** sang **Scoring (Định lượng)**. Việc tính toán điểm số giúp Control Plane đưa ra các quyết định điều phối thông minh hơn.

## 1. Bộ chỉ số Đánh giá (Scoring Metrics)

Điểm số tổng thể (S) được cấu thành từ 4 nhóm chỉ số chính:

### 1.1. Tính đúng đắn chức năng (Functional Correctness) - Trọng số: 40%
- **Tiêu chí**: Toàn bộ unit test và integration test phải vượt qua.
- **Cách đo**: Số lượng test pass / Tổng số test.
- **Công cụ**: Jest, PyTest, Mocha.

### 1.2. Chất lượng mã nguồn (Code Quality) - Trọng số: 20%
- **Tiêu chí**: Tuân thủ ESLint/Prettier, độ phức tạp vòng (Cyclomatic Complexity) thấp.
- **Cách đo**: Số lỗi linter, điểm Complexity từ Static Analysis.
- **Công cụ**: SonarQube, ESLint, CodeClimate.

### 1.3. Sự tuân thủ thiết kế (Design Alignment) - Trọng số: 30%
- **Tiêu chí**: Khớp 100% với `Contract.md` và Architecture Docs.
- **Cách đo**: So sánh API Endpoints và Schema thực tế với đặc tả.
- **Công cụ**: Validator Agent (LLM-based check).

### 1.4. Hiệu suất và Tài nguyên (Performance) - Trọng số: 10%
- **Tiêu chí**: Thời gian phản hồi API, mức độ sử dụng RAM/CPU.
- **Cách đo**: Benchmark kết quả thực thi trong Sandbox.

## 2. Quy trình Chấm điểm (Scoring Workflow)

1.  **Bước 1: Deterministic Check (Tự động 100%)**: Chạy linter, test runner và static analysis. Nếu nhóm 1.1 (Functional) có kết quả < 50%, dừng đánh giá và trả về **Retry** ngay lập tức.
2.  **Bước 2: Semantic Review (LLM-based)**: Validator Agent đọc mã nguồn và đối soát với Contract/Architecture để chấm điểm nhóm 1.3 (Design Alignment).
3.  **Bước 3: Tổng hợp (Synthesis)**: Control Plane tính toán điểm số cuối cùng dựa trên trọng số.

## 4. Công cụ và Lưu trữ

- **Evaluation Report**: Sau mỗi lần chạy, Evaluator sinh ra một tệp báo cáo (ví dụ: `eval_report_v1.json`) chứa điểm số chi tiết và gợi ý sửa đổi (Suggestions) cho Planner.
- **Dashboard**: Các điểm số này được lưu vào Episodic Memory để vẽ biểu đồ tiến hóa (Evolution Chart) của dự án.

---
> [!TIP]
> **Evolution Logic**: Mục tiêu của hệ thống không chỉ là đạt 100/100, mà là sự **tăng trưởng điểm số** qua từng Iteration. Nếu điểm số không đổi sau 3 lần thử, hệ thống sẽ tự động Escalate.
