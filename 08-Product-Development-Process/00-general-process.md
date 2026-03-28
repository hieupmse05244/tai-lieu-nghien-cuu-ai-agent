# Quy trình tổng: Từ Khách hàng đến Sản phẩm

## 1. Mục tiêu

Tài liệu này mô tả quy trình end-to-end từ khi tiếp nhận yêu cầu khách hàng đến khi triển khai và bàn giao sản phẩm. Mục tiêu:

* Đảm bảo rõ ràng yêu cầu và kỳ vọng
* Giảm rủi ro sai lệch giải pháp
* Chuẩn hóa cách phối hợp giữa các vai trò (BA, SAc, Techlead, Dev, QA, DevOps)

---

## 2. Phạm vi áp dụng

Áp dụng cho tất cả dự án phát triển phần mềm (web, mobile, backend system, AI system, agent system).

---

## 3. Vai trò tham gia

* **BA (Business Analyst)**: Làm việc với khách hàng, đặc tả yêu cầu
* **SAc (Solution Architect)**: Định hướng giải pháp tổng thể
* **Techlead**: Thiết kế kỹ thuật, dẫn dắt dev
* **Dev**: Phát triển hệ thống
* **QA**: Kiểm thử
* **DevOps**: Hạ tầng, CI/CD, deploy

---

## 4. Quy trình chi tiết

### 4.1. Nhận yêu cầu & làm rõ với khách hàng

**Chịu trách nhiệm:** BA

**Mục tiêu:**

* Hiểu đúng bài toán business
* Làm rõ requirement mơ hồ

**Hoạt động:**

* Thu thập yêu cầu (meeting, doc, email)
* Hỏi lại các điểm chưa rõ
* Xác định stakeholder

**Output:**

* Requirement draft
* Meeting notes

---

### 4.2. Xác định scope, constraint, success criteria

**Chịu trách nhiệm:** BA, Techlead, SAc

**Mục tiêu:**

* Xác định rõ phạm vi làm
* Tránh scope creep

**Hoạt động:**

* Define scope (in-scope / out-of-scope)
* Xác định constraint:

  * Tech constraint
  * Timeline
  * Budget
* Define success criteria (KPI, SLA, business outcome)

**Output:**

* Scope definition
* Constraint list
* Success criteria

---

### 4.3. Solution Alignment (Định hướng giải pháp tổng thể)

**Chịu trách nhiệm:** SAc, Techlead, BA

**Mục tiêu:**

* Chốt hướng đi tổng thể trước khi thiết kế chi tiết

**Hoạt động:**

* Đề xuất kiến trúc:

  * Monolith / Microservices / Event-driven
* Chọn tech stack
* Định hướng deployment:

  * Cloud / On-premise
* Xác định integration với hệ thống ngoài

**Output:**

* Solution proposal
* Architecture direction
* Tech stack decision

---

### 4.4. Viết đặc tả (SRS/PRD)

**Chịu trách nhiệm:** BA

**Mục tiêu:**

* Chuẩn hóa yêu cầu thành tài liệu chính thức

**Hoạt động:**

* Viết SRS / PRD gồm:

  * Functional requirements
  * Non-functional requirements
  * User flow / Use case
* Mapping với business goal

**Output:**

* SRS / PRD document

---

### 4.5. Thiết kế kiến trúc tổng thể (HLD)

**Chịu trách nhiệm:** SAc, Techlead

**Mục tiêu:**

* Xây dựng blueprint hệ thống

**Hoạt động:**

* Thiết kế:

  * System architecture
  * Service breakdown
  * Data flow
* Define:

  * High-level DB schema
  * External integrations

**Output:**

* HLD document
* Architecture diagrams

---

### 4.6. Review tài liệu

**Chịu trách nhiệm:** BA, Techlead, Dev

**Mục tiêu:**

* Đảm bảo tính đúng, đủ, khả thi

**Hoạt động:**

* Review SRS / PRD / HLD
* Validate:

  * Logic business
  * Technical feasibility
* Feedback & revise

**Output:**

* Reviewed & approved documents

---

### 4.7. Thiết kế chi tiết & chia task (LLD)

**Chịu trách nhiệm:** Techlead, Dev

**Mục tiêu:**

* Chuẩn bị cho việc implement

**Hoạt động:**

* Thiết kế chi tiết:

  * API contract
  * DB schema chi tiết
  * Module design
* Breakdown task:

  * Sprint planning
  * Estimate effort

**Output:**

* LLD document
* Task breakdown (Jira, ClickUp, …)

---

### 4.8. Thực thi (Development + CI/CD)

**Chịu trách nhiệm:** Dev, DevOps

**Mục tiêu:**

* Xây dựng hệ thống đúng thiết kế

**Hoạt động:**

* Coding
* Unit test
* Integration test
* Setup:

  * CI/CD pipeline
  * Dev environment

**Output:**

* Source code
* Test coverage
* CI/CD pipeline

---

### 4.9. Review nội bộ + QA + UAT

**Chịu trách nhiệm:** QA, BA, Techlead

**Mục tiêu:**

* Đảm bảo chất lượng trước khi release

**Hoạt động:**

* Code review nội bộ
* QA testing:

  * Functional
  * Performance (nếu cần)
* UAT with khách hàng

**Output:**

* Test report
* UAT sign-off

---

### 4.10. Deploy production & bàn giao

**Chịu trách nhiệm:** DevOps, BA

**Mục tiêu:**

* Đưa sản phẩm vào vận hành thực tế

**Hoạt động:**

* Deploy production
* Monitor hệ thống
* Bàn giao:

  * Tài liệu
  * Source code (nếu có)
  * Hướng dẫn sử dụng

**Output:**

* Production system
* Handover package

---

## 5. Nguyên tắc chung

* Không skip bước Solution Alignment
* Mọi thay đổi scope phải được re-align
* Tài liệu là source of truth
* Review là bắt buộc trước khi chuyển phase

---

## 6. Artefacts chính theo từng giai đoạn

| Giai đoạn   | Tài liệu                 |
| ----------- | ------------------------ |
| Requirement | Requirement notes        |
| Scope       | Scope definition         |
| Solution    | Architecture direction   |
| Spec        | SRS / PRD                |
| Design      | HLD, LLD                 |
| Dev         | Code, CI/CD              |
| Test        | Test report              |
| Release     | Deployment doc, Handover |

---

## 7. Kết luận

Quy trình này đảm bảo:

* Giảm rủi ro sai yêu cầu
* Tăng khả năng scale hệ thống
* Chuẩn hóa collaboration giữa các role

Có thể tùy chỉnh linh hoạt theo quy mô dự án, nhưng không nên bỏ các bước cốt lõi.
