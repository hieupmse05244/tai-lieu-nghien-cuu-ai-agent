# Thiết kế chi tiết: Memory System (Hệ thống Bộ nhớ)

Hệ thống Bộ nhớ của Agent Factory được thiết kế để không chỉ lưu trữ thông tin mà còn giúp Agent rút kinh nghiệm từ quá khứ (Learning from Experience). Đây là thành phần then chốt để đạt được khả năng **Self-Evolution** (Tự tiến hóa).

## 1. Cấu trúc Bộ nhớ Đa tầng (Multi-layered Memory)

Hệ thống được chia thành 4 tầng bộ nhớ chuyên biệt:

### 1.1. Working Memory (Bộ nhớ Tạm thời)
- **Vai trò**: Lưu trữ trạng thái hiện tại của phiên làm việc (Iteration context).
- **Thực thể**: `state.json`, `context_window` của LLM.
- **Dữ liệu**: Task hiện tại, danh sách file đang mở, biến môi trường tạm thời.

### 1.2. Episodic Memory (Bộ nhớ Trải nghiệm)
- **Vai trò**: Nhật ký chi tiết của các lần thực thi trong quá khứ.
- **Thực thể**: `execution_logs`, `history.db`.
- **Dữ liệu**: Các prompt đã gửi, phản hồi của LLM, kết quả chạy tool call (Success/Fail) và điểm số từ Evaluator.

### 1.3. Failure Memory (Bộ nhớ Sai lầm - Anti-patterns)
- **Vai trò**: Lưu trữ các "vết xe đổ" để Agent không lặp lại cùng một lỗi.
- **Thực thể**: `failures.db` hoặc Vector DB với metadata "Failure".
- **Dữ liệu**: Lỗi dependency, lỗi logic, các phương án đã thử nhưng thất bại kèm theo lý do (Root Cause Analysis).

### 1.4. Semantic Memory (Bộ nhớ Tri thức)
- **Vai trò**: Lưu trữ các kiến thức tĩnh và tiêu chuẩn hệ thống.
- **Thực thể**: Vector Database (Qdrant/Weaviate).
- **Dữ liệu**: Tài liệu nghiên cứu (01), Kiến trúc (02), Tiêu chuẩn Coding (05).

## 2. Quy trình Vòng đời Bộ nhớ (Memory Lifecycle)

1.  **Ghi nhận (Capture)**: Mọi hành động của Agent đều được log lại vào Episodic Memory.
2.  **Phân loại (Classification)**: Nếu một hành động dẫn đến lỗi (Fail) lặp lại, Evaluator sẽ đánh dấu và đẩy thông tin vào Failure Memory.
3.  **Thanh lọc (Pruning/Purging)**: Control Plane thực hiện dọn dẹp Working Memory sau mỗi Sub-task để tránh "nhiễu" thông tin (Hallucination).
4.  **Truy xuất (Retrieval)**: Planner truy vấn Semantic và Failure Memory trước khi lập kế hoạch mới.

## 3. Cơ chế Học hỏi từ Thất bại (Anti-pattern Avoidance)

Khi Planner bắt đầu một nhiệm vụ, nó sẽ thực hiện truy vấn:
> "Trong quá khứ, khi thực hiện nhiệm vụ [X] trên công nghệ [Y], đã có sai lầm nào xảy ra không?"

Nếu Failure Memory trả về kết quả, Planner sẽ thêm chỉ thị:
> "CẢNH BÁO: Không thực hiện [Z] vì sẽ dẫn đến lỗi [Failure_Log_ID]."

## 4. Công nghệ Lưu trữ Gợi ý

- **File-based (JSON/YAML)**: Cho Working Memory ngắn hạn.
- **Vector Database**: Cho Semantic Memory và Failure Memory để tìm kiếm theo ý nghĩa (Semantic Search).
- **Relational DB**: Cho Episodic Memory để quản lý lịch sử theo dạng chuỗi thời gian (Timeseries).

---
> [!TIP]
> **Evolution Logic**: Càng nhiều thất bại được lưu trữ trong Failure Memory, hệ thống càng trở nên "thông minh" và tránh được các vòng lặp vô tận (Infinite Loops).
