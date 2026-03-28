# Contracts - V4.7

👉 **Các layer nói chuyện với nhau bằng gì?**

`Contracts` là bộ quy tắc định dạng dữ liệu giúp các thành phần khác nhau của V4.7 hiểu được nhau một cách chuẩn xác. Thiết kế theo nguyên tắc: **Simple → Strict → Extensible**.

---

## 🟦 1. Common Types (TypeScript)
```ts
export type Phase =
  | "INIT"
  | "DESIGN"
  | "PROVISIONING"
  | "ORCHESTRATION"
  | "EVALUATION"
  | "DONE"
  | "FAILED"

export type Status = "ok" | "fail"

export type Source = "gateway" | "sac" | "orchestrator" | "runtime" | "evaluator"

export type ErrorCode =
  | "PERMISSION_DENIED"
  | "TIMEOUT"
  | "NOT_FOUND"
  | "INVALID_ACTION"
  | "INVARIANT_VIOLATION"
  | "DESIGN_DRIFT"
  | "UNKNOWN_ERROR"
```

---

## 🟦 2. SAc Contract (Solution Architect)

### 📥 Input
```json
{
  "user_intent": "Xây dựng hệ thống quản lý tài nguyên tập trung",
  "context": {
    "stack": "Node.js, React",
    "infrastructure": "Docker"
  }
}
```

### 📤 Output (Solution Blueprint)
```json
{
  "blueprint_id": "bp_456",
  "agents": [
    { "role": "backend", "task": "API Design & Implementation" },
    { "role": "frontend", "task": "UI/UX Components" },
    { "role": "test", "task": "Integration Testing" }
  ],
  "workflow": "sequential | parallel | iterative",
  "global_constraints": ["no_external_apis", "use_standard_auth"]
}
```

---

## 🟦 3. Orchestrator Contract

### 📥 Input
```json
{
  "blueprint": {},
  "current_state": { "phase": "ORCHESTRATION", "completed_tasks": [] },
  "runtime_feedback": {}
}
```

### 📤 Output (Next Step)
```json
{
  "target_agent": "backend_agent_1",
  "action": "assign_task",
  "payload": { "subtask": "Implement User Module" },
  "decision": "EXECUTE | WAIT | RETRY | ESCALATE"
}
```

---

## 🟦 4. Agent Runtime Contract (Internal)

### 📥 Input (from Orchestrator)
```json
{
  "task": { "id": "task_123", "goal": "Delete temp file" },
  "context": { "last_result": "fail" }
}
```

### 📤 Output (to Orchestrator)
```json
{
  "status": "ok | fail",
  "result": { "stdout": "...", "files": [] },
  "evaluation": { "score": 0.85, "delta": "+0.1" }
}
```

---

## 🟦 5. Action Registry & Runner Contract
*(Giữ nguyên từ mô hình trước, áp dụng bên trong mỗi Agent Runtime)*

### Runner Output
```json
{
  "status": "fail",
  "result": null,
  "error": { "code": "PERMISSION_DENIED", "message": "permission denied" },
  "execution_time_ms": 120
}
```

---

## 🟦 6. Event Log Contract (CORE)
```json
{
  "evt_id": "evt_001",
  "ts": 1710000000,
  "source": "orchestrator | agent_runtime",
  "phase": "ORCHESTRATION",
  "type": "action | result | error | state_sync",
  "payload": {},
  "state_snapshot": {}
}
```

---

## 🟦 7. Incident Summary Contract
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

## 🟦 8. Gateway Contract
```json
{
  "user_input": "...",
  "task": { "id": "task_123", "goal": "..." }
}
```

---

## 🎯 End-to-End Flow Mapping (V4.7)
**User** → **Gateway** → **SAc** → **Agent Generator** → **Runtime Manager** → **Orchestrator** ↔ **Agent Runtimes (Dev/Test)** → **Event Log** → **Evaluator** → **Human**.
