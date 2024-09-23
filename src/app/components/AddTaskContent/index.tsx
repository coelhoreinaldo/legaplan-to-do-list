'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/shared.module.scss';
import { useTasks } from '@/app/context/TaskContext';
import { getNextId } from '@/app/utils/getNextId';
import CancelButton from '../CancelButton';

export default function AddTaskContent() {
  const router = useRouter();
  const [task, setTask] = useState('');
  const { tasks, addTask } = useTasks();

  return (
    <div>
      <h3 id={styles.title}>Nova tarefa</h3>
      <label htmlFor="taskInput">Título</label>
      <input
        type="text"
        placeholder="Digite"
        id={styles.taskInput}
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <section className={styles.buttons}>
        <button
          className={styles.addButton}
          onClick={(e) => {
            e.preventDefault();
            addTask({ id: getNextId(tasks), text: task, completed: false });
            router.back();
          }}
        >
          Adicionar
        </button>
        <CancelButton />
      </section>
    </div>
  );
}
