import Link from 'next/link';
import React from 'react';
import styles from './NewTask.module.scss';

function NewTask() {
  return (
    <Link href="/new" className={styles.addButton}>
      Adicionar nova tarefa
    </Link>
  );
}

export default NewTask;
