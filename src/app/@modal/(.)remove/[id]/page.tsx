'use client';

import { Modal, RemoveTaskContent } from '@/app/components';

export default function InterceptedRemoveModal() {
  return (
    <Modal>
      <RemoveTaskContent />
    </Modal>
  );
}
