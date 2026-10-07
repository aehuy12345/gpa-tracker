# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Giao tiếp với người dùng

- Luôn trả lời bằng tiếng Việt có dấu.
- Trả lời ngắn gọn, rõ ràng, dễ hiểu; không dùng quá nhiều thuật ngữ kỹ thuật chi tiết, trừ khi người dùng yêu cầu.
- Coi người dùng là PM (Product Manager): ưu tiên nói về kết quả, phạm vi, rủi ro và quyết định cần đưa ra.

## Quy trình phát triển (Waterfall)

Dự án làm theo mô hình Waterfall, lần lượt các bước, xong bước trước mới sang bước sau:

1. **Thiết kế:** từ `PRD.md`, thiết kế luồng nghiệp vụ cho từng chức năng bằng flowchart, dùng cú pháp Mermaid mới nhất.
2. **Triển khai:** viết code và auto-test (unit test) cho chức năng.
3. **Kiểm tra:** tự chạy test sau khi code xong, đảm bảo đạt trước khi báo hoàn thành.
4. **E2E test:** bước cuối, test trên giao diện để người dùng tự test, kèm bảng test case.

## Status

Pre-implementation: the repo contains only `PRD.md` (Vietnamese) and the slash commands in `.claude/commands/`. There is no source code, `package.json`, or test setup yet. `PRD.md` is the source of truth for requirements; section 4 tracks feature status (F1–F5), so update it as features are completed.

## Planned stack (from PRD)

- Vite + vanilla HTML/CSS/JavaScript (no framework), unit tests with Vitest, deployed to Vercel.
- No backend, no auth, no database. Data lives in `localStorage` under key `gpa-tracker:v1`.
- UI text and validation errors are in Vietnamese; the layout must be responsive down to 360px.

Once scaffolded, add the real build/dev/test commands (including how to run a single Vitest test) to this file.

## Domain rules to keep consistent (see PRD sections 2.F1–F5)

- Scores are entered on a 10-point scale and converted to letter grade and 4-point scale by the F2 table. The thresholds are by range (e.g. 8.5–10 → A/4.0), so score rounding (1 decimal) happens before conversion.
- Score input accepts both `,` and `.` as the decimal separator.
- GPA = credit-weighted average (Σ(score × credits) / Σ credits), rounded to 2 decimals, for both the 4-point and 10-point scales. Credits earned count only courses with score ≥ 4.0. Classification is based on the 4-point GPA.
- Empty list shows "—" and a prompt instead of a GPA.
- Corrupt or unreadable localStorage data must fall back to an empty list, never a blank page.
- Keep grade conversion, GPA calculation and validation as pure functions separate from DOM code so they can be unit-tested with Vitest.

## Workflow commands

Custom slash commands in `.claude/commands/` define the git workflow: `/git-branch`, `/commit`, `/merge`, `/push` (confirms before pushing to `main`), `/pull`, `/wrap-up` and `/learn-by-mistake`. `/new-project` is only for a freshly cloned template and must not be run here.

- `/wrap-up` expects a "Project structure" section in this file; add it once source folders exist.
- `/learn-by-mistake` records fixes in `common_errors.md`.
