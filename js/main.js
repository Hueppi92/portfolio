function initApp() {
	if (typeof initLanguage === 'function') initLanguage();
	if (typeof initCursorGlow === 'function') initCursorGlow();
	if (typeof initReferences === 'function') initReferences();
	if (typeof initProjects === 'function') initProjects();
}

onload = initApp;
