import dayjs from 'dayjs';
import { DatePickerValue } from '../types';

interface GetFormattedDate {
  type: 'default' | 'multiple' | 'range';
  date: DatePickerValue<'default' | 'multiple' | 'range'>;
  locale: string;
  format: string;
  labelSeparator: string;
}

export function getFormattedDate({ type, date, locale, format, labelSeparator }: GetFormattedDate) {
  const formatDate = (value: Date) => dayjs(value).locale(locale).format(format);

  if (type === 'default') {
    return date === null ? '' : formatDate(date as Date);
  }

  if (type === 'multiple') {
    return (date as Date[]).map(formatDate).join(', ');
  }

  if (type === 'range' && Array.isArray(date)) {
    if (date[0] && date[1]) {
      return `${formatDate(date[0])} ${labelSeparator} ${formatDate(date[1])}`;
    }

    if (date[0]) {
      return `${formatDate(date[0])} ${labelSeparator} `;
    }

    return '';
  }

  return '';
}
