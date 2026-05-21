(() => {
const prevButton = document.getElementById('reference-prev');
const nextButton = document.getElementById('reference-next');
const dotsRoot = document.getElementById('reference-dots');
const prevSlot = document.getElementById('reference-prev-slot');
const activeSlot = document.getElementById('reference-active-slot');
const nextSlot = document.getElementById('reference-next-slot');
const referenceEntries = window.referenceEntries || [];

let referenceIndex = 0;

const getEntry = (offset) => referenceEntries[(referenceIndex + offset + referenceEntries.length) % referenceEntries.length];
const getQuote = (entry) => {
  const lang = window.getLanguage ? window.getLanguage() : 'de';
  return entry.quote[lang] || entry.quote.de || entry.quote.en || '';
};
const cardMarkup = (entry) => `<p class="reference-quote">${getQuote(entry)}</p><div class="reference-footer"><span class="reference-line"></span><p class="reference-name">${entry.author}</p></div>`;

function renderCard(slot, entry, isActive) {
  if (!slot) return;
  slot.classList.toggle('is-active', isActive);
  slot.classList.toggle('is-side', !isActive);
  slot.innerHTML = cardMarkup(entry);
}

function dotMarkup(index) {
  const active = index === referenceIndex ? ' is-active' : '';
  return `<button type="button" class="reference-dot${active}" aria-label="Go to reference ${index + 1}" onclick="window.referenceGo(${index})"></button>`;
}

function renderDots() {
  if (!dotsRoot) return;
  const dots = referenceEntries.map((_, index) => dotMarkup(index)).join('');
  dotsRoot.innerHTML = dots;
}

function renderReferences() {
  if (!activeSlot || !referenceEntries.length) return;
  renderCard(prevSlot, getEntry(-1), false);
  renderCard(activeSlot, getEntry(0), true);
  renderCard(nextSlot, getEntry(1), false);
  renderDots();
}

function updateReferences(nextIndex) {
  referenceIndex = nextIndex;
  renderReferences();
}

function shiftReferences(step) {
  updateReferences((referenceIndex + step + referenceEntries.length) % referenceEntries.length);
}

function bindReferenceControls() {
  if (prevButton) prevButton.onclick = () => shiftReferences(-1);
  if (nextButton) nextButton.onclick = () => shiftReferences(1);
}

function exposeReferenceHandlers() {
  window.referenceGo = (index) => updateReferences(index);
}

function initReferences() {
  exposeReferenceHandlers();
  bindReferenceControls();
  renderReferences();
}

window.initReferences = initReferences;
window.renderReferences = renderReferences;
})();
