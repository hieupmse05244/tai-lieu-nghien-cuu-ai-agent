# Hệ thống AI Agent Factory: Bản tổng hợp nghiên cứu & Kinh nghiệm thực tế

Tài liệu này định hình tư duy và kiến trúc cốt lõi để xây dựng một Agent Factory - hệ thống meta có khả năng sinh, quản trị và tự nâng cấp các AI Agent.

---

## Mục lục (Table of Contents)
- [1. Bản chất bài toán](#1-bản-chất-bài-toán)
- [2. Kiến trúc tổng thể (High-level Architecture)](#2-kiến-trúc-tổng-thể-high-level-architecture)
- [3. Khái niệm cốt lõi: Config-driven everything](#3-khái-niệm-cốt-lõi-config-driven-everything)
- [4. Định nghĩa AI Agent (Agent Schema)](#4-định-nghĩa-ai-agent-agent-schema)
- [5. Các Agent cần thiết (Phiên bản 1)](#5-các-agent-cần-thiết-phiên-bản-1)
- [6. Động cơ quy trình (Workflow Engine)](#6-động-cơ-quy-trình-workflow-engine)
- [7. Control Plane (Lớp điều phối & Quản trị) - [Mới]](#7-control-plane-lớp-điều-phối--quản-trị---mới)
- [8. Runner (Bộ thực thi)](#8-runner-bộ-thực-thi)
- [9. Bộ lập hoạch (Planner) - [Nâng cấp: Hierarchical]](#9-bộ-lập-hoạch-planner---nâng-cấp-hierarchical)
- [10. Hệ thống bộ nhớ (Memory System) - [Nâng cấp: Trí tuệ sai lầm]](#10-hệ-thống-bộ-nhớ-memory-system---nâng-cấp-trí-tuệ-sai-lầm)
- [11. Bộ đánh giá (Evaluator) - [Nâng cấp: Phân tầng chỉ số]](#11-bộ-đánh-giá-evaluator---nâng-cấp-phân-tầng-chỉ-số)
- [12. Vòng lặp tự học (Self-Evolution Loop)](#12-vòng-lặp-tự-học-self-evolution-loop)
- [13. Các quy tắc thực chiến (Best Practices)](#13-các-quy-tắc-thực-chiến-best-practices)
- [14. Lộ trình phát triển nâng cao (The Ultimate Roadmap)](#14-lộ-trình-phát-triển-nâng-cao-the-ultimate-roadmap)
  - [14.1. Tổng quan lộ trình](#141-tổng-quan-lộ-trình)
  - [14.2. Chi tiết từng giai đoạn](#142-chi-tiết-từng-giai-đoạn)
- [15. Lịch trình thực hiện dự kiến](#15-lịch-trình-thực-hiện-dự-kiến)
- [16. Các mốc quan trọng (Milestones)](#16-các-mốc-quan-trọng-milestones)
- [17. Lưu ý thực tế (Reality Check)](#17-lưu-ý-thực-tế-reality-check)
- [18. Công cụ công nghệ gợi ý (Tech Stack)](#18-công-cụ-công-nghệ-gợi-ý-tech-stack)
- [19. Tầm nhìn dài hạn](#19-tầm-nhìn-dài-hạn)
- [20. Tổng kết kinh nghiệm thực chiến (Lessons Learned)](#20-tổng-kết-kinh-nghiệm-thực-chiến-lessons-learned)
  - [20.1. Cấu hình hệ thống hướng tới Autonomous Agent (Tiến hóa Phase 2+)](#201-cấu-hình-hệ-thống-hướng-tới-autonomous-agent-tiến-hóa-phase-2)
  - [20.2. So sánh Trạng thái thực tế (Dự án AHV) với Mô hình Nâng cấp](#202-so-sánh-trạng-thái-thực-tế-dự-án-ahv-với-mô-hình-nâng-cấp)
- [21. Thuật ngữ cốt lõi & Từ khóa ấn tượng (Core Keywords)](#21-thuật-ngữ-cốt-lõi--từ-khóa-ấn-tượng-core-keywords)
  - [21.1. Nhóm từ khóa vận hành hệ thống](#211-nhóm-từ-khóa-vận-hành-hệ-thống)
  - [21.2. Nhóm từ khóa "Thực chiến"](#212-nhóm-từ-khóa-thực-chiến)
  - [21.3. Hướng nghiên cứu & Triển khai tương lai](#213-hướng-nghiên-cứu--triển-khai-tương-lai)

---

## 1. Bản chất bài toán
Hệ thống này không đơn thuần là một hệ thống AI Agent thông thường. Đây là một Meta-System (Hệ thống của các hệ thống).

- **Không phải**: Hardcode các Agent để làm việc.
- **Là**: Một nhà máy (Factory) có khả năng tạo ra đội ngũ Agent theo yêu cầu và hướng dẫn chúng tự tiến hóa.

### Phân tầng kiến trúc (V4.7)
1.  **Control Layer (Xác thực)**: Điều phối vòng lặp và đảm bảo quy tắc bất biến.
2.  **Planning Layer (Gợi ý)**: Hỗ trợ từ AI để đề xuất hành động.
3.  **Execution Layer (Thực thi)**: Thực hiện các thao tác vật lý.
4.  **Observability Layer (Quan sát)**: Lưu trữ và phân tích nhật ký sự kiện.
5.  **Human Layer (Giám sát)**: Can thiệp cấp cao dựa trên báo cáo tóm tắt.

> [!NOTE]
> Ghi chú thực tế (Dự án AHV): Việc thiết lập Layer 3 là khó nhất. Nếu không có cơ chế đánh giá thành công thông minh, hệ thống sẽ bị kẹt trong vòng lặp vô tận. Kiến trúc Control Plane ra đời để dự kiến giải quyết chính xác bài toán điều phối vòng lặp này.

---

## 2. Kiến trúc tổng thể (High-level Architecture)

Để hình dung cách hệ thống vận hành như một "Nhà máy phần mềm", dưới đây là sơ đồ kết nối giữa các thành phần cốt lõi:

```mermaid
flowchart TD

    User --> Gateway

    subgraph Control_Layer["Lớp điều phối (Deterministic Core)"]
        ControlPlane["Control Plane"]
        Evaluator["Evaluator"]
        InvariantGuard["Invariant Guard"]
    end

    subgraph Planning_Layer["Lớp lập kế hoạch (Heuristic / LLM-assisted)"]
        Planner["Planner"]
    end

    subgraph Execution_Layer["Lớp thực thi (Deterministic)"]
        Runner["Runner"]
        ActionRegistry["Action Registry"]
    end

    subgraph Observability_Layer["Lớp quan sát (Observability)"]
        EventLog["Event Log"]
        SummaryEngine["Summary Engine"]
    end

    Gateway --> ControlPlane
    ControlPlane --> Planner
    Planner --> ControlPlane
    ControlPlane --> Runner
    Runner --> ActionRegistry
    Runner --> EventLog
    Planner --> EventLog
    ControlPlane --> EventLog
    EventLog --> Evaluator
    Evaluator --> ControlPlane
    EventLog --> InvariantGuard
    InvariantGuard --> ControlPlane
    EventLog --> SummaryEngine
    SummaryEngine --> Human["Human / HITL"]
    Human --> Gateway
```

> [!TIP]
> Thông tin quan trọng: Control Plane đóng vai trò là cơ quan điều phối chính. Planner cung cấp phương án đề xuất, trong khi Evaluator cung cấp dữ liệu kiểm soát. Quyết định cuối cùng thuộc về Control Plane.

### Cấu trúc lưu trữ tài liệu chuẩn
```text
/
 ├── 01-Research/               # Các giai đoạn nghiên cứu (Phase-based)
 ├── 02-Architecture/            # Kiến trúc tổng thể và Whitepapers
 ├── 03-Implementation-Specs/    # Tài liệu đặc tả kỹ thuật triển khai
 ├── 04-Case-Studies/            # Các bài học kinh nghiệm thực tế
 ├── 05-Standards-Guidelines/    # Tiêu chuẩn và Quy trình
 └── 06-Applications/            # Tài liệu về các ứng dụng thực tế
```

> [!NOTE]
> Ghi chú thực tế (Dự án AHV): Cấu trúc thư mục thực tế có thể biến động tùy theo đặc thù dự án. Đây là lý do kiến trúc mới cần Control Plane có cơ chế giám sát để tự động chuẩn hóa lại cấu trúc khi có sự thay đổi ngoài ý muốn.

---

## 3. Khái niệm cốt lõi: Config-driven everything
Đây là yếu tố then chốt của Agent Factory.

- **Định nghĩa Config-driven**: Thay vì viết mã nguồn theo dạng kiểm tra điều kiện cứng, mọi hành vi được định nghĩa trong tệp cấu hình (YAML/JSON).
- **Lợi ích**:
    - Thêm Agent mới: Không cần viết thêm mã nguồn.
    - Thay đổi hành vi: Chỉnh sửa tệp cấu hình.
    - Kích hoạt khả năng tự tiến hóa: Hệ thống tự điều chỉnh cấu hình để đạt hiệu quả cao hơn.

> [!NOTE]
> Ghi chú thực tế (Dự án AHV): Cách tiếp cận dựa trên cấu hình có thể dẫn tới sự mâu thuẫn giữa các tệp cấu hình mới và mã nguồn cũ. Giải pháp kiến trúc là sử dụng tác nhân kiểm chứng để thực thi hợp đồng thiết kế ngay sau khi giai đoạn thiết kế kết thúc.

---

## 4. Định nghĩa AI Agent (Agent Schema)
Một Agent chuẩn vận hành thực tế cần có đầy đủ các thuộc tính sau:

```yaml
id: backend_senior
persona:
  role: Senior Backend Engineer
  tone: pragmatic, performance-focused
  experience: 8+ years
goals:
  - build scalable backend
  - ensure code quality
capabilities:
  - api_design
  - db_schema_design
tools:
  - code_generator
  - db_analyzer
rules:
  - follow_clean_architecture
  - write_unit_tests
memory:
  type: vector
  scope: project
evaluation:
  metrics: [code_quality, performance]
```

---

## 5. Các Agent cần thiết (Phiên bản 1)
Bắt đầu với bộ khung tối thiểu (Minimal Set):

- **BA Agent**: Chuyển ý tưởng thành đặc tả (Specification).
- **SA Agent (Solution Architect)**: Thiết kế kiến trúc hệ thống.
- **Tech Lead Agent**: Định nghĩa tiêu chuẩn và kiểm duyệt mã nguồn.
- **Backend/Frontend Senior Agents**: Thực thi lập trình.

> [!NOTE]
> Ghi chú thực tế (Dự án AHV): Sự phối hợp giữa các thành phần thường xảy ra xung đột ở giai đoạn tích hợp. Cần có cơ chế xác thực chuyên biệt để kiểm tra tính nhất quán của giao diện lập trình.

```mermaid
graph TD
    User["User Request"] --> BA["BA Agent"]
    BA -- Spec --> SA["Solution Architect"]
    SA -- Architecture --> TL["Tech Lead"]
    TL -- Rules/Standards --> DEV{Dev Agents}
    
    subgraph Development
        DEV --> BE["Backend Agent"]
        DEV --> FE["Frontend Agent"]
    end
    
    BE --> VA["Validator Agent"]
    FE --> VA
    VA -- "Check Contract/Schema" --> EV["Evaluator"]
```

> [!IMPORTANT]
> Cơ chế kiểm chứng là yêu cầu bắt buộc để ngăn chặn hiện tượng trôi dạt thiết kế bằng cách đối soát giữa đặc tả giao diện và thực tế triển khai.

---

## 6. Động cơ quy trình (Workflow Engine)
Cơ chế điều phối các Agent phối hợp thực hiện nhiệm vụ.

### Ví dụ quy trình (Pipeline):
Ý tưởng -> BA (Spec) -> SA (Arch) -> TechLead (Rules) -> Devs (Code) -> Evaluator (Scoring) -> Feedback (Evolution).

### Cấu hình Workflow mẫu:
```yaml
workflow:
  name: build_feature
  steps:
    - agent: ba
      task: analyze
    - agent: solution_architect
      task: design
    - parallel:
        - agent: backend
          task: implement
        - agent: frontend
          task: implement
```

---

## 7. Control Plane (Lớp điều phối & Quản trị) - [Mới]
**Vai trò**: Là bộ não quản trị cấp cao, chịu trách nhiệm về an toàn, ngân sách và tính nhất quán của toàn bộ hệ thống.

- **Nhiệm vụ trọng tâm**:
    - **Loop Governance**: Quyết định khi nào dừng vòng lặp, khi nào cần "Escalate" (yêu cầu con người can thiệp).
    - **Budget Control**: Kiểm soát chi phí (Token usage) và thời gian thực thi.
    - **Safety Guardrails**: Đảm bảo các Agent không thực hiện các hành vi nguy hiểm hoặc vi phạm chính sách bảo mật.
    - **Phase Gating Authority**: Quyết định cuối cùng về việc chuyển đổi giữa các Phase (ví dụ: từ Backend sang Frontend).

```mermaid
graph TD
    CP["CONTROL PLANE"] --> LC["Loop Control"]
    CP --> BC["Budget Ctrl"]
    CP --> SG["Safety Guard"]
    
    LC --> LC_D["Retry / Stop decision"]
    BC --> BC_D["Token / Time limit"]
    SG --> SG_D["Prevent bad actions (Delete file, Modify contract)"]
```

> [!NOTE]
> Ghi chú thực tế (Dự án AHV): Trong giai đoạn này, vai trò điều phối vòng lặp và kiểm soát ngân sách chủ yếu do con người hoặc tác nhân giám sát đảm nhận thủ công. Kiến trúc này được thiết kế để tự động hóa các quyết định trong các giai đoạn tiếp theo.

---

## 8. Runner (Bộ thực thi)
**Vai trò**: Là cánh tay trực tiếp thực hiện các chỉ lệnh từ Planner và thực thi các thao tác nguyên tử trên môi trường.

- **Nhiệm vụ trọng tâm**:
    - **Execution (Atomic Tasks)**: Chạy script, cài đặt dependency, hoặc ghi file.
    - **Completion Check (Xong chưa?)**: Xác nhận nhiệm vụ kỹ thuật đã hoàn thành (ví dụ: File đã tồn tại, Server đã khởi động).

> [!IMPORTANT]
> Phân tách trách nhiệm xác thực: 
> Trong mô hình nâng cấp, bộ thực thi không tự đánh giá chất lượng mà chỉ xác nhận việc hoàn thành tác vụ kỹ thuật. Trách nhiệm đánh giá tiến độ và chất lượng được chuyển giao cho bộ phận đánh giá độc lập.

> [!NOTE]
> Ghi chú thực tế (Dự án AHV): Trong thiết lập ban đầu, bộ thực thi đảm nhận quá nhiều trách nhiệm, dẫn đến hiện tượng lặp lại khi các chỉ số không được cải thiện một cách độc lập.

### Luồng vận hành (Component Interaction Flow)

```mermaid
sequenceDiagram
    participant User
    participant CP as Control Plane
    participant PL as Planner
    participant WF as Workflow Engine
    participant RN as Runner
    participant AR as Agent Runtime/LLM
    participant EV as Evaluator

    User->>CP: Gửi yêu cầu
    CP->>PL: Tạo kế hoạch (Plan)
    PL-->>CP: Kế hoạch chi tiết
    CP->>WF: Expand kế hoạch thành các bước (Steps)
    
    loop Cho mỗi bước
        WF->>RN: Thực thi bước
        RN->>AR: Gọi LLM / Tool call
        AR-->>RN: Kết quả (Result)
        RN->>EV: Gửi kết quả đánh giá
        EV-->>CP: Completion / Progress / Quality Score
        CP->>CP: Quyết định (Continue / Retry / Stop?)
    end
```

---

## 9. Bộ lập hoạch (Planner) - Phân tầng kiến trúc
Planner không còn là một thực thể đơn nhất mà được phân thành các tầng kiến trúc để đảm bảo tính bền vững:

- **Strategic Planner (Chiến lược)**: Xác định mục tiêu tổng thể của sản phẩm (Roadmap).
- **Task Decomposer (Phần chia)**: Chia nhỏ Roadmap thành các nhiệm vụ cụ thể cho từng Agent.
- **Execution Planner (Thực thi/Tactical)**: Xử lý các tình huống retry, lựa chọn Agent thay thế khi có lỗi tại chỗ.

```mermaid
graph TD
    PL["PLANNER (Plan)"] --> RN["RUNNER (Execute)"]
    RN --> AR["AGENT / TOOL (Output)"]
    AR --> EV["EVALUATOR (Feedback)"]
    EV --> CP["CONTROL PLANE (Decision)"]
    
    CP --> C_C["Continue"]
    CP --> C_R["Retry/Mutate"]
    CP --> C_S["Stop"]
```

> [!NOTE]
> Ghi chú thực tế (Dự án AHV): Việc sử dụng bộ lập hoạch đơn nhất bộc lộ hạn chế về tính xác thực của các bước thực hiện. Mô hình phân tầng là giải pháp để giảm thiểu sự can thiệp thủ công trong quá trình phê duyệt.

---

## 10. Hệ thống bộ nhớ và rút kinh nghiệm
Hệ thống bộ nhớ được mở rộng để không chỉ "nhớ" mà còn phải "rút kinh nghiệm":

1.  **Working Memory (Ngữ cảnh tức thời)**: Tương tự `state.json`, lưu trữ trạng thái hiện tại.
2.  **Episodic Memory (Lịch sử trải nghiệm)**: Nhật ký chi tiết của các lần chạy (Run History) để so sánh hiệu quả giữa các phiên bản.
3.  **Failure Memory (Bộ nhớ sai lầm)**: Lưu trữ các "Anti-patterns" - những cách làm đã thử và thất bại để AI không lặp lại cùng một lỗi (Ví dụ: "Không được cài đặt version X của thư viện Y vì xung đột").

```mermaid
graph TD
    MS["MEMORY SYSTEM"] --> WM["Working Memory (Context)"]
    MS --> EM["Episodic Memory (Logs)"]
    MS --> SM["Semantic Memory (Vector DB)"]
    MS --> FM["Failure Memory (Anti-patterns)"]
```

> [!NOTE]
> Ghi chú thực tế (Dự án AHV): Việc thiếu hụt bộ nhớ về các sai sót khiến tác nhân lặp lại các lỗi cấu hình. Tích hợp bộ nhớ chuyên biệt về các mẫu lỗi là bước ngoặt giúp hệ thống tự tối ưu hóa.

---

## 11. Bộ đánh giá và hệ thống chỉ số
Thay vì chỉ là Success/Fail, Evaluator trong mô hình nâng cấp thực hiện:
- **Progress Check (Delta)**: So sánh kết quả hiện tại với trạng thái trước đó (Mã nguồn có tốt lên không? Độ bao phủ test có tăng không?).
- **Quality Score (Scoring)**: Chấm điểm dựa trên Rubric chuẩn (Clean code, Security, Performance).

---

## 12. Vòng lặp tự học (Self-Evolution Loop)
Vòng lặp cốt lõi: Thực thi -> Đánh giá -> Phân tích -> Điều chỉnh -> Tái thực thi.

> [!IMPORTANT]
> An toàn trong quá trình tiến hóa: 
> Cần cơ chế chạy thử cấu hình trong môi trường cô lập và tự động quay lại trạng thái ổn định nếu kết quả không đạt mục tiêu đề ra.

> [!NOTE]
> **Reality Check (Dự án AHV)**: Việc Antigravity phải can thiệp trực tiếp để đổi Runner logic trong dự án AHV chính là tiền thân của cơ chế **Shadow Testing** và **Auto-Rollback** trong kiến trúc nâng cao. Trong tương lai, **Control Plane** sẽ tự động hóa việc này để đảm bảo Evolution Safety.

---

## 13. Các quy tắc thực chiến (Best Practices)
- **Tiếp cận từng bước**: Tránh xây dựng hệ thống đa Agent phức tạp ngay từ đầu. Hãy bắt đầu với luồng vận hành cố định và tích hợp AI dần dần.
- **Quản lý phiên bản**: Lưu trữ mọi phiên bản cấu hình (ví dụ: `backend_v1.yaml`, `backend_v2.yaml`).
- **Ghi nhật ký (Logging)**: Ghi lại chi tiết dữ liệu đầu vào, đầu ra và thời gian phản hồi của từng Agent.
- **Sự can thiệp của con người (Human-in-the-loop)**: Giai đoạn đầu cần có sự phê duyệt của con người trước khi hệ thống thực hiện cập nhật tự động.

> [!NOTE]
> **Reality Check (Dự án AHV)**: Trong thực tế, Antigravity (Advanced Agent) đóng vai trò là "người can thiệp" để chỉnh sửa cấu hình hệ thống khi các Agent Factory bị kẹt (Manual Override).

---

## 14. Lộ trình phát triển

### 14.1. Tổng quan lộ trình
1.  **Phase 1 - Foundation**: Runtime, Config loader, Logging.
2.  **Phase 2 - Multi-agent**: Workflow engine, Context passing.
3.  **Phase 3 - Evaluation & Governance**: Orchestrator (Control Plane), Scoring system.
4.  **Phase 4 - Antigravity (Evolution)**: Config mutation, Evolution Safety.
5.  **Phase 5 - Optimization**: Parallel execution, Multi-Planner.

---

### 14.2. Chi tiết từng giai đoạn

### Phase 1: Foundation (Core Runtime)
**Mục tiêu**: Vận hành được Agent đơn lẻ theo kịch bản cố định.
- **Nhiệm vụ trọng tâm**:
    - **Agent Runtime**: Xây dựng API thực thi Agent.
    - **Config Loader**: Tự động tải cấu hình từ thư mục `/configs`.
    - **Simple Executor**: Thực thi tuần tự các bước.
    - **Logging system**: Ghi nhật ký chi tiết các phiên làm việc.
- **Kết quả đầu ra**: Agent đọc cấu hình và thực thi đúng kịch bản logic.
- **Rủi ro**: Viết mã nguồn cứng (hardcode) thay vì sử dụng cấu hình; thiếu hệ thống nhật ký dẫn đến khó khăn khi gỡ lỗi.
- **Phạm vi loại trừ**: Tạm thời chưa triển khai đa Agent, bộ lập hoạch động hoặc cơ chế tiến hóa.

> [!NOTE]
> **Reality Check (Dự án AHV)**: Giai đoạn Foundation thường mất thời gian nhất ở việc thiết lập môi trường (Dependencies, Configs). Đừng coi thường việc cài đặt `npm` hay `tsconfig`.

### Phase 2: Multi-agent System
**Mục tiêu**: Phối hợp nhiều Agent theo một quy trình cụ thể.
- **Nhiệm vụ trọng tâm**:
    - **Workflow Engine**: Quản lý trình tự phối hợp giữa các Agent.
    - **Context Passing**: Chuyển giao dữ liệu đầu ra của Agent trước làm đầu vào cho Agent sau.
    - **Basic Planner**: Lập kế hoạch dựa trên quy tắc (Rule-based).
- **Đội ngũ Agent tối thiểu**: BA, Backend, Frontend.
- **Kết quả đầu ra**: Quy trình hoàn chỉnh từ Ý tưởng -> BA -> Backend -> Frontend.
- **Rủi ro**: Quá tải ngữ cảnh (context overload) hoặc các Agent làm việc chồng chéo.
- **Giải pháp**: Định nghĩa rõ ràng cấu trúc dữ liệu đầu vào và đầu ra.

> [!NOTE]
> **Reality Check (Dự án AHV)**: Việc chuyển giao ngữ cảnh (Context Passing) cần được nén lại. Nếu không có cơ chế **Context Purging** (Thanh lọc ngữ cảnh) hiệu quả, Agent sẽ bị loãng mục tiêu do nhồi nhét quá nhiều file cũ vào bộ nhớ.

### Phase 3: Evaluation System
**Mục tiêu**: Thiết lập cơ chế định lượng để hệ thống biết chính xác kết quả nào là "tốt" hoặc "chưa tốt".
- **Nhiệm vụ trọng tâm**:
    - **Evaluator (Bộ đánh giá)**: Triển khai engine đánh giá đa tầng. Tầng 1 dùng các công cụ định lượng (Linter, Test Runner, SonarQube). Tầng 2 dùng LLM rà soát logic dựa trên bộ tiêu chí (Rubric) có sẵn.
      > [!NOTE]
      > **Reality Check (Dự án AHV)**: Đã triển khai Sandbox (Tầng 1 - Integration) và LLM Reasoning (Tầng 2 - Logic), nhưng chưa tích hợp Linter/SonarQube thành một khối đánh giá độc lập.
    - **Metrics system (Hệ thống chỉ số)**: Xác định bộ chỉ số KPI chi tiết:
        - Khối lượng lỗi (Bug count).
        - Độ phức tạp của mã nguồn (Cyclomatic complexity).
        - Hiệu năng (Latency, Resource usage).
        - Sự tuân thủ phong cách (Style compliance).
      > [!NOTE]
      > **Reality Check (Dự án AHV)**: Chỉ mới triển khai kiểm tra trạng thái thực thi (Success/Fail) và Bug count cơ bản. Các chỉ số về Complexity hay Performance chưa được định lượng tự động.
    - **Feedback storage (Lưu trữ phản hồi)**: Xây dựng cơ sở dữ liệu lưu trữ toàn bộ lịch sử đánh giá. Mỗi bản ghi bao gồm: `task_id`, `agent_id`, `original_output`, `score`, `reasoning` và `suggestions`.
      > [!NOTE]
      > **Reality Check (Dự án AHV)**: Phản hồi đang được lưu trữ phi tập trung trong `state.json` và `meta.json`. Chưa có Database chuyên biệt để truy vấn lịch sử tiến hóa của Agent.
- **Kết quả đầu ra**: Mọi phiên thực thi đều đi kèm một bản báo cáo đánh giá (Evaluation Report) với điểm số cụ thể. Đây là dữ liệu đầu vào quan trọng cho quá trình tự tiến hóa ở Phase 4.
- **Rủi ro**: Tiêu chí đánh giá quá định tính (không rõ ràng) hoặc LLM đánh giá không nhất quán qua các lần chạy khác nhau.
- **Giải pháp**: Xây dựng bộ tiêu chuẩn (Standard Rubric) nghiêm ngặt và sử dụng các công cụ kiểm tra tự động (deterministic tools) nhiều nhất có thể trước khi dùng LLM.

### Phase 4: Antigravity (Self-evolve)
**Mục tiêu**: Hệ thống tự cải thiện hiệu quả vận hành theo thời gian.
- **Nhiệm vụ trọng tâm**:
    - **Feedback Analyzer**: Phân tích các lỗi lặp lại để tìm ra quy luật.
    - **Config Mutator**: Tự động tinh chỉnh cấu hình và các chỉ dẫn (prompts).
    - **Version Manager**: Quản lý các thế hệ cấu hình Agent khác nhau.
- **Quy trình hoàn chỉnh**: Thực thi -> Đánh giá -> Phân tích -> Điều chỉnh -> Tái thực thi.
- **Rủi ro**: Điều chỉnh quá mức gây mất ổn định hệ thống.
- **Giải pháp**: Bắt buộc thử nghiệm trên phiên bản mới trước khi áp dụng chính thức.

### Phase 5: Optimization & Scaling
**Mục tiêu**: Hệ thống tối ưu hiệu suất và sẵn sàng triển khai quy mô lớn.
- **Nhiệm vụ trọng tâm**:
    - **Parallel execution**: Thực thi song song các nhiệm vụ độc lập.
    - **Queue system**: Quản lý hàng đợi và cơ chế thử lại nhiệm vụ lỗi.
    - **Caching**: Tái sử dụng kết quả cũ để giảm chi phí vận hành.

> [!NOTE]
> **Reality Check (Dự án AHV)**: Tối ưu hóa quan trọng nhất là đảm bảo các Agent không ghi đè lên các tệp tin của nhau và quản lý tài nguyên hệ thống đồng nhất.
    - **Advanced Planner**: Lập kế hoạch động dựa trên LLM.
- **Kết quả đầu ra**: Hệ thống vận hành nhanh hơn, tiết kiệm chi phí và thông minh hơn.

---

## 15. Lịch trình thực hiện dự kiến (Roadmap V4.7)
Lộ trình triển khai hệ thống AI Agent Factory (V4.7) được thiết kế theo mô hình quản trị dự án chuyên nghiệp, tập trung vào cấu trúc thực thi tối ưu trong khoảng thời gian từ 16 đến 24 tuần. Toàn bộ quá trình được phân tách thành các giai đoạn kế thừa, đảm bảo tính bền vững và khả năng tự tiến hóa của hệ thống.

### Giai đoạn 1: Thiết lập Hệ quy chiếu và Hạ tầng Core (Tuần 1 - Tuần 4)
**Mục tiêu**: Chuẩn hóa dữ liệu đầu vào và kích hoạt các tác vụ đơn nhiệm.
- **Tuần 1-2 (Standardization)**: Xây dựng hệ thống Standard Spec bao gồm: Coding Convention, Kiến trúc API, và Quy hoạch cấu trúc thư mục. Đây là bộ khung pháp lý kỹ thuật bắt buộc để các Agent đối soát trong quá trình thực thi.
- **Tuần 3-4 (Atomic Agent Implementation)**: Triển khai các Single-task Agents phục vụ các tác vụ lặp lại (Boilerplate): CRUD Generator, Unit Test Engine, và Automated Documentation. Toàn bộ System Prompt được quản lý tập trung trong thư viện cấu hình.

### Giai đoạn 2: Cơ chế Điều phối và Giám sát Cấu trúc (Tuần 5 - Tuần 8)
**Mục tiêu**: Thiết lập giao thức tương tác đa bên và bảo toàn tính toàn vẹn hệ thống.
- **Tuần 5-6 (Orchestration & Handoff)**: Định nghĩa Handoff Protocol (Giao thức bàn giao ngữ cảnh) giữa các Agent thông qua các tệp trạng thái (State files). Thiết lập quy trình điều phối có sự phê duyệt của con người (Human-in-the-loop) để đảm bảo tính chính xác của dữ liệu luân chuyển.
- **Tuần 7-8 (System Integrity Guard)**: Phát triển Agent giám sát (Folder Guardian) chuyên trách quét và đối soát cấu trúc hệ thống. Agent này có quyền từ chối các thay đổi gây phân mảnh (Fragmentation) hoặc vi phạm quy hoạch đã thiết lập ở Giai đoạn 1.

### Giai đoạn 3: Tự động hóa Thực thi và Kiểm soát Chất lượng (Tuần 9 - Tuần 12)
**Mục tiêu**: Tích hợp hệ thống vào luồng CI/CD và thiết lập trạm kiểm định chất lượng tự động.
- **Tuần 9-10 (Agentic Runner Integration)**: Tích hợp Agent trực tiếp vào hạ tầng Runner. Chuyển đổi từ kích hoạt thủ công sang kích hoạt dựa trên sự kiện (Event-driven) như Code Commit hoặc Merge Request.
- **Tuần 11-12 (Quality Gate & Observability)**: Triển khai Quality Agent để thẩm định logic, bảo mật và hiệu năng mã nguồn. Xây dựng hệ thống Centralized Logging để quan sát và truy vết luồng suy luận (Reasoning path) của Agent.

### Giai đoạn 4: Bộ lập hoạch tự trị và Hiệu chỉnh động (Tuần 13 - Tuần 16)
**Mục tiêu**: Chuyển giao quyền lập kế hoạch cho LLM và vận hành vòng lặp tự sửa lỗi.
- **Tuần 13-14 (Autonomous Planner)**: Triển khai LLM Planner có khả năng phân rã yêu cầu cấp cao thành các tác vụ thực thi cụ thể. Planner chịu trách nhiệm chỉ định Agent phù hợp dựa trên năng lực (Capability-based dispatching).
- **Tuần 15-16 (Scoring & Self-Correction)**: Thiết lập cơ chế Scoring Mechanism. Hệ thống tự động kích hoạt vòng lặp hiệu chỉnh (Self-correction) nếu kết quả đầu ra không đạt ngưỡng điểm chất lượng quy định, giảm thiểu sự can thiệp của con người.

### Giai đoạn 5: Hoàn thiện Factory Engine v4.7 (Tuần 17 - Tuần 24)
**Mục tiêu**: Vận hành lớp điều phối chiến lược và kích hoạt cơ chế tự tiến hóa.
- **Tuần 17-19 (Control Plane Architecture)**: Hoàn thiện Control Plane để quản trị trạng thái toàn cục, tối ưu hóa tài nguyên (Token/Compute) và quản lý các kịch bản ngoại lệ phức tạp.
- **Tuần 20-21 (Cognitive Memory Bridge)**: Xây dựng bộ nhớ tri thức lưu trữ các "Kinh nghiệm sai lầm". Dữ liệu này được xử lý và nạp ngược lại vào các phiên làm việc sau dưới dạng Long-term Context để tăng tỷ lệ thành công.
- **Tuần 22-24 (Meta-Agent Factory & Evolution)**: Kích hoạt khả năng tự cấu hình Agent mới dựa trên nhu cầu phát sinh. Hoàn thiện vòng lặp tự tiến hóa (Self-evolution) dựa trên dữ liệu vận hành thực tế.

### Bảng Chỉ số Hiệu quả (KPIs) Dự kiến

| Chỉ số | Cách triển khai cũ | Mục tiêu Giai đoạn 1-3 | Mục tiêu Giai đoạn 4-5 |
| :--- | :--- | :--- | :--- |
| **Tỷ lệ Tự động hóa (Boilerplate)** | 5 - 10% | > 70% | > 95% |
| **Tỷ lệ mã nguồn do AI viết (AI Code Rate)** | 10 - 20% | 40 - 60% | > 90% |
| **Tỷ lệ tài liệu do AI viết (AI Doc Rate)** | 20 - 30% | 70 - 80% | > 95% |
| **Thời gian Code Review (Giảm thiểu)** | 0% (Baseline) | Giảm 50% | Giảm 85% - 90% |
| **Độ chính xác Planner** | N/A (Con người) | N/A (Thủ công) | > 80% (Tự động) |
| **Tỷ lệ Tự sửa lỗi thành công** | 0% (Con người) | 20 - 30% | > 60% (Vòng lặp 1) |
| **Thời gian con người tham gia (%)** | 100% | 40 - 60% | < 15% |
| **Thời gian giảm thiểu dự kiến / Dự án** | 0% | Giảm 30 - 45% | Giảm 70 - 85% |


## 16. Các mốc quan trọng (Milestones)

Hệ thống được phát triển qua 5 giai đoạn chính với các mốc kiểm chứng cụ thể để đảm bảo tính ổn định và tiến hóa theo thời gian.

### Giai đoạn 1: Chuẩn hóa thực thể và Công cụ sơ cấp (Tuần 1 - Tuần 4)
*Mục tiêu: Thiết lập "Hệ điều hành" quy tắc và giải phóng nguồn lực từ các tác vụ lặp lại.*
- **Milestone 1.1**: Phê duyệt bộ **Standard Spec v1.0** (bao gồm Coding Convention, API Schema, và Folder Structure) làm khung pháp lý kỹ thuật chung.
- **Milestone 1.2**: Kích hoạt nhóm **Atomic Agents** (CRUD, Unit Test, Documentation) vận hành độc lập thông qua giao diện CLI.
- **Milestone 1.3**: Hoàn thiện kho lưu trữ **Centralized Prompt & Config** để đồng bộ hóa hành vi của các tác nhân trên toàn hệ thống.

### Giai đoạn 2: Giao thức phối hợp và Giám sát tính toàn vẹn (Tuần 5 - Tuần 8)
*Mục tiêu: Xây dựng cơ chế tương tác đa tác nhân và bảo vệ cấu trúc hệ thống cốt lõi.*
- **Milestone 2.1**: Triển khai thành công **Handoff Protocol**, cho phép truyền dữ liệu ngữ cảnh giữa các Agent thông qua các tệp trạng thái (State files).
- **Milestone 2.2**: Vận hành **Folder Guardian Agent** để ngăn chặn tuyệt đối các lỗi phân mảnh thư mục và sai lệch quy hoạch mã nguồn.
- **Milestone 2.3**: Thiết lập quy trình **Human-in-the-loop (HITL)** để kiểm soát và phê duyệt các kết quả đầu ra quan trọng trước khi chuyển bước.

### Giai đoạn 3: Tự động hóa vận hành và Quan sát (Tuần 9 - Tuần 12)
*Mục tiêu: Đưa Agent vào môi trường thực thi tự động và thiết lập hệ thống giám sát tập trung.*
- **Milestone 3.1**: Tích hợp Agent vào **CI/CD Pipeline**, cho phép kích hoạt dựa trên sự kiện (Event-driven) như Push hoặc Merge Request.
- **Milestone 3.2**: Vận hành **Quality Gate Agent** để tự động kiểm định mã nguồn và từ chối các thay đổi không đạt chuẩn bảo mật hoặc logic.
- **Milestone 3.3**: Hoàn thiện hệ thống **Centralized Logging & Observability**, cho phép truy vết luồng suy luận (Reasoning Path) của Agent trực quan trên Dashboard.

### Giai đoạn 4: Bộ lập hoạch tự trị và Vòng lặp hiệu chỉnh (Tuần 13 - Tuần 16)
*Mục tiêu: Chuyển dịch từ thực thi kịch bản cứng sang lập kế hoạch dựa trên mục tiêu (Goal-oriented).*
- **Milestone 4.1**: Kích hoạt **Autonomous Planner** với khả năng tự phân rã User Story thành danh sách các Task kỹ thuật chi tiết.
- **Milestone 4.2**: Triển khai cơ chế **Dynamic Dispatching**, tự động điều phối Agent dựa trên năng lực và trạng thái thực tế của hệ thống.
- **Milestone 4.3**: Vận hành vòng lặp **Self-Correction**, cho phép Agent tự hiệu chỉnh dựa trên phản hồi của Quality Gate trước khi yêu cầu can thiệp từ con người.

### Giai đoạn 5: Factory Engine V4.7 và Hệ thống tự tiến hóa (Tuần 17 - Tuần 24)
*Mục tiêu: Hoàn thiện lớp điều phối chiến lược và tối ưu hóa trí tuệ dài hạn.*
- **Milestone 5.1**: Vận hành **Control Plane V4.7** để quản lý trạng thái toàn cục, tối ưu hóa chi phí Token và xử lý các ngoại lệ cấp cao.
- **Milestone 5.2**: Kích hoạt **Cognitive Memory Bridge**, sử dụng Vector DB để lưu trữ và tái sử dụng các "bài học kinh nghiệm" từ các lỗi sai trong quá khứ.
- **Milestone 5.3**: Triển khai **Meta-Agent Generator**, cho phép hệ thống tự sản sinh cấu hình Agent mới khi phát hiện các lỗ hổng về năng lực xử lý.
- **Milestone 5.4**: Hoàn tất vòng lặp **Self-Evolution**, hệ thống tự động cập nhật Standard Spec và System Prompt dựa trên phân tích hiệu suất thực tế.

### Bảng Tổng hợp Tiến độ và Sản phẩm Bàn giao (Deliverables)

| Giai đoạn | Vai trò Agent | Sản phẩm bàn giao chính | Trạng thái kỳ vọng |
| :--- | :--- | :--- | :--- |
| **1. Nền tảng** | Tools | Standard Spec, Atomic Bots | Hiệu suất tăng 30% |
| **2. Phối hợp** | Assistant | Handoff Protocol, Guardian | Giảm 90% lỗi cấu trúc |
| **3. Vận hành** | Worker | CI/CD Integration, Quality Gate | Tự động hóa 70% Review |
| **4. Tự trị** | Manager | Autonomous Planner, Scoring | Giảm 80% công tác điều phối |
| **5. V4.7 Factory** | Factory | Control Plane, Memory Bridge | Hệ thống tự tiến hóa |


## 17. Lưu ý thực tế (Reality Check)
- **Sai lầm phổ biến**: Tập trung vào khả năng tự tiến hóa (Phase 4) khi nền tảng vận hành (Phase 1, 2) chưa thực sự ổn định.
- **Nguyên tắc cốt lõi**: Ưu tiên xây dựng một hệ thống ổn định trước khi phát triển các tính năng thông minh.

---

## 18. Công cụ công nghệ gợi ý (Tech Stack)
- **Ngôn ngữ lập trình**: Node.js hoặc Python (FastAPI).
- **Cơ sở dữ liệu**: MongoDB (Nhật ký/Bộ nhớ), Redis (Hàng đợi), Qdrant/Weaviate (Vector DB).

---

## 19. Tầm nhìn dài hạn
Khi được triển khai đúng hướng, hệ thống sẽ trở thành một AI Software Company thu nhỏ, có khả năng tự tổ chức đội ngũ, thực hiện dự án và không ngừng hoàn thiện qua từng sản phẩm.

---

## 20. Tổng kết kinh nghiệm thực chiến (Lessons Learned)

> [!IMPORTANT]
> Đây là các bảng tổng hợp được đúc kết từ quá trình can thiệp thực tế để tối ưu hóa hệ thống hướng tới trạng thái vận hành tự chủ.

### 20.1. Cấu hình hệ thống hướng tới Autonomous Agent (Tiến hóa Phase 2+)

Dưới đây là các cấu hình then chốt mang tính chiến thuật, được điều chỉnh để giúp hệ thống từ vận hành tuần tự sang khả năng tự điều phối và tiến hóa (Autonomous):

| Thành phần hệ thống | Cấu hình ban đầu | Cấu hình tiến hóa | Mục tiêu hướng tới Autonomous |
| :--- | :--- | :--- | :--- |
| **Bản phân tầng (Planner)** | Bộ lập hoạch đơn nhất (Single). | **Hierarchical Planner** | Tách biệt Chiến lược (Strategic) và Thực thi (Tactical) để giảm Hallucination. |
| **Logic Thành công (Runner)** | Fix lỗi dựa trên số lượng issue. | **Triple-Check Validation** | Tách bạch: Completion vs Progress vs Quality để có Evaluation chính xác. |
| **Quản lý bối cảnh (Memory)** | Lưu trữ mọi Iteration cũ. | **Episodic & Failure Memory** | Ghi nhớ các "Anti-patterns" để không lặp lại sai lầm cũ. |
| **Lớp điều phối (Orchestrator)** | Con người/Agent cấp cao điều khiển. | **Control Plane (Automated)** | Tự động hóa việc quản lý Loop, Budget và Safety Guardrails. |
| **Tiến hóa (Evolution)** | Thay đổi cấu hình trực tiếp. | **Shadow & Canary Release** | Đảm bảo cấu hình mới không làm "thoái hóa" hệ thống. |

> [!TIP]
> Sự thay đổi từ xác lập cấu hình cố định sang linh hoạt theo ngữ cảnh là yếu tố quan trọng để hệ thống có thể tự đưa ra quyết định mà không cần can thiệp thủ công.

### 20.2. So sánh Trạng thái thực tế (Dự án AHV) với Mô hình Nâng cấp

| Đặc tính Nâng cấp | Trạng thái hiện tại (AHV) | Đánh giá | Ghi chú từ thực tế |
| :--- | :--- | :--- | :--- |
| **Control Plane** | Thủ công (qua Antigravity) | **Khớp 20%** | Mới dừng ở mức con người giám sát, chưa có engine tự động. |
| **Triple-Check Validator** | Success/Fail (Binary) | **Khớp 40%** | Đã biết check "tiến bộ" (delta) nhưng chưa scoring chất lượng chuyên sâu. |
| **Hierarchical Planner** | Single Dynamic Planner | **Khớp 50%** | Phân chia task tốt nhưng dễ bị lẫn lộn giữa chiến lược và thực thi. |
| **Failure Memory** | Manual Notes | **Khớp 10%** | Chỉ nhớ sai lầm qua ghi chú của bác và tôi, chưa có DB Anti-patterns. |
| **Shadow Testing** | Chạy trực tiếp | **Khớp 0%** | Chưa thực hiện chạy cấu hình song song. |

- **Kết luận**: Dự án AHV đang tiệm cận Phase 3 nhưng vận hành theo cơ chế **Binary Evaluation (Success/Fail)** hơn là **Quantitative Evaluation (Scoring)**. Để đạt chuẩn Phase 3, cần tích hợp thêm các công cụ static analysis (như SonarQube) và hệ thống lưu trữ điểm số.

---

## 21. Thuật ngữ cốt lõi & Từ khóa ấn tượng (Core Keywords)

Đây là những khái niệm "xương sống" và các bài học "xương máu" đã định hình nên sự thành công của dự án AHV:

### 21.1. Nhóm từ khóa vận hành hệ thống
- **Auto-Fix Loop (Vòng lặp tự chữa lành)**: Không chỉ là sửa lỗi, đây là chu trình khép kín: "Phân tích Log -> Hiệu chỉnh kế hoạch -> Viết lại code -> Tái xác thực". Đây chính là động cơ giúp AI tự vượt qua các rào cản kỹ thuật mà không cần con người viết từng dòng lệnh.
- **Pipeline (Dòng chảy đa Agent)**: Là một "State-machine" (Máy trạng thái) của các Agent. Đầu ra của Agent này (ví dụ: Spec của BA) trở thành bối cảnh (Context) không thể thiếu cho Agent sau (Dev), đảm bảo tính nhất quán xuyên suốt dự án.
- **Runner (Trái tim vận hành)**: Engine thực thi các lệnh nguyên tử và thực hiện các bài kiểm tra thực thi (Completion Check) để quyết định bước tiếp theo.
- **Planner (Kiến trúc sư lập kế hoạch)**: Bộ não ra quyết định mang tính đệ quy, hiện đã được nâng cấp lên mô hình Hierarchical (Strategic -> Tactical).
- **Control Plane (Tháp điều phối)**: Lớp quản trị cao nhất, giữ quyền năng về Loop, Budget và Safety.
- **Contract (Hợp đồng giao tiếp)**: Ngôn ngữ chung giữa các Agent (API Spec, DB Schema). Contract là "mỏ neo" giữ cho dự án không bị chệch hướng.
- **SDLC Full (Vòng đời phần mềm toàn diện)**: Khả năng bao quát từ Phân tích yêu cầu -> Thiết kế kiến trúc -> Lập trình -> Kiểm thử -> Viết tài liệu.

### 21.2. Nhóm từ khóa "Thực chiến"
- **Context Purging (Thanh lọc ngữ cảnh)**: Kỹ thuật dọn dẹp bộ nhớ lỗi. Nếu AI "nhớ" quá nhiều thất bại trong quá khứ, nó sẽ bị ám ảnh và không thể tập trung vào giải pháp hiện tại.
- **Design Drift (Trôi dạt thiết kế)**: Hiện tượng AI tự ý thay đổi cấu trúc nền tảng trong các lượt Iteration muộn. Cần cơ chế Immutable Contract để ngăn chặn.
- **Manual Override (Can thiệp tối cao)**: Sự thừa nhận rằng trong Phase 1-2, luôn cần một "Senior Agent" hoặc con người để phá vỡ các vòng lặp logic bế tắc.
- **State Desync (Lệch pha trạng thái)**: Khi "thế giới quan" của AI (trong file `state.json`) khác với thực tế tệp tin trên đĩa cứng.
- **Glassmorphism Premium (Tiêu chuẩn thẩm mỹ cao cấp)**: Minh chứng cho khả năng cảm thụ và thực thi các phong cách thiết kế hiện đại của AI.

### 21.3. Hướng nghiên cứu & Triển khai tương lai
- **Multi-Planner (Đa bộ lập kế hoạch)**: Là phương pháp sử dụng nhiều planner hoạt động song song để sinh ra các phương án kế hoạch khác nhau. Các kế hoạch này sau đó được đánh giá thông qua cơ chế lựa chọn (scoring, voting hoặc verifier) nhằm chọn ra phương án tối ưu. Cách tiếp cận này giúp tăng tính đa dạng của lời giải, cải thiện độ tin cậy và khả năng chịu lỗi (robustness), đồng thời có thể giảm thiểu sai lệch và hallucination khi kết hợp với các cơ chế kiểm chứng (verification/critique).

```mermaid
graph TD
    CP["CONTROL PLANE"] --> MP["MULTI-PLANNER"]
    
    subgraph Planners
        MP --> PA["Planner A (Logical/Stable)"]
        MP --> PB["Planner B (Creative/High Temp)"]
        MP --> PC["Planner C (Rule-based/Safe)"]
    end
    
    PA --> Plans["Plan A, B, C"]
    PB --> Plans
    PC --> Plans
    
    Plans --> PE["PLAN EVALUATOR (Voting/Scoring)"]
    PE --> BP["Best Plan"]
    BP --> Runner
```

---

### Sơ đồ Tổng quát (End-to-End Interaction)

```mermaid
graph LR
    User --> CP[Control Plane]
    CP --> PL[Planner]
    CP --> RN[Runner]
    RN --> EL[Event Log]
    EL --> EV[Evaluator]
    EV --> CP
    EL --> SE[Summary Engine]
    SE --> Human
```
