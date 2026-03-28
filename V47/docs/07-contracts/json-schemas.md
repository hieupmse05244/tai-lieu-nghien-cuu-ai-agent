# JSON Schemas - V4.7 Agent Factory

Bộ JSON schema (production-ready) cho hệ thống V4.7.
Thiết kế theo nguyên tắc: Strict contract, Composable, Versionable, và Runtime-safe.

---

## 1. Base Envelope (Dùng chung toàn hệ thống)
Mọi message trao đổi giữa các thành phần đều được bọc trong Envelope này.

```json
{
  "$id": "base.envelope.schema.json",
  "type": "object",
  "required": ["id", "type", "timestamp"],
  "properties": {
    "id": { "type": "string" },
    "type": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "trace_id": { "type": "string" },
    "source": { "type": "string" },
    "payload": { "type": "object" },
    "metadata": { "type": "object", "additionalProperties": true }
  }
}
```

---

## 2. Agent Definition Schema (Core của Factory)
Định nghĩa danh tính, khả năng và cấu hình của một Agent.

```json
{
  "$id": "agent.definition.schema.json",
  "type": "object",
  "required": ["name", "version", "goal", "capabilities"],
  "properties": {
    "name": { "type": "string" },
    "version": { "type": "string" },
    "goal": { "type": "string" },
    "description": { "type": "string" },
    "capabilities": {
      "type": "array",
      "items": { "type": "string" }
    },
    "tools": {
      "type": "array",
      "items": { "$ref": "#/definitions/tool" }
    },
    "policies": {
      "$ref": "#/definitions/policies"
    },
    "memory_config": {
      "$ref": "#/definitions/memory"
    },
    "planner_config": {
      "$ref": "#/definitions/planner"
    },
    "execution_config": {
      "$ref": "#/definitions/execution"
    }
  },
  "definitions": {
    "tool": {
      "type": "object",
      "required": ["name", "action"],
      "properties": {
        "name": { "type": "string" },
        "action": { "type": "string" },
        "timeout_ms": { "type": "number" }
      }
    },
    "policies": {
      "type": "object",
      "properties": {
        "max_steps": { "type": "number" },
        "retry_limit": { "type": "number" },
        "allowed_actions": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },
    "memory": {
      "type": "object",
      "properties": {
        "type": { "enum": ["none", "short_term", "long_term"] },
        "ttl_seconds": { "type": "number" }
      }
    },
    "planner": {
      "type": "object",
      "properties": {
        "strategy": { "enum": ["llm", "rule_based", "hybrid"] },
        "model": { "type": "string" }
      }
    },
    "execution": {
      "type": "object",
      "properties": {
        "mode": { "enum": ["sync", "async"] }
      }
    }
  }
}
```

---

## 3. Plan Schema (DAG-ready)
Lộ trình thực hiện nhiệm vụ của Agent.

```json
{
  "$id": "plan.schema.json",
  "type": "object",
  "required": ["goal", "steps"],
  "properties": {
    "goal": { "type": "string" },
    "steps": {
      "type": "array",
      "items": { "$ref": "#/definitions/step" }
    }
  },
  "definitions": {
    "step": {
      "type": "object",
      "required": ["id", "action"],
      "properties": {
        "id": { "type": "string" },
        "action": { "type": "string" },
        "input": { "type": "object" },
        "depends_on": {
          "type": "array",
          "items": { "type": "string" }
        },
        "retry_policy": {
          "type": "object",
          "properties": {
            "max_retries": { "type": "number" }
          }
        }
      }
    }
  }
}
```

---

## 4. Action Contract (Execution Layer)
Định dạng lệnh gửi đến Runner.

```json
{
  "$id": "action.schema.json",
  "type": "object",
  "required": ["action", "input"],
  "properties": {
    "action": { "type": "string" },
    "input": { "type": "object" }
  }
}
```

---

## 5. Action Result Schema
Kết quả trả về sau khi thực hiện Action.

```json
{
  "$id": "action.result.schema.json",
  "type": "object",
  "required": ["status"],
  "properties": {
    "status": { "enum": ["success", "failure"] },
    "output": { "type": "object" },
    "error": {
      "type": "object",
      "properties": {
        "code": { "type": "string" },
        "message": { "type": "string" }
      }
    }
  }
}
```

---

## 6. Evaluator Schema
Đánh giá mức độ hoàn thành và quyết định bước tiếp theo.

```json
{
  "$id": "evaluator.schema.json",
  "type": "object",
  "required": ["decision"],
  "properties": {
    "score": { "type": "number" },
    "decision": {
      "enum": ["continue", "retry", "fail", "complete"]
    },
    "reason": { "type": "string" }
  }
}
```

---

## 7. Invariant Guard Schema
Kết quả kiểm tra tính an toàn của Action.

```json
{
  "$id": "guard.schema.json",
  "type": "object",
  "required": ["valid"],
  "properties": {
    "valid": { "type": "boolean" },
    "violations": {
      "type": "array",
      "items": { "type": "string" }
    }
  }
}
```

---

## 8. Agent State Schema
Trạng thái Runtime của một Agent.

```json
{
  "$id": "agent.state.schema.json",
  "type": "object",
  "properties": {
    "context": { "type": "object" },
    "history": {
      "type": "array",
      "items": { "type": "object" }
    },
    "current_plan": { "$ref": "plan.schema.json" },
    "current_step": { "type": "string" },
    "status": {
      "enum": ["idle", "running", "paused", "completed", "failed"]
    }
  }
}
```

---

## 9. SAc Output Schema (Meta-level)
Kết quả thiết kế hệ thống đa tác nhân (Multi-Agent).

```json
{
  "$id": "sac.output.schema.json",
  "type": "object",
  "required": ["agents", "workflow"],
  "properties": {
    "agents": {
      "type": "array",
      "items": { "$ref": "agent.definition.schema.json" }
    },
    "workflow": {
      "$ref": "#/definitions/workflow"
    }
  },
  "definitions": {
    "workflow": {
      "type": "object",
      "properties": {
        "nodes": {
          "type": "array",
          "items": { "type": "string" }
        },
        "edges": {
          "type": "array",
          "items": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    }
  }
}
```

---

## 10. Inter-Agent Message Schema
Trao đổi thông tin giữa các Agent.

```json
{
  "$id": "agent.message.schema.json",
  "type": "object",
  "required": ["from", "to", "payload"],
  "properties": {
    "from": { "type": "string" },
    "to": { "type": "string" },
    "payload": { "type": "object" },
    "type": { "type": "string" }
  }
}
```

---

## 11. Event Log Schema (Observability)
Dữ liệu log phục vụ theo dõi và phân tích.

```json
{
  "$id": "event.log.schema.json",
  "type": "object",
  "required": ["timestamp", "agent", "event_type"],
  "properties": {
    "timestamp": { "type": "string", "format": "date-time" },
    "agent": { "type": "string" },
    "event_type": { "type": "string" },
    "data": { "type": "object" }
  }
}
```

---

## 12. Runtime Command Schema (ControlPlane → Agent)
Lệnh điều khiển vòng đời Agent.

```json
{
  "$id": "runtime.command.schema.json",
  "type": "object",
  "required": ["command"],
  "properties": {
    "command": {
      "enum": ["start", "pause", "resume", "stop"]
    },
    "agent_id": { "type": "string" }
  }
}
```
