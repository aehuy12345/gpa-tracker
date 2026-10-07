import { validateCourse } from "./validation.js";

let nextId = 1;

// Thêm môn vào cuối danh sách. Không sửa danh sách gốc.
// Trả về { courses } nếu thành công, hoặc { errors } nếu dữ liệu sai.
export function addCourse(courses, input) {
  const result = validateCourse(input);
  if (result.errors) return { errors: result.errors };
  const course = { id: `c${Date.now()}-${nextId++}`, ...result.course };
  return { courses: [...courses, course] };
}
