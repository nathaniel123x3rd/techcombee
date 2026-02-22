// Hero Reveal Effect - Desktop Only with Boundary Detection
(function() {
  // Only run on desktop
  if (window.innerWidth <= 900) return;

  const circle = document.getElementById('hero-circle');
  const wrapper = document.querySelector('.hero-reveal-wrapper');
  
  if (!circle || !wrapper) return;

  const halfCircleSize = circle.offsetHeight / 2;
  let animationFrameId;

  function updateCirclePosition(x, y) {
    // Get wrapper boundaries
    const rect = wrapper.getBoundingClientRect();
    const wrapperLeft = rect.left;
    const wrapperTop = rect.top;
    const wrapperRight = rect.right;
    const wrapperBottom = rect.bottom;

    // Constrain circle to wrapper boundaries
    const constrainedX = Math.max(wrapperLeft + halfCircleSize, Math.min(x, wrapperRight - halfCircleSize));
    const constrainedY = Math.max(wrapperTop + halfCircleSize, Math.min(y, wrapperBottom - halfCircleSize));

    // Convert to absolute positioning relative to wrapper
    const relativeX = constrainedX - wrapperLeft;
    const relativeY = constrainedY - wrapperTop;

    circle.style.left = `${relativeX - halfCircleSize}px`;
    circle.style.top = `${relativeY - halfCircleSize}px`;
  }

  function handleMouseMove(e) {
    const rect = wrapper.getBoundingClientRect();
    
    // Only track mouse if it's over the wrapper
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        updateCirclePosition(e.clientX, e.clientY);
      });
    }
  }

  // Initialize circle at center of wrapper
  const rect = wrapper.getBoundingClientRect();
  updateCirclePosition(rect.left + rect.width / 2, rect.top + rect.height / 2);

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