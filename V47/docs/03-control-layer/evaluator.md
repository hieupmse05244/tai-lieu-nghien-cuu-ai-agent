# Evaluator

## 1. Purpose
System biết "đã xong chưa" bằng cách nào?
- Determine task completion: Kiểm tra kết quả thực tế so với mục tiêu.
- Quality Assessment: Chấm điểm code quality và tính nhất quán.

## 2. Logic
- Success conditions: Goal reached, confidence high.
- Retry conditions: Partial progress, non-blocking errors.
- Stop conditions: Max retries, invariant violation.

## 3. Input / Output
- Input: Task goal, last execution result, current state.
- Output:
```json
{
  "decision": "CONTINUE | RETRY | DONE | FAIL",
  "reason": "Action failed, retry possible",
  "confidence": 0.8
}
```
