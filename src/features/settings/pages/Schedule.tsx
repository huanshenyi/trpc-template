import React, { useCallback, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin, {
  DateClickArg,
  EventDragStartArg,
} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import CreateScheduleModal from '~/features/settings/components/CreateScheduleModal';
import EditScheduleModal from '~/features/settings/components/EditScheduleModal';
import { RouterOutput } from '~/utils/trpc';

type ScheduleListOutput = RouterOutput['schedule']['list'];

type IProps = {
  mySchedule: ScheduleListOutput;
  handelSetSelectedDate?: (arg: DateClickArg) => void;
  handelSetSelectedEvent?: (arg: EventDragStartArg) => void;
};

export const SchedulePage: React.FC<IProps> = ({ mySchedule }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [createDate, setCreateDate] = useState<DateClickArg>();
  const [editDate, setEditDate] = useState<EventDragStartArg>();
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
  return (
    <>
      <div className="space-y-2 md:space-y-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h1 className="md:text-2xl font-extrabold">Schedule</h1>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <FullCalendar
              initialView="dayGridMonth"
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              locale={jaLocale}
              eventSources={[mySchedule.items]}
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
