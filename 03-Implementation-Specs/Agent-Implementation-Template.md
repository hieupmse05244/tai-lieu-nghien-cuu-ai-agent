# [AGENT-READY] Chỉ thị Triển khai Dự án (Project Implementation Instructions)

**Lập trình viên:** [Tên Agent / Dev]  
**Dự án:** [Tên dự án/Tính năng]  
**Ngày:** [Ngày ban hành]  

---

## 1. Bối cảnh & Mục tiêu (Context & Goals)

- [ ] **Mô tả:** [Ngắn gọn, rõ ràng về tính năng/dự án]  
- [ ] **Tài liệu tham khảo (PRD / Architecture Docs):** [Link]  
- [ ] **Mục tiêu ưu tiên:** [Hiệu năng / Bảo mật / Time-to-market]  
- [ ] **Người kiểm duyệt (Control Plane):** [Tên người/Agent kiểm duyệt trước commit]  

---

## 2. Đặc tả Kỹ thuật (Technical Specs)

- [ ] **Ngôn ngữ & Framework:**  
  - Backend: Node.js v20 + Express 5.x  
  - Frontend: React 20.x + Vite  

- [ ] **Cấu trúc Thư mục được phép sửa:**  
```text
backend/
src/
routes/ # [tạo/sửa route files]
controllers/ # [tạo/sửa controller files]
services/ # [tạo/sửa service files]
frontend/
src/
components/ # [tạo/sửa component files]
hooks/ # [tạo/sửa hooks]
```
> **Không được chạm vào file config core, node_modules hoặc assets gốc.**  

- [ ] **Dependencies mới (có version cụ thể):**  
- Example: `multer@1.4.5`, `cloudinary@2.20.0`, `dotenv@16.1.0`  

- [ ] **Cơ sở dữ liệu / Migration:** [Schema cần tạo/sửa, migration path]  

- [ ] **Input/Output chuẩn (API):**  
- Nhận: `{ file: File }`  
- Trả về: `{ success: boolean, url?: string, error?: string }`  

---

## 3. Quy tắc & Tiêu chuẩn cho Agent (Agent Constraints)

- [ ] **Coding Standard:** Tuân thủ `05-Standards-Guidelines/Coding-Standards.md`  
- [ ] **Naming Convention:** camelCase cho biến, PascalCase cho class/component  
- [ ] **Pattern yêu cầu:**  
- Service layer handle business logic  
- Controller chỉ handle request/response  
- Factory/Singleton/Repository nếu cần  

- [ ] **Validation bắt buộc:**  
- File size < 5MB  
- File type: jpg/png  
- Trả JSON error chuẩn nếu validation fail  

- [ ] **Error Handling:** luôn trả status code + message rõ ràng  

- [ ] **Test:**  
- Unit test cho controller & service  
- Coverage ≥ 80%  
- Linter pass 100%  

---

## 4. Quy trình Thực hiện (Step-by-Step Workflow)

1.  [ ] Checkout branch feature: `git checkout -b feature/<tên-tính-năng>`  
2.  [ ] Cài đặt dependencies với version chỉ định (`npm install`)  
3.  [ ] Tạo service/controller theo folder structure  
4.  [ ] Implement API với IO chuẩn + validation + error handling  
5.  [ ] Viết unit test, đảm bảo coverage ≥ 80%  
6.  [ ] Chạy linter và test trước commit  
7.  [ ] Commit code chuẩn:  
  ```
  git add .
  git commit -m "[FEAT] <tóm tắt feature>"
  git push origin feature/<tên-tính-năng>
  ```  
8.  [ ] Tạo PR & đợi Control Plane review  
9.  [ ] Merge PR chỉ khi tất cả test & linter pass  

---

## 5. Tiêu chí Nghiệm thu (Acceptance Criteria)

- [ ] API/feature hoạt động đúng IO chuẩn  
- [ ] Validation & error handling đúng yêu cầu  
- [ ] Unit test coverage ≥ 80%  
- [ ] Linter pass, tuân thủ coding standard  
- [ ] Chỉ upload/modify file được phép  
- [ ] Merge PR sau review thành công  

---

## 6. Ghi chú đặc biệt (Special Notes)

- [ ] Không commit secrets hoặc file ảnh thực tế  
- [ ] Kiểm tra `.env` / config trước commit  
- [ ] Không sửa các core config hoặc file ngoài folder cho phép  
- [ ] Nếu có chỗ chưa rõ, **dừng lại & hỏi Control Plane**  

---

> [!TIP]  
> **Hướng dẫn cho Agent:** Đọc kỹ template trước khi `git add`. Tuân thủ folder, validation, test, commit & PR workflow. Nếu input/output chưa rõ hoặc rule nào chưa nắm, hỏi Control Plane trước khi code tiếp.