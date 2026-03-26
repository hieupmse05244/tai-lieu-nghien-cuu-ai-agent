# Contracts - V4.7

👉 **Các layer nói chuyện với nhau bằng gì?**

`Contracts` là bộ quy tắc định dạng dữ liệu giúp các thành phần khác nhau của V4.7 hiểu được nhau một cách chuẩn xác. Thiết kế theo nguyên tắc: **Simple → Strict → Extensible**.

---

## 🟦 1. Common Types (TypeScript)
```ts
export type Phase =
  | "INIT"
  | "PLANNING"
  | "ACTION_EXECUTION"
  | "EVALUATION"
  | "DONE"
  | "FAILED"

export type Status = "ok" | "fail"

export type Source = "control" | "planner" | "runner" | "evaluator"

export type ErrorCode =
  | "PERMISSION_DENIED"
  | "TIMEOUT"
  | "NOT_FOUND"
  | "INVALID_ACTION"
  | "INVARIANT_VIOLATION"
  | "UNKNOWN_ERROR"
```

---

## 🟦 2. Planner Contract

### 📥 Input
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

### 📤 Output
```json
{
  "action": "check_permissions",
  "params": { "path": "/tmp/a.txt" },
  "reason": "Previous attempt failed due to permission",
  "confidence": 0.72
}
```

---

## 🟦 3. Control Plane Contract

### 📥 Input
```json
{
  "task": {},
  "state": { "phase": "PLANNING", "step": 3 },
  "planner_output": {},
  "evaluation_result": {}
}
```

### 📤 Output
```json
{
  "next_action": { "action": "check_permissions", "params": {} },
  "phase": "ACTION_EXECUTION",
  "decision": "EXECUTE | RETRY | FAIL | DONE"
}
```

---

## 🟦 4. Action Registry Contract (Schema)
```json
{
  "name": "delete_file",
  "description": "Delete a file from system",
  "params_schema": { "path": "string" },
  "safe": false,
  "requires_permission": true
}
```

---

## 🟦 5. Runner Contract

### 📥 Input
```json
{
  "action": "delete_file",
  "params": { "path": "/tmp/a.txt" }
}
```

### 📤 Output
```json
{
  "status": "fail",
  "result": null,
  "error": { "code": "PERMISSION_DENIED", "message": "permission denied" },
  "execution_time_ms": 120
}
```

---

## 🟦 6. Evaluator Contract

### 📥 Input
```json
{
  "task": { "goal": "Delete temp file" },
  "last_result": { "status": "fail" },
  "state": { "step": 3 }
}
```

### 📤 Output
```json
{
  "decision": "CONTINUE | RETRY | DONE | FAIL",
  "reason": "Action failed, retry possible",
  "confidence": 0.8
}
```

---

## 🟦 7. Event Log Contract (CORE)
```json
{
  "id": "evt_001",
  "ts": 1710000000,
  "source": "runner",
  "phase": "ACTION_EXECUTION",
  "type": "action | result | error | state",
  "action": "delete_file",
  "status": "fail",
  "error_code": "PERMISSION_DENIED",
  "message": "permission denied",
  "payload": {},
  "state_snapshot": { "disk_status": "OK", "network_status": "CONNECTED" }
}
```

---

## 🟦 8. Invariant Guard Contract

### 📥 Input
```json
{
  "action": "delete_file",
  "params": { "path": "/etc/passwd" },
  "state": {}
}
```

### 📤 Output
```json
{
  "allowed": false,
  "reason": "Cannot delete system files",
  "code": "INVARIANT_VIOLATION"
}
```

---

## 🟦 9. Incident Summary Contract

### 📤 Output (3-second format)
```json
{
  "critical_failure": "PERMISSION_DENIED",
  "phase_at_death": "ACTION_EXECUTION",
  "last_known_good_state": { "disk": "OK", "network": "CONNECTED" },
  "the_loop_breaker": "ACTION_REGISTRY_BLOCK (delete_file)",
  "human_input_required": "Verify sudoers for agent_user"
}
```

---

## 🟦 10. Gateway (User Interface) Contract
```json
{
  "user_input": "Delete file /tmp/a.txt",
  "task": { "id": "task_123", "goal": "Delete file /tmp/a.txt" }
}
```

---

## 🎯 End-to-End Flow Mapping
**User** → **Gateway** → **Task** → **Control Plane** → **Planner** → **Invariant Guard** → **Runner** → **Event Log** → **Evaluator** → **Summary Engine** → **Human**.
