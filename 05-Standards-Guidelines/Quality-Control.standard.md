# Tiêu chuẩn Kiểm soát Chất lượng (Quality Control Standard)

Tài liệu này định nghĩa các quy tắc và quy trình đánh giá mã nguồn do các Agent thực hiện trong hệ thống Agent Factory.

---

## 1. Hệ thống Chấm điểm (Scoring Matrix)

Mọi mã nguồn sinh ra phải được đánh giá dựa trên thang điểm 10. Điểm tối thiểu để được phê duyệt (`Passed`) là **8/10**.

| Tiêu chí | Trọng số | Mô tả |
| :--- | :--- | :--- |
| **Tính đúng đắn (Correctness)** | 40% | Code giải quyết đúng yêu cầu trong PRD và logic trong Task. |
| **Tuân thủ Thiết kế (Contract Compliance)** | 30% | Đúng Schema, đúng API Endpoints, đúng kiểu dữ liệu đã định nghĩa. |
| **Chất lượng mã (Code Quality)** | 20% | Clean code, dễ đọc, không có code thừa, đặt tên đúng chuẩn. |
| **Bảo mật & Hiệu năng (Security & Perf)** | 10% | Không lộ secret, xử lý lỗi tốt, không gây treo hệ thống. |

---

## 2. Quy trình QC (QC Workflow)

1.  **Giai đoạn 1: Soft Check (AI Review)**:
    - Tech Lead Agent đọc code và so sánh với `Contract.md`.
    - Đưa ra điểm số và nhận xét chi tiết.
2.  **Giai đoạn 2: Hard Check (Technical Check)**:
    - Chạy Linter để kiểm tra cú pháp.
    - Chạy Unit Test để xác nhận logic thực tế.
3.  **Giai đoạn 3: Self-Healing**:
    - Nếu điểm < 8 hoặc Test fail, thông tin được gửi ngược lại cho Coder Agent để sửa lỗi (tối đa 3 lần).

---

## 3. Rào cản Kỹ thuật (Gatekeepers)

- **Không được phép**: Hardcode API Key, sử dụng hàm `eval()`, bỏ qua lỗi (empty catch), đặt tên biến mơ hồ (`a`, `b`, `c`).
- **Bắt buộc**: Phải có xử lý lỗi `try-catch`, phải có log quan trọng, phải sử dụng đúng định dạng thời gian (UTC+7).

---
> [!IMPORTANT]
> **Hướng dẫn cho QC Agent**: Bạn là "phanh" của chiếc xe Agent Factory. Nhiệm vụ của bạn không phải là giúp xe chạy nhanh, mà là đảm bảo xe dừng lại khi có nguy hiểm. Hãy khắt khe!
