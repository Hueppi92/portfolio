const skillTooltipTechs = [
  { icon: "./assets/icon/react.svg", label: "React" },
  { icon: "./assets/icon/vue.svg", label: "Vue.js" },
];

function renderSkillTooltip() {
  const container = document.getElementById("skill-tooltip-logos");
  if (!container) return;

  container.innerHTML = skillTooltipTechs
    .map(
      (tech) => `
        <div class="skill-tooltip-logo">
          <img src="${tech.icon}" alt="${tech.label}">
          <span>${tech.label}</span>
        </div>
      `
    )
    .join("");
}

function initSkillTooltip() {
  const trigger = document.querySelector(".skill-item-tooltip");
  if (!trigger) return;

  const positionTooltip = () => {
    const tooltip = trigger.querySelector(".skill-tooltip");
    if (!tooltip) return;

    tooltip.style.setProperty("--tooltip-shift-x", "0px");
    const rect = tooltip.getBoundingClientRect();
    const minX = 8;
    const maxX = window.innerWidth - 8;

    let shift = 0;
    if (rect.left < minX) shift = minX - rect.left;
    if (rect.right > maxX) shift = maxX - rect.right;

    tooltip.style.setProperty("--tooltip-shift-x", `${Math.round(shift)}px`);
  };

  const open = () => {
    trigger.classList.add("is-open");
    positionTooltip();
    setTimeout(positionTooltip, 0);
  };

  const close = () => {
    trigger.classList.remove("is-open");
    const tooltip = trigger.querySelector(".skill-tooltip");
    if (tooltip) tooltip.style.setProperty("--tooltip-shift-x", "0px");
  };

  trigger.addEventListener("mouseenter", open);
  trigger.addEventListener("mouseleave", close);
  trigger.addEventListener("focusin", open);
  trigger.addEventListener("focusout", close);

  trigger.addEventListener("click", (event) => {
    if (window.matchMedia("(hover: none)").matches) {
      event.preventDefault();
      trigger.classList.toggle("is-open");
    }
  });

  document.addEventListener("click", (event) => {
    if (!trigger.contains(event.target)) close();
  });

  window.addEventListener("resize", () => {
    if (trigger.classList.contains("is-open")) positionTooltip();
  });
}