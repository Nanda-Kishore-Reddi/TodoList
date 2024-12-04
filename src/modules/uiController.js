import projectManager from './projectManager';
import storageManager from './storageManager';

const uiController = (() => {
  const projectList = document.getElementById('project-list');
  const todoList = document.getElementById('todo-list');

  const renderProjects = () => {
    projectList.innerHTML = '';
    const projects = projectManager.getProjects();

    projects.forEach(project => {
      const projectItem = document.createElement('li');
      projectItem.textContent = project.name;
      projectItem.addEventListener('click', () => renderTodos(project.name));
      projectList.appendChild(projectItem);
    });
  };

  const renderTodos = (projectName) => {
    todoList.innerHTML = '';
    const todos = projectManager.getTodos(projectName);

    todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      todoItem.innerHTML = `
        <strong>${todo.title}</strong> - ${todo.dueDate} (${todo.priority})
        <button onclick="uiController.deleteTodo('${projectName}', ${index})">Delete</button>
      `;
      todoList.appendChild(todoItem);
    });
  };

  const deleteTodo = (projectName, todoIndex) => {
    projectManager.removeTodo(projectName, todoIndex);
    storageManager.saveToStorage();
    renderTodos(projectName);
  };

  return { renderProjects, renderTodos, deleteTodo };
})();

export default uiController;
