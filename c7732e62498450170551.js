import './style.css';
document.addEventListener('DOMContentLoaded', function () {
  var projectList = document.getElementById('project-list');
  var taskList = document.getElementById('task-list');
  var addProjectBtn = document.getElementById('add-project-btn');
  var addTaskBtn = document.getElementById('add-task-btn');
  var taskTitleInput = document.getElementById('task-title');
  var taskDescriptionInput = document.getElementById('task-description');
  var taskDueDateInput = document.getElementById('task-due-date');
  var taskPriorityInput = document.getElementById('task-priority');

  // Initialize projects from localStorage, or use a default project if none exist
  var projects = JSON.parse(localStorage.getItem('projects')) || [{
    name: 'Default',
    tasks: []
  }];

  // Set the first project as the current project, or default to 'Default'
  var currentProject = projects.length > 0 ? projects[0] : {
    name: 'Default',
    tasks: []
  };

  // Save projects to localStorage
  function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  // Render Projects
  function renderProjects() {
    projectList.innerHTML = '';
    projects.forEach(function (project, index) {
      var projectItem = document.createElement('li');
      projectItem.innerHTML = "\n        ".concat(project.name, " \n        <button class=\"remove-project-btn\" onclick=\"removeProject(").concat(index, ")\">Remove</button>\n      ");
      projectItem.addEventListener('click', function () {
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
    if (currentProject.tasks.length !== 0) {
      currentProject.tasks.forEach(function (task, index) {
        var taskItem = document.createElement('li');
        taskItem.innerHTML = "\n        <span class=\"task-title\">".concat(task.title, "</span>\n        <span class=\"task-priority\">").concat(task.priority, "</span>\n        <span class=\"task-due-date\">").concat(task.dueDate, "</span>\n        <button onclick=\"removeTask(").concat(index, ")\">Remove</button>\n      ");
        taskList.appendChild(taskItem);
      });
    } else {
      taskList.innerHTML = 'No tasks in this project';
    }
  }

  // Add a new project
  addProjectBtn.addEventListener('click', function () {
    var projectName = prompt('Enter project name');
    if (projectName) {
      var newProject = {
        name: projectName,
        tasks: []
      };
      projects.push(newProject);
      saveProjects();
      renderProjects();
    }
  });

  // Add a new task to the current project
  addTaskBtn.addEventListener('click', function () {
    var taskTitle = taskTitleInput.value.trim();
    var taskDescription = taskDescriptionInput.value.trim();
    var taskDueDate = taskDueDateInput.value;
    var taskPriority = taskPriorityInput.value;
    if (taskTitle && taskDueDate && taskPriority) {
      // Ensure tasks array exists in the current project
      if (!currentProject.tasks) {
        currentProject.tasks = [];
      }
      var newTask = {
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
  window.removeTask = function (index) {
    currentProject.tasks.splice(index, 1); // Remove task
    saveProjects();
    renderTasks();
  };

  // Remove project by index
  window.removeProject = function (index) {
    // Confirm the deletion
    var confirmDeletion = confirm('Are you sure you want to delete this project?');
    if (confirmDeletion) {
      // Remove the project from the array
      projects.splice(index, 1);
      // If the current project was deleted, reset it to 'Default'
      if (currentProject === projects[index]) {
        currentProject = projects.length > 0 ? projects[0] : {
          name: 'Default',
          tasks: []
        };
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