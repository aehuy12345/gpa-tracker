import { describe, it, expect } from "vitest";
import { addCourse, updateCourse, removeCourse } from "../src/courses.js";

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

function sample() {
  let list = [];
  for (const name of ["Toán", "Lý", "Hoá"]) {
    list = addCourse(list, { ...valid, name }).courses;
  }
  return list;
}

describe("updateCourse", () => {
  it("sửa đúng môn, giữ id và vị trí, không sửa danh sách gốc", () => {
    const list = sample();
    const snapshot = structuredClone(list);
    const result = updateCourse(list, list[1].id, { name: " Vật lý ", credits: "4", score: "7,25" });
    expect(list).toEqual(snapshot);
    expect(result.courses).toHaveLength(3);
    expect(result.courses[1]).toEqual({ id: list[1].id, name: "Vật lý", credits: 4, score: 7.3 });
    expect(result.courses[0]).toEqual(list[0]);
    expect(result.courses[2]).toEqual(list[2]);
  });
  it("dùng cùng quy tắc lỗi như thêm môn", () => {
    const list = sample();
    const result = updateCourse(list, list[0].id, { name: "", credits: "11", score: "a" });
    expect(result.courses).toBeUndefined();
    expect(Object.keys(result.errors)).toEqual(["name", "credits", "score"]);
  });
  it("id không tồn tại: trả về lỗi", () => {
    const result = updateCourse(sample(), "khong-co", valid);
    expect(result.courses).toBeUndefined();
    expect(result.errors).toBeTruthy();
  });
});

describe("removeCourse", () => {
  it("xoá đúng môn và không sửa danh sách gốc", () => {
    const list = sample();
    const result = removeCourse(list, list[1].id);
    expect(list).toHaveLength(3);
    expect(result.map((c) => c.name)).toEqual(["Toán", "Hoá"]);
  });
  it("id không tồn tại: danh sách giữ nguyên", () => {
    const list = sample();
    expect(removeCourse(list, "khong-co")).toEqual(list);
  });
});
