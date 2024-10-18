import React from 'react';
import { IQuoteEstimate } from '@/store/api/types';
import { currencyFormat, getCoverageDate } from '@/utils/quoteUtils';
import { DetailsContainer } from '@/components/review-quote/style';
import DetailsRow from '@/components/review-quote/DetailsRow';

type Props = {
  selectedEstimate: IQuoteEstimate | undefined;
  effectiveDateUtc: string;
};

/**
 * `CoverageDetails` component displays detailed information about a coverage estimate, including
 * the coverage amount, duration, and effective date.
 *
 * @param {Props} props - The props for the component.
 * @param {IQuoteEstimate} props.selectedEstimate - The estimate object containing details about the coverage. 
 * @param {string} props.effectiveDateUtc - The effective date of the coverage in UTC format.
 *
 * @returns JSX.Element - The rendered component displaying the coverage details in a formatted manner.
 */
const CoverageDetails = ({ selectedEstimate, effectiveDateUtc }: Props) => {
  return (
    <DetailsContainer>
      <DetailsRow
        title="Coverage Amount"
        value={currencyFormat(selectedEstimate?.coverageAmount || 0)}
      />
      <DetailsRow
        title="Durations"
        value={`${selectedEstimate?.duration} hours`}
      />
      <DetailsRow
        title="Effective Date"
        value={getCoverageDate(effectiveDateUtc)}
      />
    </DetailsContainer>
  );
};

export default CoverageDetails;
