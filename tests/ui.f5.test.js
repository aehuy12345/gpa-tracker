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

function add(name, credits, score) {
  $("name").value = name;
  $("credits").value = credits;
  $("score").value = score;
  $("course-form").requestSubmit();
}
async function openPage() {
  document.body.innerHTML = bodyHtml;
  vi.resetModules();
  await import("../src/main.js");
}

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("F5 – lưu dữ liệu", () => {
  it("thêm môn rồi tải lại trang vẫn còn", async () => {
    await openPage();
    add("Toán", "3", "9");
    add("Lý", "1", "5,5");
    await openPage();
    expect(names()).toEqual(["Toán", "Lý"]);
    expect($("gpa4").textContent).toBe("3.50");
  });
  it("sửa và xoá được lưu", async () => {
    await openPage();
    add("Toán", "3", "9");
    add("Lý", "1", "5");
    click(rows()[1], "Sửa");
    $("name").value = "Vật lý";
    $("course-form").requestSubmit();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    click(rows()[0], "Xoá");
    await openPage();
    expect(names()).toEqual(["Vật lý"]);
  });
  it("dữ liệu hỏng -> danh sách rỗng, trang vẫn hiển thị", async () => {
    localStorage.setItem("gpa-tracker:v1", "{hỏng");
    await openPage();
    expect(names()).toEqual([]);
    expect($("empty-hint").hidden).toBe(false);
    expect($("gpa4").textContent).toBe("—");
  });
  it("bỏ môn sai, giữ môn đúng khi nạp", async () => {
    localStorage.setItem(
      "gpa-tracker:v1",
      JSON.stringify([
        { id: "a", name: "Toán", credits: 3, score: 9 },
        { id: "b", name: "", credits: 3, score: 9 },
      ]),
    );
    await openPage();
    expect(names()).toEqual(["Toán"]);
  });
  it("ghi lỗi -> hiện cảnh báo, vẫn thêm được môn", async () => {
    await openPage();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    add("Toán", "3", "9");
    expect(names()).toEqual(["Toán"]);
    expect($("storage-warning").hidden).toBe(false);
  });
});

describe("F5 – Xoá tất cả", () => {
  it("vô hiệu khi danh sách rỗng, bật khi có môn", async () => {
    await openPage();
    expect($("clear-btn").disabled).toBe(true);
    add("Toán", "3", "9");
    expect($("clear-btn").disabled).toBe(false);
  });
  it("chọn Huỷ thì giữ nguyên", async () => {
    await openPage();
    add("Toán", "3", "9");
    vi.spyOn(window, "confirm").mockReturnValue(false);
    $("clear-btn").click();
    expect(names()).toEqual(["Toán"]);
  });
  it("chọn OK thì xoá hết, thoát chế độ sửa và lưu", async () => {
    await openPage();
    add("Toán", "3", "9");
    click(rows()[0], "Sửa");
    vi.spyOn(window, "confirm").mockReturnValue(true);
    $("clear-btn").click();
    expect(names()).toEqual([]);
    expect($("submit-btn").textContent).toBe("Thêm môn");
    expect($("gpa4").textContent).toBe("—");
    await openPage();
    expect(names()).toEqual([]);
  });
});
