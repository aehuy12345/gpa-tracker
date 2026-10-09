import { addCourse, updateCourse, removeCourse } from "./courses.js";
import { convertScore } from "./grade.js";
import { calculateStats } from "./gpa.js";

const FIELDS = ["name", "credits", "score"];

const form = document.getElementById("course-form");
const body = document.getElementById("course-body");
const table = document.getElementById("course-table");
const emptyHint = document.getElementById("empty-hint");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");

let courses = [];
let editingId = null;

function resetForm() {
  editingId = null;
  form.reset();
  clearErrors();
  submitBtn.textContent = "Thêm môn";
  cancelBtn.hidden = true;
}

function startEdit(course) {
  editingId = course.id;
  clearErrors();
  form.elements.name.value = course.name;
  form.elements.credits.value = course.credits;
  form.elements.score.value = course.score.toFixed(1);
  submitBtn.textContent = "Lưu";
  cancelBtn.hidden = false;
  form.elements.name.focus();
  renderTable();
}

function deleteCourse(course) {
  if (!window.confirm(`Xoá môn "${course.name}"?`)) return;
  courses = removeCourse(courses, course.id);
  if (editingId === course.id) resetForm();
  renderTable();
}

function actionButton(label, className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `row-btn ${className}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function clearErrors() {
  for (const field of FIELDS) {
    document.getElementById(`${field}-error`).textContent = "";
    document.getElementById(field).removeAttribute("aria-invalid");
  }
}

function showErrors(errors) {
  for (const field of FIELDS) {
    if (!errors[field]) continue;
    document.getElementById(`${field}-error`).textContent = errors[field];
    document.getElementById(field).setAttribute("aria-invalid", "true");
  }
  const firstInvalid = FIELDS.find((field) => errors[field]);
  document.getElementById(firstInvalid).focus();
}

function renderTable() {
  body.replaceChildren(
    ...courses.map((course) => {
      const row = document.createElement("tr");
      const { letter, point } = convertScore(course.score);
      for (const text of [course.name, course.credits, course.score.toFixed(1), letter, point.toFixed(1)]) {
        const cell = document.createElement("td");
        cell.textContent = text;
        row.append(cell);
      }
      if (course.id === editingId) row.classList.add("editing");
      const actions = document.createElement("td");
      actions.append(
        actionButton("Sửa", "edit", () => startEdit(course)),
        actionButton("Xoá", "danger", () => deleteCourse(course)),
      );
      row.append(actions);
      return row;
    }),
  );
  table.hidden = courses.length === 0;
  emptyHint.hidden = courses.length > 0;
  renderSummary();
}

function renderSummary() {
  const stats = calculateStats(courses);
  const dash = (value, format) => (value === null ? "—" : format(value));
  document.getElementById("gpa4").textContent = dash(stats.gpa4, (v) => v.toFixed(2));
  document.getElementById("gpa10").textContent = dash(stats.gpa10, (v) => v.toFixed(2));
  document.getElementById("classification").textContent = dash(stats.classification, (v) => v);
  document.getElementById("stat-count").textContent = stats.count;
  document.getElementById("stat-credits").textContent = stats.totalCredits;
  document.getElementById("stat-earned").textContent = stats.earnedCredits;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  const input = {
    name: form.elements.name.value,
    credits: form.elements.credits.value,
    score: form.elements.score.value,
  };
  const result = editingId ? updateCourse(courses, editingId, input) : addCourse(courses, input);
  if (result.errors) {
    showErrors(result.errors);
    return;
  }
  courses = result.courses;
  resetForm();
  renderTable();
  form.elements.name.focus();
});

cancelBtn.addEventListener("click", () => {
  resetForm();
  renderTable();
});

renderTable();
