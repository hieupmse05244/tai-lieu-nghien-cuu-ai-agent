# Tiêu chuẩn rà soát điểm mờ (Ambiguity Detector Standard)

Sử dụng tư duy phản biện để nhận diện các điểm chưa rõ ràng trong yêu cầu từ phía người dùng, đảm bảo tính khả thi trước khi chuyển sang giai đoạn thực thi mã nguồn.

## 1. Danh mục rà soát các điểm chưa rõ ràng

### 1.1. Luồng dữ liệu (Data Flow)
- Quy trình xử lý dữ liệu từ khâu tiếp nhận đến khâu phản hồi.
- Các điểm trung gian có khả năng gây mất mát hoặc sai lệch thông tin.

### 1.2. Logic nghiệp vụ (Business Logic)
- Các quy tắc nghiệp vụ còn thiếu hoặc gây mâu thuẫn.
- Các ranh giới về quyền hạn và phạm vi xử lý.

### 1.3. Xác thực và bảo mật (Auth & Security)
- Các cơ chế kiểm tra quyền truy cập đối với các yêu cầu nhạy cảm.
- Cách thức xử lý các thông báo lỗi liên quan đến bảo mật.

### 1.4. Ràng buộc dữ liệu (Constraints)
- Giới hạn về dung lượng, định dạng và thời gian phản hồi.
- Các quy định đặc thù về hình ảnh hoặc tệp tin đính kèm.

### 1.5. Các kịch bản ngoại lệ (Edge Cases)
- Các hành vi của hệ thống khi dữ liệu không đúng mong đợi.
- Các trường hợp gián đoạn kết nối hoặc quá tải tài nguyên.

## 2. Quy trình thực hiện phản biện

Khi tiếp nhận yêu cầu, tác nhân BA thực hiện quy trình sau:
1. **Phân tích đối soát**: So sánh yêu cầu mới với các tiêu chuẩn kiến trúc hiện có.
2. **Nhận diện rủi ro**: Chỉ ra các yếu tố có thể gây ảnh hưởng đến hiệu suất hoặc bảo mật.
3. **Đề xuất làm rõ**: Chuyển đổi các điểm mờ thành các câu hỏi có tính chất ngăn chặn (blocking) dành cho người dùng.

## 3. Kết quả đầu ra của quá trình phản biện
Yêu cầu hoàn tất khâu rà soát khi đạt được:
- Sự xác nhận từ phía người dùng cho tất cả bộ câu hỏi làm rõ.
- Hồ sơ đặc tả đã bao quát được các kịch bản ngoại lệ quan trọng.

---
> [!NOTE]
> Việc rà soát kỹ lưỡng tại giai đoạn này giúp giảm thiểu đáng kể thời gian sửa lỗi tại các giai đoạn sau của dự án.
