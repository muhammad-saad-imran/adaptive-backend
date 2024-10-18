import { find, get } from 'lodash';
import {
  IAddress,
  IBillableData,
  IBusinessInformation,
  ICoverage,
  IProgramInfo,
  IQuote,
  IQuoteEstimate,
} from '@/store/api/types';
import { initAddressState } from '@/store/feature/business-info';
import { getCoverageDate } from '@/utils/quoteUtils';

export const getBillableDataFromQuote = (
  quote: IQuote | undefined
): IBillableData | undefined => {
  // Initially, `billableData` contains all billing details. when policy is created,
  // these details are moved to `data` field in `billableData`
  return get(
    quote,
    'programInfo[0].billableData[0]',
    get(quote, 'programInfo[0].billableData.data[0]')
  );
};

export const getProgramInfoFromQuote = (
  quote: IQuote | undefined
): IProgramInfo | undefined => {
  return get(quote, 'programInfo[0]');
};

export const getBusinessInfoFromQuote = (
  quote: IQuote | undefined
): IBusinessInformation => ({
  businessName: quote?.insured?.businessName || '',
  businessType: quote?.insured?.businessType || '',
  firstName: quote?.insured?.firstName || '',
  lastName: quote?.insured?.lastName || '',
  mailingAddress: quote?.insured?.mailingAddress || initAddressState,
  billingAddress: quote?.insured?.billingAddress || initAddressState,
  phone: quote?.insured?.phone || '',
  email: quote?.insured?.email || '',
  alternativeEmail: quote?.insured?.alternativeEmail || '',
  revenueRangeFrom: quote?.insured?.revenueRangeFrom || 0,
  revenueRangeTo: quote?.insured?.revenueRangeTo || 0,
});

export const getCoveragePolicyFromQuote = (quote: IQuote | undefined) => ({
  quoteEstimates: quote?.data.quoteEstimates || [],
  selectedEstimateId: quote?.data.selectedEstimateId || '',
  amount: quote?.data?.quoteEstimates?.[0]?.coverageAmount || 10000,
  effectiveDateUtc: quote?.effectiveDateUtc || '',
});

export const getSelectedEstimatedFromQuote = (
  quote: IQuote | undefined
): IQuoteEstimate | undefined => {
  return find(quote?.data?.quoteEstimates, {
    productId: quote?.data?.selectedEstimateId,
  });
};

export const getCoverageFromQuote = (quote: IQuote | undefined): ICoverage => {
  const selectedEstimate = getSelectedEstimatedFromQuote(quote);
  return {
    coverageAmount: selectedEstimate?.coverageAmount || 10000,
    estimateId: selectedEstimate?.productId || '',
    effectiveDate: getCoverageDate(quote?.effectiveDateUtc),
  };
};

export const getAddressFromQuote = (quote: IQuote | undefined): IAddress => ({
  street: quote?.street || '',
  street2: quote?.street2 || '',
  city: quote?.city || '',
  state: quote?.state || '',
  zipCode: quote?.zipCode || '',
});
