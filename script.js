const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
let overlay = document.querySelector(".nav-overlay");
if (!overlay) {
  overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);
}

function openMenu() {
  siteNav.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("nav-open");
  overlay.style.display = "block";
  const firstLink = siteNav.querySelector("a");
  firstLink && firstLink.focus();
}

function closeMenu() {
  siteNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
  overlay.style.display = "none";
  navToggle.focus();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    if (open) {
      document.body.classList.add("nav-open");
      overlay.style.display = "block";
      const firstLink = siteNav.querySelector("a");
      firstLink && firstLink.focus();
    } else {
      document.body.classList.remove("nav-open");
      overlay.style.display = "none";
    }
  });

  siteNav.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
      closeMenu();
    }
  });

  const mq = window.matchMedia("(min-width: 901px)");
  function handleResize(e) {
    if (e.matches) {
      closeMenu();
    }
  }
  mq.addEventListener("change", handleResize);
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* ParticlesJS theme-aware */
const particlesContainer = document.getElementById("particles-js");
function destroyParticles() {
  if (!particlesContainer) return;
  while (particlesContainer.firstChild) particlesContainer.removeChild(particlesContainer.firstChild);
  if (window.pJSDom && window.pJSDom.length) {
    try {
      window.pJSDom.forEach(p => p.pJS?.fn?.vendors?.destroypJS && p.pJS.fn.vendors.destroypJS());
    } catch {}
    window.pJSDom = [];
  }
}
function loadParticles(mode) {
  if (!particlesContainer || typeof particlesJS !== "function") return;
  const isLight = mode === "light";
  const colors = isLight ? ["#1d3347", "#5b7c99"] : ["#6EC8F0", "#dae2ea"];
  const linkColor = isLight ? "#365a78" : "#8EDCF7";
  particlesJS("particles-js", {
    particles: {
      number: { value: 66, density: { enable: true, value_area: 900 } },
      color: { value: colors },
      shape: { type: "circle" },
      opacity: { value: isLight ? 0.30 : 0.22 },
      size: { value: 2.6, random: true },
      line_linked: {
        enable: true,
        distance: 140,
        color: linkColor,
        opacity: isLight ? 0.22 : 0.16,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.3,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 115 },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

/* Tabs */
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
tabs.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    panels[idx].classList.add("active");
    tabs.forEach((t, i) => t.setAttribute("aria-selected", i === idx ? "true" : "false"));
  });
});

/* Scroll reveal */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  const revealEls = document.querySelectorAll("[data-reveal]");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));
}

/* Sticky header glass enhancement on scroll */
const header = document.querySelector(".site-header");
function onScroll() {
  if (!header) return;
  const scrolled = window.scrollY > 8;
  header.classList.toggle("scrolled", scrolled);
}
window.addEventListener("scroll", onScroll);
onScroll();

/* Theme toggle */
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
function getStoredTheme() {
  const v = localStorage.getItem("theme");
  if (v === "light" || v === "dark") return v;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}
function applyTheme(mode) {
  root.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  destroyParticles();
  loadParticles(mode);
}
applyTheme(getStoredTheme());
themeToggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
});

/* One-time fake cookie banner */
const prettyCookie = document.querySelector(".cookie-banner-pretty");
if (prettyCookie) {
  const SEEN = "ck_seen";
  const hide = () => prettyCookie.remove();
  if (localStorage.getItem(SEEN)) {
    hide();
  } else {
    const btnOk = prettyCookie.querySelector("[data-ck-ok]");
    const btnReject = prettyCookie.querySelector("[data-ck-reject]");
    btnOk?.addEventListener("click", () => { localStorage.setItem(SEEN, "1"); hide(); });
    btnReject?.addEventListener("click", () => { localStorage.setItem(SEEN, "1"); hide(); });
  }
}