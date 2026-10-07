# PLAN – GPA Tracker (Waterfall)

Nguồn yêu cầu: `PRD.md`. Làm lần lượt từng giai đoạn; xong giai đoạn trước mới sang giai đoạn sau. Theo dõi tiến độ thực tế trong `STATUS.md`.

## Tổng quan giai đoạn

| Giai đoạn | Nội dung | Sản phẩm bàn giao | Điều kiện hoàn thành |
|-----------|----------|-------------------|----------------------|
| 1. Yêu cầu | Chốt PRD | `PRD.md` | PM xác nhận PRD |
| 2. Thiết kế | Vẽ luồng nghiệp vụ F1–F5 bằng flowchart Mermaid | Thư mục `docs/` chứa flowchart từng chức năng | PM duyệt các luồng |
| 3. Triển khai | Dựng khung dự án, viết code và unit test theo thứ tự phụ thuộc | Mã nguồn + unit test | Đủ chức năng theo PRD |
| 4. Kiểm tra | Tự chạy toàn bộ unit test, sửa lỗi | Kết quả test đạt | Tất cả test đạt |
| 5. E2E test | Soạn test case trên giao diện cho PM tự test | Bảng test case cân bằng (tình huống chính + lỗi quan trọng) | PM test xong và chấp nhận |
| 6. Triển khai | Đưa lên Vercel | URL công khai | Mở được URL, chạy đúng |

## Thứ tự làm chức năng (theo phụ thuộc trong PRD)

1. **F1 – Thêm môn học** (nền tảng, không phụ thuộc)
2. **F2 – Quy đổi điểm** (cần F1)
3. **F3 – Tính GPA và xếp loại** (cần F2)
4. **F4 – Sửa/xoá môn học** (cần F1)
5. **F5 – Lưu dữ liệu** (cần F1, F4)

## Chi tiết từng giai đoạn

### 2. Thiết kế
- Mỗi chức năng một flowchart Mermaid (cú pháp mới nhất), gồm luồng chính và các nhánh lỗi/validate.
- PM duyệt trước khi viết code.

### 3. Triển khai
- Dựng khung Vite + JavaScript thuần, cài Vitest.
- Với mỗi chức năng: viết code và unit test cùng lúc.
- Tách phần tính toán (quy đổi, GPA, kiểm tra dữ liệu) khỏi phần giao diện để dễ test.

### 4. Kiểm tra
- Tự chạy test sau mỗi chức năng và một lần toàn bộ khi xong.
- Chỉ báo hoàn thành khi test đạt.

### 5. E2E test
- Test trên giao diện thật, kèm bảng test case để PM tự test.
- Số test case cân bằng: phủ các tình huống chính và lỗi quan trọng, không dàn trải.

### 6. Triển khai
- Đưa lên Vercel, kiểm tra URL công khai và giao diện trên điện thoại (từ 360px).

## Rủi ro cần để ý
- Làm tròn điểm và ranh giới quy đổi (ví dụ 8.4 và 8.5) dễ sai: cần test kỹ.
- Dữ liệu lưu trên trình duyệt có thể hỏng: phải có cách xử lý không làm trắng trang.
- PRD thay đổi giữa chừng sẽ ảnh hưởng các giai đoạn đã xong: mọi thay đổi ghi vào `STATUS.md`.
