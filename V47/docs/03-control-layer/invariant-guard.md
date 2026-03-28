# Invariant Guard

## 1. Goal
Hệ thống có đang đi chệch hướng không? (Safety & Design Integrity)
- Rule-based blocking: Chặn các hành động vi phạm quy tắc hệ thống.
- Design Drift prevention: Ngăn chặn Agent tự ý thay đổi cấu trúc cốt lõi.

## 2. Invariant Rules Examples
- No deletion of .git or docs/ directories.
- No external network requests unless whitelisted.
- Max token usage per action < 5000.
- Mandatory code review step for critical modules.

## 3. Logic
- Validation: Mỗi hành động từ Planner phải đi qua Guard.
- Decision: Allowed | Blocked.
- Feedback: Nếu Blocked, trả về lý do cụ thể để Planner điều chỉnh (Self-correction).

## 4. Input / Output
- Input: Action request, Action Registry, Current context.
- Output: 
```json
{
  "allowed": false,
  "reason": "Cannot delete system files",
  "code": "INVARIANT_VIOLATION"
}
```
