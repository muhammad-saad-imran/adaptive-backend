import React from 'react';
import { IBillableData } from '@/store/api/types';
import { DetailsContainer } from '@/components/review-quote/style';
import DetailsRow from '@/components/review-quote/DetailsRow';

type Props = {
  billableData: IBillableData | undefined;
};

/**
 * `BillableDetails` component displays information related to billable items, including 
 * program details, coverage type, carrier, and wholesaler information.
 *
 * @param {Props} props - The props for the component.
 * @param {IBillableData} props.billableData - The data object containing billable details.
 *
 * @returns JSX.Element - The rendered component displaying the billable details in a formatted manner.
 */
const BillableDetails = ({ billableData }: Props) => {
  return (
    <DetailsContainer>
      <DetailsRow title="Program Id" value={billableData?.program_id} />
      <DetailsRow
        title="Coverage Type"
        value={billableData?.coverage_type?.title}
      />
      <DetailsRow title="Carrier Title" value={billableData?.carrier?.title} />
      <DetailsRow
        title="Carrier Address"
        value={billableData?.carrier?.formatted_address}
      />
      <DetailsRow
        title="wholesaler Title"
        value={billableData?.wholesaler?.title}
      />
      <DetailsRow
        title="wholesaler Address"
        value={billableData?.wholesaler?.formatted_address}
      />
    </DetailsContainer>
  );
};

export default BillableDetails;
