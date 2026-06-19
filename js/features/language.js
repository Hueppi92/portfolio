let currentLang = "de";

function normalizeLang(lang) {
  return lang === "en" ? "en" : "de";
}

function getTexts(lang) {
  const safeLang = normalizeLang(lang);
  return safeLang === "en" ? textsEn || {} : textsDe || {};
}

function applyTextToElement(id, text) {
  const element = document.getElementById(id);
  if (!element) return;

  const labels = element.querySelectorAll(".btn-label");
  if (labels.length > 0) {
    // Preserve marquee button structure and only update visible label text.
    labels.forEach((label) => {
      label.textContent = text;
    });
    return;
  }

  // IDs that may contain HTML content (br tags, links, strong tags, etc.)
  const htmlContentIds = [
    'privacy-responsible-text',
    'privacy-data-name',
    'privacy-data-email',
    'privacy-data-message',
    'privacy-hosting-text',
    'privacy-fonts-text'
  ];

  if (htmlContentIds.includes(id) || text.includes('<')) {
    element.innerHTML = text;
  } else {
    element.textContent = text;
  }
}

function applyLocalizedTextEntries(texts) {
  Object.keys(texts).forEach((id) => {
    applyTextToElement(id, texts[id]);
  });
}

function setInputPlaceholder(inputId, value) {
  const input = document.getElementById(inputId);
  if (!input || !value) return;
  input.placeholder = value;
}

function applyContactPlaceholders(texts) {
  setInputPlaceholder("contact-name", texts["contact-name-placeholder"]);
  setInputPlaceholder("contact-email", texts["contact-email-placeholder"]);
  setInputPlaceholder("contact-message", texts["contact-message-placeholder"]);
}

function renderText(lang) {
  const texts = getTexts(lang);
  applyLocalizedTextEntries(texts);
  applyContactPlaceholders(texts);
  document.documentElement.lang = normalizeLang(lang);
}

function getLangSwitchParts() {
  const switchElement = document.querySelector(".lang-switch");
  if (!switchElement) return null;
  const options = switchElement.querySelectorAll(".lang-switch__option");
  return { switchElement, options };
}

function syncToggle() {
  const parts = getLangSwitchParts();
  if (!parts) return;
  const isDe = currentLang === "de";
  parts.switchElement.classList.toggle("is-de", isDe);
  parts.options.forEach((option) => {
    const isActive = option.getAttribute("data-lang") === currentLang;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function setLanguage(lang) {
  currentLang = normalizeLang(lang);
  localStorage.setItem("lang", currentLang);
  syncToggle();
  renderText(currentLang);
  if (typeof renderReferences === "function") renderReferences();
  if (window.renderProjectsSection) window.renderProjectsSection();
}

function bindToggle() {
  const parts = getLangSwitchParts();
  if (!parts) return;
  if (parts.switchElement.dataset.bound === "true") return;
  parts.switchElement.dataset.bound = "true";
  parts.options.forEach((option) => {
    option.addEventListener("click", () => {
      const lang = option.getAttribute("data-lang");
      if (!lang) return;
      setLanguage(lang);
    });
  });
}

function initLanguage() {
  currentLang = normalizeLang(localStorage.getItem("lang"));
  bindToggle();
  syncToggle();
  renderText(currentLang);
}

function getLanguage() {
  return currentLang;
}
