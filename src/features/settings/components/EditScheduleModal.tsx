import * as z from 'zod';
import type { NextPage } from 'next';
import { EventDragStartArg } from '@fullcalendar/interaction';
import { inferProcedureInput } from '@trpc/server';
import { Button } from '~/components/Elements';
import {
  Form,
  InputField,
  TextAreaField,
  CheckBoxField,
} from '~/components/Form';
import { Modal } from '~/components/Model';
import { formatTime, formatDay, formatISOTime } from '~/utils/format';
import type { AppRouter } from '~/server/routers/_app';
import { trpc } from '~/utils/trpc';
import { useNotificationStore } from '~/stores';

interface Iprops {
  formTitle: string;
  eventData: EventDragStartArg | undefined;
  formOpen: boolean;
  handelOpenModal: () => void;
}

const schema = z.object({
  title: z.string().min(1, 'Required'),
  content: z.string().optional(),
  start: z.string().min(1, 'Required'),
  end: z.string().min(1, 'Required'),
  isPublic: z.boolean().default(false),
});

type createValues = {
  title: string;
  content: string;
  start: string;
  end: string;
  isPublic: boolean;
};

const EditScheduleModal: NextPage<Iprops> = ({
  formTitle,
  formOpen,
  eventData,
  handelOpenModal,
}) => {
  const utils = trpc.useContext();
  const fixSchedule = trpc.schedule.fixById.useMutation({
    async onSuccess() {
      utils.schedule.list.invalidate();
      useNotificationStore.getState().addNotification({
        type: 'success',
        title: 'fix schedule sucess',
        message: '',
      });
      handelOpenModal();
    },
  });

  const deleteSchedule = trpc.schedule.deleteById.useMutation({
    async onSuccess() {
      utils.schedule.list.invalidate();
      useNotificationStore.getState().addNotification({
        type: 'success',
        title: 'delete schedule sucess',
        message: '',
      });
      handelOpenModal();
    },
  });

  const handelDeltetSchedule = async () => {
    type Input = inferProcedureInput<AppRouter['schedule']['deleteById']>;
    const input: Input = { id: eventData?.event.id as string };
    try {
      await deleteSchedule.mutateAsync(input);
    } catch (cause) {
      console.error({ cause }, 'Failed to delete schedule');
    }
  };

  return (
    <Modal
      title={formTitle}
      isOpen={formOpen}
      handelOpenModal={handelOpenModal}
    >
      <Form<createValues, typeof schema>
        onSubmit={async (values) => {
          values.start = formatISOTime(
            formatDay(eventData?.event.startStr) + ' ' + values.start,
          );
          values.end = formatISOTime(
            formatDay(eventData?.event.startStr) + ' ' + values.end,
          );
          type Input = inferProcedureInput<AppRouter['schedule']['fixById']>;
          const input: Input = {
            title: values.title,
            content: values.content,
            start: values.start,
            end: values.end,
            isPublic: values.isPublic,
            id: eventData?.event.id as string,
          };
          try {
            await fixSchedule.mutateAsync(input);
          } catch (cause) {
            console.error({ cause }, 'Failed to edit schedule');
          }
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
          defaultValues: {
            title: eventData?.event.title,
            start: formatTime(eventData?.event.startStr),
            end: formatTime(eventData?.event.endStr),
            content: eventData?.event.extendedProps.content,
            isPublic: eventData?.event.extendedProps.isPublic,
          },
        }}
        className="m-auto text-center"
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label="タイトルを追加"
              error={formState.errors['title']}
              registration={register('title')}
              className="lg:w-3/5 m-auto"
            />
            <InputField
              type="time"
              label={formatDay(eventData?.event.startStr) + ' ' + '開始時間'}
              error={formState.errors['start']}
              registration={register('start')}
              className="lg:w-3/5 m-auto"
            />
            <InputField
              type="time"
              label={formatDay(eventData?.event.endStr) + ' ' + '終了時間'}
              error={formState.errors['end']}
              registration={register('end')}
              className="lg:w-3/5 m-auto"
            />
            <TextAreaField
              label="説明を追加"
              error={formState.errors['content']}
              registration={register('content')}
              className="lg:w-3/5 m-auto"
              placeholder="任意内容、予定内容を入れる"
            />
            <CheckBoxField
              label="公開する"
              error={formState.errors['isPublic']}
              registration={register('isPublic')}
              className="m-auto"
            />
            <div className="flex justify-between">
              <Button
                variant="primary"
                type="submit"
                className="border rounded-full"
                size="md"
              >
                スケジュール変更
              </Button>
              <Button
                variant="error"
                className="border rounded-full"
                size="md"
                onClick={handelDeltetSchedule}
              >
                スケジュール削除
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default EditScheduleModal;
