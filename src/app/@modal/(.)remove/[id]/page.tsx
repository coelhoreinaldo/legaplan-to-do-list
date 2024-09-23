'use client';

import { Modal, RemoveTaskContent } from '@/app/components';

export default function InterceptedRemoveModal() {
  return (
    <Modal
      title="Deletar tarefa"
      description="Tem certeza que você deseja deletar essa tarefa?"
    >
      <RemoveTaskContent />
    </Modal>
  );
}
