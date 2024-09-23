'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/app/context/TaskContext';
import styles from '../../../styles/shared.module.scss';
import { useParams } from 'next/navigation';

function RemoveTaskContent() {
  const router = useRouter();
  const { id } = useParams();

  const { deleteTask } = useTasks();

  return (
    <button
      className={styles.removeButton}
      onClick={(e) => {
        e.preventDefault();
        deleteTask(Number(id));
        router.back();
      }}
    >
      Remover
    </button>
  );
}

export default RemoveTaskContent;
