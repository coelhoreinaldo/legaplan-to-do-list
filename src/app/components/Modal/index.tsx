'use client';

import styles from './Modal.module.scss';

export default function Modal({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
