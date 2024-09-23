'use client';

import { useRouter } from 'next/navigation';
import styles from './Modal.module.scss';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <div className={styles.backdrop} onClick={() => router.back()} />
      <div className={styles.container}>{children}</div>
    </>
  );
}
