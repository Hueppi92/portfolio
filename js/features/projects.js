const projectList = document.getElementById('project-list');
const projectModal = document.getElementById('project-modal');
const projectModalBackdrop = document.getElementById('project-modal-backdrop');
const projectModalClose = document.getElementById('project-modal-close');
const projectModalContent = document.getElementById('project-modal-content');
let projectEntries = [];
let activeProjectIndex = 0;

function getProjectLanguage() {
  return window.getLanguage ? window.getLanguage() : 'de';
}

function getProjectText(key, fallback) {
  const texts = window.getTexts ? window.getTexts(getProjectLanguage()) || {} : {};
  return texts[key] || fallback;
}

function getProjectStack(project) {
  return project['tech-stack'] || project.techStack || '';
}

function getProjectDescription(project) {
  const lang = getProjectLanguage();
  return project.description[lang] || project.description.de || '';
}

function getProjectTechnologies(project) {
  return project.technologies || [];
}

function getTechnologyIcon(technology) {
  const icons = {
    CSS: './assets/icon/CSS.png',
    HTML: './assets/icon/HTML.png',
    JavaScript: './assets/icon/JavaScript.png',
    Firebase: './assets/icon/firebase.png',
    Git: './assets/icon/git.png',
    'REST-API': './assets/icon/Rest-Api.png',
    Scrum: './assets/icon/scrum.png'
  };
  return icons[technology] || '';
}

function previewMarkup(project) {
  return `<div class="project-row-preview"><div class="project-row-image" style="background-image: url('${project.preview || ''}')"></div></div>`;
}

function projectMarkup(project, index) {
  const preview = previewMarkup(project);
  return `<div class="project-item" tabindex="0" data-project-index="${index}"><span class="project-name">${project.name}</span><span class="project-stack">${getProjectStack(project)}</span>${preview}</div>`;
}

function modalActionsMarkup(project) {
  const githubText = getProjectText('project-modal-github', 'GitHub');
  const liveText = getProjectText('project-modal-live', 'Live Test');
  return `<div class="project-modal-actions"><a class="project-modal-button" href="${project.github}" target="_blank" rel="noopener noreferrer">${githubText} ↗</a><a class="project-modal-button" href="${project.live}" target="_blank" rel="noopener noreferrer">${liveText} ↗</a></div>`;
}

function technologyBadgeMarkup(technology) {
  const icon = getTechnologyIcon(technology);
  const image = icon ? `<img class="project-tech-image" src="${icon}" alt="${technology}">` : '';
  return `<span class="project-tech-badge">${image}<span>${technology}</span></span>`;
}

function modalTechnologiesMarkup(project) {
  return `<div class="project-modal-technologies">${getProjectTechnologies(project).map((technology) => technologyBadgeMarkup(technology)).join('')}</div>`;
}

function modalMarkup(project, nextProject) {
  const aboutText = getProjectText('project-modal-about', 'What is this project about?');
  const nextText = getProjectText('project-modal-next', 'Next project');
  return `<div class="project-modal-copy"><p class="project-modal-number">${project.number || ''}</p><h3 class="project-modal-name" id="project-modal-name">${project.name}</h3><p class="project-modal-about">${aboutText}</p><p class="project-modal-description">${getProjectDescription(project)}</p>${modalTechnologiesMarkup(project)}${modalActionsMarkup(project)}</div><div class="project-modal-preview"><img src="${project.preview}" alt="${project.name} preview"></div><button class="project-modal-next" id="project-modal-next" type="button">${nextText} <span aria-hidden="true">→</span></button>`;
}

function bindModalNext() {
  const nextButton = document.getElementById('project-modal-next');
  if (nextButton) nextButton.onclick = showNextProject;
}

function updateModalContent() {
  const project = projectEntries[activeProjectIndex];
  const nextIndex = (activeProjectIndex + 1) % projectEntries.length;
  if (!project || !projectModalContent) return;
  projectModalContent.innerHTML = modalMarkup(project, projectEntries[nextIndex]);
  bindModalNext();
}

function openProjectModal(index) {
  activeProjectIndex = index;
  updateModalContent();
  if (!projectModal) return;
  projectModal.classList.add('is-open');
  projectModal.setAttribute('aria-hidden', 'false');
    projectModal.removeAttribute('inert');
  document.body.classList.add('project-modal-open');
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove('is-open');
  projectModal.setAttribute('aria-hidden', 'true');
    projectModal.setAttribute('inert', '');
  document.body.classList.remove('project-modal-open');
}

function showNextProject() {
  activeProjectIndex = (activeProjectIndex + 1) % projectEntries.length;
  updateModalContent();
}

function bindProjectItem(item, index) {
  item.onclick = () => openProjectModal(index);
  item.onkeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') openProjectModal(index);
  };
}

function bindProjectItems() {
  const items = projectList ? projectList.querySelectorAll('.project-item') : [];
  items.forEach((item, index) => bindProjectItem(item, index));
}

function renderProjectsSection() {
  if (!projectList) return;
  projectList.innerHTML = projectEntries.map((project, index) => projectMarkup(project, index)).join('');
  bindProjectItems();
  if (projectModal && projectModal.classList.contains('is-open')) updateModalContent();
}

function bindProjectModal() {
  if (projectModalBackdrop) projectModalBackdrop.onclick = closeProjectModal;
  if (projectModalClose) projectModalClose.onclick = closeProjectModal;
  document.onkeydown = (event) => {
    if (event.key === 'Escape' && projectModal && projectModal.classList.contains('is-open')) closeProjectModal();
  };
}

async function fetchProjects() {
  const response = await fetch('./js/data/projects.json');
  if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

async function initProjects() {
  if (!projectList) return;
  try {
    projectEntries = await fetchProjects();
    renderProjectsSection();
    bindProjectModal();
  } catch (error) {
    console.error(error);
    projectList.innerHTML = '';
  }
}
