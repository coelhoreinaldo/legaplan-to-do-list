'use client';
// TODO: Estilizar o checkbox
import React, { useEffect } from 'react';
import styles from './Tasks.module.scss';
import { Task } from '..';
import { useTasks } from '@/app/context/TaskContext';
import NewTask from '../NewTask';

function Tasks() {
  const { tasks, updateTask, deleteTask } = useTasks();

  const handleToggle = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      updateTask(id, { ...task, completed: !task.completed });
    }
  };

  const handleDelete = (id: number) => {
    deleteTask(id);
  };

  return (
    <main className={styles.main}>
      <section className={styles.tasksContainer}>
        <h4 className={styles.title}>Suas tarefas de hoje</h4>
        <div className={styles.tasks}>
          {tasks
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
          {tasks
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
      </section>
      <NewTask />
    </main>
  );
}

export default Tasks;
