# Action Registry

## 1. Purpose
👉 **System biết action nào hợp lệ?**
- **Define allowed actions**: Danh sách trắng (Whitelist) các lệnh AI được phép dùng.
- **Map to handlers**: Kết nối tên action với code thực thi.

## 2. Schema
```json
{
  "name": "write_file",
  "params": { "path": "string", "content": "string" },
  "handler": "lib/fs/write.js"
}
```

## 3. Validation Rules
- Type checking cho parameters.
- Path sanitization (ngăn chặn directory traversal).
- Required fields enforcement.
