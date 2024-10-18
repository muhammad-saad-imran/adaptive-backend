'use client';
import React from 'react';
import { map } from 'lodash';
import { currencyFormat } from '@/utils/quoteUtils';
import { IQuoteEstimate } from '@/store/api/types';
import { formatDateUtc } from '@/utils/datetimeUtil';
import {
  HorizontalLine,
  QuoteContainer,
  QuoteWrapper,
} from '@/components/policy-coverage/style';
import Button from '@/elements/buttons/Button';
import BlueTickIcon from '@/elements/icons/BlueTickIcon';

type Props = {
  selectedEstimate: IQuoteEstimate;
  effectiveDateUtc: string;
};

/**
 * `QuoteCard` component displays a summary of the user's quote for outage coverage. 
 * It includes details such as the coverage duration, coverage limit, effective date, 
 * and premium amount. The card also lists what's included in the quote.
 *
 * @param {Props} props - The props for the component.
 * @param {IQuoteEstimate} props.selectedEstimate - The selected quote estimate containing details like 
 *   duration, coverage amount, and premium amount.
 * @param {string} props.effectiveDateUtc - The effective date of the quote in UTC format.
 *
 * @returns JSX.Element - The rendered quote card displaying coverage details and what's included in the quote.
 */
const QuoteCard = (props: Props) => {
  const includedInQuote = [
    `Coverage starting after ${
      props.selectedEstimate?.duration || 16
    } hours of power loss`,
    `Coverage limit of ${currencyFormat(
      props.selectedEstimate?.coverageAmount || 10000
    )}`,
    `Coverage starting as of ${formatDateUtc(props.effectiveDateUtc, 'D MMM, YYYY')}`,
    'Easy payment once your power goes out',
  ];
  const premium = props.selectedEstimate?.premiumAmount ?? 0;

  return (
    <QuoteWrapper>
      <QuoteContainer>
        <div>
          <p className="text-center text-xl font-bold uppercase">Your quote</p>
          <p className="text-center text-xl">Outage Coverage</p>
        </div>

        <div>
          <p className="mt-7 text-4xl font-bold md:mt-3 md:text-5xl">
            {currencyFormat(premium)}
          </p>
        </div>
      </QuoteContainer>

      <div className="hidden md:block">
        <HorizontalLine className="mt-7" />
        <p className="my-7 text-center font-bold">What’s included:</p>

        <div className="flex flex-col gap-3">
          {map(includedInQuote, (item: any, index: number) => (
            <div className="flex items-center gap-4" key={index}>
              <div className="size-6">
                <BlueTickIcon />
              </div>
              <p className="leading-none">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full md:hidden">Next: Business Information</Button>
    </QuoteWrapper>
  );
};

export default QuoteCard;
