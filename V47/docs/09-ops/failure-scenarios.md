# Failure Scenarios

Các kịch bản lỗi phổ biến trong Agent Factory.

## 1. Loop Crisis
Triệu chứng: Agent gọi cùng một action với cùng params nhiều lần mà kết quả không đổi.
Xử lý: Tăng "retry_limit" trong config hoặc chuyển sang human intervention.

## 2. Design Drift
Triệu chứng: Agent cố tình sửa cấu trúc repo (ví dụ xóa docs/ hoặc sửa registry).
Xử lý: Kiểm tra Invariant Guard logs và rollback state.

## 3. Tool Exhaustion
Triệu chứng: Runner báo timeout liên tục cho một action (ví dụ npm install).
Xử lý: Kiểm tra network hoặc tăng timeout_ms trong Agent Definition.

## 4. Context Overload
Triệu chứng: Agent bị "quên" mục tiêu ban đầu sau nhiều bước thực thi.
Xử lý: Sử dụng "short_term_memory" và lọc bớt log rác (Compress context).
