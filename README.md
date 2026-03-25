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

### 🚀 [03 - Đặc tả triển khai (Implementation Specs)](03-Implementation-Specs/)
Hướng dẫn chi tiết cho các Agent thực hiện nhiệm vụ cụ thể.
- [Agent Implementation Guide (Hướng dẫn triển khai)](03-Implementation-Specs/Agent-Implementation-Guide.md)
- [Agent Implementation Template (AGENT-READY)](03-Implementation-Specs/Agent-Implementation-Template.md)
- [Evaluator Scoring Engine (Bộ chấm điểm)](03-Implementation-Specs/Evaluator-Scoring-Engine.md)
- [Agent Schema Definition (Định nghĩa Agent)](03-Implementation-Specs/Agent-Schema-Definition.md)

### 💡 [04 - Case Studies](04-Case-Studies/)
Tổng kết kinh nghiệm thực tế từ các dự án cụ thể.
- [AHV Project Analysis](04-Case-Studies/AHV-Project/Analysis.md)
- [DRS Project - Foundation Execution Log](04-Case-Studies/DRS-Project/Foundation-Execution-Log.md)

### 📏 [05 - Tiêu chuẩn & Quy trình (Standards)](05-Standards-Guidelines/)
Bộ quy tắc bắt buộc cho các Agent để đảm bảo chất lượng.
- [Project Structure (Cấu trúc thư mục)](05-Standards-Guidelines/Project-Structure.standard.md)
- [Ignore Files (Tiêu chuẩn loại trừ tệp)](05-Standards-Guidelines/Ignore-Files.standard.md)
- [Coding Standards (Tiêu chuẩn lập trình)](05-Standards-Guidelines/Coding.standard.md)
- [Ambiguity Detector (Phân tích điểm mờ)](05-Standards-Guidelines/Ambiguity-Detector.standard.md)
- [Frontend Standard (Tiêu chuẩn Frontend)](05-Standards-Guidelines/Frontend.standard.md)
- [Quality Control (Kiểm soát chất lượng)](05-Standards-Guidelines/Quality-Control.standard.md)

### 🧪 [07 - Thực nghiệm (Experiments)](07-Experiments/)
Danh mục các dự án thử nghiệm và sinh mã nguồn tự động.

#### **Daily Reminder System (DRS)**
Dự án thực nghiệm đầu tiên áp dụng kiến trúc Agent Factory hoàn chỉnh.
- **AI Infrastructure**: Sử dụng **LLM-Powered Runner v2.0** (hỗ trợ GPT-4o-mini) để tự động hóa lệnh shell và quản lý trạng thái qua `state.json`.
- [Agent Instructions (Chỉ thị)](07-Experiments/Daily-Reminder-System/docs/Agent-Instructions.md)
- [PRD (Yêu cầu sản phẩm)](07-Experiments/Daily-Reminder-System/docs/PRD.spec.md)
- [Contract (Hợp đồng API/DB)](07-Experiments/Daily-Reminder-System/docs/Contract.spec.md)
- [User Flow (Luồng người dùng)](07-Experiments/Daily-Reminder-System/docs/User-Flow.spec.md)

---
> [!TIP]
> Agent nên đọc các tệp trong **05 - Tiêu chuẩn & Quy trình** trước khi bắt đầu bất kỳ nhiệm vụ thực thi nào để đảm bảo tính nhất quán của hệ thống.
