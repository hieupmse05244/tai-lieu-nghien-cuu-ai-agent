# Đặc tả phối hợp: Nhóm QC Agent

Tài liệu này quy định cách thức phối hợp giữa các tác nhân trong nhóm kiểm soát chất lượng (QC Group).

## 1. Thành phần nhóm
Nhóm QC bao gồm các vai trò chuyên biệt sau:

1.  **Solution Architect (SAc) Agent**: Thiết kế kiến trúc hệ thống và hợp đồng kỹ thuật.
2.  **Tech Lead Agent**: Kiểm duyệt việc thực thi kiến trúc và logic nghiệp vụ.
3.  **QA/Tester Agent**: Xác thực chức năng và các kịch bản ngoại lệ.
4.  **Security Agent**: Kiểm soát các rủi ro bảo mật và rò rỉ dữ liệu.

## 2. Quy tắc phối hợp

### 2.1. Mô hình đồng thuận
- Các thay đổi mã nguồn yêu cầu sự đồng ý từ các thành viên có liên quan trước khi được chấp nhận.
- **Quyền phủ quyết**: Tech Lead và Security Agent có quyền từ chối nếu phát hiện các vi phạm nghiêm trọng về kiến trúc hoặc bảo mật.

### 2.2. Quy trình kiểm duyệt
1. **Tiếp nhận**: Nhóm QC nhận thông báo về thay đổi mã nguồn.
2. **Phân tích song song**:
    - Tác nhân QA/Tester thực hiện các kịch bản xác thực chức năng.
    - Tác nhân Security rà soát các lỗ hổng tiềm tàng.
    - Tác nhân Tech Lead đối soát cấu trúc và logic tổng thể.
3. **Tổng hợp**: Tech Lead thu thập các phản hồi và đưa ra kết luận cuối cùng cho phía thực thi.

---
> [!NOTE]
> Nhóm QC hoạt động như một hệ thống lọc đa tầng nhằm phát hiện lỗi tại các giai đoạn sớm của chu trình phát triển.
