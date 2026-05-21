
  let currentLang = 'de';

  function normalizeLang(lang) {
    return lang === 'en' ? 'en' : 'de';
  }

  function getTexts(lang) {
    const safeLang = normalizeLang(lang);
    return safeLang === 'en' ? window.textsEn || {} : window.textsDe || {};
  }

  function renderText(lang) {
    const texts = getTexts(lang);
    Object.keys(texts).forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      element.textContent = texts[id];
    });
    document.documentElement.lang = normalizeLang(lang);
  }

  function syncToggle() {
    const toggle = document.getElementById('language-toggle');
    if (!toggle) return;
    toggle.checked = currentLang === 'de';
  }

  function setLanguage(lang) {
    currentLang = normalizeLang(lang);
    localStorage.setItem('lang', currentLang);
    syncToggle();
    renderText(currentLang);
    if (window.renderReferences) window.renderReferences();
  }

  function bindToggle() {
    const toggle = document.getElementById('language-toggle');
    if (!toggle) return;
    toggle.onchange = () => setLanguage(toggle.checked ? 'de' : 'en');
  }

  function initLanguage() {
    currentLang = normalizeLang(localStorage.getItem('lang'));
    bindToggle();
    syncToggle();
    renderText(currentLang);
  }

  window.getLanguage = () => currentLang;
  window.setLanguage = setLanguage;
  window.initLanguage = initLanguage;

