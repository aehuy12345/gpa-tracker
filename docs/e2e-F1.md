# Test case E2E – F1. Thêm môn học

**Cách chạy:** `npm run dev`, mở địa chỉ hiện ra trong terminal (thường là http://localhost:5173).
Cột "Kết quả" để trống, người test tự điền Đạt / Không đạt.

| # | Thao tác | Kết quả mong đợi | Kết quả |
|---|----------|------------------|---------|
| 1 | Mở trang lần đầu | Thấy form 3 ô, dòng "Hãy thêm môn học đầu tiên", chưa có bảng | |
| 2 | Nhập Tên "Giải tích", Tín chỉ "3", Điểm "8.5", bấm "Thêm môn" | Bảng hiện 1 dòng: Giải tích / 3 / 8.5; form xoá trắng; con trỏ ở ô Tên môn; dòng hướng dẫn biến mất | |
| 3 | Nhập đủ 3 ô rồi nhấn Enter (không bấm nút) | Môn được thêm như test 2 | |
| 4 | Điểm nhập "8,5" (dấu phẩy) | Chấp nhận, bảng hiện 8.5 | |
| 5 | Điểm nhập "8.56" | Bảng hiện 8.6 (làm tròn 1 chữ số) | |
| 6 | Điểm nhập "0" và "10" | Cả hai được chấp nhận (hiện 0.0 và 10.0) | |
| 7 | Tên nhập "   Toán   " (khoảng trắng 2 đầu) | Bảng hiện "Toán", không còn khoảng trắng thừa | |
| 8 | Thêm 3 môn liên tiếp | Môn mới luôn nằm cuối bảng, theo thứ tự đã nhập | |
| 9 | Để trống cả 3 ô, bấm "Thêm môn" | 3 lỗi đỏ dưới từng ô: "Vui lòng nhập tên môn." / "Số tín chỉ phải là số nguyên từ 1 đến 10." / "Điểm phải là số từ 0 đến 10."; con trỏ ở ô Tên môn; không thêm môn | |
| 10 | Tên 101 ký tự, các ô khác đúng | Lỗi "Tên môn tối đa 100 ký tự." | |
| 11 | Tên đúng 100 ký tự | Được chấp nhận | |
| 12 | Tín chỉ nhập "0", "11", "2.5", "abc" (từng lần) | Mỗi lần đều báo "Số tín chỉ phải là số nguyên từ 1 đến 10." | |
| 13 | Tín chỉ nhập "1" và "10" | Cả hai được chấp nhận | |
| 14 | Điểm nhập "11", "-1", "abc", để trống (từng lần) | Mỗi lần đều báo "Điểm phải là số từ 0 đến 10." | |
| 15 | Chỉ sai ô Điểm, hai ô kia đúng | Chỉ ô Điểm báo lỗi; con trỏ vào ô Điểm; dữ liệu ở 2 ô kia được giữ nguyên | |
| 16 | Nhập sai (hiện lỗi) rồi sửa đúng và bấm lại | Lỗi cũ biến mất, môn được thêm | |
| 17 | Tên nhập `<b>x</b>` | Bảng hiện đúng chữ `<b>x</b>`, không bị in đậm | |
| 18 | Thu cửa sổ trình duyệt còn 360px chiều rộng | Không bị vỡ giao diện, không thanh cuộn ngang toàn trang; bảng đọc được (tên dài tự cuộn trong bảng) | |
| 19 | Tải lại trang sau khi thêm môn | Danh sách vẫn còn (xem thêm e2e-F5.md) | |
