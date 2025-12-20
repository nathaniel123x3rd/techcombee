// Mobile nav + dynamic year + subtle particles init
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.getElementById("year");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  siteNav.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (year) year.textContent = new Date().getFullYear();

if (typeof particlesJS === "function") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 900 } },
      color: { value: ["#7DF9FF", "#dadccd"] },
      shape: { type: "circle" },
      opacity: { value: 0.18 },
      size: { value: 2.3, random: true },
      line_linked: { enable: true, distance: 140, color: "#7DF9FF", opacity: 0.12, width: 1 },
      move: { enable: true, speed: 1.2, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { repulse: { distance: 110 }, push: { particles_nb: 3 } }
    },
    retina_detect: true
  });
}