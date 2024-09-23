'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CancelButton.module.scss';

export default function CancelButton() {
  const router = useRouter();

  return (
    <button
      className={styles.closeButton}
      onClick={() => {
        router.back();
      }}
    >
      Cancelar
    </button>
  );
}
