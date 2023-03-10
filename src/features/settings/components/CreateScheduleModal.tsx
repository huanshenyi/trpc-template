import * as z from 'zod';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { DateClickArg } from '@fullcalendar/interaction';
import { Button } from '~/components/Elements';
import {
  Form,
  InputField,
  TextAreaField,
  CheckBoxField,
} from '~/components/Form';
import { Modal } from '~/components/Model';
import {
  formatDay,
  formatTime,
  getAfterHalfHour,
  formatISOTime,
} from '~/utils/format';

interface Iprops {
  formTitle: string;
  formOpen: boolean;
  selectedDate: DateClickArg | undefined;
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

const CreateScheduleModal: NextPage<Iprops> = ({
  formTitle,
  formOpen,
  selectedDate,
  handelOpenModal,
}) => {
  const [slectedDay, setSlectedDay] = useState<string>();
  useEffect(() => {
    if (selectedDate) {
      setSlectedDay(formatDay(selectedDate.dateStr));
    }
  }, [selectedDate]);

  return (
    <Modal
      title={formTitle}
      isOpen={formOpen}
      handelOpenModal={handelOpenModal}
    >
      <Form<createValues, typeof schema>
        onSubmit={async (values) => {
          values.start = formatISOTime(slectedDay + ' ' + values.start);
          values.end = formatISOTime(slectedDay + ' ' + values.end);
          // console.log(values);

          console.log(values);
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
          defaultValues: {
            start: selectedDate?.dateStr && formatTime(selectedDate?.dateStr),
            end:
              selectedDate?.dateStr && getAfterHalfHour(selectedDate?.dateStr),
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
              label={slectedDay + ' ' + '開始時間'}
              error={formState.errors['start']}
              registration={register('start')}
              className="lg:w-3/5 m-auto"
            />
            <InputField
              type="time"
              label={slectedDay + ' ' + '終了時間'}
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
            <div>
              <Button
                type="submit"
                className="m-auto text-center lg:w-3/5 w-full flex justify-center border-indigo-600 bg-transparent dark:bg-sky-500 dark:text-white p-4 border rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline shadow-lg cursor-pointer transition ease-in duration-300"
              >
                予定登録
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default CreateScheduleModal;
