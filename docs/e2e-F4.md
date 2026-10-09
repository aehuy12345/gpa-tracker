# Test case E2E – F4. Sửa và xoá môn học

**Cách chạy:** `npm run dev`, mở địa chỉ hiện ra trong terminal (thường là http://localhost:5173).
Bắt đầu từ trang trống. Thêm sẵn 3 môn: Toán 3 tín chỉ điểm 9; Lý 1 tín chỉ điểm 5,5; Hoá 4 tín chỉ điểm 7.
Cột "Kết quả" để trống, người test tự điền Đạt / Không đạt.

| # | Thao tác | Mong đợi | Kết quả |
|---|----------|----------|---------|
| 1 | Nhìn bảng | Mỗi dòng có nút "Sửa" và "Xoá" | |
| 2 | Bấm "Sửa" ở dòng Lý | Form hiện Lý / 1 / 5.5, nút đổi thành "Lưu", hiện nút "Huỷ", dòng Lý được tô nền vàng, con trỏ ở ô Tên môn | |
| 3 | Đổi thành Vật lý, 2 tín chỉ, 8,5 rồi bấm "Lưu" | Dòng 2 thành Vật lý / 2 / 8.5 / A / 4.0 (vẫn ở vị trí thứ 2); form trống, nút về "Thêm môn", hết nút "Huỷ"; GPA và tổng tín chỉ (9) cập nhật | |
| 4 | Bấm "Sửa" ở Toán, xoá trống Tên môn, nhập điểm 11, bấm "Lưu" | Báo lỗi dưới ô Tên môn và ô Điểm (cùng nội dung như khi thêm môn); vẫn ở chế độ "Lưu"; bảng không đổi | |
| 5 | Sửa lại hợp lệ (Toán, 3, 9,5) rồi "Lưu" | Lưu thành công, Toán có điểm 9.5 | |
| 6 | Bấm "Sửa" ở Hoá rồi bấm "Huỷ" | Form trống, nút về "Thêm môn", bảng không đổi | |
| 7 | Bấm "Sửa" ở Toán, rồi bấm "Sửa" ở Hoá | Form chuyển sang dữ liệu Hoá; chỉ dòng Hoá được tô nền | |
| 8 | Bấm "Xoá" ở Vật lý, chọn Huỷ/Cancel ở hộp xác nhận | Bảng giữ nguyên | |
| 9 | Bấm "Xoá" ở Vật lý, chọn OK | Vật lý biến mất; GPA, tổng môn, tổng tín chỉ cập nhật | |
| 10 | Bấm "Sửa" ở Toán, rồi "Xoá" môn Hoá (OK) | Hoá bị xoá; vẫn đang sửa Toán (nút "Lưu", form còn dữ liệu Toán) | |
| 11 | Đang sửa Toán, bấm "Xoá" ở Toán (OK) | Toán bị xoá; form trống, nút về "Thêm môn" | |
| 12 | Xoá hết các môn còn lại | Hiện "Hãy thêm môn học đầu tiên"; GPA và Xếp loại là "—" | |
| 13 | Thu cửa sổ còn 360px, thêm vài môn | Cột "Thao tác" vẫn bấm được (bảng cuộn ngang nếu cần), trang không vỡ | |

Ghi chú: dữ liệu chưa được lưu khi tải lại trang (chức năng F5).
