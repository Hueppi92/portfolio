function moveGlow(glow, event) {
  const x = event.clientX;
  const y = event.clientY;
  glow.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
}

function bindCursor(glow) {
  let rafId = 0;
  document.onmousemove = (event) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => moveGlow(glow, event));
  };
}

function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  bindCursor(glow);
}
