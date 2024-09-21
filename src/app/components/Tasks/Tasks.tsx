import React from 'react';
import styles from './Tasks.module.scss';
import Trash from '../../../assets/trash.svg';
import Image from 'next/image';

function Tasks() {
  return (
    <main className={styles.main}>
      <h4>Suas tarefas de hoje</h4>
      <div className={styles.tasks}>
        <div className={styles.task}>
          <input type="checkbox" id="task-1" />
          <label htmlFor="task-1">Fazer café</label>
          <button className={styles.trash}>
            <Image src={Trash} alt="Lixeira" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Tasks;
