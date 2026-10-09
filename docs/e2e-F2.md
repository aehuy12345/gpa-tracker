# Test case E2E – F2. Quy đổi điểm

**Cách chạy:** `npm run dev`, mở địa chỉ hiện ra trong terminal (thường là http://localhost:5173).
Thêm từng môn (tên và tín chỉ tuỳ ý) với điểm như bảng dưới, xem cột "Điểm chữ" và "Hệ 4" của dòng vừa thêm.
Cột "Kết quả" để trống, người test tự điền Đạt / Không đạt.

| # | Điểm nhập | Điểm chữ mong đợi | Hệ 4 mong đợi | Kết quả |
|---|-----------|-------------------|---------------|---------|
| 1 | 10 | A | 4.0 | |
| 2 | 8.5 | A | 4.0 | |
| 3 | 8.4 | B+ | 3.5 | |
| 4 | 8 | B+ | 3.5 | |
| 5 | 7.9 | B | 3.0 | |
| 6 | 7 | B | 3.0 | |
| 7 | 6.9 | C+ | 2.5 | |
| 8 | 6,5 (dấu phẩy) | C+ | 2.5 | |
| 9 | 6.4 | C | 2.0 | |
| 10 | 5.5 | C | 2.0 | |
| 11 | 5.4 | D+ | 1.5 | |
| 12 | 5 | D+ | 1.5 | |
| 13 | 4.9 | D | 1.0 | |
| 14 | 4 | D | 1.0 | |
| 15 | 3.9 | F | 0.0 | |
| 16 | 0 | F | 0.0 | |
| 17 | 8.45 (làm tròn trước khi quy đổi → 8.5) | A | 4.0 | |
| 18 | 8.44 (làm tròn → 8.4) | B+ | 3.5 | |
| 19 | Thu cửa sổ còn 360px | Bảng 5 cột vẫn đọc được, cuộn ngang trong bảng, không vỡ trang | | |
