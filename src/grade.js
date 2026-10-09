// Bảng quy đổi F2: [điểm hệ 10 tối thiểu, điểm chữ, điểm hệ 4], xét từ cao xuống thấp.
const GRADE_TABLE = [
  [8.5, "A", 4.0],
  [8.0, "B+", 3.5],
  [7.0, "B", 3.0],
  [6.5, "C+", 2.5],
  [5.5, "C", 2.0],
  [5.0, "D+", 1.5],
  [4.0, "D", 1.0],
];

// Quy đổi điểm hệ 10 (đã làm tròn 1 chữ số) sang điểm chữ và hệ 4.
export function convertScore(score) {
  for (const [min, letter, point] of GRADE_TABLE) {
    if (score >= min) return { letter, point };
  }
  return { letter: "F", point: 0.0 };
}
