import dayjs, { ConfigType } from 'dayjs';

export const getDate = (date?: ConfigType) => {
  return dayjs(date);
};

export const formatDate = (date: ConfigType, outputFormat: string = '') => {
  return getDate(date).format(outputFormat);
};
