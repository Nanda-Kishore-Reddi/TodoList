import createTodo from './todo';

const projectManager = (() => {
  let projects = [];

  const addProject = (name) => {
    if (!projects.some(project => project.name === name)) {
      projects.push({ name, todos: [] });
    }
  };

  const removeProject = (name) => {
    projects = projects.filter(project => project.name !== name);
  };

  const addTodo = (projectName, todo) => {
    const project = projects.find(p => p.name === projectName);
    if (project) {
      project.todos.push(todo);
    }
  };

  const removeTodo = (projectName, todoIndex) => {
    const project = projects.find(p => p.name === projectName);
    if (project) {
      project.todos.splice(todoIndex, 1);
    }
  };

  const getProjects = () => projects;

  const getTodos = (projectName) => {
    const project = projects.find(p => p.name === projectName);
    return project ? project.todos : [];
  };

  return { addProject, removeProject, addTodo, removeTodo, getProjects, getTodos };
})();

export default projectManager;
