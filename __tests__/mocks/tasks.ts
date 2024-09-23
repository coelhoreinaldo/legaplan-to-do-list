const tasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
];

const mockUpdateTask = jest.fn((id, updatedTask) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
});

const mockAddTask = jest.fn((task) => {
  tasks.push(task);
});

export { tasks, mockUpdateTask, mockAddTask }