const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.body.appendChild(glow);

let rafId;
document.addEventListener('mousemove', (e) => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    glow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
  });
});

let lang = 'en';
const langToggle = document.getElementById('language-toggle');
const translatableElements = document.querySelectorAll('[data-de][data-en], [data-de]:not([data-en])');

function renderLang() {
  translatableElements.forEach((element) => {
    const value = element.dataset[lang] || element.dataset.de || '';
    element.textContent = value;
  });

  document.documentElement.lang = lang;
}

function switchLang() {
  lang = lang === 'de' ? 'en' : 'de';
  if (langToggle) {
    langToggle.checked = lang === 'de';
  }
  renderLang();
}

if (langToggle) {
  langToggle.checked = lang === 'de';
  langToggle.addEventListener('change', () => {
    lang = langToggle.checked ? 'de' : 'en';
    renderLang();
  });
}

renderLang();
window.switchLang = switchLang;