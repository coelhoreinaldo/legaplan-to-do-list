import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/shared.module.scss';

function AddTaskContent() {
  const router = useRouter();

  return (
    <div>
      <label htmlFor="taskInput">Título</label>
      <input type="text" placeholder="Digite" id={styles.taskInput} />
      <button
        className={styles.addButton}
        onClick={() => {
          router.back();
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTaskContent;
