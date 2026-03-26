# Control Plane

## 1. Responsibility
👉 **Ai điều khiển hệ thống?**
- **Orchestrate loop**: Quản lý vòng lặp từ lúc nhận Request đến khi Goal Reached.
- **Decide next step**: Dựa trên feedback từ Evaluator để quyết định Continue/Retry/Stop.
- **Budget & Safety**: Kiểm soát Token và gọi Invariant Guard.

## 2. Control Loop
```pseudo
while not done:
  plan = Planner.get_next_action(state)
  if InvariantGuard.validate(plan):
    result = Runner.execute(plan)
    EventLog.append(result)
    evaluation = Evaluator.assess(result)
    if evaluation.success: state.update(evaluation)
  else:
    handle_blocked_action()
```

## 3. Inputs / Outputs
* **Input**: User goal, Project context, Current state.
* **Output**: Final product, Execution summary, Failure reports.

## 4. Failure Handling
👉 **Khi nào dừng?**
- Đạt giới hạn Iterations (Max Loop).
- Hết ngân sách Token.
- Invariant Guard chặn hành động quan trọng mà không có phương án thay thế.
- Yêu cầu can thiệp từ con người (Escalation trigger).
