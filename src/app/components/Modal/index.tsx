'use client';

import { useRouter } from 'next/navigation';
import styles from './Modal.module.scss';

export default function Modal({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h3 id={styles.title}>{title}</h3>
      <p id={styles.description}>{description}</p>
      <div>{children}</div>
      {
        <button
          className={styles.closeButton}
          onClick={() => {
            router.back();
          }}
        >
          Cancelar
        </button>
      }
    </div>
  );
}
