'use client';
import React, { useCallback, useEffect } from 'react';
import { get, isEqual } from 'lodash';
import { QuoteStatus, Step } from '@/store/api/types';
import { useQuote } from '@/hooks/useQuote';
import {
  Title,
  QuoteDetailsContainer,
  PageWrapper,
} from '@/components/review-quote/style';
import PaymentDetails from '@/components/review-quote/PaymentDetails';
import QuoteDetails from '@/components/review-quote/QuoteDetails';
import BillableDetails from '@/components/review-quote/BillableDetails';
import AgentDetails from '@/components/review-quote/AgentDetails';
import BusinessDetails from '@/components/review-quote/BusinessDetails';
import CoverageDetails from '@/components/review-quote/CoverageDetails';

/**
 * ReviewQuotePage component displays detailed information about a quote,
 * including payment details, business information, coverage details, and agent details.
 * It also handles the automatic checkout process if certain conditions are met.
 *
 * This component fetches the quote details using a custom hook and polls for updates every 5 seconds.
 * The component automatically initiates the checkout process if the quote has no associated policy
 * and the selected policy premium amount differs from the billable data premium amount.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered ReviewQuotePage component.
 */
const ReviewQuotePage = () => {
  const {
    quote,
    address,
    businessInformation,
    selectedEstimate,
    billableData,
    programInfo,
    quoteQueryResult: { isSuccess: isQuoteSuccess, isFetching: isQuoteFetching },
    createQuoteResult: { isLoading: isCreateQuoteLoading },
    handleSubmitQuote,
  } = useQuote({
    queryOptions: { pollingInterval: 5000, skipPollingIfUnfocused: true },
  });

  const completeQuoteCheckout = useCallback(async () => {
    await handleSubmitQuote(Step.checkout, {});
  }, [handleSubmitQuote]);

  useEffect(() => {
    // Complete checkout if not done
    if (
      isQuoteSuccess &&
      !isQuoteFetching &&
      !isCreateQuoteLoading &&
      !quote?.policy &&
      !quote?.data.metadata.completed_sections.checkout
    ) {
      completeQuoteCheckout();
    }
  }, [
    quote?.policy,
    quote?.data.metadata.completed_sections.checkout,
    isQuoteSuccess,
    isQuoteFetching,
    isCreateQuoteLoading,
    completeQuoteCheckout,
  ]);

  return (
    <PageWrapper>
      <Title>Quote Details</Title>

      {!programInfo?.policyId && (
        <QuoteDetailsContainer className="text-sm md:hidden md:text-base">
          <PaymentDetails
            programUrl={get(programInfo, 'data.program_url', '#')}
            isPaymentCompleted={quote?.status === QuoteStatus.BOUND}
            billableData={billableData}
          />
        </QuoteDetailsContainer>
      )}

      <QuoteDetailsContainer>
        <div className="flex w-full gap-10">
          <QuoteDetails
            quote={quote}
            policy={quote?.policy}
            programInfo={programInfo}
            quoteInvoiceUrl={get(quote, 'documents.quote[0].documentUrl', '#')}
            policyInvoiceUrl={get(
              quote,
              'policy.documents.policy[0].documentUrl'
            )}
          />

          <div className="hidden md:block">
            {!programInfo?.policyId && (
              <PaymentDetails
                programUrl={get(programInfo, 'data.program_url', '#')}
                isPaymentCompleted={quote?.status === QuoteStatus.BOUND}
                billableData={billableData}
              />
            )}
          </div>
        </div>
      </QuoteDetailsContainer>

      <QuoteDetailsContainer>
        <div className="flex w-full gap-10">
          <BusinessDetails
            address={address}
            businessInfo={businessInformation}
          />
          <div className="hidden w-full md:block">
            <CoverageDetails
              selectedEstimate={selectedEstimate}
              effectiveDateUtc={quote?.effectiveDateUtc || ''}
            />
          </div>
        </div>
      </QuoteDetailsContainer>

      <QuoteDetailsContainer className="text-sm md:hidden md:text-base">
        <CoverageDetails
          selectedEstimate={selectedEstimate}
          effectiveDateUtc={quote?.effectiveDateUtc || ''}
        />
      </QuoteDetailsContainer>

      <QuoteDetailsContainer>
        <div className="flex w-full gap-10">
          <AgentDetails agent={quote?.agent} />
          <div className="hidden w-full md:block">
            <BillableDetails billableData={billableData} />
          </div>
        </div>
      </QuoteDetailsContainer>

      <QuoteDetailsContainer className="text-sm md:hidden md:text-base">
        <BillableDetails billableData={billableData} />
      </QuoteDetailsContainer>
    </PageWrapper>
  );
};

export default ReviewQuotePage;
