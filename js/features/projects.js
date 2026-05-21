const projectList = document.getElementById('project-list');
let projectEntries = [];

function getProjectStack(project) {
  return project['tech-stack'] || project.techStack || '';
}

function previewMarkup(project) {
  const preview = project.preview || '';
  return `<div class="project-row-preview"><div class="project-row-image" style="background-image: url('${preview}')"></div></div>`;
}

function projectMarkup(project) {
  const stack = getProjectStack(project);
  const preview = previewMarkup(project);
  return `<div class="project-item" tabindex="0"><span class="project-name">${project.name}</span><span class="project-stack">${stack}</span>${preview}</div>`;
}

function renderProjects(projects) {
  if (!projectList) return;
  const markup = projects.map((project) => projectMarkup(project)).join('');
  projectList.innerHTML = markup;
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
    renderProjects(projectEntries);
  } catch (error) {
    console.error(error);
    projectList.innerHTML = '';
  }
}
