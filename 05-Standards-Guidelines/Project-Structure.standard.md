# Tiêu chuẩn cấu trúc thư mục (Project Structure Standard)

Quy định cấu trúc thư mục chuẩn cho các dự án thực nghiệm trong hệ sinh thái Agent Factory. Việc tuân thủ cấu trúc này là bắt buộc để các tác nhân điều phối có thể hoạt động hiệu quả.

## 1. Cấu trúc thư mục gốc (Root Structure)

Mỗi dự án thực nghiệm cần tuân theo sơ đồ sau:

```text
/
├── docs/                 # Đặc tả thiết kế và yêu cầu
│   ├── PRD.spec.md       # Yêu cầu sản phẩm
│   ├── Contract.spec.md  # Hợp đồng giao diện (API/DB)
│   └── User-Flow.spec.md # Luồng người dùng
├── backend/              # Mã nguồn phía máy chủ
├── frontend/             # Mã nguồn phía máy khách
├── agents/               # Cấu hình và tệp hỗ trợ tác nhân
│   └── runner/           # Công cụ điều phối thực thi nhiệm vụ
├── tests/                # Bộ kiểm thử tích hợp và hệ thống
└── .gitignore            # Quy định loại trừ tệp tin
```

## 2. Quy định chi tiết các thành phần

### 2.1. Thư mục Tài liệu (docs/)
- Lưu trữ các tệp mỏ neo cho quá trình phát triển.
- Các tệp tin trong thư mục này được coi là nguồn dữ liệu chuẩn cho các tác nhân.

### 2.2. Thư mục Mã nguồn (backend/ & frontend/)
- Phải đảm bảo sự phân tách rõ ràng giữa các lớp xử lý (modules).
- Các tệp cấu hình môi trường phải được bảo mật và không đưa vào kho lưu trữ chung.

### 2.3. Thư mục Tác nhân (agents/)
- Chứa các chỉ thị thực thi chuyên biệt dành riêng cho từng dự án.
- Bao gồm các định nghĩa về logic vận hành của các công cụ điều phối (runner).

## 3. Quản lý phiên bản và quy trình hợp nhất
- Sử dụng quy trình rẽ nhánh theo tính năng (feature/name).
- Hợp nhất mã nguồn chỉ được thực hiện sau khi vượt qua các bước kiểm soát chất lượng từ nhóm QC.

---
> [!TIP]
> Một cấu trúc thư mục rõ ràng là yếu tố tiên quyết để các tác nhân tự động có thể hiểu và thao tác chính xác trên mã nguồn.
