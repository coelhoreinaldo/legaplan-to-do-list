'use client';

import { AddTaskContent, Modal } from '@/app/components';

export default function InterceptedModal() {
  return (
    <Modal title="Nova tarefa">
      <AddTaskContent />
    </Modal>
  );
}
