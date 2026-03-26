# Chỉ thị triển khai dự án (Agent Ready)

**Tên tác nhân**: [Tên tác nhân / Lập trình viên]  
**Dự án**: [Tên dự án / Tính năng]  
**Ngày ban hành**: [Ngày ban hành]  

---

## 1. Bối cảnh và mục tiêu

- [ ] **Mô tả**: [Mô tả ngắn gọn về tính năng hoặc dự án]  
- [ ] **Tài liệu tham chiếu**: [Đường dẫn đến PRD hoặc Architecture Docs]  
- [ ] **Mục tiêu ưu tiên**: [Hiệu năng / Bảo mật / Thời gian hoàn thành]  
- [ ] **Kiểm soát viên (Control Plane)**: [Tác nhân kiểm duyệt trước khi xác nhận thay đổi]  

---

## 2. Đặc tả kỹ thuật

- [ ] **Môi trường thực thi**:  
  - Backend: Node.js v20 + Express 5.x  
  - Frontend: React 20.x + Vite  

- [ ] **Cấu trúc thư mục được phép chỉnh sửa**:  
```text
backend/
src/
routes/ # [tạo hoặc chỉnh sửa tệp route]
controllers/ # [tạo hoặc chỉnh sửa tệp controller]
services/ # [tạo hoặc chỉnh sửa tệp service]
frontend/
src/
components/ # [tạo hoặc chỉnh sửa tệp component]
hooks/ # [tạo hoặc chỉnh sửa mã nguồn hooks]
```
> Ghi chú: Không thay đổi các tệp cấu hình cốt lõi, thư mục phụ thuộc hoặc tài nguyên gốc.

- [ ] **Các phụ thuộc mới (yêu cầu phiên bản cụ thể)**:  
- Ví dụ: `multer@1.4.5`, `dotenv@16.1.0`  

- [ ] **Cơ sở dữ liệu và chuyển đổi (Migration)**: [Mô tả schema cần tạo hoặc chỉnh sửa]  

- [ ] **Giao diện lập trình (API Input/Output)**:  
- Đầu vào: `{ file: File }`  
- Đầu ra: `{ success: boolean, url?: string, error?: string }`  

---

## 3. Quy tắc và ràng buộc đối với tác nhân

- [ ] **Tiêu chuẩn lập trình**: Tuân thủ các quy định tại mục tiêu chuẩn lập trình backend/frontend.
- [ ] **Quy ước đặt tên**: Sử dụng camelCase cho biến, PascalCase cho lớp hoặc thành phần.
- [ ] **Mô hình lập trình**:  
- Service layer xử lý logic nghiệp vụ.
- Controller thực hiện điều phối yêu cầu và phản hồi.
- Áp dụng các mẫu thiết kế phù hợp nếu cần thiết.

- [ ] **Quy tắc xác thực**:  
- Kích thước tệp tin dưới 5MB.
- Định dạng tệp tin cho phép: jpg, png.
- Trả về thông báo lỗi dạng JSON nếu xác thực thất bại.

- [ ] **Xử lý lỗi**: Đảm bảo trả về mã trạng thái và thông báo lỗi rõ ràng.

- [ ] **Kiểm thử**:  
- Thực hiện kiểm thử đơn vị cho controller và service.
- Độ bao phủ mã nguồn (coverage) đạt tối thiểu 80%.
- Vượt qua các bước kiểm tra cú pháp (linter).

---

## 4. Quy trình thực hiện từng bước

1.  [ ] Nhận nhánh tính năng mới: `git checkout -b feature/<ten-tinh-nang>`  
2.  [ ] Cài đặt các phụ thuộc theo phiên bản chỉ định.
3.  [ ] Xây dựng cấu trúc service/controller theo đúng quy định.
4.  [ ] Triển khai giao diện lập trình kèm theo các bước xác thực và xử lý lỗi.
5.  [ ] Thực hiện kiểm thử đơn vị, đảm bảo độ bao phủ mã nguồn.
6.  [ ] Chạy linter và kiểm thử tổng thể trước khi xác nhận thay đổi.
7.  [ ] Xác nhận thay đổi mã nguồn với thông điệp chuẩn.
8.  [ ] Khởi tạo yêu cầu hợp nhất (PR) và đợi phản hồi từ Control Plane.
9.  [ ] Chỉ thực hiện hợp nhất khi các điều kiện kiểm thử đã đạt yêu cầu.

---

## 5. Tiêu chí nghiệm thu

- [ ] Tính năng hoạt động đúng theo đặc tả giao diện lập trình.
- [ ] Quy trình xác thực và xử lý lỗi được triển khai đầy đủ.
- [ ] Độ bao phủ kiểm thử đạt mục tiêu đề ra.
- [ ] Mã nguồn tuân thủ các quy định về phong cách lập trình.
- [ ] Chỉ thay đổi các tệp tin trong phạm vi được phép.

---

## 6. Ghi chú bổ sung

- [ ] Tuyệt đối không lưu trữ các khóa bảo mật hoặc tệp tin thực tế trong mã nguồn.
- [ ] Kiểm tra kỹ tệp cấu hình môi trường trước khi xác nhận thay đổi.
- [ ] Trường hợp có nội dung chưa rõ ràng, cần dừng lại và yêu cầu làm rõ từ Control Plane.

---
> [!TIP]
> Tác nhân cần rà soát kỹ các yêu cầu về xác thực, kiểm thử và quy trình hợp nhất mã nguồn trước khi bắt đầu thực thi.