import { TaskItem } from "../types";

export const getNextId = (tasks: TaskItem[]) => {
  let id = 1;
  const ids = new Set(tasks.map(task => task.id));
  while (ids.has(id)) {
    id++;
  }
  return id;
}
