const burgerButton = document.getElementById('burger-button');
const navLinks = document.getElementById('nav-links');

function setActiveMenuLink(targetHash) {
  if (!navLinks) return;
  const hash = targetHash || location.hash || '#about';
  const links = navLinks.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === hash);
  });
}

function closeMobileMenu() {
  if (!burgerButton || !navLinks) return;
  document.body.classList.remove('nav-menu-open');
  burgerButton.setAttribute('aria-expanded', 'false');
}

function toggleMobileMenu() {
  if (!burgerButton || !navLinks) return;
  const isOpen = document.body.classList.contains('nav-menu-open');
  if (isOpen) {
    closeMobileMenu();
    return;
  }
  document.body.classList.add('nav-menu-open');
  burgerButton.setAttribute('aria-expanded', 'true');
}

function bindMenuLinks() {
  if (!navLinks) return;
  const links = navLinks.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.onclick = () => {
      setActiveMenuLink(link.getAttribute('href'));
      closeMobileMenu();
    };
  });
}

function initMobileMenu() {
  if (!burgerButton || !navLinks) return;
  setActiveMenuLink();
  burgerButton.onclick = toggleMobileMenu;
  bindMenuLinks();
  window.addEventListener('hashchange', () => setActiveMenuLink());
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target || !document.body.classList.contains('nav-menu-open')) return;
    if (navLinks.contains(target) || burgerButton.contains(target)) return;
    closeMobileMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileMenu();
  });
}
