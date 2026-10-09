// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const bodyHtml = html.match(/<body>([\s\S]*)<\/body>/)[1];

const $ = (id) => document.getElementById(id);
const rows = () => [...document.querySelectorAll("#course-body tr")];
const names = () => rows().map((r) => r.cells[0].textContent);
const click = (row, label) =>
  [...row.querySelectorAll("button")].find((b) => b.textContent === label).click();

function fill(name, credits, score) {
  $("name").value = name;
  $("credits").value = credits;
  $("score").value = score;
}
function add(name, credits, score) {
  fill(name, credits, score);
  $("course-form").requestSubmit();
}

beforeEach(async () => {
  document.body.innerHTML = bodyHtml;
  vi.resetModules();
  vi.restoreAllMocks();
  await import("../src/main.js");
  add("Toán", "3", "9");
  add("Lý", "1", "5,5");
});

describe("F4 – sửa môn", () => {
  it("bấm Sửa: đưa dữ liệu lên form, nút đổi thành Lưu, hiện Huỷ, đánh dấu dòng", () => {
    click(rows()[1], "Sửa");
    expect($("name").value).toBe("Lý");
    expect($("credits").value).toBe("1");
    expect($("score").value).toBe("5.5");
    expect($("submit-btn").textContent).toBe("Lưu");
    expect($("cancel-btn").hidden).toBe(false);
    expect(rows()[1].classList.contains("editing")).toBe(true);
  });

  it("Lưu hợp lệ: cập nhật đúng vị trí, GPA đổi, form về trạng thái thêm", () => {
    click(rows()[1], "Sửa");
    fill("Vật lý", "3", "9");
    $("course-form").requestSubmit();
    expect(names()).toEqual(["Toán", "Vật lý"]);
    expect($("stat-credits").textContent).toBe("6");
    expect($("gpa4").textContent).toBe("4.00");
    expect($("submit-btn").textContent).toBe("Thêm môn");
    expect($("cancel-btn").hidden).toBe(true);
    expect($("name").value).toBe("");
    expect(rows().some((r) => r.classList.contains("editing"))).toBe(false);
  });

  it("Lưu sai dữ liệu: hiện lỗi, giữ chế độ sửa, không đổi bảng", () => {
    click(rows()[0], "Sửa");
    fill("", "3", "11");
    $("course-form").requestSubmit();
    expect($("name-error").textContent).not.toBe("");
    expect($("score-error").textContent).not.toBe("");
    expect($("submit-btn").textContent).toBe("Lưu");
    expect(names()).toEqual(["Toán", "Lý"]);
  });

  it("Huỷ: xoá trắng form, về trạng thái thêm, bảng không đổi", () => {
    click(rows()[0], "Sửa");
    $("cancel-btn").click();
    expect($("name").value).toBe("");
    expect($("submit-btn").textContent).toBe("Thêm môn");
    expect($("cancel-btn").hidden).toBe(true);
    expect(names()).toEqual(["Toán", "Lý"]);
  });

  it("Sửa dòng khác: form chuyển sang dòng mới", () => {
    click(rows()[0], "Sửa");
    click(rows()[1], "Sửa");
    expect($("name").value).toBe("Lý");
    expect(rows()[0].classList.contains("editing")).toBe(false);
    expect(rows()[1].classList.contains("editing")).toBe(true);
  });
});

describe("F4 – xoá môn", () => {
  it("xác nhận Có: xoá môn và cập nhật GPA", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    click(rows()[1], "Xoá");
    expect(names()).toEqual(["Toán"]);
    expect($("stat-count").textContent).toBe("1");
    expect($("gpa4").textContent).toBe("4.00");
  });

  it("xác nhận Không: giữ nguyên", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    click(rows()[1], "Xoá");
    expect(names()).toEqual(["Toán", "Lý"]);
  });

  it("xoá môn đang sửa: thoát chế độ sửa, xoá trắng form", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    click(rows()[0], "Sửa");
    click(rows()[0], "Xoá");
    expect(names()).toEqual(["Lý"]);
    expect($("submit-btn").textContent).toBe("Thêm môn");
    expect($("name").value).toBe("");
  });

  it("xoá môn khác khi đang sửa: vẫn giữ chế độ sửa", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    click(rows()[1], "Sửa");
    click(rows()[0], "Xoá");
    expect($("submit-btn").textContent).toBe("Lưu");
    expect($("name").value).toBe("Lý");
    expect(rows()[0].classList.contains("editing")).toBe(true);
  });

  it("xoá hết: hiện lại dòng hướng dẫn và GPA '—'", () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    click(rows()[0], "Xoá");
    click(rows()[0], "Xoá");
    expect($("empty-hint").hidden).toBe(false);
    expect($("gpa4").textContent).toBe("—");
  });
});
