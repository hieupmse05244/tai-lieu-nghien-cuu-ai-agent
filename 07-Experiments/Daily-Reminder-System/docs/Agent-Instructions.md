# [AGENT-READY] Chỉ thị Triển khai Dự án: Daily Reminder System

**Lập trình viên:** Agent Factory / Dev Monitoring  
**Dự án:** Daily Reminder & Scheduling System (Experimental Phase)  
**Ngày:** 2026-03-24  

---

## 1. Bối cảnh & Mục tiêu (Context & Goals)

- [ ] **Mô tả:** Xây dựng hệ thống tự động lập lịch và gửi thông báo nhắc nhở hàng ngày cho các nhóm làm việc. Hệ thống cho phép quản lý nhóm, công việc xoay vòng (recurring tasks) và phân công nhân sự tự động.  
- [ ] **Vị trí mã nguồn:** 
    - Backend: `07-Experiments/Daily-Reminder-System/backend/`
    - Frontend: `07-Experiments/Daily-Reminder-System/frontend/`
- [ ] **Tài liệu tham khảo (PRD / Architecture Docs):** 
    - [Daily Reminder System Contract (BẮT BUỘC)](07-Experiments/Daily-Reminder-System/Contract.md)
    - Chiến lược "Self-Evolution" - hệ thống cần tự tối ưu hóa lịch trình dựa trên phản hồi/hiệu suất hoàn thành công việc.  
- [ ] **Mục tiêu ưu tiên:** Tính chính xác của thông báo (Reliability) và khả năng mở rộng (Scalability).  
- [ ] **Người kiểm duyệt (Control Plane):** HieuPM (Human-in-the-loop)  

---

## 2. Đặc tả Kỹ thuật (Technical Specs)

- [ ] **Ngôn ngữ & Framework:**  
  - Backend: Node.js v20 + Express 5.x + Node-Cron
  - Frontend: React 18+ + Vite + Tailwind CSS
  - Bảo mật: **JWT (Json Web Token)** + Bcrypt
  - Thông báo: **Telegraf (Telegram Bot)**.  

- [ ] **Cấu trúc Thư mục được phép sửa:**  
```text
backend/src/          # Logic Backend
frontend/src/         # Logic Frontend (Vite/React)
frontend/src/components/
frontend/src/pages/
frontend/src/services/
```

- [ ] **Dependencies mới (có version cụ thể):**  
  - `node-cron@3.0.3`
  - `telegraf@4.15.3` (nếu dùng Telegram)
  - `mongoose@8.0.0`

- [ ] **Cơ sở dữ liệu / Migration:** MongoDB. Cần các Collection: `Groups`, `Tasks` (recurring: true/false), `Schedules`.  

- [ ] **Input/Output chuẩn (API):**  
  - POST `/auth/register` & `/auth/login`: Quản lý tài khoản.
  - POST `/groups`: Tạo nhóm.
  - PATCH `/groups/:id/link-telegram`: Liên kết chatId.
  - POST `/tasks`: Thêm công việc xoay vòng.
  - POST `/tasks/:id/reroll`: Trộn lại danh sách nhân sự (Random).  

---

## 3. Quy tắc & Tiêu chuẩn cho Agent (Agent Constraints)

- [ ] **Mỏ neo thiết kế (Design Anchor):** Tuyệt đối tuân thủ Schema và API tại `Contract.md`.
- [ ] **Coding Standard:** Tuân thủ BẮT BUỘC `05-Standards-Guidelines/Coding-Standards.md`  
- [ ] **Naming Convention:** camelCase cho biến, PascalCase cho class.  
- [ ] **Pattern yêu cầu:**  
  - Observer Pattern cho hệ thống thông báo.
  - Strategy Pattern cho các loại lịch trình (hàng ngày, hàng tuần, xoay vòng).  

- [ ] **Mô hình Dữ liệu & Quy trình:**  
  - Phân tầng User/Group/Task theo Schema trong `Contract.md`.
  - Cài đặt Middleware kiểm tra JWT cho mọi API bảo mật.
  - Xây dựng **Catch-up logic**: Quét và gửi bù các thông báo bị lỡ khi server khởi động lại.  

- [ ] **Validation bắt buộc:**  
  - Kiểm tra trùng lặp lịch trình.
  - Timezone handling chuẩn (UTC).  

- [ ] **Error Handling:** Log đầy đủ các trường hợp gửi thông báo thất bại để "Self-Evolution" loop xử lý retry.

---

## 4. Quy trình Thực hiện (Step-by-Step Workflow)

1.  [ ] Thiết kế Schema Database cho Group và Recurring Task.  
2.  [ ] Xây dựng module `Scheduling Engine` sử dụng `node-cron`.  
3.  [ ] Triển khai `Notification Service` (Mockup trước khi tích hợp API thật).  
4.  [ ] Xây dựng API quản lý Nhóm và Thành viên.  
5.  [ ] Viết Integration Test cho luồng: Tạo Task -> Đợi đến giờ -> Kiểm tra Trigger thông báo.  
6.  [ ] Thực hiện commit theo chuẩn `[FEAT]` và đẩy lên branch thực nghiệm.

---

## 5. Tiêu chí Nghiệm thu (Acceptance Criteria)

- [ ] Hệ thống tự động kích hoạt thông báo đúng giờ cấu hình (sai số < 1 phút).  
- [ ] Xử lý đúng các công việc xoay vòng (ví dụ: Thứ 2, 4, 6 hàng tuần).  
- [ ] Người dùng nhận được đúng nội dung công việc và danh sách người được phân công.  
- [ ] Unit test cho logic tính toán ngày tiếp theo của task xoay vòng pass 100%.  

---

## 6. Ghi chú đặc biệt (Special Notes)

- [ ] Chú trọng vào việc xử lý **Timezones** để đảm bảo thông báo gửi đúng giờ địa phương của người dùng.  
- [ ] Đây là dự án thử nghiệm "Self-evolve", vì vậy code cần được viết theo hướng dễ dàng mở rộng và can thiệp bởi các Agent khác sau này.

---

---

## 7. Sử dụng Runner (Runner Instructions)

Dự án này tích hợp một **Automated Runner** để quản lý trạng thái và kiểm tra tiến độ:
- **Tệp thực thi**: `runner.js`
- **Bộ nhớ trạng thái**: `state.json`

**Quy trình phối hợp:**
1.  Sau mỗi bước triển khai lớn, hãy chạy lệnh `node runner.js`.
2.  Kiểm tra `state.json` để xác nhận các task đã được ghi nhận hoàn thành (`completed_tasks`).
3.  Runner sẽ tự động thực hiện các lệnh "Check" để đảm bảo source code đã được sinh ra và hợp lệ.

---

> [!TIP]  
> **Hướng dẫn cho Agent:** Hãy tập trung vào module `Scheduling Engine`. Đây là trái tim của hệ thống. Nếu có bất kỳ sự mơ hồ nào về cách tính toán "xoay vòng" (rotation logic), hãy hỏi Control Plane trước khi triển khai.
