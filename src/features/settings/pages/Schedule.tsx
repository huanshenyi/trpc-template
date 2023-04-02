import React, { useCallback, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { useSession } from 'next-auth/react';
import interactionPlugin, {
  DateClickArg,
  EventDragStartArg,
} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import CreateScheduleModal from '~/features/settings/components/CreateScheduleModal';
import EditScheduleModal from '~/features/settings/components/EditScheduleModal';
import { RouterOutput } from '~/utils/trpc';

type ScheduleListOutput = RouterOutput['schedule']['list'];
type ScheduleItemType = RouterOutput['schedule']['list']['items'][0];
type ScheduleType = ScheduleItemType & { backgroundColor: string };

type IProps = {
  scheduleList: ScheduleListOutput;
  handelSetSelectedDate?: (arg: DateClickArg) => void;
  handelSetSelectedEvent?: (arg: EventDragStartArg) => void;
};

export const SchedulePage: React.FC<IProps> = ({ scheduleList }) => {
  const { data } = useSession();
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [createDate, setCreateDate] = useState<DateClickArg>();
  const [editDate, setEditDate] = useState<EventDragStartArg>();
  const [isAll, setIsAll] = useState<boolean>(true);
  const [showSchedule, setShowSchedule] = useState<ScheduleType[]>([]);

  useEffect(() => {
    if (!isAll) {
      setShowSchedule(
        showSchedule.filter((item) => {
          return item.user.id === data?.user.id;
        }),
      );
    } else {
      const sl: ScheduleType[] = [];
      scheduleList.items.forEach((item) => {
        if (item.user.id !== data?.user.id) {
          sl.push({ backgroundColor: '#36D339', ...item });
        } else {
          sl.push({ backgroundColor: '', ...item });
        }
      });
      setShowSchedule(sl);
    }
  }, [isAll, data?.user.id, scheduleList.items]);

  const handleDateClick = useCallback((arg: DateClickArg) => {
    setCreateDate(arg);
    setFormOpen(true);
  }, []);

  const handleEventClick = useCallback((arg: EventDragStartArg) => {
    setEditDate(arg);
    setEditFormOpen(true);
  }, []);

  const closeFormModel = () => {
    setFormOpen(!formOpen);
    setEditFormOpen(false);
  };
  const closeEditFormModel = () => {
    setEditFormOpen(!editFormOpen);
    setFormOpen(false);
  };
  const checkedIsAll = () => {
    setIsAll(!isAll);
  };

  return (
    <>
      <div className="space-y-2 md:space-y-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h1 className="md:text-2xl font-extrabold">CHIBA BASE Schedule</h1>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">他人の予定を見る</span>
                <input
                  type="checkbox"
                  checked={isAll}
                  className="checkbox checkbox-primary"
                  onChange={checkedIsAll}
                />
              </label>
            </div>
            <FullCalendar
              initialView="dayGridMonth"
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              locale={jaLocale}
              eventSources={[showSchedule]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              businessHours={true}
              editable={true}
              eventDisplay="block"
              eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false,
              }}
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false,
              }}
              buttonText={{
                today: '今日',
                month: '月',
                week: '週',
                day: '日',
              }}
              displayEventEnd
            />
          </div>
        </div>
      </div>
      <CreateScheduleModal
        formTitle="スケジュール追加"
        formOpen={formOpen}
        selectedDate={createDate}
        handelOpenModal={closeFormModel}
      />
      <EditScheduleModal
        formTitle="スケジュール修正"
        eventData={editDate}
        formOpen={editFormOpen}
        handelOpenModal={closeEditFormModel}
      />
    </>
  );
};
