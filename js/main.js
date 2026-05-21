function initApp() {
	if (window.initLanguage) window.initLanguage();
	if (window.initCursorGlow) window.initCursorGlow();
	if (window.initReferences) window.initReferences();
	if (window.initProjects) window.initProjects();
}

window.onload = initApp;
