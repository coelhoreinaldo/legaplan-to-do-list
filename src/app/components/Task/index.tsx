import React from 'react';
import styles from './Task.module.scss';
import Trash from '../../../assets/trash.svg';
import Image from 'next/image';
import { TaskItem } from '@/app/types';
import Link from 'next/link';

interface TaskProps {
  taskItem: TaskItem;
  onToggle: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({
  taskItem: { id, text, completed },
  onToggle,
}) => {
  return (
    <div className={styles.task} key={id}>
      <label key={id} htmlFor={`task-${id}`}>
        <input
          type="checkbox"
          id={`task-${id}`}
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <span className={completed ? styles.completed : ''}>{text}</span>
      </label>
      <Link href={`/remove/${id}`}>
        <Image
          src={Trash}
          alt="Lixeira"
          style={{ minWidth: 24, minHeight: 24, cursor: 'pointer' }}
          className={styles.trash}
        />
      </Link>
    </div>
  );
};

export default Task;
