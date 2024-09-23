'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/app/context/TaskContext';
import styles from '../../../styles/shared.module.scss';
import { useParams } from 'next/navigation';
import { CancelButton } from '..';

function RemoveTaskContent() {
  const router = useRouter();
  const { id } = useParams();

  const { deleteTask } = useTasks();

  return (
    <section className={styles.buttons}>
      <button
        className={styles.removeButton}
        onClick={(e) => {
          e.preventDefault();
          deleteTask(Number(id));
          router.back();
        }}
      >
        Deletar
      </button>
      <CancelButton />
    </section>
  );
}

export default RemoveTaskContent;
