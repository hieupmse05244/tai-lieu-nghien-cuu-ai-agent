# User Flow: Daily Reminder System (DRS) - Bản Cập nhật

Tài liệu này mô tả các luồng tương tác đã được bổ sung cơ chế Auth và Rotation nâng cao.

## 1. Luồng Xác thực & Khởi tạo (Auth & Setup)

```mermaid
sequenceDiagram
    participant User
    participant App as App API
    participant Bot as Telegram Bot

    User->>App: Đăng ký / Đăng nhập
    App-->>User: Trả về JWT Token

    User->>App: Tạo Group (Gửi kèm Token)
    App-->>User: Group ID: X

    User->>Bot: Thêm Bot vào Telegram Group
    Bot->>User: Yêu cầu Link Code (ví dụ: /link_group_X)
    User->>Bot: Gửi mã xác nhận
    Bot->>App: Cập nhật telegramChatId cho Group X
```

## 2. Luồng Xoay vòng với Skip Logic (Advanced Rotation)

Mô tả cách hệ thống chọn người phụ trách khi có thành viên vắng mặt.

```mermaid
graph TD
    Start["Đến giờ Notify"] --> Check["Lấy member tại rotationIndex"]
    Check --> Status{"Có trong unavailableMembers?"}
    
    Status -- "Có" --> Next["Tăng rotationIndex (Bỏ qua)"]
    Next --> Check
    
    Status -- "Không" --> Notify["Gửi thông báo Tag Tên"]
    Notify --> Update["Tăng rotationIndex cho lần sau"]
    Update --> Finish["Kết thúc"]
```

## 3. Luồng Gửi thông báo Bù (Catch-up Flow)

```mermaid
graph LR
    Boot["Server Khởi động lại"] --> Scan["Quét Log Thông báo 24h qua"]
    Scan --> Check{"Có task nào Missed?"}
    Check -- "Có" --> Send["Gửi thông báo Bù (Late Tag)"]
    Send --> Log["Ghi log Success"]
    Check -- "Không" --> Idle["Chờ Cron Job kế tiếp"]
```

---
> [!TIP]
> **Đặc biệt lưu ý**: Luồng **Bot Link** là bước quan trọng nhất để đảm bảo Bot có quyền tương tác với nhóm Telegram. Hãy đảm bảo Agent cài đặt Middleware kiểm tra JWT cho mọi Endpoint trong Luồng 1.
