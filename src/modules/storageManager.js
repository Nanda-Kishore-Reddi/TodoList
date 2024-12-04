import projectManager from './projectManager';

const storageManager = (() => {
  const saveToStorage = () => {
    const projects = projectManager.getProjects();
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const loadFromStorage = () => {
    const data = JSON.parse(localStorage.getItem('projects'));
    if (data) {
      data.forEach(project => projectManager.addProject(project.name));
    }
  };

  return { saveToStorage, loadFromStorage };
})();

export default storageManager;
