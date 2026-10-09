# Test case E2E – F3. Tính GPA và xếp loại

**Cách chạy:** `npm run dev`, mở địa chỉ hiện ra trong terminal (thường là http://localhost:5173).
Bắt đầu từ trang trống (tải lại trang nếu còn môn). Làm lần lượt các bước, xem khối "Kết quả".
Cột "Kết quả" để trống, người test tự điền Đạt / Không đạt.

| # | Thao tác | Mong đợi | Kết quả |
|---|----------|----------|---------|
| 1 | Mở trang, chưa thêm môn | GPA hệ 4, GPA hệ 10, Xếp loại đều là "—"; tổng môn / tín chỉ / tín chỉ đạt = 0; có dòng "Hãy thêm môn học đầu tiên" | |
| 2 | Thêm: Toán, 3 tín chỉ, 9 | GPA hệ 4 = 4.00; hệ 10 = 9.00; Xuất sắc; 1 môn, 3 tín chỉ, 3 đạt | |
| 3 | Thêm tiếp: Lý, 1 tín chỉ, 5,5 | GPA hệ 4 = 3.50; hệ 10 = 8.13; Giỏi; 2 môn, 4 tín chỉ, 4 đạt | |
| 4 | Thêm tiếp: Hoá, 4 tín chỉ, 3.9 (điểm F) | GPA hệ 4 = 1.75; hệ 10 = 6.01; Yếu; 3 môn, 8 tín chỉ, **4** đạt | |
| 5 | Thêm môn sai (điểm 11) | Báo lỗi, các số trong khối Kết quả không đổi | |
| 6 | Thêm: Văn, 2 tín chỉ, 4 | Tín chỉ đạt tăng đúng 2 (điểm 4.0 vẫn tính đạt) | |
| 7 | Tải lại trang, thêm 1 môn 3 tín chỉ điểm 7 | GPA hệ 4 = 3.00; hệ 10 = 7.00; Khá | |
| 8 | Thêm tiếp 1 môn 3 tín chỉ điểm 5 | GPA hệ 4 = 2.25; hệ 10 = 6.00; Trung bình | |
| 9 | Thu cửa sổ còn 360px | Khối Kết quả xếp 2 cột, đọc được, không vỡ trang | |

