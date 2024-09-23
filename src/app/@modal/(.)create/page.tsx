'use client';

import AddTaskContent from '@/app/components/AddTaskContent';
import { Modal } from '@/app/components/Modal';

export default function InterceptedModal() {
  return (
    <Modal title="Nova tarefa">
      <AddTaskContent />
    </Modal>
  );
}
