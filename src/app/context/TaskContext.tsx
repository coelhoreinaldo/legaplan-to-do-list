'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { TaskItem, TaskContextType } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [storagedTasks, setStoragedTasks] = useLocalStorage<TaskItem[]>(
    'tasks',
    []
  );
  const [tasks, setTasks] = useState<TaskItem[]>(storagedTasks);

  const addTask = (task: TaskItem) => {
    const updatedTasks = [...tasks, task];
    setStoragedTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const updateTask = (id: number, updatedTask: TaskItem) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setStoragedTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setStoragedTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (storagedTasks.length !== tasks.length && storagedTasks.length !== 0)
      setTasks(storagedTasks);
  }, [storagedTasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
