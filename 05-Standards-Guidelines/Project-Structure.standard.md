# Tiêu chuẩn Cấu trúc Thư mục Dự án: Standard-Workspace (v1.1)

Mọi dự án con (Experiment) trong hệ sinh thái Agent Factory phải tuân thủ cấu trúc thư mục chuẩn dưới đây.

## 1. Sơ đồ cấu trúc (Directory Tree)

```text
project-root/
├── docs/               # Chứa toàn bộ hồ sơ thiết kế và đặc tả
├── agents/             # Chứa các AI Agent vận hành dự án
│   └── runner/         # Bộ thực thi thông minh
├── backend/            # Mã nguồn Backend (Module-based)
│   ├── src/
│   │   ├── modules/    # Chứa các Module nghiệp vụ (v3.0)
│   │   ├── config/
│   │   └── middlewares/
├── frontend/           # Mã nguồn Frontend (Vite/React)
└── package.json        
```

## 2. Document Naming Convention (Quy ước mới v1.1)

Để Agent nhận diện vai trò tài liệu chính xác, mọi tệp tin trong `/docs` và `05-Standards-Guidelines` phải sử dụng hậu tố:

1.  **`*.standard.md`**: Global Standards (Luật chung dự án).
    - Ví dụ: `Coding.standard.md`, `Security.standard.md`.
2.  **`*.spec.md`**: Implementation Specifications (Đặc tả thiết kế chi tiết).
    - Ví dụ: `PRD.spec.md`, `Contract.spec.md`.
3.  **`*.rule.md`**: Atomic Rules (Ràng buộc nhỏ, cụ thể).
    - Ví dụ: `Naming.rule.md`.
4.  **`*.log.md`**: Traceability & Evidence (Nhật ký thực thi & Lập lịch).
    - Ví dụ: `Planner.log.md`, `Transaction.log.md`.
5.  **`*.guide.md`**: Onboarding & Procedure (Hướng dẫn luồng).
    - Ví dụ: `Implementation.guide.md`.

## 3. Phân loại Hồ sơ (Classification)

| Nhóm | Hậu tố | Vị trí | Bản chất |
| :--- | :--- | :--- | :--- |
| **Hồ sơ Công việc** | `.spec`, `.log` | `/docs` dự án | **Cái gì (What)**: Yêu cầu cụ thể. |
| **Hồ sơ Tiêu chuẩn** | `.standard`, `.rule` | `05-Standards-Guidelines/` | **Thế nào (How)**: Rào cản chất lượng. |

---
> [!IMPORTANT]
> Agent phải đọc các tệp `.standard` đầu tiên để hiểu quy định, sau đó đọc các tệp `.spec` và `.log` để thực thi nhiệm vụ.
