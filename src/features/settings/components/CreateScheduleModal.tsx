import type { NextPage } from 'next';
import { DateClickArg } from '@fullcalendar/interaction';
import { Modal } from '~/components/Model';

interface Iprops {
  formTitle: string;
  formOpen: boolean;
  selectedDate: DateClickArg | undefined;
  handelOpenModal: () => void;
}

const CreateScheduleModal: NextPage<Iprops> = ({
  formTitle,
  formOpen,
  selectedDate,
  handelOpenModal,
}) => {
  return (
    <Modal
      title={formTitle}
      isOpen={formOpen}
      handelOpenModal={handelOpenModal}
    >
      {selectedDate?.dateStr}
    </Modal>
  );
};

export default CreateScheduleModal;
