export interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskContextType {
  tasks: TaskItem[];
  addTask: (task: TaskItem) => void;
  updateTask: (id: number, updatedTask: TaskItem) => void;
  deleteTask: (id: number) => void;
}