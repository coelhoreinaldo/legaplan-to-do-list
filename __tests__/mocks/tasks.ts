let tasks = [
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

const mockDeleteTask = jest.fn((id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
  }
});

const resetTasks = () => {
  tasks = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ]
}

export { tasks, mockUpdateTask, mockAddTask, mockDeleteTask, resetTasks }