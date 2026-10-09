import { convertScore } from "./grade.js";

// Làm tròn 2 chữ số; cộng sai số nhỏ để tránh lỗi số thực (vd 3.125 -> 3.13).
function round2(value) {
  return Math.round((value + 1e-9) * 100) / 100;
}

// Xếp loại học lực theo GPA hệ 4 (đã làm tròn 2 chữ số).
export function classify(gpa4) {
  if (gpa4 >= 3.6) return "Xuất sắc";
  if (gpa4 >= 3.2) return "Giỏi";
  if (gpa4 >= 2.5) return "Khá";
  if (gpa4 >= 2.0) return "Trung bình";
  return "Yếu";
}

// Tính thống kê F3 từ danh sách môn { name, credits, score }.
// Danh sách rỗng: gpa4, gpa10, classification đều là null.
export function calculateStats(courses) {
  let totalCredits = 0;
  let earnedCredits = 0;
  let sum4 = 0;
  let sum10 = 0;
  for (const { credits, score } of courses) {
    totalCredits += credits;
    if (score >= 4.0) earnedCredits += credits;
    sum4 += convertScore(score).point * credits;
    sum10 += score * credits;
  }
  const stats = { count: courses.length, totalCredits, earnedCredits, gpa4: null, gpa10: null, classification: null };
  if (courses.length === 0) return stats;
  stats.gpa4 = round2(sum4 / totalCredits);
  stats.gpa10 = round2(sum10 / totalCredits);
  stats.classification = classify(stats.gpa4);
  return stats;
}
