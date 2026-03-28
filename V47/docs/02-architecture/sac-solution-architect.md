# SAc – Solution Architect

SAc là thành phần cốt lõi trong Agent Factory, chịu trách nhiệm tiếp nhận yêu cầu từ người dùng và chuyển đổi chúng thành một bản thiết kế (Solution Blueprint) chi tiết cho các Agent Runtime.

## 1. Trách nhiệm (Responsibility)
- Phân tích yêu cầu (Analyze Task): Hiểu đúng mục tiêu và phạm vi của người dùng (User Intent).
- Thiết kế giải pháp (Design Blueprint): Quyết định:
    - Cần bao nhiêu Agent chuyên biệt.
    - Vai trò và nhiệm vụ cụ thể của từng Agent.
    - Cấu trúc và luồng làm việc tổng thể (Workflow).
- Bản vẽ thiết kế (Solution Blueprint): Chốt cấu trúc hệ thống và giao tiếp trước khi sinh ra Agent.

## 2. Dữ liệu vào/ra (Input / Output)

### 📥 Dữ liệu vào (Input)
- User Intent: Yêu cầu dưới dạng ngôn ngữ tự nhiên (ví dụ: "Xây dựng hệ thống quản lý tài nguyên tập trung").
- Context: Thông tin về hạ tầng, ngôn ngữ lập trình, ràng buộc kỹ thuật.

### 📤 Dữ liệu ra (Output)
- Solution Blueprint: Một bản kế hoạch chi tiết chứa:
    - Agent List: Danh sách các Agent cần sinh ra (ví dụ: Backend Agent, Frontend Agent, Test Agent).
    - Workflow: Cách các Agent phối hợp với nhau.
    - Config Specs: Các thông số cấu hình và Prompt ban đầu cho từng tác nhân.

## 3. Quy trình hoạt động (Logic Flow)
1. Analyze: Nhận yêu cầu và bối cảnh.
2. Strategy: Suy luận phương án thực thi (LLM-based).
3. Decompose: Chia nhỏ thành các nhiệm vụ độc lập hoặc tuần tự.
4. Draft: Tạo Solution Blueprint gửi sang Agent Generator.

## 4. Đặc điểm cốt lõi (Core Principles)
* Separation of Strategy and Tactics: SAc chỉ lo về chiến lược tổng thể, không lo về từng dòng mã nguồn cụ thể (đó là việc của Agent Runtime).
* LLM-Powered Decision: SAc tận dụng khả năng suy luận mạnh mẽ của LLM để thiết kế kiến trúc.
* Blueprint Consistency: Đảm bảo tất cả các Agent được sinh ra đều thống nhất về mặt thiết kế ban đầu.
