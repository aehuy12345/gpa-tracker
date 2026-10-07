export const MAX_NAME_LENGTH = 100;
export const MIN_CREDITS = 1;
export const MAX_CREDITS = 10;
export const MIN_SCORE = 0;
export const MAX_SCORE = 10;

export const ERROR_MESSAGES = {
  nameEmpty: "Vui lòng nhập tên môn.",
  nameTooLong: "Tên môn tối đa 100 ký tự.",
  credits: "Số tín chỉ phải là số nguyên từ 1 đến 10.",
  score: "Điểm phải là số từ 0 đến 10.",
};

const INTEGER_PATTERN = /^\d+$/;
const DECIMAL_PATTERN = /^\d+(\.\d+)?$/;

export function validateName(raw) {
  const name = String(raw ?? "").trim();
  if (name === "") return { error: ERROR_MESSAGES.nameEmpty };
  if (name.length > MAX_NAME_LENGTH) return { error: ERROR_MESSAGES.nameTooLong };
  return { value: name };
}

export function validateCredits(raw) {
  const text = String(raw ?? "").trim();
  if (!INTEGER_PATTERN.test(text)) return { error: ERROR_MESSAGES.credits };
  const credits = Number(text);
  if (credits < MIN_CREDITS || credits > MAX_CREDITS) {
    return { error: ERROR_MESSAGES.credits };
  }
  return { value: credits };
}

// Chấp nhận cả "8,5" và "8.5"; làm tròn 1 chữ số thập phân.
export function validateScore(raw) {
  const text = String(raw ?? "").trim().replace(",", ".");
  if (!DECIMAL_PATTERN.test(text)) return { error: ERROR_MESSAGES.score };
  const score = Number(text);
  if (score < MIN_SCORE || score > MAX_SCORE) return { error: ERROR_MESSAGES.score };
  return { value: Math.round(score * 10) / 10 };
}

// Trả về { course } nếu hợp lệ, ngược lại { errors } (chỉ chứa các ô sai).
export function validateCourse({ name, credits, score }) {
  const results = {
    name: validateName(name),
    credits: validateCredits(credits),
    score: validateScore(score),
  };
  const errors = {};
  for (const [field, result] of Object.entries(results)) {
    if (result.error) errors[field] = result.error;
  }
  if (Object.keys(errors).length > 0) return { errors };
  return {
    course: {
      name: results.name.value,
      credits: results.credits.value,
      score: results.score.value,
    },
  };
}
