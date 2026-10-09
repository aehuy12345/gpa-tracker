import { describe, it, expect } from "vitest";
import { calculateStats, classify } from "../src/gpa.js";

const c = (credits, score) => ({ name: "x", credits, score });

describe("calculateStats", () => {
  it("danh sách rỗng: GPA và xếp loại là null, tổng bằng 0", () => {
    expect(calculateStats([])).toEqual({
      count: 0, totalCredits: 0, earnedCredits: 0, gpa4: null, gpa10: null, classification: null,
    });
  });

  it("một môn", () => {
    expect(calculateStats([c(3, 8.5)])).toEqual({
      count: 1, totalCredits: 3, earnedCredits: 3, gpa4: 4, gpa10: 8.5, classification: "Xuất sắc",
    });
  });

  it("trung bình có trọng số tín chỉ", () => {
    // hệ 4: (4.0×3 + 2.0×1) / 4 = 3.5 ; hệ 10: (9×3 + 5.5×1) / 4 = 8.125 -> 8.13
    const s = calculateStats([c(3, 9), c(1, 5.5)]);
    expect(s.gpa4).toBe(3.5);
    expect(s.gpa10).toBe(8.13);
    expect(s.classification).toBe("Giỏi");
    expect(s.totalCredits).toBe(4);
  });

  it("môn điểm F tính vào GPA nhưng không tính tín chỉ đạt", () => {
    const s = calculateStats([c(3, 8.5), c(3, 3.9)]);
    expect(s.gpa4).toBe(2);
    expect(s.totalCredits).toBe(6);
    expect(s.earnedCredits).toBe(3);
    expect(s.count).toBe(2);
  });

  it("điểm đúng 4.0 được tính tín chỉ đạt", () => {
    expect(calculateStats([c(2, 4)]).earnedCredits).toBe(2);
  });

  it("làm tròn 2 chữ số", () => {
    // (4.0×1 + 3.5×1 + 3.0×1) / 3 = 3.5 ; (10 + 8 + 7)/3 = 8.333 -> 8.33
    const s = calculateStats([c(1, 10), c(1, 8), c(1, 7)]);
    expect(s.gpa4).toBe(3.5);
    expect(s.gpa10).toBe(8.33);
  });

  it("xếp loại xét trên GPA đã làm tròn", () => {
    // 19 tín chỉ A (4.0) + 81 tín chỉ B+ (3.5) -> 3.595 -> làm tròn 3.6 -> Xuất sắc
    const s = calculateStats([c(10, 9), c(9, 9), ...Array(8).fill(c(10, 8)), c(1, 8)]);
    expect(s.gpa4).toBe(3.6);
    expect(s.classification).toBe("Xuất sắc");
  });
});

describe("classify", () => {
  it.each([
    [4.0, "Xuất sắc"],
    [3.6, "Xuất sắc"],
    [3.59, "Giỏi"],
    [3.2, "Giỏi"],
    [3.19, "Khá"],
    [2.5, "Khá"],
    [2.49, "Trung bình"],
    [2.0, "Trung bình"],
    [1.99, "Yếu"],
    [0, "Yếu"],
  ])("GPA %s -> %s", (gpa, label) => {
    expect(classify(gpa)).toBe(label);
  });
});
