# Debug Guide

Ops phải làm gì khi system chết?

## 1. Checkout Event Log
Mở file log mới nhất trong .v47/logs/
- Tìm từ khóa "error" hoặc "fail".
- Xem action cuối cùng trước khi dừng.

## 2. Check Incident Summary
Đọc file summary.json được sinh ra ở folder output.
- Đọc field "human_input_required".
- Kiểm tra branch/repo có đang bị lock hoặc lỗi phân quyền không.

## 3. Common Quick Fixes
- Hết Token: Nạp thêm API key hoặc tăng limit.
- Loop mãi: Thay đổi Prompt goal để clear hơn.
- Invariant block: Kiểm tra xem agent có đang cố tình phá hoại hệ thống không (Design Drift).

## 4. Replay Mode
Muốn debug sâu?
- Chạy: v47-cli replay --log path/to/log.json
- Quan sát từng bước nhảy của agent để hiểu tại sao nó quyết định sai.
