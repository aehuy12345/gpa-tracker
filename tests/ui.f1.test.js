// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const bodyHtml = html.match(/<body>([\s\S]*)<\/body>/)[1];

const $ = (id) => document.getElementById(id);

function fill(name, credits, score) {
  $("name").value = name;
  $("credits").value = credits;
  $("score").value = score;
}

function submit() {
  $("course-form").requestSubmit();
}

const rows = () => [...document.querySelectorAll("#course-body tr")].map((tr) =>
  [...tr.children].map((td) => td.textContent),
);

beforeEach(async () => {
  document.body.innerHTML = bodyHtml;
  vi.resetModules();
  await import("../src/main.js");
});

describe("F1 – giao diện thêm môn", () => {
  it("ban đầu: hiện hướng dẫn, ẩn bảng", () => {
    expect($("empty-hint").hidden).toBe(false);
    expect($("course-table").hidden).toBe(true);
  });

  it("thêm môn hợp lệ: vào bảng, xoá form, focus ô Tên môn", () => {
    fill("  Giải tích ", "3", "8,56");
    submit();
    expect(rows()).toEqual([["Giải tích", "3", "8.6", "A", "4.0"]]);
    expect($("name").value).toBe("");
    expect($("credits").value).toBe("");
    expect($("score").value).toBe("");
    expect(document.activeElement).toBe($("name"));
    expect($("empty-hint").hidden).toBe(true);
    expect($("course-table").hidden).toBe(false);
  });

  it("thêm nhiều môn: nối vào cuối bảng", () => {
    fill("Toán", "3", "9");
    submit();
    fill("Lý", "2", "7.5");
    submit();
    expect(rows()).toEqual([
      ["Toán", "3", "9.0", "A", "4.0"],
      ["Lý", "2", "7.5", "B", "3.0"],
    ]);
  });

  it("form trống: hiện lỗi cả 3 ô, focus ô Tên môn, không thêm môn", () => {
    submit();
    expect($("name-error").textContent).toBe("Vui lòng nhập tên môn.");
    expect($("credits-error").textContent).toBe("Số tín chỉ phải là số nguyên từ 1 đến 10.");
    expect($("score-error").textContent).toBe("Điểm phải là số từ 0 đến 10.");
    expect(document.activeElement).toBe($("name"));
    expect(rows()).toEqual([]);
  });

  it("chỉ sai ô Điểm: lỗi chỉ ở ô Điểm, focus vào đó, giữ nguyên dữ liệu đã nhập", () => {
    fill("Toán", "3", "11");
    submit();
    expect($("name-error").textContent).toBe("");
    expect($("credits-error").textContent).toBe("");
    expect($("score-error").textContent).toBe("Điểm phải là số từ 0 đến 10.");
    expect($("score").getAttribute("aria-invalid")).toBe("true");
    expect(document.activeElement).toBe($("score"));
    expect($("name").value).toBe("Toán");
    expect(rows()).toEqual([]);
  });

  it("tên quá 100 ký tự: báo lỗi độ dài", () => {
    fill("a".repeat(101), "3", "8");
    submit();
    expect($("name-error").textContent).toBe("Tên môn tối đa 100 ký tự.");
  });

  it("lỗi cũ được xoá sau khi nhập lại đúng", () => {
    submit();
    fill("Toán", "3", "8");
    submit();
    expect($("name-error").textContent).toBe("");
    expect($("score-error").textContent).toBe("");
    expect($("name").hasAttribute("aria-invalid")).toBe(false);
    expect(rows()).toHaveLength(1);
  });

  it("tên chứa HTML được hiển thị như chữ, không chạy thành mã", () => {
    fill("<b>x</b>", "1", "5");
    submit();
    expect(document.querySelector("#course-body b")).toBeNull();
    expect(rows()[0][0]).toBe("<b>x</b>");
  });
});
