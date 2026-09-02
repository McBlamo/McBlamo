"use strict";
const theme = localStorage.getItem("dujarTheme");
if (theme === "dark") document.body.classList.add("dark");
const toggle = document.querySelector("#themeToggle");
toggle.textContent = document.body.classList.contains("dark") ? "☀ Light mode" : "◐ Dark mode";
toggle.addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("dujarTheme", document.body.classList.contains("dark") ? "dark" : "light"); toggle.textContent = document.body.classList.contains("dark") ? "☀ Light mode" : "◐ Dark mode"; });
document.querySelector("#loginForm").addEventListener("submit", (event) => { event.preventDefault(); localStorage.setItem("dujarRole", document.querySelector("#role").value); localStorage.setItem("dujarUser", document.querySelector("#email").value); window.location.href = "index.html"; });
