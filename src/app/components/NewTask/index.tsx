import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/shared.module.scss';

function NewTask() {
  return (
    <Link href="/create" className={styles.addButton}>
      Adicionar nova tarefa
    </Link>
  );
}

export default NewTask;
