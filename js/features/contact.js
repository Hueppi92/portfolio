function initContactValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.setAttribute('novalidate', 'novalidate');
  registerValidationResetHandlers(form);

  form.addEventListener('submit', handleContactSubmit);
}

async function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;

  clearValidationState(form);

  const validationMessage = validateContactForm(form);
  if (validationMessage) {
    if (validationMessage !== 'privacy-error') {
      handleSubmitStatus(form, false, validationMessage);
    }
    if (submitButton) submitButton.disabled = false;
    return;
  }

  try {
    const formData = new FormData(form);
    const payload = handleFormData(formData);
    const jsonPayload = JSON.stringify(payload);
    const response = await transferPayloadToPHP(form.action, jsonPayload);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Request failed');
    }

    form.reset();
    handleSubmitStatus(form, true);
  } catch (error) {
    handleSubmitStatus(form, false, error.message);
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

function handleFormData(formData) {
  const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };
  return payload;
}

function handleSubmitStatus(form, isSuccess, errorMessage = '') {
  if (isSuccess) {
    showContactStatus(form, 'Message sent successfully.', true);
    return;
  }

  showContactStatus(form, errorMessage || 'Message could not be sent. Please try again.', false);
}

async function transferPayloadToPHP(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  });
  return response;
}

function showContactStatus(form, message, isSuccess) {
  let status = form.querySelector('[data-contact-status]');
  if (!status) {
    status = document.createElement('p');
    status.setAttribute('data-contact-status', 'true');
    form.appendChild(status);
  }
  status.textContent = message;
  status.style.color = isSuccess ? '#2e7d32' : '#c62828';
}

function registerValidationResetHandlers(form) {
  const fields = getValidatedFields(form);

  fields.forEach((field) => {
    field.dataset.defaultPlaceholder = field.placeholder;
    field.addEventListener('input', () => clearFieldError(field));
  });

  const privacyField = form.querySelector('input[name="privacy"]');
  if (privacyField) {
    privacyField.addEventListener('change', () => {
      privacyField.classList.remove('is-error');
      clearPrivacyError(form);
    });
  }
}

function validateContactForm(form) {
  const nameField = form.querySelector('input[name="name"]');
  const emailField = form.querySelector('input[name="email"]');
  const messageField = form.querySelector('textarea[name="message"]');
  const privacyField = form.querySelector('input[name="privacy"]');

  if (!nameField || !emailField || !messageField || !privacyField) {
    return 'Form setup is incomplete.';
  }

  const nameValue = nameField.value.trim();
  const emailValue = emailField.value.trim();
  const messageValue = messageField.value.trim();

  if (nameValue.length < 2) {
    setFieldError(nameField, 'Oops! it seems your name is missing.');
    return 'Please check the highlighted fields.';
  }

  if (!emailValue) {
    setFieldError(emailField, 'Please enter your email.');
    return 'Please check the highlighted fields.';
  } else if (!isValidEmail(emailValue)) {
    setFieldError(emailField, 'Please enter a valid email.');
    return 'Please check the highlighted fields.';
  }

  if (messageValue.length < 10) {
    setFieldError(messageField, 'What do you need to develop? Please provide more details.');
    return 'Please check the highlighted fields.';
  }

  if (!privacyField.checked) {
    privacyField.classList.add('is-error');
    showPrivacyError(form, 'Please accept the privacy policy checkbox.');
    return 'privacy-error';
  }

  return '';
}

function getValidatedFields(form) {
  return Array.from(form.querySelectorAll('input[name="name"], input[name="email"], textarea[name="message"]'));
}

function setFieldError(field, errorPlaceholder) {
  field.value = '';
  field.placeholder = errorPlaceholder;
  field.classList.add('is-error-placeholder');
}

function clearFieldError(field) {
  field.classList.remove('is-error-placeholder');
  const defaultPlaceholder = field.dataset.defaultPlaceholder;
  if (defaultPlaceholder) {
    field.placeholder = defaultPlaceholder;
  }
}

function clearValidationState(form) {
  getValidatedFields(form).forEach((field) => clearFieldError(field));

  const privacyField = form.querySelector('input[name="privacy"]');
  if (privacyField) {
    privacyField.classList.remove('is-error');
  }

  clearPrivacyError(form);
}

function showPrivacyError(form, message) {
  const privacyContainer = form.querySelector('.contact-check');
  if (!privacyContainer) return;

  let privacyError = form.querySelector('[data-privacy-error]');
  if (!privacyError) {
    privacyError = document.createElement('p');
    privacyError.setAttribute('data-privacy-error', 'true');
    privacyError.style.margin = '8px 0 0';
    privacyError.style.color = '#c62828';
    privacyError.style.fontFamily = '"Karla", sans-serif';
    privacyError.style.fontSize = '14px';
    privacyContainer.insertAdjacentElement('afterend', privacyError);
  }

  privacyError.textContent = message;
}

function clearPrivacyError(form) {
  const privacyError = form.querySelector('[data-privacy-error]');
  if (privacyError) {
    privacyError.remove();
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}