# STATUS – GPA Tracker

Cập nhật lần cuối: 2026-10-07

## Trạng thái hiện tại

- **Giai đoạn:** 1. Yêu cầu đã xong (có `PRD.md`); chưa bắt đầu giai đoạn 2. Thiết kế.
- **Mã nguồn:** chưa có.
- **Chức năng:** F1–F5 đều chưa làm.
- **Git:** repo đã khởi tạo lại, đã stage file nhưng **chưa commit và chưa push** lên `https://github.com/aehuy12345/gpa-tracker.git`. Đang chờ tên người commit (email dự kiến `hoangnth0312@gmail.com`).

## Quyết định chính

| Quyết định | Ghi chú |
|------------|---------|
| Làm theo Waterfall | Thiết kế → triển khai → kiểm tra → E2E; chi tiết trong `PLAN.md` |
| Công nghệ: Vite + JavaScript thuần, Vitest, Vercel | Theo PRD |
| Không đăng nhập, không CSDL, lưu bằng localStorage | Theo PRD |
| Luồng nghiệp vụ vẽ bằng flowchart Mermaid | Trước khi viết code |
| E2E test dành cho PM tự test, số test case cân bằng | Bước cuối |
| Trả lời PM bằng tiếng Việt có dấu, ngắn gọn, ít thuật ngữ | Ghi trong `CLAUDE.md` |

## Thay đổi so với ban đầu

- Đã bỏ phần tiêu chí chấp nhận và test case khỏi PRD (commit "Remove acceptance criteria and test cases from PRD"). Test case sẽ làm ở bước E2E.
- Lịch sử git cũ (2 commit, remote `tungdtfgw/gpa-tracker`) đã bị xoá để khởi tạo repo mới, remote mới là `aehuy12345/gpa-tracker`. Nội dung PRD vẫn được giữ nguyên.
- Đã cài statusline tuỳ chỉnh cho Claude Code (hiển thị nhánh git, model, context, token, tools). Chưa chạy thử. Lệnh statusline cũ của Orca được lưu lại trong `~/.claude/settings.json`, khoá `statusLine._orcaPrevious`.

## Việc tiếp theo

1. Cung cấp tên và xác nhận email để commit và push repo.
2. Vẽ flowchart Mermaid cho F1–F5 và trình PM duyệt.
3. Dựng khung dự án và bắt đầu F1.
