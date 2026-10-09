# Test case E2E – F5. Lưu dữ liệu

**Cách chạy:** `npm run dev`, mở địa chỉ hiện ra trong terminal (thường là http://localhost:5173).
Bắt đầu từ trang trống (nếu còn dữ liệu cũ, bấm "Xoá tất cả" trước).
Cột "Kết quả" để trống, người test tự điền Đạt / Không đạt.

| # | Thao tác | Mong đợi | Kết quả |
|---|----------|----------|---------|
| 1 | Mở trang trống | Nút "Xoá tất cả" mờ, không bấm được | |
| 2 | Thêm Toán 3 tín chỉ điểm 9; Lý 1 tín chỉ điểm 5,5 | 2 môn trong bảng; nút "Xoá tất cả" bấm được | |
| 3 | Tải lại trang (F5) | Vẫn còn Toán và Lý, GPA hệ 4 là 3.50 | |
| 4 | Sửa Lý thành Vật lý, 2 tín chỉ, 8 rồi "Lưu"; tải lại trang | Dòng 2 vẫn là Vật lý / 2 / 8.0 | |
| 5 | Xoá môn Toán (OK); tải lại trang | Toán không quay lại | |
| 6 | Đóng tab, mở lại địa chỉ cũ | Dữ liệu vẫn còn | |
| 7 | Bấm "Xoá tất cả", chọn Huỷ/Cancel | Bảng giữ nguyên | |
| 8 | Đang sửa một môn, bấm "Xoá tất cả", chọn OK | Bảng trống, form thoát chế độ sửa (nút "Thêm môn"), GPA là "—", hiện "Hãy thêm môn học đầu tiên", nút "Xoá tất cả" mờ | |
| 9 | Tải lại trang sau bước 8 | Vẫn trống | |
| 10 | Thêm vài môn. Mở DevTools (F12) > Application > Local Storage, sửa giá trị của key `gpa-tracker:v1` thành `abc` rồi tải lại trang | Trang vẫn hiển thị bình thường, danh sách trống, không trắng trang | |
| 11 | Sửa key đó thành `[{"id":"a","name":"Toán","credits":3,"score":9},{"id":"b","name":"","credits":3,"score":9}]` rồi tải lại | Chỉ còn môn Toán (môn sai bị bỏ) | |
| 12 | Xoá key `gpa-tracker:v1` rồi tải lại | Trang trống, bình thường | |
| 13 | Thêm môn mới sau bước 10–12 | Thêm được, tải lại vẫn còn | |
| 14 | Trình duyệt chặn lưu dữ liệu (cửa sổ ẩn danh nghiêm ngặt hoặc chặn cookie/site data), thêm một môn | Môn vẫn được thêm; hiện cảnh báo "Không lưu được dữ liệu…" | |
