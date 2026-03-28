# Action Registry

## 1. Goal
Hệ thống có những công cụ gì?
- Capability mapping: Danh sách các function/tool mà Agent được phép gọi.
- Schema verification: Ràng buộc tham số truyền vào tool.

## 2. Action Example
```json
{
  "name": "delete_file",
  "description": "Delete a file from system",
  "params_schema": { "path": "string" },
  "safe": false,
  "requires_permission": true
}
```

## 3. Maintenance
- Thêm mới action: Cần định nghĩa handler (code thực thi) và schema (quy tắc gọi).
- Phân quyền: Gắn tag cho các action nguy hiểm (unsafe).
