"use strict";
const $ = (selector) => document.querySelector(selector);
const toast = $("#toast");
const showToast = (message) => { toast.textContent = message; toast.classList.add("show"); window.setTimeout(() => toast.classList.remove("show"), 3200); };
const openDialog = (id) => $("#" + id).showModal();
const closeDialog = (id) => $("#" + id).close();

$("#paymentButton").addEventListener("click", () => openDialog("paymentDialog"));
$("#continuePayment").addEventListener("click", () => { closeDialog("paymentDialog"); showToast("Demo only: you would now be redirected to protected checkout."); });
$("#reportButton").addEventListener("click", () => showToast("Your progress report is being prepared securely."));
$("#loginButton").addEventListener("click", () => openDialog("loginDialog"));
$("#newUserButton").addEventListener("click", () => openDialog("userDialog"));
$("#createRegistrarButton").addEventListener("click", () => { $("#newUserRole").value = "Registrar"; openDialog("userDialog"); });
$("#newCourseButton").addEventListener("click", () => openDialog("courseDialog"));
$("#resetPasswordButton").addEventListener("click", () => openDialog("resetDialog"));
document.querySelectorAll(".dialog-close").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));

const roles = {
  student: { name: "Alex Morgan", detail: "Student · Grade 10", initials: "AM", title: "Student portal", canAdmin: false },
  teacher: { name: "Naomi Chen", detail: "Teacher · Biology", initials: "NC", title: "Teacher workspace", canAdmin: false },
  registrar: { name: "Jordan Lee", detail: "Registrar", initials: "JL", title: "Registrar workspace", canAdmin: true },
  admin: { name: "Morgan Patel", detail: "Administrator", initials: "MP", title: "Administrator portal", canAdmin: true },
  superadmin: { name: "Taylor Brooks", detail: "Super administrator", initials: "TB", title: "Super administrator portal", canAdmin: true }
};
$("#loginSubmit").addEventListener("click", () => {
  const role = roles[$("#roleSelect").value];
  $("#profileName").textContent = role.name; $("#profileRole").textContent = role.detail; $("#avatar").textContent = role.initials;
  document.querySelector(".crumb").innerHTML = `${role.title.toUpperCase()} <span>/</span> OVERVIEW`;
  document.querySelectorAll(".admin-only").forEach((el) => el.classList.toggle("show", role.canAdmin));
  document.querySelectorAll(".teacher-only").forEach((el) => el.classList.toggle("show", $("#roleSelect").value === "teacher"));
  $("#accessLevel").textContent = role.detail; closeDialog("loginDialog"); showToast(`Signed in to the ${role.title.toLowerCase()} demo.`);
});
$("#createUser").addEventListener("click", () => {
  const name = $("#newUserName").value.trim(), email = $("#newUserEmail").value.trim();
  if (!name || !email.includes("@")) return showToast("Enter a name and a valid school email address.");
  closeDialog("userDialog"); $("#newUserName").value = ""; $("#newUserEmail").value = ""; showToast(`Invitation prepared for ${name}. Demo only—no email was sent.`);
});
$("#sendReset").addEventListener("click", () => {
  const email = $("#resetEmail").value.trim();
  if (!email.includes("@")) return showToast("Enter a valid user email address.");
  closeDialog("resetDialog"); $("#resetEmail").value = ""; showToast("Secure reset link prepared. Demo only—no email was sent.");
});
$("#saveTeacherChoice").addEventListener("click", () => showToast(`Teacher choice saved: ${$("#teacherChoice").value}. Registrar approval is required.`));
$("#createCourse").addEventListener("click", () => {
  const name = $("#courseName").value.trim(), code = $("#courseCode").value.trim();
  if (!name || !code) return showToast("Enter a course name and course code.");
  closeDialog("courseDialog"); $("#courseName").value = ""; $("#courseCode").value = "";
  showToast(`Course ${code} created in this demo. No production record was changed.`);
});
let selectedStudent = "";
document.querySelectorAll(".grade-button").forEach((button) => button.addEventListener("click", () => {
  selectedStudent = button.dataset.student;
  $("#gradeStudent").textContent = `Submit a grade for ${selectedStudent}, enrolled in Biology 10.`;
  openDialog("gradeDialog");
}));
$("#submitGrade").addEventListener("click", () => {
  closeDialog("gradeDialog"); $("#gradeFeedback").value = "";
  showToast(`Grade prepared for ${selectedStudent}. Demo only—no academic record was changed.`);
});
$("#signOut").addEventListener("click", (event) => { event.preventDefault(); openDialog("loginDialog"); });
const menu = $("#menuButton"), sidebar = $(".sidebar");
menu.addEventListener("click", () => { const isOpen = sidebar.classList.toggle("open"); menu.setAttribute("aria-expanded", String(isOpen)); });
if (localStorage.getItem("dujarTheme") === "dark") document.body.classList.add("dark");
$("#mainTheme").addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("dujarTheme", document.body.classList.contains("dark") ? "dark" : "light"); });
