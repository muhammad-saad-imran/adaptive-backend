import React from 'react';
import { map } from 'lodash';
import {
  CoverageCardContainer,
  CoverageLimitCard,
} from '@/components/policy-coverage/style';
import { currencyFormat } from '@/utils/quoteUtils';

type Props = {
  selectedDuration: number;
  coverageLimitOpts: Array<{ limit: number }>;
  selectedLimit: number;
  onPolicyLimitChange: (value: number) => void;
};

/**
 * `CoverageLimit` component displays a section where users can choose their coverage 
 * limit based on the duration of a potential power outage. It shows a prompt asking 
 * users to select an appropriate coverage limit and displays a list of options as 
 * clickable cards.
 *
 * @param {Props} props - The props for the component.
 * @param {string} props.selectedDuration - The number of hours for which coverage 
 *   is being considered.
 * @param {Array<{ limit: number }>} props.coverageLimitOpts - An array of coverage 
 *   limit options to display, where each option has a `limit` property.
 * @param {number} props.selectedLimit - The currently selected coverage limit.
 * @param {function} props.onPolicyLimitChange - Callback function to handle changes 
 *   in the selected coverage limit, called with the new limit when a card is clicked.
 *
 * @returns JSX.Element - The rendered coverage limit selection section with options.
 */
const CoverageLimit = (props: Props) => {
  return (
    <>
      <p className="text-center text-5xl md:text-left">
        Choose your coverage limit
      </p>
      <p className="my-6 text-center md:text-left">
        If your business were to lose power for {props.selectedDuration} hours,
        how much coverage would you need to maintain operations?
      </p>

      <CoverageCardContainer>
        {map(props.coverageLimitOpts, (coverage: any, index: number) => (
          <CoverageLimitCard
            key={index}
            $selectedLimit={props.selectedLimit}
            $limit={coverage.limit}
            onClick={() => props.onPolicyLimitChange(coverage.limit)}
          >
            <p className="font-bold md:text-xl lg:text-2xl">
              {currencyFormat(coverage.limit)}
            </p>
          </CoverageLimitCard>
        ))}
      </CoverageCardContainer>
    </>
  );
};

export default CoverageLimit;
