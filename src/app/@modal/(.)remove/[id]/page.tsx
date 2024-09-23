'use client';

import { Modal } from '@/app/components/Modal';
import RemoveTaskContent from '@/app/components/RemoveTaskContent';

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
