import { default as dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ja';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

dayjs.locale(`ja`);

export const formatDate = (date: number) =>
  dayjs(date).format('YYYY-MM-DD HH:mm');
export const formatDay = (date: string | undefined) =>
  dayjs(date).format('YYYY-MM-DD');
export const formatTime = (date: string | undefined) =>
  dayjs(date).format('HH:mm');
export const getAfterHalfHour = (date: string) =>
  dayjs(date).add(30, 'm').format('HH:mm');
export const formatISOTime = (date: string) => dayjs(date).toISOString();

export const relativeDate = (date: Date): string => {
  return dayjs(date).fromNow();
};

export const between10m = (now: dayjs.Dayjs, start: dayjs.Dayjs) => {
  return now.isBetween(start, start.add(10, 'm'));
};
