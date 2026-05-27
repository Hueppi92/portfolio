
  let currentLang = 'de';

  function normalizeLang(lang) {
    return lang === 'en' ? 'en' : 'de';
  }

  function getTexts(lang) {
    const safeLang = normalizeLang(lang);
    return safeLang === 'en' ? textsEn || {} : textsDe || {};
  }

  function renderText(lang) {
    const texts = getTexts(lang);
    Object.keys(texts).forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      element.textContent = texts[id];
    });

    const contactNameInput = document.getElementById('contact-name');
    if (contactNameInput && texts['contact-name-placeholder']) {
      contactNameInput.placeholder = texts['contact-name-placeholder'];
    }

    const contactEmailInput = document.getElementById('contact-email');
    if (contactEmailInput && texts['contact-email-placeholder']) {
      contactEmailInput.placeholder = texts['contact-email-placeholder'];
    }

    const contactMessageInput = document.getElementById('contact-message');
    if (contactMessageInput && texts['contact-message-placeholder']) {
      contactMessageInput.placeholder = texts['contact-message-placeholder'];
    }

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
    if (typeof renderReferences === 'function') renderReferences();
    if (window.renderProjectsSection) window.renderProjectsSection();
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

  function getLanguage() {
    return currentLang;
  }

