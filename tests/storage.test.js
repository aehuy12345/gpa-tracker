import { describe, it, expect } from "vitest";
import { loadCourses, saveCourses, STORAGE_KEY } from "../src/storage.js";

function fakeStorage(initial) {
  const data = new Map(initial === undefined ? [] : [[STORAGE_KEY, initial]]);
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, v),
  };
}
const course = { id: "c1", name: "Toán", credits: 3, score: 8.5 };

describe("loadCourses", () => {
  it("key đúng là gpa-tracker:v1", () => {
    expect(STORAGE_KEY).toBe("gpa-tracker:v1");
  });
  it("chưa có dữ liệu -> rỗng", () => {
    expect(loadCourses(fakeStorage())).toEqual([]);
  });
  it("đọc lại đúng dữ liệu đã lưu", () => {
    const s = fakeStorage();
    saveCourses(s, [course]);
    expect(loadCourses(s)).toEqual([course]);
  });
  it("JSON hỏng -> rỗng", () => {
    expect(loadCourses(fakeStorage("{không phải json"))).toEqual([]);
  });
  it("không phải danh sách -> rỗng", () => {
    expect(loadCourses(fakeStorage('{"a":1}'))).toEqual([]);
    expect(loadCourses(fakeStorage("null"))).toEqual([]);
    expect(loadCourses(fakeStorage("123"))).toEqual([]);
  });
  it("storage ném lỗi khi đọc -> rỗng", () => {
    const s = { getItem: () => { throw new Error("blocked"); } };
    expect(loadCourses(s)).toEqual([]);
  });
  it("bỏ từng môn sai, giữ môn đúng", () => {
    const bad = [
      null,
      "x",
      { ...course, id: "c2", name: "" },
      { ...course, id: "c3", credits: 11 },
      { ...course, id: "c4", score: 10.5 },
      { ...course, id: "c5", score: "8" },
      { name: "Thiếu id", credits: 3, score: 8 },
      { ...course, id: "c1" },
    ];
    const s = fakeStorage(JSON.stringify([course, ...bad]));
    expect(loadCourses(s)).toEqual([course]);
  });
  it("chuẩn hoá tên (bỏ khoảng trắng) và làm tròn điểm", () => {
    const s = fakeStorage(JSON.stringify([{ ...course, name: "  Toán  ", score: 8.54 }]));
    expect(loadCourses(s)).toEqual([{ ...course, score: 8.5 }]);
  });
});

describe("saveCourses", () => {
  it("ghi thành công trả về true", () => {
    const s = fakeStorage();
    expect(saveCourses(s, [course])).toBe(true);
    expect(JSON.parse(s.getItem(STORAGE_KEY))).toEqual([course]);
  });
  it("storage ném lỗi khi ghi -> false, không ném ra ngoài", () => {
    const s = { setItem: () => { throw new Error("quota"); } };
    expect(saveCourses(s, [course])).toBe(false);
  });
});
