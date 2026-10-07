import { describe, it, expect } from "vitest";
import { addCourse } from "../src/courses.js";

const valid = { name: "Toán", credits: "3", score: "8,5" };

describe("addCourse", () => {
  it("thêm môn vào cuối danh sách và không sửa danh sách gốc", () => {
    const first = addCourse([], valid).courses;
    const original = [...first];
    const second = addCourse(first, { ...valid, name: "Lý" }).courses;
    expect(first).toEqual(original);
    expect(second).toHaveLength(2);
    expect(second[1]).toMatchObject({ name: "Lý", credits: 3, score: 8.5 });
  });
  it("mỗi môn có id khác nhau", () => {
    const list = addCourse(addCourse([], valid).courses, valid).courses;
    expect(list[0].id).not.toBe(list[1].id);
  });
  it("trả về lỗi và không thêm khi dữ liệu sai", () => {
    const result = addCourse([], { name: "", credits: "3", score: "8" });
    expect(result.courses).toBeUndefined();
    expect(result.errors.name).toBeTruthy();
  });
});
