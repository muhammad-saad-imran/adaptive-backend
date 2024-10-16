import dayjs, { ConfigType, Dayjs, isDayjs } from 'dayjs';

export const getDate = (date?: ConfigType) => {
  return dayjs(date);
};

export const formatDate = (date: ConfigType, outputFormat: string = '') => {
  if (isDayjs(date)) {
    return date.format(outputFormat);
  } else {
    return getDate(date).format(outputFormat);
  }
};
