# Multi-Agent Orchestrator

👉 **“Người điều phối hiệp tác giữa các Agent”**

Trong dự án V4.7, **Multi-Agent Orchestrator** thừa kế và tiến hóa vai trò từ "Control Plane" trước đây. Nó không chỉ quản lý một vòng lặp đơn lẻ mà còn điều phối sự cộng tác của nhiều Agent Runtime chuyên biệt.

## 1. Trách nhiệm (Responsibility)
👉 **Ai điều khiển luồng hiệp tác?**
- **Task Routing**: Phân phối nhiệm vụ cho đúng Agent Runtime (ví dụ: giao Code cho Dev Agent, giao Test cho Test Agent).
- **Communication Flow**: Quản lý sự chuyển giao ngữ cảnh (Context Passing) giữa các Agent.
- **Sync / Async Coordination**: Điều phối các hoạt động đồng bộ hoặc chạy song song để tối ưu hóa thời gian.
- **Result Aggregation**: Tổng hợp các kết quả thực thi và tóm tắt tiến bộ (Evaluation & Summary).

## 2. Luồng điều phối (Orchestration Loop)
```pseudo
while goal_not_reached:
  # Lấy task tiếp theo từ Solution Blueprint
  current_task = get_next_task(blueprint, state)
  
  # Chỉ định Agent Runtime thực thi
  agent = assign_agent(current_task)
  
  # Thực thi và nhận kết quả
  result = await agent.execute(current_task)
  
  # Cập nhật nhật ký sự kiện và trạng thái hệ thống
  EventLog.append(result)
  state.update(result)
  
  # Kiểm tra Evaluator & Guardrails
  evaluation = Evaluator.assess(state)
  if evaluation.failed:
    handle_failure(evaluation) # Re-route / Retry / Escalate
```

## 3. Đặc điểm cốt lõi (Core Principles)
- **Deterministic Routing**: Việc điều phối phải dựa trên các quy tắc xác định trong Blueprint.
- **Context Integrity**: Đảm bảo các Agent khác nhau cùng chia sẻ một "thế giới quan" (Global State) đồng nhất.
- **Safety Priority**: Gọi **Invariant Guard** để ngăn chặn các hành vi nguy hiểm phát sinh từ sự phối hợp Agent.

## 4. Xử lý sự cố (Failure Handling)
👉 **Khi nào Orchestrator can thiệp?**
- **Loop Crisis**: Phát hiện các Agent đang đùn đẩy trách nhiệm hoặc lặp lại lỗi cũ.
- **Re-route**: Nếu một Agent chuyên biệt thất bại liên tục, Orchestrator có thể yêu cầu SAc thiết kế lại Blueprint hoặc thay thế Agent.
- **Escalate**: Khi không thể tự giải quyết, Orchestrator sẽ báo cáo Summary cho Human can thiệp.
