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
}

function toggleMobileMenu() {
  if (!burgerButton || !navLinks) return;
  const isOpen = document.body.classList.contains('nav-menu-open');
  if (isOpen) {
    closeMobileMenu();
    return;
  }
  document.body.classList.add('nav-menu-open');
  
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

function setActiveMenuSection(sectionId) {
  if (!navLinks) return;
  const links = navLinks.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${sectionId}`);
  });
}

function syncActiveMenuBySection() {
  const about = document.getElementById('about');
  const skills = document.getElementById('skills');
  const projects = document.getElementById('projects');
  if (!about || !skills || !projects) return;

  const viewportSection = window.scrollY + window.innerHeight / 2;
  if (viewportSection >= projects.offsetTop) return setActiveMenuSection('projects');
  if (viewportSection >= skills.offsetTop) return setActiveMenuSection('skills');
  setActiveMenuSection('about');
}

function handleOutsideMenuClick(event) {
  const target = event.target;
  if (!target || !document.body.classList.contains('nav-menu-open')) return;
  if (navLinks.contains(target) || burgerButton.contains(target)) return;
  closeMobileMenu();
}

function handleMenuResize() {
  if (window.innerWidth > 900) closeMobileMenu();
  syncActiveMenuBySection();
}

function initMobileMenu() {
  if (!burgerButton || !navLinks) return;
  syncActiveMenuBySection();
  burgerButton.onclick = toggleMobileMenu;
  bindMenuLinks();
  window.addEventListener('hashchange', syncActiveMenuBySection);
  window.addEventListener('scroll', syncActiveMenuBySection, { passive: true });
  window.addEventListener('resize', handleMenuResize);
  document.addEventListener('click', handleOutsideMenuClick);
  document.addEventListener('keydown', (event) => event.key === 'Escape' && closeMobileMenu());
}
