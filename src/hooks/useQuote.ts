import { useCallback, useEffect, useMemo } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { get, isEmpty } from 'lodash';
import {
  useCreateQuoteMutation,
  useGetQuoteQuery,
} from '@/store/api/adaptiveApiSlice';
import { Step } from '@/store/api/types';
import {
  getAddressFromQuote,
  getBillableDataFromQuote,
  getBusinessInfoFromQuote,
  getCoverageFromQuote,
  getCoveragePolicyFromQuote,
  getProgramInfoFromQuote,
  getSelectedEstimatedFromQuote,
} from '@/utils/adaptiveApiUtils';
import { getCoverageDate } from '@/utils/quoteUtils';

type Props = {
  skipQuery?: boolean;
  queryOptions?: any;
};

/**
 * A custom hook for managing and interacting with quote data within the application.
 * It handles fetching quote details, submitting quote data, and routing based on the quote's state.
 *
 * @param {Object} [props] - Optional configuration for the hook.
 * @param {boolean} [props.skipQuery=false] - Determines whether to skip fetching the quote data.
 * @param {Object} [props.queryOptions={}] - Additional options to pass to the `useGetQuoteQuery` hook.
 *
 * @returns {Object} - An object containing various properties and methods related to quote management:
 *
 * - `router`: `NextRouter` - The Next.js router object for navigation.
 * - `quoteId`: `string | undefined` - The ID of the quote being managed.
 * - `quote`: `IQuote | undefined` - The quote data fetched from the server.
 * - `quoteQueryResult`: `UseQueryResult<IQuote>` - The result object from the `useGetQuoteQuery` hook.
 * - `createQuoteResult`: `UseMutationResult` - The result object from the `useCreateQuoteMutation` hook.
 * - `handleSubmitQuote`: `(step: Step, payload: any) => Promise<any>` - Function to handle submitting quote data.
 * - `address`: `IAddress | undefined` - Address information extracted from the quote.
 * - `coverage`: `ICoverage | undefined` - Coverage information extracted from the quote.
 * - `policy`: `IPolicy | undefined` - Policy information extracted from the quote.
 * - `businessInformation`: `IBusinessInfo | undefined` - Business information extracted from the quote.
 * - `selectedEstimate`: `IQuoteEstimate | undefined` - Selected estimate information from the quote.
 * - `billableData`: `IBillableData | undefined` - Billable data extracted from the quote.
 * - `programInfo`: `IProgramInfo | undefined` - Program information extracted from the quote.
 */
export const useQuote = ({
  skipQuery = false,
  queryOptions = {},
}: Props = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { quoteId } = useParams<{ quoteId: string }>();
  const [handleQuoteMutation, createQuoteResult] = useCreateQuoteMutation({
    // cache key used to share `createQuoteResults` among different components
    fixedCacheKey: 'shared-create-quote',
  });
  const { data: quote, ...quoteQueryResult } = useGetQuoteQuery(quoteId, {
    ...queryOptions,
    skip: skipQuery || !quoteId,
  });

  const quoteInfo = useMemo(
    () => ({
      address: getAddressFromQuote(quote),
      coverage: getCoverageFromQuote(quote),
      coveragePolicy: getCoveragePolicyFromQuote(quote),
      businessInformation: getBusinessInfoFromQuote(quote),
      selectedEstimate: getSelectedEstimatedFromQuote(quote),
      billableData: getBillableDataFromQuote(quote),
      programInfo: getProgramInfoFromQuote(quote),
    }),
    [quote]
  );

  const handleSubmitQuote = useCallback(
    async (step: Step, payload: any) => {
      try {
        const res = await handleQuoteMutation({
          quoteId,
          step,
          product: 'GridProtect',
          effectiveDate: getCoverageDate(),
          [step]: payload,
        }).unwrap();
        return res;
      } catch (error: any) {
        // show error toasts on BadRequest or failed API calls
        if (error?.status === 400 && Array.isArray(error?.data?.message)) {
          error?.data?.message.map((err: string) => toast.error(err));
        } else if (
          error?.status === 400 &&
          typeof error?.data?.message === 'string'
        ) {
          toast.error(error?.data?.message);
        } else toast.error('Something went wrong!');
        throw error;
      }
    },
    [handleQuoteMutation, quoteId]
  );

  useEffect(() => {
    // If quote is empty show notFound error
    // quote can be empty if quoteId does not exist or query is skipped -> cases handled
    if (
      quoteQueryResult.isError ||
      (!quoteQueryResult.isLoading && isEmpty(quote) && quoteId && !skipQuery)
    ) {
      if (isEmpty(quote) || get(quoteQueryResult.error, 'status') === 404)
        toast.error('Quote not Found');
      else toast.error('Something went wrong');
    }

    // Re-route to steps not completed
    // waits for newly fetched data if quote is updated
    if (!quoteQueryResult.isFetching && quote) {
      const completed = quote.data.metadata.completed_sections;
      const page = pathname.split('/').at(-1) || ''; // get page name from url path
      if (
        !completed.coverage &&
        ['business-entity-details', 'review-quote'].includes(page)
      ) {
        router.push(`/${quoteId}/policy-selection`);
      } else if (!completed.businessInformation && page === 'review-quote') {
        router.push(`/${quoteId}/business-info/business-entity-details`);
      }
    }
  }, [
    quoteId,
    quote,
    quoteQueryResult.isError,
    quoteQueryResult.isLoading,
    quoteQueryResult.isFetching,
    quoteQueryResult.error,
    router,
    pathname,
    skipQuery,
  ]);

  return {
    router,
    quoteId,
    quote,
    quoteQueryResult,
    createQuoteResult,
    handleSubmitQuote,
    ...quoteInfo,
  };
};
