import { IAddress, IPolicy } from '@/store/api/types';
import { formatDateUtc, getDateUtc, validateUtc } from '@/utils/datetimeUtil';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function currencyFormat(price: number) {
  return USDollar.format(price);
}

export function getCoverageDate(selectedUtc?: string) {
  return formatDateUtc(
    validateUtc(selectedUtc)
      ? (selectedUtc as string)
      : getDateUtc({ dateAdd: 1 })
  );
}

export function getCompleteAddress(address: IAddress) {
  return `${address.street}, ${address.street2 !== '' ? `${address.street2}, ` : ''}${address.city}, ${address.state}, ${address.zipCode}`;
}
