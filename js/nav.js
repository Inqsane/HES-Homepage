(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  dropdowns.forEach(function (drop) {
    const button = drop.querySelector(".dropdown-btn");
    if (!button) return;

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const willOpen = !drop.classList.contains("is-open");
      dropdowns.forEach(function (other) {
        other.classList.remove("is-open");
        const otherBtn = other.querySelector(".dropdown-btn");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      drop.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  document.addEventListener("click", function () {
    dropdowns.forEach(function (drop) {
      drop.classList.remove("is-open");
      const button = drop.querySelector(".dropdown-btn");
      if (button) button.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    dropdowns.forEach(function (drop) {
      drop.classList.remove("is-open");
    });
    if (header) header.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });

  const hero = document.querySelector(".hero");
  const scene = document.querySelector(".hero-scene");
  const fadeEl = document.querySelector(".hero-scene-fade");
  let ticking = false;
  let lastFade = -1;

  function updateBgFade() {
    ticking = false;
    if (!hero || !scene || !fadeEl) return;
    const range = Math.max(hero.offsetHeight * 0.85, 1);
    const fade = Math.min(1, Math.max(0, window.scrollY / range));
    const stepped = Math.round(fade * 24) / 24;
    if (stepped === lastFade) return;
    lastFade = stepped;
    fadeEl.style.opacity = String(stepped);
    scene.classList.toggle("is-done", stepped >= 1);
  }

  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateBgFade);
  }

  updateBgFade();
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
})();
