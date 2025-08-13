// Theme
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") root.classList.add("light");
document.getElementById("themeToggle").addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
});

// Mobile nav
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navMenu.classList.toggle("show");
});

// Scroll progress
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  progressBar.style.width = `${scrolled * 100}%`;
});

// Active year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth anchor close on mobile
[...document.querySelectorAll('.nav__menu a')].forEach(a=>{
  a.addEventListener('click', ()=> navMenu.classList.remove('show'));
});

// Modals
document.querySelectorAll("[data-modal-target]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const sel = btn.getAttribute("data-modal-target");
    const dialog = document.querySelector(sel);
    if (dialog?.showModal) dialog.showModal();
  });
});

// Accessibility: close modal on Esc is native; click outside to close
document.querySelectorAll("dialog").forEach(d=>{
  d.addEventListener("click", e=>{
    const rect = d.querySelector(".modal__card").getBoundingClientRect();
    const inDialog = e.clientX >= rect.left && e.clientX <= rect.right &&
                     e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inDialog) d.close();
  });
});
