const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

function ensureOverlay() {
  let overlay = document.querySelector(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", closeMenu);
  }
  return overlay;
}

function openMenu() {
  siteNav.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("nav-open");
  const overlay = ensureOverlay();
  overlay.style.display = "block";
  const firstLink = siteNav.querySelector("a");
  firstLink && firstLink.focus();
}

function closeMenu() {
  siteNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
  const overlay = document.querySelector(".nav-overlay");
  if (overlay) overlay.style.display = "none";
  navToggle.focus();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    if (open) {
      document.body.classList.add("nav-open");
      ensureOverlay().style.display = "block";
      const firstLink = siteNav.querySelector("a");
      firstLink && firstLink.focus();
    } else {
      document.body.classList.remove("nav-open");
      const overlay = document.querySelector(".nav-overlay");
      if (overlay) overlay.style.display = "none";
    }
  });

  siteNav.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

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

if (typeof particlesJS === "function") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 66, density: { enable: true, value_area: 900 } },
      color: { value: ["#7DF9FF", "#dadccd"] },
      shape: { type: "circle" },
      opacity: { value: 0.22 },
      size: { value: 2.6, random: true },
      line_linked: {
        enable: true,
        distance: 140,
        color: "#9EF9FF",
        opacity: 0.16,
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

const slider = document.querySelector("[data-slider]");
if (slider) {
  const slides = slider.querySelectorAll("[data-slides] .slide");
  const prev = slider.querySelector("[data-prev]");
  const next = slider.querySelector("[data-next]");
  let i = 0;
  const show = (n) => {
    slides[i].classList.remove("active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("active");
  };
  prev.addEventListener("click", () => show(i - 1));
  next.addEventListener("click", () => show(i + 1));
  let timer = setInterval(() => show(i + 1), 6000);
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", () => (timer = setInterval(() => show(i + 1), 6000)));
}

const prettyCookie = document.querySelector(".cookie-banner-pretty");
if (prettyCookie) {
  const OK_KEY = "ck_ok";
  const REJ_KEY = "ck_rej";
  const btnOk = prettyCookie.querySelector("[data-ck-ok]");
  const btnReject = prettyCookie.querySelector("[data-ck-reject]");
  const hide = () => prettyCookie.remove();

  if (localStorage.getItem(OK_KEY) || localStorage.getItem(REJ_KEY)) {
    hide();
  } else {
    btnOk?.addEventListener("click", () => {
      localStorage.setItem(OK_KEY, "1");
      hide();
    });
    btnReject?.addEventListener("click", () => {
      localStorage.setItem(REJ_KEY, "1");
      hide();
    });
  }
}