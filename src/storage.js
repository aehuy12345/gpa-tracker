import { validateCourse } from "./validation.js";

export const STORAGE_KEY = "gpa-tracker:v1";

// Đọc danh sách môn từ storage. Mọi lỗi (không truy cập được, JSON hỏng, sai định dạng)
// đều trả về danh sách rỗng; môn sai quy tắc F1 bị bỏ, môn đúng được giữ lại.
export function loadCourses(storage) {
  let raw;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return [];
  }
  if (raw === null || raw === undefined) return [];
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];

  const courses = [];
  const usedIds = new Set();
  for (const item of data) {
    if (item === null || typeof item !== "object") continue;
    if (typeof item.id !== "string" || item.id === "" || usedIds.has(item.id)) continue;
    if (typeof item.name !== "string") continue;
    if (typeof item.credits !== "number" || typeof item.score !== "number") continue;
    const result = validateCourse({
      name: item.name,
      credits: String(item.credits),
      score: String(item.score),
    });
    if (result.errors) continue;
    usedIds.add(item.id);
    courses.push({ id: item.id, ...result.course });
  }
  return courses;
}

// Ghi danh sách môn vào storage. Trả về true nếu thành công, false nếu lỗi (đầy bộ nhớ / bị chặn).
export function saveCourses(storage, courses) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(courses));
    return true;
  } catch {
    return false;
  }
}
