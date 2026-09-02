"use strict";
const toast = document.querySelector(".toast");
const notify = (text) => { toast.textContent = text; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3000); };
document.querySelectorAll("[data-demo]").forEach((button) => button.addEventListener("click", () => notify(button.dataset.demo)));

const role = localStorage.getItem("dujarRole") || "student";
const user = localStorage.getItem("dujarUser") || "alex.morgan@dujarcollege.example";
const permissions = { student:["student"], teacher:["student","teacher"], registrar:["student","teacher","registrar"], admin:["student","teacher","registrar","admin"], superadmin:["student","teacher","registrar","admin","superadmin"] };
const pageRoles = {"student.html":"student","teacher.html":"teacher","admin.html":"admin","access.html":"superadmin"};
document.querySelectorAll("a[href]").forEach((link) => {
  const required = pageRoles[link.getAttribute("href")];
  if (required && !permissions[role].includes(required)) { link.classList.add("role-hidden"); link.setAttribute("aria-hidden","true"); link.tabIndex = -1; }
});
const bar = document.createElement("div");
bar.className = "portal-utilities";
bar.innerHTML = `<span>Signed in as <b>${role === "superadmin" ? "Super administrator" : role}</b> · ${user}</span><span><button id="portalTheme" type="button">◐ Dark mode</button><a href="login.html">Switch role</a></span>`;
document.querySelector(".content").prepend(bar);
if (localStorage.getItem("dujarTheme") === "dark") document.body.classList.add("dark");
const themeButton = document.querySelector("#portalTheme");
const updateThemeText = () => themeButton.textContent = document.body.classList.contains("dark") ? "☀ Light mode" : "◐ Dark mode";
updateThemeText();
themeButton.addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("dujarTheme",document.body.classList.contains("dark") ? "dark" : "light"); updateThemeText(); });
