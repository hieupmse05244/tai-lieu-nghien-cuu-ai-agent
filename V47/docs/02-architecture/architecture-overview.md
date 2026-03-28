# Architecture Overview

## 1. Layers
Hệ thống V4.7 (Agent Factory) được kiến trúc theo 3 tầng chính để đảm bảo tính xác định và khả năng mở rộng:

- Interface Layer: Gateway tiếp nhận, chuẩn hóa yêu cầu và xác thực.
- Agent Factory Layer: "Bộ não" thiết kế, sinh ra và điều phối các đơn vị thực thi (Agent Runtimes).
- Agent Runtime Layer: Các tác nhân thực thi nhiệm vụ cụ thể (Dev, Test, Research, Data Processing).

## 2. Full Diagram (HLD)
```mermaid
flowchart TD
    User --> Gateway[Gateway]
    
    subgraph Interface_Layer["1. Interface Layer"]
        Gateway
    end
    
    subgraph Factory_Layer["2. Agent Factory Layer (Core)"]
        SAc[SAc: Solution Architect]
        Gen[Agent Generator]
        Reg[(Agent Registry)]
        Mgr[Runtime Manager]
        Orch[Multi-Agent Orchestrator]
        
        SAc --> Gen
        Gen --> Reg
        Reg --> Mgr
        Mgr --> Orch
    end
    
    subgraph Runtime_Layer["3. Agent Runtime Layer"]
        AgentA[Dev Agent Runtime]
        AgentB[Test Agent Runtime]
        AgentC[... Agent Runtime]
    end
    
    Gateway --> SAc
    Orch --> AgentA
    Orch --> AgentB
    Orch --> AgentC
    
    AgentA -.-> Orch
    AgentB -.-> Orch
```

## 3. Data Flow (End-to-End)
1. User Request: Người dùng gửi yêu cầu qua Gateway tới SAc (Solution Architect).
2. Design Solution: SAc phân tích yêu cầu, thiết kế bản vẽ (Blueprint) và quyết định luồng làm việc (Workflow).
3. Generate & Store: Agent Generator tạo ra định nghĩa cho các Agent (Prompt, Tool, Config) và lưu vào Agent Registry.
4. Provision: Runtime Manager khởi tạo các môi trường Agent Runtime tương ứng.
5. Orchestration: Multi-Agent Orchestrator điều phối luồng giao tiếp giữa các Agent (ví dụ: Dev thực thi -> Test kiểm tra -> Dev sửa lỗi).

## 4. Design Principles
* Separation of Concerns: Factory (Thiết kế) ≠ Runtime (Thực thi).
* Agent = Disposable: Agent được tạo ra và hủy bỏ linh hoạt theo nhu cầu công việc.
* Everything is Config: Agent được định nghĩa bằng cấu hình, cho phép tái sử dụng và kiểm soát phiên bản.
* LLM where it fits: LLM chỉ dùng để thiết kế (SAc) và lập kế hoạch hành động (Planner trong Runtime), việc thực thi phải deterministic.
