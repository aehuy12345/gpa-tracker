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

// Sửa môn có id tương ứng, giữ nguyên id và vị trí. Cùng validation với addCourse.
// Trả về { courses } nếu thành công, hoặc { errors } nếu dữ liệu sai / không tìm thấy môn.
export function updateCourse(courses, id, input) {
  const index = courses.findIndex((course) => course.id === id);
  if (index === -1) return { errors: { name: "Không tìm thấy môn học cần sửa." } };
  const result = validateCourse(input);
  if (result.errors) return { errors: result.errors };
  const updated = courses.slice();
  updated[index] = { id, ...result.course };
  return { courses: updated };
}

// Xoá môn có id tương ứng. Không sửa danh sách gốc.
export function removeCourse(courses, id) {
  return courses.filter((course) => course.id !== id);
}
