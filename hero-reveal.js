// Hero Reveal Effect - Desktop Only
(function() {
  // Only run on desktop
  if (window.innerWidth <= 900) return;

  const circle = document.getElementById('hero-circle');
  if (!circle) return;

  const halfCircleSize = circle.offsetHeight / 2;
  let animationFrameId;

  function updateCirclePosition(x, y) {
    circle.style.left = `${x - halfCircleSize}px`;
    circle.style.top = `${y - halfCircleSize}px`;
  }

  function handleMouseMove(e) {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      updateCirclePosition(e.clientX, e.clientY);
    });
  }

  // Initialize circle at center of hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const rect = heroSection.getBoundingClientRect();
    updateCirclePosition(rect.width / 2, rect.height / 2 + window.scrollY);
  }

  // Track mouse movement
  document.addEventListener('mousemove', handleMouseMove, { passive: true });

  // Cleanup on window resize to mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 900) {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    }
  });
})();