import React from 'react';
import { get } from 'lodash';
import { IBillableData } from '@/store/api/types';
import { currencyFormat } from '@/utils/quoteUtils';
import { PaymentContainer } from '@/components/review-quote/style';
import Button from '@/elements/buttons/Button';
import PaymentItem from '@/components/review-quote/PaymentItem';

type Props = {
  billableData: IBillableData | undefined;
  isPaymentCompleted: boolean;
  programUrl: string;
};

/**
 * `PaymentDetails` component displays payment information and provides an option to make a payment.
 *
 * @param {Props} props - The props for the component.
 * @param {IBillableData} props.billableData - The data related to the billable items. 
 * @param {boolean} props.isPaymentCompleted - Indicates whether the payment has been completed.
 * @param {string} props.programUrl - The URL to redirect to for completing the payment.
 *
 * @returns JSX.Element - The rendered component displaying payment details and a button to make the payment.
 */
const PaymentDetails = ({
  billableData,
  programUrl,
  isPaymentCompleted,
}: Props) => {
  return (
    <PaymentContainer>
      <p className="text-lg md:text-xl">Pay in-Full</p>
      <div>
        <PaymentItem
          product="Gross Premium"
          price={(get(billableData, 'premium_cents', 0) / 100) as number}
        />
        <div className="flex justify-between">
          <p className="text-slate-500">Total</p>
          <p className="text-base md:text-lg">
            {currencyFormat(
              (get(billableData, 'premium_cents', 0) / 100) as number
            )}
          </p>
        </div>
      </div>
      <Button
        onClick={() => window.open(programUrl, '_blank')}
        disabled={isPaymentCompleted}
      >
        Pay
      </Button>
    </PaymentContainer>
  );
};

export default PaymentDetails;
