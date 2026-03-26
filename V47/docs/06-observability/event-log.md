# Event Log

## 1. Purpose
👉 **System lưu lại điều gì?**
- **Single source of truth**: Lưu trữ mọi tương tác giữa các Layer.
- **Audit & Replay**: Khả năng xem lại quá trình ra quyết định.

## 2. Schema
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

## 3. Example
- Iteration 1: User Request.
- Iteration 2: Planner suggested `npm init`.
- Iteration 3: Runner executed `npm init`.
