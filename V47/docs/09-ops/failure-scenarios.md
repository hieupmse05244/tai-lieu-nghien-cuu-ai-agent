# Failure Scenarios

## 1. Permission Denied
- Runner cố thực thi lệnh ngoài phạm vi sandbox.
- Fix: Cấp quyền hoặc thay đổi action.

## 2. Timeout
- Cài đặt dependency quá lâu hoặc script treo.
- Fix: Tối ưu runner resource hoặc tăng timeout.

## 3. Infinite Loop
- AI lặp lại 1 action mà kết quả không đổi.
- Fix: Read Incident Summary -> Manual Override.

## 4. Invalid Action
- Planner đề xuất action sai schema.
- Fix: Update Action Registry hoặc Planner Prompt.
