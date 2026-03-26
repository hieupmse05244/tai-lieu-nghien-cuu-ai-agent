# Invariant Guard

## 1. Purpose
👉 **System bị chặn khi nào?**
- **Prevent unsafe actions**: Ngăn chặn xóa file hệ thống, thay đổi quyền root.
- **Design Locking**: Chặn các hành vi làm "Trôi dạt thiết kế" (Design Drift).

## 2. Rule Format
```json
{
  "rule": "NO_DELETE_SYSTEM_FILES",
  "condition": "action.type == 'delete' && file.is_internal == true",
  "action": "BLOCK"
}
```

## 3. Examples
* **API_LOCK**: Chặn thay đổi `Contract.spec.md` sau giai đoạn khởi tạo.
* **FS_SAFETY**: Chặn lệnh `rm -rf` trên các thư mục gốc.

## 4. When Triggered
- Kế hoạch từ Planner vi phạm Rule.
- Runner phát hiện lệnh thực thi nằm trong Blacklist.
- Trạng thái hệ thống lệch pha (Desync) nghiêm trọng.
