import dayjs, { ConfigType, Dayjs } from 'dayjs';

export const getDate = (date?: ConfigType) => {
  return dayjs(date);
};

export const formatDate = (date: ConfigType, outputFormat: string = '') => {
  if (date instanceof Dayjs) {
    return date.format(outputFormat);
  } else {
    return getDate(date).format(outputFormat);
  }
};
