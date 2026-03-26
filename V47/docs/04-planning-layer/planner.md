# Planner (LLM)

## 1. Role
👉 **LLM được dùng để làm gì?**
- **Suggest next action**: Đề xuất hành động kỹ thuật dựa trên NLP goal.
- **Decompose task**: Chia nhỏ Roadmap thành các bước thực thi.

## 2. Constraints
👉 **KHÔNG được làm gì?**
- **Cannot execute**: Không có quyền truy cập trực tiếp vào shell/fs.
- **Cannot bypass rules**: Phải đi qua Invariant Guard.
- **Cannot store state**: Phải là Stateless.

## 3. Input
```json
{
  "task": {
    "id": "task_123",
    "goal": "Delete temp file",
    "constraints": []
  },
  "context": {
    "current_phase": "PLANNING",
    "last_action": "delete_file",
    "last_result": "fail"
  },
  "event_log_tail": [
    { "type": "error", "message": "permission denied" }
  ],
  "available_actions": ["delete_file", "check_permissions", "escalate_privilege"]
}
```

## 4. Output
```json
{
  "action": "check_permissions",
  "params": { "path": "/tmp/a.txt" },
  "reason": "Previous attempt failed due to permission",
  "confidence": 0.72
}
```

## 5. Failure Modes
- Hallucination (đề xuất action không tồn tại).
- Context Overload (quên mục tiêu ban đầu).
- Loop repetition (đề xuất lại action đã fail).
