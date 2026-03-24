# Case Study: DRS Project - Phase 01: Foundation

**Dự án**: Daily Reminder System (DRS)
**Giai đoạn**: Thiết lập nền tảng & Hạ tầng AI (Foundation & AI Infrastructure)
**Thời gian**: 2026-03-24

---

## 1. Bối cảnh (Context)
Dự án DRS được chọn làm dự án thực nghiệm đầu tiên để kiểm chứng kiến trúc **Agent Factory**. Mục tiêu là chuyển đổi từ một hệ thống tài liệu tĩnh sang một hệ sinh thái có khả năng thực thi mã nguồn tự động.

## 2. Các mốc quan trọng & Quyết định kỹ thuật

### 2.1. Phát hiện Điểm mờ (Ambiguity Detection)
- **Sự kiện**: Trước khi viết code, hệ thống kích hoạt vai trò **Ambiguity Detector**.
- **Quyết định**: Không chấp nhận các yêu cầu mơ hồ về cơ chế xác thực và logic xoay vòng.
- **Kết quả**: Làm rõ việc sử dụng **JWT Auth** và cơ chế **Unavailable Queue** cho bot Telegram.

### 2.2. Hợp đồng Thượng tầng (Contract-First)
- **Quyết định**: Thiết lập `Contract.md` là "Nguồn chân lý" về API và Schema trước khi triển khai bất kỳ dòng code nào.
- **Lợi ích**: Ngăn chặn hiện tượng **Design Drift** (trôi dạt thiết kế) khi Agent tự ý thay đổi cấu trúc bảng dữ liệu.

### 2.3. Nâng cấp Runner (LLM-Powered)
- **Tiến hóa**: Từ `runner.js` (Hard-code tasks) sang Version 2.0 (GPT-4o-mini).
- **Cơ chế**: Runner đọc hiểu `Agent-Instructions.md` và `state.json` để tự ra quyết định về lệnh shell cần thực thi.
- **Dấu mốc**: AI bắt đầu tự điều phối luồng công việc của chính mình.

### 2.4. Chuẩn hóa Cấu trúc (Standard Workspace)
- **Quyết định**: Phân tách rõ ràng giữa **Nhóm 1 (Job Docs)** tại `/docs` và **Nhóm 2 (Standards)** tại `05-Standards-Guidelines/`.
- **Cấu trúc Monorepo**: Chia nhỏ thành `/backend`, `/frontend`, `/agents/runner` với `node_modules` cô lập cho từng phần.
- **Lợi ích**: Sẵn sàng cho CI/CD độc lập và giảm thiểu xung đột dependencies.

## 3. Nhật ký Giao tiếp (Communication Log Highlights)

- **User**: "Setup runner cho tôi"
- **Agent**: Thực hiện bản hard-code đầu tiên.
- **User**: "Luồng hiện tại đã gọi LLM thực tế chưa?" -> Chất vấn tính "thông minh" của hệ thống.
- **Agent**: Thừa nhận là hard-code và đề xuất nâng cấp lên GPT-4o-mini.
- **User**: Cấp API Key và phê duyệt `npm install`.
- **Agent**: Hoàn tất Runner 2.0 và thực nghiệm thành công việc AI tự chọn task "Design Schema".
- **User**: "Tái cấu trúc thư mục..." -> Yêu cầu chuẩn hóa chuyên nghiệp.

## 4. Bài học kinh nghiệm (Lessons Learned)

1.  **Human-in-the-loop**: Giai đoạn đầu, con người đóng vai trò là lớp **Control Plane** tối cao để cấp quyền và kiểm soát rào cản an toàn.
2.  **Sự tách bạch (Isolation)**: Việc để `node_modules` ở root là sai lầm ban đầu, cần cô lập ngay từ đầu để phục vụ CI/CD.
3.  **Thứ tự ưu tiên**: Agent cần được dạy đọc "Luật pháp" (Standards) trước khi đọc "Nhiệm vụ" (Job Docs).

---
> [!NOTE]
> Case study này sẽ được sử dụng làm **Semantic Memory** để các Agent sau này không lặp lại các bước thiết lập thủ công mà có thể tự động hóa ngay từ đầu.
