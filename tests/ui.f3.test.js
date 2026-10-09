// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const bodyHtml = html.match(/<body>([\s\S]*)<\/body>/)[1];

const $ = (id) => document.getElementById(id);
const text = (id) => $(id).textContent;

function add(name, credits, score) {
  $("name").value = name;
  $("credits").value = credits;
  $("score").value = score;
  $("course-form").requestSubmit();
}

beforeEach(async () => {
  document.body.innerHTML = bodyHtml;
  vi.resetModules();
  await import("../src/main.js");
});

describe("F3 – hiển thị GPA và xếp loại", () => {
  it("chưa có môn: hiện '—', tổng bằng 0, có dòng hướng dẫn", () => {
    expect(text("gpa4")).toBe("—");
    expect(text("gpa10")).toBe("—");
    expect(text("classification")).toBe("—");
    expect(text("stat-count")).toBe("0");
    expect(text("stat-credits")).toBe("0");
    expect(text("stat-earned")).toBe("0");
    expect($("empty-hint").hidden).toBe(false);
  });

  it("thêm môn: cập nhật GPA, xếp loại và các tổng", () => {
    add("Toán", "3", "9");
    add("Lý", "1", "5,5");
    expect(text("gpa4")).toBe("3.50");
    expect(text("gpa10")).toBe("8.13");
    expect(text("classification")).toBe("Giỏi");
    expect(text("stat-count")).toBe("2");
    expect(text("stat-credits")).toBe("4");
    expect(text("stat-earned")).toBe("4");
  });

  it("môn điểm F: tính vào GPA, không tính tín chỉ đạt", () => {
    add("Toán", "3", "8.5");
    add("Lý", "3", "3");
    expect(text("gpa4")).toBe("2.00");
    expect(text("classification")).toBe("Trung bình");
    expect(text("stat-credits")).toBe("6");
    expect(text("stat-earned")).toBe("3");
  });

  it("thêm sai dữ liệu: GPA không đổi", () => {
    add("Toán", "3", "9");
    add("Lý", "3", "99");
    expect(text("gpa4")).toBe("4.00");
    expect(text("stat-count")).toBe("1");
  });
});
