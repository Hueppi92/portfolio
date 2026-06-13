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

  const isHeroButton = id === "hero-btn-work" || id === "hero-btn-contact";
  const span = isHeroButton ? element.querySelector("span") : null;
  if (span) {
    span.textContent = text;
    return;
  }

  element.textContent = text;
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

function syncToggle() {
  const toggle = document.getElementById("language-toggle");
  if (!toggle) return;
  toggle.checked = currentLang === "de";
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
  const toggle = document.getElementById("language-toggle");
  if (!toggle) return;
  toggle.onchange = () => setLanguage(toggle.checked ? "de" : "en");
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
