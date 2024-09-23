import React from 'react';
import styles from '../Tasks/Tasks.module.scss';
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
      <Link href={`/remove/${id}`}>
        <Image src={Trash} alt="Lixeira" width={24} height={24} />
      </Link>
    </div>
  );
};

export default Task;
