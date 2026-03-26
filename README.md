# Hệ thống tài liệu Agent Factory - Knowledge Base

Tài liệu nghiên cứu, thiết kế và thực thi dự án Agent Factory. Thư mục này phục vụ việc lưu trữ tri thức và triển khai các dự án thực nghiệm của hệ thống.

## Danh mục tài liệu

### 📔 [01 - Nghiên cứu (Research)](01-Research/)
Báo cáo nghiên cứu ban đầu, tìm hiểu công nghệ và đánh giá tính khả thi.
- [Giai đoạn 1: Nghiên cứu nền tảng](01-Research/Phase-01-Foundation/Introduction.md)

### 🏗️ [02 - Kiến trúc (Architecture)](02-Architecture/)
Kiến trúc tổng thể và các thành phần cốt lõi của hệ thống.
- [Control Plane Design (Điều phối)](02-Architecture/Control-Plane-Design.md)
- [Self-Evolution Model (Mô hình tự tiến hóa)](02-Architecture/Self-Evolution-Model.md)
- [Memory System Architecture (Hệ thống bộ nhớ)](02-Architecture/Memory-Architecture.md)
- [Hierarchical Planner Spec (Bộ lập hoạch phân tầng)](02-Architecture/Hierarchical-Planner.md)

### 🚀 [03 - Đặc tả triển khai (Implementation Specs)](03-Implementation-Specs/)
Hướng dẫn chi tiết cho các tác nhân thực hiện nhiệm vụ cụ thể.
- [Agent Implementation Guide (Hướng dẫn triển khai)](03-Implementation-Specs/Agent-Implementation-Guide.md)
- [Agent Implementation Template (Agent Ready)](03-Implementation-Specs/Agent-Implementation-Template.md)
- [BA Agent Specs (Đặc tả BA Agent)](03-Implementation-Specs/Agent-Configs/BA-Agent-Specs.md)
- [SAc Agent Specs (Đặc tả SAc Agent)](03-Implementation-Specs/Agent-Configs/Solution-Architect-Agent.spec.md)
- [QC Group Specs (Nhóm QC)](03-Implementation-Specs/Agent-Configs/QC-Group-Specs.md)
- [Agent Schema Definition (Định nghĩa Agent)](03-Implementation-Specs/Agent-Schema-Definition.md)

### 💡 [04 - Case Studies](04-Case-Studies/)
Tổng kết kinh nghiệm thực tế từ các dự án cụ thể.
- [Phân tích dự án AHV](04-Case-Studies/AHV-Project/Analysis.md)
- [Dự án DRS - Nhật ký thực thi nền tảng](04-Case-Studies/DRS-Project/Foundation-Execution-Log.md)
- [Dự án DRS - Báo cáo tổng quan](04-Case-Studies/DRS-Project/Overview-Report.md)
- [Dự án DRS - Kiểm tra bảo mật](04-Case-Studies/DRS-Project/Security-Audit.md)

### 📏 [05 - Tiêu chuẩn & Quy trình (Standards)](05-Standards-Guidelines/)
Bộ quy tắc quy định cho các tác nhân để đảm bảo chất lượng.
- [Cấu trúc thư mục](05-Standards-Guidelines/Project-Structure.standard.md)
- [Tiêu chuẩn loại trừ tệp](05-Standards-Guidelines/Ignore-Files.standard.md)
- [Tiêu chuẩn Backend](05-Standards-Guidelines/Backend.standard.md)
- [Phân tích điểm mờ](05-Standards-Guidelines/Ambiguity-Detector.standard.md)
- [Tiêu chuẩn Frontend](05-Standards-Guidelines/Frontend.standard.md)
- [Kiểm soát chất lượng](05-Standards-Guidelines/Quality-Control.standard.md)

### 🧪 [07 - Thực nghiệm (Experiments)](07-Experiments/)
Danh mục các dự án thử nghiệm và sinh mã nguồn tự động.

#### Daily Reminder System (DRS)
Dự án thực nghiệm đầu tiên áp dụng kiến trúc Agent Factory.
- **Hạ tầng AI**: Sử dụng công cụ runner tự động để thực thi lệnh và quản lý trạng thái.
- [Chỉ thị tác nhân](07-Experiments/Daily-Reminder-System/docs/Agent-Instructions.md)
- [Yêu cầu sản phẩm (PRD)](07-Experiments/Daily-Reminder-System/docs/PRD.spec.md)
- [Hợp đồng API/DB (Contract)](07-Experiments/Daily-Reminder-System/docs/Contract.spec.md)
- [Luồng người dùng (User Flow)](07-Experiments/Daily-Reminder-System/docs/User-Flow.spec.md)

---
> [!TIP]
> Các tác nhân cần tham chiếu tài liệu trong mục **05 - Tiêu chuẩn & Quy trình** trước khi thực hiện để đảm bảo tính nhất quán.
