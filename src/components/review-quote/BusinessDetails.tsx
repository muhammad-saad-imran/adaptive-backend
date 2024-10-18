import React from 'react';
import { IAddress, IBusinessInformation } from '@/store/api/types';
import { getCompleteAddress } from '@/utils/quoteUtils';
import { DetailsContainer } from '@/components/review-quote/style';
import DetailsRow from '@/components/review-quote/DetailsRow';

type Props = {
  businessInfo: IBusinessInformation;
  address: IAddress;
};

/**
 * `BusinessDetails` component displays detailed information about a business, including
 * the business name, contact details, and various addresses (business, mailing, and billing).
 *
 * @param {Props} props - The props for the component.
 * @param {IBusinessInformation} props.businessInfo - The business information object.
 * 
 * @returns JSX.Element - The rendered component displaying the business details in a formatted manner.
 */
const BusinessDetails = ({ businessInfo, address }: Props) => {
  return (
    <DetailsContainer className="border-slate-300 pr-8 md:border-r">
      <DetailsRow title="Business Name" value={businessInfo.businessName} />
      <DetailsRow title="First Name" value={businessInfo.firstName} />
      <DetailsRow title="Last Name" value={businessInfo.lastName} />
      <DetailsRow title="Phone Number" value={businessInfo.phone} />
      <DetailsRow
        title="Business Address"
        value={getCompleteAddress(address)}
      />
      <DetailsRow
        title="Mailing Address"
        value={getCompleteAddress(businessInfo.mailingAddress)}
      />
      <DetailsRow
        title="Billing Address"
        value={getCompleteAddress(businessInfo.billingAddress)}
      />
    </DetailsContainer>
  );
};

export default BusinessDetails;
