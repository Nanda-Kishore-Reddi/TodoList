import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.getElementById('project-list');
  const taskList = document.getElementById('task-list');
  const addProjectBtn = document.getElementById('add-project-btn');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskTitleInput = document.getElementById('task-title');
  const taskDescriptionInput = document.getElementById('task-description');
  const taskDueDateInput = document.getElementById('task-due-date');
  const taskPriorityInput = document.getElementById('task-priority');

  // Initialize projects from localStorage, or use a default project if none exist
  let projects = JSON.parse(localStorage.getItem('projects')) || [
    { name: 'Default', tasks: [] }
  ];

  // Set the first project as the current project, or default to 'Default'
  let currentProject = projects.length > 0 ? projects[0] : { name: 'Default', tasks: [] };

  // Save projects to localStorage
  function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  // Render Projects
  function renderProjects() {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
      const projectItem = document.createElement('li');
      projectItem.innerHTML = `
        ${project.name} 
        <button class="remove-project-btn" onclick="removeProject(${index})">Remove</button>
      `;
      projectItem.addEventListener('click', () => {
        currentProject = project;
        renderTasks();
      });
      projectList.appendChild(projectItem);
    });
  }
  

  // Render Tasks for the selected project
  // function renderTasks() {
  //   taskList.innerHTML = '';
  //   currentProject.tasks.forEach((task, index) => {
  //     const taskItem = document.createElement('li');
  //     taskItem.innerHTML = `
  //       <span class="task-title">${task.title}</span>
  //       <span class="task-priority">${task.priority}</span>
  //       <span class="task-due-date">${task.dueDate}</span>
  //       <button onclick="removeTask(${index})">Remove</button>
  //     `;
  //     taskList.appendChild(taskItem);
  //   });
  // }
  function renderTasks() {
    taskList.innerHTML = '';
    if(currentProject.tasks.length !== 0){
    currentProject.tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <span class="task-title">${task.title}</span>
        <span class="task-priority">${task.priority}</span>
        <span class="task-due-date">${task.dueDate}</span>
        <button onclick="removeTask(${index})">Remove</button>
      `;
      taskList.appendChild(taskItem);
    });
  }
  else{
    taskList.innerHTML = 'No tasks in this project';
  }
  }

  // Add a new project
  addProjectBtn.addEventListener('click', () => {
    const projectName = prompt('Enter project name');
    if (projectName) {
      const newProject = { name: projectName, tasks: [] };
      projects.push(newProject);
      saveProjects();
      renderProjects();
    }
  });

  // Add a new task to the current project
  addTaskBtn.addEventListener('click', () => {
    const taskTitle = taskTitleInput.value.trim();
    const taskDescription = taskDescriptionInput.value.trim();
    const taskDueDate = taskDueDateInput.value;
    const taskPriority = taskPriorityInput.value;

    if (taskTitle && taskDueDate && taskPriority) {
      // Ensure tasks array exists in the current project
      if (!currentProject.tasks) {
        currentProject.tasks = [];
      }

      const newTask = {
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: taskPriority
      };
      currentProject.tasks.push(newTask); // Add new task
      saveProjects();
      renderTasks();
    }
  });

  // Remove task by index
  window.removeTask = (index) => {
    currentProject.tasks.splice(index, 1); // Remove task
    saveProjects();
    renderTasks();
  };

  // Remove project by index
  window.removeProject = (index) => {
    // Confirm the deletion
    const confirmDeletion = confirm('Are you sure you want to delete this project?');
    if (confirmDeletion) {
      // Remove the project from the array
      projects.splice(index, 1);
      // If the current project was deleted, reset it to 'Default'
      if (currentProject === projects[index]) {
        currentProject = projects.length > 0 ? projects[0] : { name: 'Default', tasks: [] };
      }
      saveProjects();
      renderProjects();
      renderTasks(); // Re-render tasks for the current project
    }
  };

  // Initial rendering of projects and tasks
  renderProjects();
  renderTasks();
});
