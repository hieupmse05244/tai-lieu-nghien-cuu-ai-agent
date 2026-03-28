# Agent Factory Components

👉 **“Bộ phận vận hành Meta-System”**

Agent Factory Layer không chỉ có SAc mà còn có các thành phần quan trọng khác để biến bản thiết kế (Blueprint) thành các thực thể Agent thực thi.

## 1. Agent Generator
👉 **“Compiler của Agent Factory”**

Thành phần này chịu trách nhiệm sinh mã (Generation) cho các Agent Runtime dựa trên Solution Blueprint từ SAc.

- **📥 Input**: Blueprint của SAc.
- **📤 Output**: Agent Definition (Bao gồm: Prompt, Tools/Actions, Config, Policies).
- **Nghiệp vụ**: Chuyển đổi các yêu cầu cấu trúc thành các định nghĩa Agent có thể thực thi được.

## 2. Agent Registry
👉 **“Source of Truth (Kho tri thức của Agent)”**

Nơi lưu trữ tất cả các định nghĩa Agent đã được sinh ra để quản lý và tái sử dụng.

- **Lưu trữ**: Agent Definitions, Versions, Metadata.
- **Nhiệm vụ**: Đảm bảo tính nhất quán (Consistency) của Agent trước khi chúng được khởi tạo môi trường (Provisioning).

## 3. Runtime Manager
👉 **“Cơ sở hạ tầng của AI (Infrastructure Layer)”**

Quản lý việc khởi tạo và kết thúc các môi trường Agent Runtime.

- **Nhiệm vụ**: 
    - Khởi tạo (Spin up) các môi trường isolated cho Agent.
    - Phân bổ tài nguyên (Resource allocation).
    - Hủy bỏ (Destroy) môi trường khi Agent đã hoàn thành nhiệm vụ.
- **Đặc tính**: Co dãn (Scalable) và cô lập (Isolated).

## 4. Multi-Agent Orchestrator
👉 **“Điều phối sự hiệp tác (Coordination Layer)”**

Thành phần chịu trách nhiệm điều khiển luồng giao tiếp và cộng tác giữa các Agent đã được khởi tạo.

- **Nhiệm vụ**:
    - Định tuyến nhiệm vụ (Task Routing).
    - Phối hợp đồng bộ (Sync) hoặc bất đồng bộ (Async) giữa các Agent.
    - Tổng hợp kết quả (Result Aggregation) từ các Agent khác nhau để trả về kết quả cuối cùng.
- **Ví dụ**: Điều phối quy trình Dev Agent lập trình xong gửi sang Test Agent kiểm duyệt.

---

## 🏗️ Nguyên tắc chung (Factory Principles)
- **Separation of Strategy and Tactics**: Factory chỉ lo về chiến lược và thiết kế, không lo về thực thi chi tiết.
- **Agent = Disposable**: Agent runtime là vật tiêu hao, được sinh ra và hủy đi sau khi xong nhiệm vụ (Stateless).
- **Everything is Config**: Mọi thứ về Agent đều phải được cấu hình hóa trong Registry, không hardcode logic điều khiển.
- **Observable by Default**: Mọi hành động của Factory đều phải được ghi log (Event Log) để có thể quan sát và replay.
