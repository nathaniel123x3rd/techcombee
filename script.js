// Minimal JS: mobile nav toggle, dynamic year, particles.js init.
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

if (year) {
  year.textContent = new Date().getFullYear();
}

// Particles.js configuration (subtle, dark-friendly)
particlesJS("particles-js", {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 900 } },
    color: { value: "#2ac7c7" },
    shape: { type: "circle" },
    opacity: { value: 0.25, random: false },
    size: { value: 2.5, random: true },
    line_linked: {
      enable: true,
      distance: 140,
      color: "#2ac7c7",
      opacity: 0.18,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.4,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: { distance: 110 },
      push: { particles_nb: 3 },
    },
  },
  retina_detect: true,
});