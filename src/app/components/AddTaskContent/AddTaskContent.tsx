'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/shared.module.scss';
import { useTasks } from '@/app/context/TaskContext';

function AddTaskContent() {
  const router = useRouter();
  const [task, setTask] = useState('');
  const { tasks, addTask } = useTasks();

  return (
    <div>
      <label htmlFor="taskInput">Título</label>
      <input
        type="text"
        placeholder="Digite"
        id={styles.taskInput}
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className={styles.addButton}
        onClick={(e) => {
          e.preventDefault();
          addTask({ id: tasks.length + 1, text: task, completed: false });
          router.back();
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTaskContent;
