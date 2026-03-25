---
description: Khởi tạo cấu trúc dự án thử nghiệm mới (Setup New Experiment)
---

Sử dụng workflow này để khởi tạo một thư mục dự án thử nghiệm mới với đầy đủ các tệp tiêu chuẩn.

1.  Tạo thư mục dự án mới trong `07-Experiments/`.
2.  Sao chép nội dung chuẩn vào `.gitignore`:
    - File nguồn: `05-Standards-Guidelines/Ignore-Files.standard.md` (Phần 1)
3.  Sao chép nội dung chuẩn vào `.dockerignore`:
    - File nguồn: `05-Standards-Guidelines/Ignore-Files.standard.md` (Phần 2)
4.  Tạo thư mục `docs/`.
5.  Khởi tạo `README.md` cơ bản.

// turbo
6.  Chạy lệnh sau để tạo nhanh (thay `<PROJECT_NAME>`):
    ```bash
    mkdir -p 07-Experiments/<PROJECT_NAME>/docs
    touch 07-Experiments/<PROJECT_NAME>/.gitignore
    touch 07-Experiments/<PROJECT_NAME>/.dockerignore
    ```
