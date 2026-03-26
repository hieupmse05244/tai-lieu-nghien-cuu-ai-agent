# Tiêu chuẩn loại trừ tệp tin (Ignore Files Standard)

Quy định các mẫu tệp tin và thư mục cần được loại trừ khỏi quá trình theo dõi của hệ thống quản lý phiên bản (Git) và môi trường Docker để đảm bảo bảo mật và hiệu năng.

## 1. Nguyên tắc chung
- Loại trừ tất cả các tệp tin chứa thông tin nhạy cảm, khóa bí mật và cấu hình môi trường cục bộ.
- Loại trừ các thư mục phụ thuộc, tệp tin tạm và kết quả của quá trình xây dựng (build artifacts).

## 2. Danh mục loại trừ theo thành phần

### 2.1. Cấu trúc gốc của dự án (Project Root)
- Các thư mục phụ thuộc: `node_modules/`, `venv/`, `.env`.
- Tệp nhật ký: `*.log`, `npm-debug.log*`.
- Cấu hình IDE: `.vscode/`, `.idea/`.

### 2.2. Thành phần Backend
- Kết quả biên dịch: `dist/`, `build/`.
- Tệp tin tạm thời của cơ sở dữ liệu: `*.sqlite`.

### 2.3. Thành phần Frontend
- Thư mục phân phối: `dist/`.
- Tệp tin cấu hình cá nhân: `.env.local`.

### 2.4. Tác nhân thực thi (Runner/Agents)
- Thông tin xác thực: `api_key*`, `.env`.
- Dữ liệu trạng thái thực thi: `state.json`.

## 3. Triển khai trong thực tế

Mọi dự án thực nghiệm mới khi được khởi tạo yêu cầu phải thiết lập đầy đủ các tệp `.gitignore` và `.dockerignore` tại các thư mục tương ứng theo các quy tắc trên. Việc này giúp ngăn chặn tình trạng vô tình đẩy các dữ liệu nhạy cảm lên kho lưu trữ chung.

---
> [!WARNING]
> Việc không tuân thủ các quy tắc loại trừ có thể dẫn đến rủi ro bảo mật nghiêm trọng cho toàn bộ hệ thống.
