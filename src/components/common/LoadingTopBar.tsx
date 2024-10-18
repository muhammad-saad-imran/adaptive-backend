'use client';
import React, { useEffect, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useQuote } from '@/hooks/useQuote';

/**
 * `LoadingTopBar` component displays loading indicators for two different types
 * of loading states using `LoadingBar` components. It uses refs to control the
 * loading indicators' behavior based on the loading state of quotes and quote
 * creation operations.
 *
 * @returns JSX.Element - The rendered loading bars.
 */
const LoadingTopBar = () => {
  const loadingRef = useRef<LoadingBarRef>(null);

  const { quoteId, quoteQueryResult, createQuoteResult } = useQuote();

  const { isLoading: isQuoteLoading } = quoteQueryResult;
  const { isLoading: isCreateQuoteLoading } = createQuoteResult;

  useEffect(() => {
    if ((quoteId && isQuoteLoading) || isCreateQuoteLoading)
      loadingRef.current?.continuousStart();
    else if ((quoteId && !isQuoteLoading) || !isCreateQuoteLoading)
      loadingRef.current?.complete();
  }, [quoteId, isQuoteLoading, isCreateQuoteLoading]);

  return <LoadingBar ref={loadingRef} />;
};

export default LoadingTopBar;
