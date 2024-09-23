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
  console.log(tasks);

  const addTask = (task: TaskItem) => {
    console.log('oi');
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (id: number, updatedTask: TaskItem) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    setStoragedTasks(tasks);
  }, [tasks]);

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
