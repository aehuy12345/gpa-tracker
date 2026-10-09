import { addCourse } from "./courses.js";
import { convertScore } from "./grade.js";

const FIELDS = ["name", "credits", "score"];

const form = document.getElementById("course-form");
const body = document.getElementById("course-body");
const table = document.getElementById("course-table");
const emptyHint = document.getElementById("empty-hint");

let courses = [];

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
      return row;
    }),
  );
  table.hidden = courses.length === 0;
  emptyHint.hidden = courses.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();
  const result = addCourse(courses, {
    name: form.elements.name.value,
    credits: form.elements.credits.value,
    score: form.elements.score.value,
  });
  if (result.errors) {
    showErrors(result.errors);
    return;
  }
  courses = result.courses;
  renderTable();
  form.reset();
  form.elements.name.focus();
});

renderTable();
