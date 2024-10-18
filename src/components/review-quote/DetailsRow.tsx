import React from 'react';

type Props = {
  title: string;
  value?: string | undefined;
};

/**
 * `DetailsRow` component displays a row of information with a title and a value.
 * It is used for presenting title-value pairs in review-quote page.
 *
 * @param {Props} props - The props for the component.
 * @param {string} props.title - The title or label for the row, describing the information presented.
 * @param {string} props.value - The value or content associated with the title.
 *
 * @returns JSX.Element - The rendered row containing the title and value.
 */
const DetailsRow = ({ title, value = undefined }: Props) => {
  return (
    <div>
      <p className="text-slate-500">{title}</p>
      {value && <p className="text-base md:text-lg">{value}</p>}
    </div>
  );
};

export default DetailsRow;
