function getField(id) {
  return document.getElementById(id);
}

function getContactText(key, fallback) {
  if (!window.getTexts || !window.getLanguage) return fallback;
  const texts = window.getTexts(window.getLanguage()) || {};
  return texts[key] || fallback;
}

function setEmailFormatError(isVisible) {
  const message = getField('contact-email-format-error');
  if (message) message.classList.toggle('is-visible', isVisible);
}

function setFieldState(field, isError, text) {
  if (!field) return;
  field.classList.toggle('is-error-placeholder', isError);
  field.setAttribute('aria-invalid', isError ? 'true' : 'false');
  field.placeholder = text;
}

function resetField(field, placeholderKey, placeholderFallback) {
  const text = getContactText(placeholderKey, placeholderFallback);
  setFieldState(field, false, text);
}

function setFieldError(field, errorKey, errorFallback) {
  const text = getContactText(errorKey, errorFallback);
  field.value = '';
  setFieldState(field, true, text);
}

function checkRequiredField(field, placeholderKey, placeholderFallback, errorKey, errorFallback) {
  if (!field || field.value.trim()) {
    resetField(field, placeholderKey, placeholderFallback);
    return true;
  }
  setFieldError(field, errorKey, errorFallback);
  return false;
}

function checkEmailField() {
  const field = getField('contact-email');
  const hasText = checkRequiredField(field, 'contact-email-placeholder', 'deinname@email.de', 'contact-email-error', 'Bitte gib eine gueltige E-Mail-Adresse ein.');
  if (!hasText) return setEmailFormatError(false), false;
  if (field && !field.checkValidity()) {
    field.classList.remove('is-error-placeholder');
    field.setAttribute('aria-invalid', 'true');
    setEmailFormatError(true);
    return false;
  }
  setEmailFormatError(false);
  return true;
}

function checkPrivacyField() {
  const checkbox = getField('contact-privacy');
  const message = getField('contact-privacy-error');
  if (!checkbox || !message) return true;
  const valid = checkbox.checked;
  checkbox.setAttribute('aria-invalid', valid ? 'false' : 'true');
  message.classList.toggle('is-visible', !valid);
  return valid;
}

function checkFields(event) {
  const nameOk = checkRequiredField(getField('contact-name'), 'contact-name-placeholder', 'Dein Name', 'contact-name-error', 'Bitte gib deinen Namen ein.');
  const emailOk = checkEmailField();
  const msgOk = checkRequiredField(getField('contact-message'), 'contact-message-placeholder', 'Erzaehl mir kurz von deinem Projekt.', 'contact-message-error', 'Bitte beschreibe kurz dein Anliegen.');
  const privacyOk = checkPrivacyField();
  if (!nameOk || !emailOk || !msgOk || !privacyOk) event.preventDefault();
}

function wireTextField(id, placeholderKey, placeholderFallback) {
  const field = getField(id);
  if (!field) return;
  resetField(field, placeholderKey, placeholderFallback);
  field.onfocus = () => resetField(field, placeholderKey, placeholderFallback);
  field.oninput = () => field.value.trim() && field.setAttribute('aria-invalid', 'false');
}

function wireEmailField() {
  const field = getField('contact-email');
  if (!field) return;
  field.setAttribute('aria-describedby', 'contact-email-format-error');
  wireTextField('contact-email', 'contact-email-placeholder', 'deinname@email.de');
  field.oninput = () => {
    if (!field.value.trim()) return;
    field.classList.remove('is-error-placeholder');
    const invalid = !field.checkValidity();
    field.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    setEmailFormatError(invalid);
  };
}

function initContactValidation() {
  const form = document.querySelector('.contact-form');
  const privacy = getField('contact-privacy');
  if (!form) return;
  wireTextField('contact-name', 'contact-name-placeholder', 'Dein Name');
  wireEmailField();
  wireTextField('contact-message', 'contact-message-placeholder', 'Erzaehl mir kurz von deinem Projekt.');
  if (privacy) privacy.onchange = checkPrivacyField;
  form.onsubmit = checkFields;
}
