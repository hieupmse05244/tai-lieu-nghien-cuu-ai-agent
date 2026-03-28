# Runner

## 1. Responsibility
Action được execute như thế nào?
- Execute actions: Thực thi các lệnh atomic (bash, write file, npm).
- Tool provider: Cung cấp interface cho các công cụ hệ thống.

## 2. Flow
- Receive action: Nhận từ Agent Controller sau khi qua Guard.
- Validate: Đối soát với Action Registry.
- Execute: Chạy lệnh và capture output/errors.
- Return result: Trả về raw output cho Event Log.

## 3. Output
```json
{
  "status": "fail",
  "result": null,
  "error": { "code": "PERMISSION_DENIED", "message": "permission denied" },
  "execution_time_ms": 120
}
```
