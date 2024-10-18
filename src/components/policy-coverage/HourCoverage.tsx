import React from 'react';
import map from 'lodash/map';
import { IAddress, IQuoteEstimate } from '@/store/api/types';
import { HoursCard, Title } from '@/components/policy-coverage/style';
import { currencyFormat } from '@/utils/quoteUtils';

type Props = {
  address: IAddress;
  coverageQuotes: IQuoteEstimate[];
  selectedQuoteId: string;
  onPolicyQuoteChange: (value: string) => void;
};

/**
 * `HourCoverage` component provides information about the recommended coverage 
 * duration based on the user's location and displays a list of coverage options. 
 * It shows a message indicating that a 16-hour coverage is suitable for the user 
 * and provides details on how long the business can operate without power.
 *
 * @param {Props} props - The props for the component.
 * @param {Object} props.address - The address of the user, used to display location-specific information.
 * @param {Object} props.address.city - The city of the user's address.
 * @param {Object} props.address.state - The state of the user's address.
 * @param {Array<IQuoteEstimate>} props.coverageQuotes - An array of coverage quotes, each including duration and premium amount.
 * @param {number} props.selectedQuoteId - The ID of the currently selected coverage quote.
 * @param {function} props.onPolicyQuoteChange - Callback function to handle changes in the selected coverage quote, 
 *   called with the new quote ID when a card is clicked.
 *
 * @returns JSX.Element - The rendered hour coverage information with a list of coverage options.
 */
const HourCoverage = (props: Props) => {
  return (
    <>
      <Title>Based on your location, </Title>
      <Title>16-hour coverage is suitable for you</Title>
      <p className="my-8 text-center md:text-left">
        {props.address.city}, {props.address.state} faces a{' '}
        <span className="inline text-deep-blue">Medium</span> risk of power loss
        within the next 12 months. How long can your business operate without
        power before needing assistance?
      </p>

      <div className="mb-12 flex flex-wrap gap-8">
        {map(props.coverageQuotes, (coverage: IQuoteEstimate) => (
          <HoursCard
            key={coverage.productId}
            $selectedId={props.selectedQuoteId}
            $id={coverage.productId}
            onClick={() => props.onPolicyQuoteChange(coverage.productId)}
          >
            {/* <div className="flex items-center gap-12"> */}
                <p className="mb-auto mt-auto font-bold md:text-xl lg:text-3xl">
                  {coverage.duration} hours
                </p>
              {/* <div>
                <p className="text-sm">Premium</p>
                <p className="mb-auto mt-auto font-bold md:text-xl lg:text-4xl">
                  {currencyFormat(coverage.premiumAmount)}
                </p>
              </div> */}
            {/* </div> */}
          </HoursCard>
        ))}
      </div>
    </>
  );
};

export default HourCoverage;
