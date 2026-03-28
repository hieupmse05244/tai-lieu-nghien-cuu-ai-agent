# Event Log

## 1. Goal
Source of truth của toàn hệ thống.
- Traceability: Mọi hành động, quyết định, lỗi đều được ghi lại.
- Replayability: Khả năng tái hiện lại lỗi dựa trên chuỗi sự kiện.

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

## 3. Storage
- Hot Storage: Lưu trữ local file (.json hoặc .log) cho phiên làm việc hiện tại.
- Cold Storage: Đưa vào DB hoặc Cloud Log sau khi kết thúc task.
