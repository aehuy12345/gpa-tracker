import { describe, it, expect } from "vitest";
import {
  validateName,
  validateCredits,
  validateScore,
  validateCourse,
  ERROR_MESSAGES,
} from "../src/validation.js";

describe("validateName", () => {
  it("bỏ khoảng trắng 2 đầu", () => {
    expect(validateName("  Toán  ").value).toBe("Toán");
  });
  it("báo lỗi khi trống hoặc chỉ có khoảng trắng", () => {
    expect(validateName("").error).toBe(ERROR_MESSAGES.nameEmpty);
    expect(validateName("   ").error).toBe(ERROR_MESSAGES.nameEmpty);
  });
  it("chấp nhận đúng 100 ký tự, từ chối 101", () => {
    expect(validateName("a".repeat(100)).value).toHaveLength(100);
    expect(validateName("a".repeat(101)).error).toBe(ERROR_MESSAGES.nameTooLong);
  });
  it("đếm độ dài sau khi bỏ khoảng trắng", () => {
    expect(validateName(` ${"a".repeat(100)} `).value).toHaveLength(100);
  });
});

describe("validateCredits", () => {
  it.each(["1", "5", "10", " 3 "])("chấp nhận %j", (v) => {
    expect(validateCredits(v).value).toBe(Number(v));
  });
  it.each(["", "0", "11", "-1", "2.5", "2,5", "abc", "1e1"])("từ chối %j", (v) => {
    expect(validateCredits(v).error).toBe(ERROR_MESSAGES.credits);
  });
});

describe("validateScore", () => {
  it("chấp nhận dấu phẩy và dấu chấm", () => {
    expect(validateScore("8,5").value).toBe(8.5);
    expect(validateScore("8.5").value).toBe(8.5);
  });
  it("chấp nhận biên 0 và 10", () => {
    expect(validateScore("0").value).toBe(0);
    expect(validateScore("10").value).toBe(10);
  });
  it("làm tròn 1 chữ số thập phân", () => {
    expect(validateScore("8.54").value).toBe(8.5);
    expect(validateScore("8.56").value).toBe(8.6);
  });
  it.each(["", "abc", "-1", "10.1", "11", "8,5,1", "8..5", ".5", "1e1"])(
    "từ chối %j",
    (v) => {
      expect(validateScore(v).error).toBe(ERROR_MESSAGES.score);
    },
  );
});

describe("validateCourse", () => {
  it("trả về môn đã chuẩn hoá khi hợp lệ", () => {
    expect(validateCourse({ name: " Giải tích ", credits: "3", score: "8,6" })).toEqual({
      course: { name: "Giải tích", credits: 3, score: 8.6 },
    });
  });
  it("báo lỗi tất cả ô sai cùng lúc", () => {
    const { errors } = validateCourse({ name: "", credits: "0", score: "x" });
    expect(Object.keys(errors)).toEqual(["name", "credits", "score"]);
  });
  it("chỉ báo lỗi ô sai", () => {
    const { errors } = validateCourse({ name: "A", credits: "3", score: "11" });
    expect(errors).toEqual({ score: ERROR_MESSAGES.score });
  });
});
