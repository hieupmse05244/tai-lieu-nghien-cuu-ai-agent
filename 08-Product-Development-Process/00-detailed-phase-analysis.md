# Quy trình phát triển sản phẩm: Phân tích chi tiết theo từng giai đoạn

---

## 1. Nguyên tắc xuyên suốt (Global Rules)

### 1.1. Rules bắt buộc

* Mỗi giai đoạn phải có **input rõ ràng → output cụ thể → tiêu chí hoàn thành (DoD)**
* Không chuyển phase nếu chưa **sign-off**
* Tài liệu là **source of truth duy nhất**
* Mọi thay đổi phải qua **change request + re-alignment**
* Không implement khi:

  * Chưa có SRS/PRD rõ ràng
  * Chưa có HLD/LLD tương ứng

---

## 2. Phân tích chi tiết từng giai đoạn

---

### 2.1. Nhận yêu cầu & làm rõ (Requirement Clarification)

**Vai trò chính:** BA
**Phối hợp:** Khách hàng

#### Input

* Yêu cầu thô từ khách hàng (meeting, chat, email)

#### Hoạt động

* Elicit requirement (phỏng vấn, workshop)
* Làm rõ:

  * Business goal
  * User persona
  * Pain point
* Xác định:

  * Stakeholders
  * Use case chính

#### Output

* Requirement notes
* Use case list
* Stakeholder map

#### Tài liệu

* Meeting notes
* Requirement draft

#### Cách xác nhận (DoD)

* Khách hàng xác nhận:

  * "Đây là vấn đề cần giải quyết"
* Không còn ambiguity lớn

#### Lưu ý

* Tránh hiểu sai domain
* Không nhảy vào solution quá sớm

---

### 2.2. Xác định Scope, Constraint, Success Criteria

**Vai trò chính:** BA
**Phối hợp:** Techlead, SAc

#### Input

* Requirement draft

#### Hoạt động

* Define:

  * In-scope / Out-of-scope
* Xác định constraint:

  * Timeline
  * Budget
  * Tech limitation
* Define success:

  * KPI
  * SLA
  * Business metric

#### Output

* Scope definition
* Constraint list
* Success criteria

#### Tài liệu

* Scope doc
* Success metrics doc

#### DoD

* Stakeholder đồng thuận:

  * Scope rõ ràng
  * Không overlap
* Success có thể đo lường

#### Lưu ý

* Scope mơ hồ → 90% fail dự án
* Success criteria phải measurable

---

### 2.3. Solution Alignment (Định hướng giải pháp)

**Vai trò chính:** SAc
**Phối hợp:** Techlead, BA

#### Input

* Scope
* Constraint
* Success criteria

#### Hoạt động

* Đề xuất:

  * Architecture style
  * Tech stack
* Xác định:

  * Integration
  * Data flow
  * Deployment model

#### Output

* Solution proposal
* Architecture direction

#### Tài liệu

* Solution Design Doc (lightweight)
* Tech decision record (ADR)

#### DoD

* Team thống nhất:

  * "Chúng ta build theo hướng này"
* Không còn tranh luận lớn về tech

#### Lưu ý

* Sai ở bước này → refactor toàn hệ thống
* Tránh over-engineering

---

### 2.4. Viết đặc tả (SRS / PRD)

**Vai trò chính:** BA

#### Input

* Requirement + Solution direction

#### Hoạt động

* Viết:

  * Functional requirements
  * Non-functional requirements
* Define:

  * User flow
  * Edge cases

#### Output

* SRS / PRD hoàn chỉnh

#### Tài liệu

* SRS
* PRD

#### DoD

* Dev đọc và build được
* Không cần hỏi lại BA nhiều

#### Lưu ý

* Thiếu edge case → bug production
* NFR thường bị bỏ quên (performance, security)

---

### 2.5. Thiết kế kiến trúc tổng thể (HLD)

**Vai trò chính:** SAc, Techlead

#### Input

* SRS / PRD
* Solution direction

#### Hoạt động

* Thiết kế:

  * System architecture
  * Service/module breakdown
* Define:

  * Data flow
  * DB schema (high-level)

#### Output

* HLD document
* Architecture diagram

#### Tài liệu

* HLD
* Diagram (C4, sequence, flow)

#### DoD

* Dev hiểu cách system hoạt động end-to-end
* Không còn “unknown major component”

#### Lưu ý

* HLD không đi quá chi tiết (tránh overlap LLD)
* Phải cover:

  * Scalability
  * Fault tolerance

---

### 2.6. Review tài liệu

**Vai trò chính:** Techlead
**Phối hợp:** BA, Dev

#### Input

* SRS / PRD / HLD

#### Hoạt động

* Review:

  * Logic business
  * Technical feasibility
* Raise issue & fix

#### Output

* Approved documents

#### Tài liệu

* Review log
* Updated docs

#### DoD

* Không còn issue critical
* Team đồng thuận

#### Lưu ý

* Review hời hợt = bug production
* Dev phải tham gia (không chỉ đọc sau)

---

### 2.7. Thiết kế chi tiết (LLD) & chia task

**Vai trò chính:** Techlead
**Phối hợp:** Dev

#### Input

* HLD
* SRS

#### Hoạt động

* Thiết kế:

  * API contract
  * DB schema chi tiết
  * Module design
* Breakdown:

  * Task
  * Estimate

#### Output

* LLD
* Task list

#### Tài liệu

* API spec (OpenAPI)
* DB schema
* Task board

#### DoD

* Dev có thể code không cần hỏi nhiều
* Task estimate hợp lý

#### Lưu ý

* API design sai → ảnh hưởng toàn hệ thống
* Phải define rõ:

  * Error handling
  * Validation

---

### 2.8. Thực thi (Development + CI/CD)

**Vai trò chính:** Dev
**Phối hợp:** DevOps

#### Input

* LLD
* Task list

#### Hoạt động

* Coding
* Unit test
* Integration test
* Setup CI/CD

#### Output

* Source code
* Test coverage
* Build pipeline

#### Tài liệu

* Code repo
* CI/CD config

#### DoD

* Code pass:

  * Lint
  * Test
  * CI pipeline
* Coverage đạt threshold

#### Lưu ý

* Không test = technical debt
* CI/CD phải setup sớm (không để cuối)

---

### 2.9. Review nội bộ + QA + UAT

**Vai trò chính:** QA
**Phối hợp:** BA, Techlead

#### Input

* Build từ dev

#### Hoạt động

* Code review
* QA test:

  * Functional
  * Regression
* UAT với khách hàng

#### Output

* Test report
* Bug list
* UAT sign-off

#### Tài liệu

* Test case
* Bug report
* UAT doc

#### DoD

* Không còn bug critical
* Khách hàng accept

#### Lưu ý

* Không có UAT = rủi ro reject
* QA phải test theo business, không chỉ tech

---

### 2.10. Deploy & bàn giao

**Vai trò chính:** DevOps
**Phối hợp:** BA

#### Input

* Release candidate

#### Hoạt động

* Deploy production
* Monitor:

  * Logs
  * Metrics
* Bàn giao:

  * Tài liệu
  * Hướng dẫn

#### Output

* Production system
* Handover package

#### Tài liệu

* Deployment guide
* Runbook
* User guide

#### DoD

* System stable
* Khách hàng sử dụng được

#### Lưu ý

* Không có monitoring = mù production
* Phải có rollback plan

---

## 3. Mapping trách nhiệm (RACI rút gọn)

| Giai đoạn   | BA | SAc | Techlead | Dev | QA | DevOps |
| ----------- | -- | --- | -------- | --- | -- | ------ |
| Requirement | R  | C   | C        | -   | -  | -      |
| Scope       | R  | C   | C        | -   | -  | -      |
| Solution    | C  | R   | C        | -   | -  | -      |
| SRS         | R  | C   | C        | -   | -  | -      |
| HLD         | C  | R   | R        | -   | -  | -      |
| Review      | C  | C   | R        | C   | -  | -      |
| LLD         | -  | C   | R        | C   | -  | -      |
| Dev         | -  | -   | C        | R   | -  | C      |
| QA/UAT      | C  | -   | C        | C   | R  | -      |
| Deploy      | C  | -   | C        | -   | -  | R      |

(R: Responsible, C: Contribute)

---

## 4. Tổng kết

Nếu làm đúng:

* Requirement rõ → giảm rework
* Solution đúng → hệ thống scale được
* LLD tốt → dev nhanh, ít bug
* QA/UAT chặt → không fail production

Nếu làm sai:

* Sai từ đầu → sửa càng về sau càng đắt

Quy trình này không phải để “làm cho có”, mà là để:

* Giảm uncertainty
* Tăng predictability
* Scale team & hệ thống
