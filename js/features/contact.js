const contactForm_name = document.getElementById("contact-name");
const contactForm_email = document.getElementById("contact-email");
const contactForm_message = document.getElementById("contact-message");
const contactForm_submit = document.getElementById("contact-submit");
const contactForm_privacy = document.getElementById("contact-privacy");

const contactValidationState = {
  errors: {},
  touched: {
    name: false,
    email: false,
    message: false,
    privacy: false,
  },
};

const contactDefaultPlaceholders = {
  name: contactForm_name ? contactForm_name.placeholder : "",
  email: contactForm_email ? contactForm_email.placeholder : "",
  message: contactForm_message ? contactForm_message.placeholder : "",
};

const contactFieldErrorIds = {
  name: "contact-name-error-inline",
  email: "contact-email-error-inline",
  message: "contact-message-error-inline",
  privacy: "contact-privacy-error-inline",
};

function getContactTexts() {
  const lang = typeof getLanguage === "function" ? getLanguage() : "de";
  if (lang === "en") return typeof textsEn !== "undefined" ? textsEn : {};
  return typeof textsDe !== "undefined" ? textsDe : {};
}

function getContactText(key, fallback) {
  const texts = getContactTexts();
  return texts[key] || fallback;
}

function validateEmail(email) {
  const re =
    /^(?!.*\.\.)([A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@((?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,})$/;
  return re.test(email);
}

function setFieldError(field, message) {
  if (message) {
    contactValidationState.errors[field] = message;
  } else {
    delete contactValidationState.errors[field];
  }
}

function validateNameField() {
  const name = contactForm_name.value.trim();
  if (!name) {
    return getContactText("contact-name-error", "Please enter your name.");
  }
  if (name.length < 2) {
    return getContactText(
      "contact-validation-name",
      "Please enter at least 2 characters.",
    );
  }
  return "";
}

function validateEmailField() {
  const email = contactForm_email.value.trim();
  if (!email) {
    return getContactText(
      "contact-validation-email-required",
      "Please enter your email.",
    );
  }
  if (!validateEmail(email)) {
    return getContactText(
      "contact-validation-email-format",
      "Please enter a valid email.",
    );
  }
  return "";
}

function validateMessageField() {
  const message = contactForm_message.value.trim();
  if (!message) {
    return getContactText(
      "contact-message-error",
      "Please enter your message.",
    );
  }
  if (message.length < 10) {
    return getContactText(
      "contact-validation-message",
      "Please enter at least 10 characters.",
    );
  }
  return "";
}

function validatePrivacyField() {
  if (!contactForm_privacy) return "";
  if (!contactForm_privacy.checked) {
    return getContactText(
      "contact-validation-privacy",
      "Please accept the privacy policy.",
    );
  }
  return "";
}

function validateField(field) {
  if (field === "name") {
    setFieldError("name", validateNameField());
    return;
  }
  if (field === "email") {
    setFieldError("email", validateEmailField());
    return;
  }
  if (field === "message") {
    setFieldError("message", validateMessageField());
    return;
  }
  if (field === "privacy") {
    setFieldError("privacy", validatePrivacyField());
  }
}

function getContactFieldErrorElement(field) {
  const errorId = contactFieldErrorIds[field];
  if (!errorId) return null;

  const existingElement = document.getElementById(errorId);
  if (existingElement) return existingElement;

  const errorElement = document.createElement("p");
  errorElement.id = errorId;
  errorElement.className = "contact-field-error";
  errorElement.setAttribute("aria-live", "polite");

  if (field === "name" && contactForm_name) {
    const wrapper = contactForm_name.closest(".contact-field");
    if (wrapper) wrapper.appendChild(errorElement);
  }

  if (field === "email" && contactForm_email) {
    const wrapper = contactForm_email.closest(".contact-field");
    if (wrapper) wrapper.appendChild(errorElement);
  }

  if (field === "message" && contactForm_message) {
    const wrapper = contactForm_message.closest(".contact-field");
    if (wrapper) wrapper.appendChild(errorElement);
  }

  if (field === "privacy" && contactForm_privacy) {
    const wrapper = contactForm_privacy.closest(".contact-check");
    if (wrapper) wrapper.appendChild(errorElement);
  }

  return document.getElementById(errorId);
}

function renderFieldErrorText(field, message) {
  const errorElement = getContactFieldErrorElement(field);
  if (!errorElement) return;
  errorElement.textContent = message || "";
  errorElement.classList.toggle("is-visible", Boolean(message));
}

function renderFieldState(field) {
  if (field === "name") {
    const message = contactValidationState.errors.name || "";
    const isEmpty = contactForm_name.value.trim().length === 0;
    const showPlaceholderError = Boolean(message) && isEmpty;
    const showInlineError = Boolean(message) && !isEmpty;
    contactForm_name.classList.toggle(
      "is-error-placeholder",
      showPlaceholderError,
    );
    contactForm_name.setAttribute("aria-invalid", message ? "true" : "false");
    contactForm_name.placeholder = showPlaceholderError
      ? message
      : contactDefaultPlaceholders.name;
    renderFieldErrorText("name", showInlineError ? message : "");
    return;
  }

  if (field === "email") {
    const message = contactValidationState.errors.email || "";
    const isEmpty = contactForm_email.value.trim().length === 0;
    const showPlaceholderError = Boolean(message) && isEmpty;
    const showInlineError = Boolean(message) && !isEmpty;
    contactForm_email.classList.toggle(
      "is-error-placeholder",
      showPlaceholderError,
    );
    contactForm_email.setAttribute("aria-invalid", message ? "true" : "false");
    contactForm_email.placeholder = showPlaceholderError
      ? message
      : contactDefaultPlaceholders.email;
    renderFieldErrorText("email", showInlineError ? message : "");
    return;
  }

  if (field === "message") {
    const message = contactValidationState.errors.message || "";
    const isEmpty = contactForm_message.value.trim().length === 0;
    const showPlaceholderError = Boolean(message) && isEmpty;
    const showInlineError = Boolean(message) && !isEmpty;
    contactForm_message.classList.toggle(
      "is-error-placeholder",
      showPlaceholderError,
    );
    contactForm_message.setAttribute(
      "aria-invalid",
      message ? "true" : "false",
    );
    contactForm_message.placeholder = showPlaceholderError
      ? message
      : contactDefaultPlaceholders.message;
    renderFieldErrorText("message", showInlineError ? message : "");
    return;
  }

  if (field === "privacy" && contactForm_privacy) {
    const message = contactValidationState.errors.privacy || "";
    contactForm_privacy.classList.toggle("is-error", Boolean(message));
    contactForm_privacy.setAttribute(
      "aria-invalid",
      message ? "true" : "false",
    );
    renderFieldErrorText("privacy", message);
  }
}

function handleFieldBlur(field) {
  contactValidationState.touched[field] = true;
  validateField(field);
  renderFieldState(field);
}

function handleFieldInput(field) {
  if (!contactValidationState.touched[field]) return;
  validateField(field);
  renderFieldState(field);
}

function validateAllFields() {
  contactValidationState.touched.name = true;
  contactValidationState.touched.email = true;
  contactValidationState.touched.message = true;
  contactValidationState.touched.privacy = true;

  validateField("name");
  validateField("email");
  validateField("message");
  validateField("privacy");

  renderFieldState("name");
  renderFieldState("email");
  renderFieldState("message");
  renderFieldState("privacy");

  return Object.keys(contactValidationState.errors).length === 0;
}

function focusFirstInvalidField() {
  if (contactValidationState.errors.name && contactForm_name) {
    contactForm_name.focus();
    return;
  }

  if (contactValidationState.errors.email && contactForm_email) {
    contactForm_email.focus();
    return;
  }

  if (contactValidationState.errors.message && contactForm_message) {
    contactForm_message.focus();
    return;
  }

  if (contactValidationState.errors.privacy && contactForm_privacy) {
    contactForm_privacy.focus();
  }
}

function getBackendErrorMessage(errorKey) {
  if (errorKey === "Invalid JSON") {
    return getContactText("contact-backend-invalid-json", "Invalid form data.");
  }
  if (errorKey === "Invalid input data") {
    return getContactText(
      "contact-backend-invalid-input",
      "Please check name, email, and message.",
    );
  }
  if (errorKey === "Mail delivery failed") {
    return getContactText(
      "contact-backend-mail-failed",
      "Mail could not be delivered.",
    );
  }
  if (errorKey === "Method not allowed") {
    return getContactText(
      "contact-backend-method-not-allowed",
      "Request method is not allowed.",
    );
  }
  return getContactText(
    "contact-status-fail",
    "Message could not be sent. Please try again.",
  );
}

function resetContactFormState() {
  contactValidationState.errors = {};
  contactValidationState.touched = {
    name: false,
    email: false,
    message: false,
    privacy: false,
  };

  renderFieldState("name");
  renderFieldState("email");
  renderFieldState("message");
  renderFieldState("privacy");
}

async function sendContactForm(formElement) {
  const payload = {
    name: contactForm_name.value.trim(),
    email: contactForm_email.value.trim(),
    message: contactForm_message.value.trim(),
  };

  const response = await fetch(formElement.action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json().catch(() => ({}));
  if (!response.ok || !responseData.success) {
    throw new Error(getBackendErrorMessage(responseData.error));
  }
}

async function handleContactSubmit(event) {
  event.preventDefault();
  const formElement = event.currentTarget;

  if (!validateAllFields()) {
    focusFirstInvalidField();
    return;
  }

  try {
    if (contactForm_submit) contactForm_submit.disabled = true;
    await sendContactForm(formElement);
    alert(
      getContactText("contact-status-success", "Message sent successfully."),
    );
    formElement.reset();
    resetContactFormState();
  } catch (error) {
    const fallbackMessage = getContactText(
      "contact-status-fail",
      "Message could not be sent. Please try again.",
    );
    alert(error instanceof Error ? error.message : fallbackMessage);
  } finally {
    if (contactForm_submit) contactForm_submit.disabled = false;
  }
}

function initContactValidation() {
  if (
    !contactForm_name ||
    !contactForm_email ||
    !contactForm_message ||
    !contactForm_submit
  )
    return;

  const formElement = contactForm_submit.closest("form");
  if (!formElement) return;
  if (formElement.dataset.contactValidationBound === "true") return;
  formElement.dataset.contactValidationBound = "true";

  getContactFieldErrorElement("name");
  getContactFieldErrorElement("email");
  getContactFieldErrorElement("message");
  getContactFieldErrorElement("privacy");

  contactForm_name.addEventListener("blur", () => handleFieldBlur("name"));
  contactForm_email.addEventListener("blur", () => handleFieldBlur("email"));
  contactForm_message.addEventListener("blur", () =>
    handleFieldBlur("message"),
  );

  contactForm_name.addEventListener("input", () => handleFieldInput("name"));
  contactForm_email.addEventListener("input", () => handleFieldInput("email"));
  contactForm_message.addEventListener("input", () =>
    handleFieldInput("message"),
  );

  if (contactForm_privacy) {
    contactForm_privacy.addEventListener("blur", () =>
      handleFieldBlur("privacy"),
    );
    contactForm_privacy.addEventListener("change", () =>
      handleFieldInput("privacy"),
    );
  }

  formElement.addEventListener("submit", handleContactSubmit);
}
