import React from 'react';
import styles from '../Tasks/Tasks.module.scss';
import Trash from '../../../assets/trash.svg';
import Image from 'next/image';
import { TaskItem } from '@/app/types';

interface TaskProps {
  taskItem: TaskItem;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({
  taskItem: { id, text, completed },
  onToggle,
  onDelete,
}) => {
  return (
    <div className={styles.task} key={id}>
      <input
        type="checkbox"
        id={`task-${id}`}
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <label
        htmlFor={`task-${id}`}
        className={completed ? styles.completed : ''}
      >
        {text}
      </label>
      <button className={styles.trash} onClick={() => onDelete(id)}>
        <Image src={Trash} alt="Lixeira" width={24} height={24} />
      </button>
    </div>
  );
};

export default Task;
