import React from 'react';
import { currencyFormat } from '@/utils/quoteUtils';

type Props = {
  product: string;
  price: number;
};

/**
 * `PaymentItem` component displays a single payment item with its product name and price.
 *
 * @param {Props} props - The props for the component.
 * @param {string} props.product - The name of the product or service being billed.
 * @param {number} props.price - The price of the product or service, in numeric format.
 *
 * @returns JSX.Element - The rendered component showing the product and its price formatted as currency.
 */
const PaymentItem = ({ product, price }: Props) => {
  return (
    <div className="flex justify-between text-slate-500">
      <p>{product}</p>
      <p>{currencyFormat(price)}</p>
    </div>
  );
};

export default PaymentItem;
