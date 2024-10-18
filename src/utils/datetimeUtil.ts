import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface IDateOptions {
  date?: dayjs.ConfigType;
  inputFormat?: string;
  dateAdd?: number;
  addUnit?: dayjs.ManipulateType;
  dateSubtract?: number;
  subtractUnit?: dayjs.ManipulateType;
}

export function getDate({
  date,
  inputFormat,
  dateAdd = 0,
  addUnit = 'days',
  dateSubtract = 0,
  subtractUnit = 'days',
}: IDateOptions = {}): Dayjs {
  const inputDate = dayjs(date, inputFormat)
    .add(dateAdd, addUnit)
    .subtract(dateSubtract, subtractUnit);
  return inputDate.isValid() ? inputDate : dayjs();
}

export function getDateUtc(dateOptions: IDateOptions = {}): string {
  return dayjs(getDate(dateOptions)).toISOString();
}

export function validateUtc(utc?: string) {
  if (!utc) return false;
  return dayjs.utc(utc).isValid();
}

export function formatDate(
  date: string,
  outputFormat: string = 'MM/DD/YY',
  inputFormat: string = 'YYYY-MM-DD'
) {
  const inputDate = dayjs(date, inputFormat);
  return inputDate.isValid() ? inputDate.format(outputFormat) : '';
}

export function formatDateUtc(utc: string, outputFormat: string = 'MM/DD/YY') {
  if (!validateUtc(utc)) return '';
  return dayjs.utc(utc).utcOffset(dayjs().utcOffset()).format(outputFormat);
}
