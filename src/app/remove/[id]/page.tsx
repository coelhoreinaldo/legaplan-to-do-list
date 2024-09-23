'use client';

import { RemoveTaskContent } from '@/app/components';

export default function remove() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        height: '100vh',
      }}
    >
      <RemoveTaskContent />
    </section>
  );
}
