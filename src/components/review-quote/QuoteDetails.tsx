import React from 'react';
import Link from 'next/link';
import { IPolicy, IProgramInfo, IQuote, QuoteStatus } from '@/store/api/types';
import { DetailsContainer } from '@/components/review-quote/style';
import DetailsRow from '@/components/review-quote/DetailsRow';

type Props = {
  quote: IQuote | undefined;
  policy: IPolicy | undefined;
  programInfo: IProgramInfo | undefined;
  quoteInvoiceUrl: string;
  policyInvoiceUrl: string | undefined;
};

/**
 * `QuoteDetails` component displays detailed information about a quote and its associated policy, if available.
 *
 * @param {Props} props - The props for the component.
 * @param {IQuote} props.quote - The quote object containing details such as quote number and status.
 * @param {IPolicy | undefined} props.policy - The policy object containing details such as policy number and status.
 *     It may be undefined if no policy is associated with the quote.
 * @param {IProgramInfo | undefined} props.programInfo - The programInfo object containing details for ascend.
 *     It may be undefined if no program is associated with the quote.
 * @param {string} props.quoteInvoiceUrl - The URL for the invoice document related to the quote.
 * @param {string | undefined} props.policyInvoiceUrl - The URL for the invoice document related to the policy.
 *
 * @returns JSX.Element - The rendered component displaying quote and policy details, with a link to the invoice.
 */
const QuoteDetails = ({
  quote,
  policy,
  quoteInvoiceUrl,
  policyInvoiceUrl,
  programInfo,
}: Props) => {
  const programDetailsURL = `${process.env.NEXT_PUBLIC_ASCEND_PROGRAMS_URL}/${programInfo?.id}`;
  return (
    <DetailsContainer
      className={
        quote?.status === QuoteStatus.BOUND
          ? ''
          : 'border-slate-300 pr-8 md:border-r'
      }
    >
      <DetailsRow title="Quote Number" value={quote?.quoteNumber} />
      {policy && (
        <DetailsRow title="Policy Number" value={policy?.policyNumber} />
      )}
      {programInfo && (
        <div>
          <DetailsRow title="Program Id" />
          <Link
            href={programDetailsURL}
            className="w-fit text-base underline md:text-lg"
            target="_blank"
          >
            <p className="text-lg">{programInfo?.id}</p>
          </Link>
        </div>
      )}
      <div className="w-full capitalize">
        <DetailsRow
          title="Quote Status"
          value={quote?.status?.split('_')?.join(' ')?.toLowerCase()}
        />
      </div>
      {policy && (
        <div className="w-full capitalize">
          <DetailsRow
            title="Policy Status"
            value={policy?.status?.split('_')?.join(' ')?.toLowerCase()}
          />
        </div>
      )}
      <div className="flex gap-4">
        <Link
          className="w-fit text-base underline md:text-lg"
          href={quoteInvoiceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Quote Invoice
        </Link>
        {policyInvoiceUrl && (
          <Link
            className="w-fit text-base underline md:text-lg"
            href={policyInvoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Policy Invoice
          </Link>
        )}
      </div>
    </DetailsContainer>
  );
};

export default QuoteDetails;
