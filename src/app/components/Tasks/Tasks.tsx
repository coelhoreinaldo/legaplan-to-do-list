'use client';
// TODO: Estilizar o checkbox
import React, { useEffect, useState } from 'react';
import styles from './Tasks.module.scss';
import { Task } from '..';
import { TaskItem } from '@/app/types';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import Link from 'next/link';
import NewTask from '../NewTask';

function Tasks() {
  const [storagedTasks, setStoragedTasks] = useLocalStorage<TaskItem[]>(
    'tasks',
    []
  );
  const [taskList, setTaskList] = useState<TaskItem[]>(storagedTasks);

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

  useEffect(() => {
    setStoragedTasks(taskList);
  }, [taskList]);

  useEffect(() => {
    setTaskList(storagedTasks);
  }, [storagedTasks]);

  return (
    <main className={styles.main}>
      <section className={styles.tasksContainer}>
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
      </section>
      <NewTask />
    </main>
  );
}

export default Tasks;
