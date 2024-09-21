'use client';
// TODO: Estilizar o checkbox
import React, { useState } from 'react';
import styles from './Tasks.module.scss';
import { Task } from '..';
import { TaskItem } from '@/app/types';

function Tasks() {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);

  const handleToggle = (id: number) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className={styles.main}>
      <h4 className={styles.title}>Suas tarefas de hoje</h4>
      <div className={styles.tasks}>
        {taskList
          .filter((task) => !task.completed)
          .map((task) => (
            <Task
              key={task.id}
              taskItem={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
      </div>
      <h4 className={styles.title}>Tarefas finalizadas</h4>
      <div className={styles.tasks}>
        {taskList
          .filter((task) => task.completed)
          .map((task) => (
            <Task
              key={task.id}
              taskItem={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </main>
  );
}

export default Tasks;
