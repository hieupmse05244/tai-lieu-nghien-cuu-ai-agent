# Hệ thống Tài liệu Agent Factory - Knowledge Base

Chào mừng bạn đến với kho lưu trữ tài liệu nghiên cứu, thiết kế và thực thi dự án **Agent Factory**. Thư mục này phục vụ việc lưu trữ tri thức và triển khai các dự án thử nghiệm (PoC) của hệ thống.

## 📂 Danh mục tài liệu

### 📔 [01 - Nghiên cứu (Research)](01-Research/)
Lưu trữ các báo cáo nghiên cứu ban đầu, tìm hiểu về công nghệ và đánh giá tính khả thi.
- [Giai đoạn 1: Nghiên cứu nền tảng](01-Research/Phase-01-Foundation/Introduction.md)

### 🏗️ [02 - Kiến trúc (Architecture)](02-Architecture/)
Kiến trúc tổng thể và các thành phần cốt lõi của hệ thống.
- [Control Plane Design (Tháp điều phối)](02-Architecture/Control-Plane-Design.md)
- [Memory System Architecture (Hệ thống bộ nhớ)](02-Architecture/Memory-Architecture.md)
- [Hierarchical Planner Spec (Bộ lập hoạch phân tầng)](02-Architecture/Hierarchical-Planner.md)
- [Whitepapers & Design Docs](02-Architecture/Whitepapers/)

### 🚀 [03 - Đặc tả triển khai (Implementation Specs)](03-Implementation-Specs/)
Hướng dẫn chi tiết cho các Agent thực hiện nhiệm vụ cụ thể.
- [Agent Implementation Guide (Hướng dẫn triển khai)](03-Implementation-Specs/Agent-Implementation-Guide.md)
- [Agent Implementation Template (AGENT-READY)](03-Implementation-Specs/Agent-Implementation-Template.md)
- [Evaluator Scoring Engine (Bộ chấm điểm)](03-Implementation-Specs/Evaluator-Scoring-Engine.md)
- [Agent Schema Definition (Định nghĩa Agent)](03-Implementation-Specs/Agent-Schema-Definition.md)
- [Core Engine Specs](03-Implementation-Specs/Core-Engine/)
- [Agent Configs & Prompts](03-Implementation-Specs/Agent-Configs/)

### 💡 [04 - Case Studies](04-Case-Studies/)
Tổng kết kinh nghiệm thực tế từ các dự án cụ thể.
- [AHV Project Analysis](04-Case-Studies/AHV-Project/Analysis.md)

### 📏 [05 - Tiêu chuẩn & Quy trình (Standards)](05-Standards-Guidelines/)
Bộ quy tắc bắt buộc cho các Agent để đảm bảo chất lượng.
- [Project Structure (Cấu trúc thư mục)](05-Standards-Guidelines/Project-Structure-Standard.md)
- [Coding Standards (Tiêu chuẩn lập trình)](05-Standards-Guidelines/Coding-Standards.md)
- [Ambiguity Detector (Phân tích điểm mờ)](05-Standards-Guidelines/Ambiguity-Detector-Standard.md)
- [Best Practices (Kinh nghiệm tốt nhất)](05-Standards-Guidelines/Best-Practices.md)

### 📱 [06 - Ứng dụng (Applications)](06-Applications/)
Tài liệu về các ứng dụng được xây dựng từ Factory.

### 🧪 [07 - Thực nghiệm (Experiments)](07-Experiments/)
Danh mục các dự án thử nghiệm và sinh mã nguồn tự động.
- **Daily Reminder System (DRS)**:
    - [Agent Instructions (Chỉ thị)](07-Experiments/Daily-Reminder-System/Agent-Instructions.md)
    - [API/DB Contract (Hợp đồng)](07-Experiments/Daily-Reminder-System/Contract.md)
    - [PRD (Yêu cầu sản phẩm)](07-Experiments/Daily-Reminder-System/PRD.md)
    - [User Flow (Luồng người dùng)](07-Experiments/Daily-Reminder-System/User-Flow.md)

---
> [!TIP]
> Bạn nên bắt đầu từ mục **01 - Research** để hiểu về lộ trình và các nghiên cứu nền tảng trước khi đi sâu vào chi tiết kiến trúc.
