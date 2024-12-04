// Todo Factory
const createTodo = (title, description, dueDate, priority, notes = '', checklist = []) => ({
  title,
  description,
  dueDate,
  priority,
  notes,
  checklist,
});

export default createTodo;
