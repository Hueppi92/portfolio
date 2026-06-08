

function initializePage() {
 
  if (typeof initLanguage === 'function') initLanguage();
  if (typeof initMobileMenu === 'function') initMobileMenu();
  if (typeof initCursorGlow === 'function') initCursorGlow();
  if (typeof initReferences === 'function') initReferences();
  if (typeof initContactValidation === 'function') initContactValidation();
  if (typeof initProjects === 'function') initProjects();

}


