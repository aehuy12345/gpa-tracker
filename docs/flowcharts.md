# Luồng nghiệp vụ – GPA Tracker

Thiết kế từ `PRD.md`, mỗi chức năng một flowchart (Mermaid). Chờ PM duyệt trước khi viết code.

## 0. Tổng quan luồng ứng dụng

```mermaid
flowchart TD
    A(["Mở trang"]) --> B["F5: Nạp dữ liệu từ localStorage"]
    B --> C["F3: Hiển thị bảng môn học và GPA"]
    C --> D{"Người dùng thao tác"}
    D -- "Thêm môn" --> F1["F1: Thêm môn học"]
    D -- "Sửa" --> F4a["F4: Sửa môn"]
    D -- "Xoá" --> F4b["F4: Xoá môn"]
    D -- "Xoá tất cả" --> F5b["F5: Xoá tất cả"]
    F1 --> U["Danh sách thay đổi"]
    F4a --> U
    F4b --> U
    F5b --> U
    U --> S["F5: Lưu vào localStorage"]
    U --> R["F3: Tính lại GPA và hiển thị"]
    S --> D
    R --> D
```

Quy đổi điểm (F2) được F3 gọi cho từng môn, và được dùng để hiển thị điểm chữ / hệ 4 trên mỗi dòng của bảng.

## F1. Thêm môn học

```mermaid
flowchart TD
    A(["Bắt đầu"]) --> B["Nhập Tên môn, Số tín chỉ, Điểm hệ 10"]
    B --> C["Nhấn 'Thêm môn' hoặc Enter"]
    C --> D["Xoá các lỗi cũ"]
    D --> E["Bỏ khoảng trắng 2 đầu Tên môn,<br/>đổi dấu ',' thành '.' ở Điểm"]
    E --> F{"Tên môn hợp lệ?<br/>(không trống, tối đa 100 ký tự)"}
    F -- Không --> F1["Đánh dấu lỗi Tên môn"]
    F -- Có --> G
    F1 --> G{"Số tín chỉ hợp lệ?<br/>(số nguyên 1–10)"}
    G -- Không --> G1["Đánh dấu lỗi Số tín chỉ"]
    G -- Có --> H
    G1 --> H{"Điểm hợp lệ?<br/>(số 0–10)"}
    H -- Không --> H1["Đánh dấu lỗi Điểm"]
    H -- Có --> I{"Có lỗi nào?"}
    H1 --> I
    I -- Có --> J["Hiện lỗi tiếng Việt dưới từng ô sai,<br/>đặt con trỏ vào ô sai đầu tiên"]
    J --> B
    I -- Không --> K["Làm tròn điểm 1 chữ số thập phân"]
    K --> L["Thêm môn vào cuối bảng"]
    L --> M["Xoá trắng form, đặt con trỏ vào ô Tên môn"]
    M --> N["Cập nhật GPA (F3) và lưu dữ liệu (F5)"]
    N --> Z(["Kết thúc"])
```

Thông báo lỗi (tiếng Việt):

| Ô | Điều kiện | Thông báo |
|---|-----------|-----------|
| Tên môn | Trống | "Vui lòng nhập tên môn." |
| Tên môn | > 100 ký tự | "Tên môn tối đa 100 ký tự." |
| Số tín chỉ | Trống / không phải số nguyên / ngoài 1–10 | "Số tín chỉ phải là số nguyên từ 1 đến 10." |
| Điểm | Trống / không phải số / ngoài 0–10 | "Điểm phải là số từ 0 đến 10." |

## F2. Quy đổi điểm

Điểm được làm tròn 1 chữ số **trước** khi quy đổi (đã làm tròn ở F1).

```mermaid
flowchart TD
    A(["Điểm hệ 10 (đã làm tròn 1 chữ số)"]) --> B{"Điểm ≥ 8.5?"}
    B -- Có --> R1["A – 4.0"]
    B -- Không --> C{"Điểm ≥ 8.0?"}
    C -- Có --> R2["B+ – 3.5"]
    C -- Không --> D{"Điểm ≥ 7.0?"}
    D -- Có --> R3["B – 3.0"]
    D -- Không --> E{"Điểm ≥ 6.5?"}
    E -- Có --> R4["C+ – 2.5"]
    E -- Không --> F{"Điểm ≥ 5.5?"}
    F -- Có --> R5["C – 2.0"]
    F -- Không --> G{"Điểm ≥ 5.0?"}
    G -- Có --> R6["D+ – 1.5"]
    G -- Không --> H{"Điểm ≥ 4.0?"}
    H -- Có --> R7["D – 1.0"]
    H -- Không --> R8["F – 0.0"]
```

## F3. Tính GPA và xếp loại

```mermaid
flowchart TD
    A(["Danh sách môn thay đổi"]) --> B["Cập nhật bảng: mỗi dòng hiện<br/>tên, tín chỉ, điểm 10, điểm chữ, điểm hệ 4"]
    B --> C{"Có môn nào?"}
    C -- Không --> D["Hiện '—' ở GPA và xếp loại,<br/>tổng số môn / tín chỉ = 0,<br/>dòng 'Hãy thêm môn học đầu tiên'"]
    C -- Có --> E["Quy đổi từng môn (F2)"]
    E --> F["Tính tổng số môn, tổng tín chỉ,<br/>tín chỉ đạt (chỉ môn có điểm ≥ 4.0)"]
    F --> G["GPA hệ 4 = Σ(điểm hệ 4 × tín chỉ) / Σ tín chỉ"]
    G --> H["GPA hệ 10 = Σ(điểm hệ 10 × tín chỉ) / Σ tín chỉ"]
    H --> I["Làm tròn 2 chữ số"]
    I --> J{"GPA hệ 4"}
    J -- "3.6–4.0" --> L1["Xuất sắc"]
    J -- "3.2 – dưới 3.6" --> L2["Giỏi"]
    J -- "2.5 – dưới 3.2" --> L3["Khá"]
    J -- "2.0 – dưới 2.5" --> L4["Trung bình"]
    J -- "dưới 2.0" --> L5["Yếu"]
    L1 --> Z["Hiển thị kết quả"]
    L2 --> Z
    L3 --> Z
    L4 --> Z
    L5 --> Z
    D --> Y(["Kết thúc"])
    Z --> Y
```

Lưu ý: môn điểm F vẫn được tính vào GPA (theo công thức PRD), chỉ không được tính vào tín chỉ đạt. Xếp loại xét trên GPA hệ 4 **đã làm tròn**.

## F4. Sửa và xoá môn học

```mermaid
flowchart TD
    A(["Bảng môn học"]) --> B{"Người dùng chọn"}

    B -- "Sửa" --> C["Đưa dữ liệu môn lên form,<br/>nút 'Thêm môn' đổi thành 'Lưu',<br/>hiện nút 'Huỷ', đánh dấu dòng đang sửa"]
    C --> D{"Người dùng chọn"}
    D -- "Huỷ" --> D1["Xoá trắng form,<br/>nút trở lại 'Thêm môn'"]
    D -- "Sửa dòng khác" --> C
    D -- "Lưu" --> E["Kiểm tra dữ liệu<br/>(cùng quy tắc và thông báo như F1)"]
    E --> F{"Hợp lệ?"}
    F -- Không --> G["Hiện lỗi dưới ô sai, giữ chế độ sửa"]
    G --> D
    F -- Có --> H["Cập nhật môn tại đúng vị trí,<br/>xoá trắng form, nút trở lại 'Thêm môn'"]

    B -- "Xoá" --> I{"Hộp xác nhận xoá môn?"}
    I -- Không --> J["Giữ nguyên"]
    I -- Có --> K["Xoá môn khỏi bảng"]
    K --> L{"Môn đó đang được sửa?"}
    L -- Có --> D1
    L -- Không --> M["Cập nhật GPA (F3) và lưu dữ liệu (F5)"]
    D1 --> M
    H --> M

    D1 --> Z(["Kết thúc"])
    J --> Z
    M --> Z
```

## F5. Lưu dữ liệu

```mermaid
flowchart TD
    subgraph Tải["Khi mở trang"]
        A(["Mở trang"]) --> B["Đọc localStorage<br/>key 'gpa-tracker:v1'"]
        B --> C{"Đọc được<br/>(không lỗi truy cập)?"}
        C -- Không --> D["Danh sách rỗng"]
        C -- Có --> C2{"Có dữ liệu?"}
        C2 -- Không --> D
        C2 -- Có --> C3{"Đúng định dạng JSON<br/>và là danh sách?"}
        C3 -- Không --> D
        C3 -- Có --> C4["Giữ lại từng môn hợp lệ<br/>(tên, tín chỉ, điểm đúng quy tắc F1),<br/>bỏ môn sai"]
        C4 --> E["Nạp danh sách môn"]
        D --> F["Hiển thị bảng và GPA (F3)"]
        E --> F
    end

    subgraph Lưu["Khi có thay đổi"]
        G(["Thêm / sửa / xoá môn"]) --> H["Ghi danh sách vào localStorage"]
        H --> H1{"Ghi thành công?"}
        H1 -- Có --> H2(["Xong"])
        H1 -- "Không (đầy bộ nhớ / bị chặn)" --> H3["Hiện cảnh báo 'Không lưu được dữ liệu',<br/>vẫn dùng bình thường trong phiên này"]
    end

    subgraph Xoá["Xoá tất cả"]
        I(["Nhấn 'Xoá tất cả'"]) --> I1{"Danh sách có môn?"}
        I1 -- Không --> I2["Không làm gì (nút bị vô hiệu)"]
        I1 -- Có --> J{"Hộp xác nhận?"}
        J -- Không --> K["Giữ nguyên"]
        J -- Có --> L["Danh sách rỗng, thoát chế độ sửa (nếu có)"]
        L --> L2["Lưu (như nhánh 'Khi có thay đổi')<br/>và cập nhật GPA (F3)"]
    end
```

Dữ liệu mỗi môn: `{ id, name, credits, score }` (điểm lưu hệ 10, đã làm tròn; điểm chữ và hệ 4 luôn tính lại từ điểm, không lưu).

## Các quyết định thiết kế bổ sung (ngoài PRD)

| # | Quyết định | Lý do |
|---|-----------|-------|
| 1 | Báo lỗi **tất cả** ô sai cùng lúc, đưa con trỏ vào ô sai đầu tiên | PRD yêu cầu lỗi dưới từng ô; sửa một lần cho xong |
| 2 | Thêm nút "Huỷ" khi đang sửa | Tránh kẹt ở chế độ sửa |
| 3 | Xoá môn đang sửa thì thoát chế độ sửa | Tránh lưu nhầm vào môn đã mất |
| 4 | Khi nạp dữ liệu, bỏ từng môn sai thay vì bỏ cả danh sách | Giữ được tối đa dữ liệu của người dùng |
| 5 | Ghi localStorage lỗi thì cảnh báo, không chặn app | Đảm bảo không trắng trang |
| 6 | Nút "Xoá tất cả" vô hiệu khi danh sách rỗng | Tránh hộp xác nhận vô nghĩa |
