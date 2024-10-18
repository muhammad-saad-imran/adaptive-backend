'use client';
import React from 'react';
import { useQuote } from '@/hooks/useQuote';
import { IQuoteEstimate } from '@/store/api/types';
import { QuoteCardWrapper } from '@/components/policy-coverage/style';
import QuoteCard from '@/components/policy-coverage/QuoteCard';

/**
 * `LayoutQuoteCard` component displays a `QuoteCard` in a fixed position
 * on the right side of the screen. It retrieves the necessary data
 * (`policy` and `selectedEstimate`) from the `useQuote` hook and passes
 * it as props to the `QuoteCard` component.
 *
 * @returns JSX.Element - The rendered `QuoteCard` wrapped in a `QuoteCardWrapper`.
 */
const LayoutQuoteCard = () => {
  const { coveragePolicy, selectedEstimate } = useQuote();
  return (
    <QuoteCardWrapper>
      <div className="fixed right-10">
        <QuoteCard
          selectedEstimate={selectedEstimate as IQuoteEstimate}
          effectiveDateUtc={coveragePolicy.effectiveDateUtc}
        />
      </div>
    </QuoteCardWrapper>
  );
};

export default LayoutQuoteCard;
